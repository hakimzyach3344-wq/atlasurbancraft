const { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, Browsers } = require('@whiskeysockets/baileys');
const pino = require('pino');
const qrcode = require('qrcode-terminal');

const getAdminNumber = () => process.env.ADMIN_WHATSAPP_NUMBER;

async function setupWhatsApp(io, ai, authPath, onQRUpdate) {
    const { state, saveCreds } = await useMultiFileAuthState(authPath);
    const logger = pino({ level: 'error' });

    const { version, isLatest } = await fetchLatestBaileysVersion();

    let sock = makeWASocket({
        version,
        auth: state,
        logger: logger,
        browser: Browsers.macOS('Desktop'),
        printQRInTerminal: false
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            if (onQRUpdate) onQRUpdate(qr);
            // Also log pairing code fallback
            const adminNum = getAdminNumber();
            if (adminNum) {
                try {
                    const code = await sock.requestPairingCode(adminNum.replace(/\D/g, ''));
                    console.log(`\n[${path.basename(authPath)}] Pairing Code: ${code}`);
                } catch (e) { }
            }
        }

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) {
                setTimeout(() => setupWhatsApp(io, ai, authPath, onQRUpdate), 3000);
            }
        } else if (connection === 'open') {
            if (onQRUpdate) onQRUpdate(null);
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message) return;

        const textMsg = msg.message.conversation || msg.message.extendedTextMessage?.text;
        if (!textMsg) return;

        if (textMsg.includes('💬 *New Website Chat*')) return;

        let sessionId = null;
        let replyText = textMsg;

        const sessionMatch = textMsg.match(/\[Session:\s*([^\]]+)\]/);
        const quotedMessageInfo = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
        const quotedText = quotedMessageInfo?.conversation || quotedMessageInfo?.extendedTextMessage?.text;
        let quotedSessionMatch = quotedText ? quotedText.match(/\[Session:\s*([^\]]+)\]/) : null;

        if (sessionMatch) {
            sessionId = sessionMatch[1];
            replyText = textMsg.replace(/\[Session:\s*[^\]]+\]/, '').trim();
        } else if (quotedSessionMatch) {
            sessionId = quotedSessionMatch[1];
        }

        if (sessionId && replyText) {
            io.to(sessionId).emit('receive_message', {
                text: replyText,
                sender: 'admin',
                timestamp: Date.now()
            });
        }
    });

    return {
        isConnected: () => sock && sock.user,
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
const path = require('path'); // Added missing require
