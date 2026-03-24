const { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, Browsers } = require('@whiskeysockets/baileys');
const pino = require('pino');
const qrcode = require('qrcode-terminal');
const path = require('path');

const getAdminNumber = () => process.env.ADMIN_WHATSAPP_NUMBER;

async function setupWhatsApp(io, ai, authPath, onQRUpdate) {
    const { state, saveCreds } = await useMultiFileAuthState(authPath);
    const logger = pino({ level: 'error' });

    const { version, isLatest } = await fetchLatestBaileysVersion();

    let sock = null;
    let isConnected = false;

    const startSocket = () => {
        sock = makeWASocket({
            version,
            auth: state,
            logger: logger,
            browser: Browsers.macOS('Desktop'),
            printQRInTerminal: false,
            syncFullHistory: false,
            shouldSyncHistoryMessage: () => false,
            fireInitQueries: false,
            markOnlineOnConnect: false,
            linkPreviewImageThumbnailWidth: 192
        });

        sock.ev.on('creds.update', saveCreds);

        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update;

            if (qr && !isConnected) {
                if (onQRUpdate) onQRUpdate(qr);
                const adminNum = getAdminNumber();
                if (adminNum && !sock.authState.creds.me) {
                    try {
                        const code = await sock.requestPairingCode(adminNum.replace(/\D/g, ''));
                        console.log(`\n[${path.basename(authPath)}] Pairing Code: ${code}`);
                    } catch (err) {
                        console.error(`Failed to request pairing code for ${adminNum}:`, err.message);
                    }
                }
            }

            if (connection === 'close') {
                isConnected = false;
                const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
                if (shouldReconnect) {
                    setTimeout(() => startSocket(), 3000);
                }
            } else if (connection === 'open') {
                console.log(`✅ [${path.basename(authPath)}] connected!`);
                isConnected = true;
                if (onQRUpdate) onQRUpdate(null);
            }
        });

        sock.ev.on('messages.upsert', async (m) => {
            console.log(`[WA DEBUG] messages.upsert event triggered. Count: ${m.messages.length}`);
            const msg = m.messages[0];
            if (!msg.message) return;

            const textMsg = msg.message.conversation || msg.message.extendedTextMessage?.text;
            if (!textMsg) return;

            // Don't process our own notification messages (avoid loops)
            if (textMsg.includes('ATLAS URBAN CRAFT') && msg.key.fromMe) return;

            let sessionId = null;
            let replyText = textMsg;

            // Improved Regex to match both [Session: ID] and 🆔 *Session*: ID
            const sessionRegex = /(?:🆔 \*Session\*:|\[Session:\s*)([a-f0-9-]+)/i;

            const sessionMatch = textMsg.match(sessionRegex);
            const contextInfo = msg.message.extendedTextMessage?.contextInfo;
            const quotedMsg = contextInfo?.quotedMessage;

            // Extract text from various quoted message types
            const quotedText = quotedMsg?.conversation ||
                quotedMsg?.extendedTextMessage?.text ||
                quotedMsg?.buttonsMessage?.contentText ||
                quotedMsg?.templateSecondaryHtmlMessage?.contentText;

            let quotedSessionMatch = quotedText ? quotedText.match(sessionRegex) : null;

            if (sessionMatch) {
                sessionId = sessionMatch[1];
                // Clean up the reply text if they typed the session tag manually
                replyText = textMsg.replace(sessionRegex, '').trim();
            } else if (quotedSessionMatch) {
                sessionId = quotedSessionMatch[1];
            }

            if (sessionId && replyText) {
                console.log(`[WA Relayer] Relaying to [${sessionId}]: ${replyText.substring(0, 30)}`);
                io.to(sessionId).emit('receive_message', {
                    text: replyText,
                    sender: 'admin',
                    timestamp: Date.now()
                });
            } else if (!textMsg.includes('ATLAS URBAN CRAFT')) {
                console.log(`[WA Relayer] No session ID found. Quoted: ${!!quotedText}`);
            }
        });
    };

    startSocket();

    return {
        isConnected: () => isConnected || (sock && sock.user),
        logout: async () => {
            if (sock) {
                try {
                    await sock.logout();
                } catch (err) { }
            }
        },
        sendMessageToAdmin: async (text) => {
            const adminNumVal = getAdminNumber();
            const cleanAdmin = adminNumVal ? adminNumVal.replace(/\D/g, '') : null;
            const jid = cleanAdmin ? `${cleanAdmin}@s.whatsapp.net` : null;
            if (jid && sock) {
                try {
                    await sock.sendMessage(jid, { text });
                } catch (err) { }
            }
        }
    };
}

module.exports = setupWhatsApp;
