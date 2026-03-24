const { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, Browsers } = require('@whiskeysockets/baileys');
const pino = require('pino');
const qrcode = require('qrcode-terminal');

const getAdminNumber = () => process.env.ADMIN_WHATSAPP_NUMBER;

async function setupWhatsApp(io, ai, onQRUpdate) {
    const { state, saveCreds } = await useMultiFileAuthState('./.auth_info_baileys');
    const logger = pino({ level: 'error' });

    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(`Using WA v${version.join('.')}, isLatest: ${isLatest}`);

    let sock = makeWASocket({
        version,
        auth: state,
        logger: logger,
        browser: Browsers.macOS('Desktop')
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            if (onQRUpdate) onQRUpdate(qr);
            console.log('\n========================================================');
            console.log('📱 WHATSAPP PAIRING OPTIONS');
            console.log('========================================================');

            const adminNum = getAdminNumber();
            if (adminNum) {
                try {
                    const code = await sock.requestPairingCode(adminNum.replace(/\D/g, ''));
                    console.log(`\n👉 YOUR PAIRING CODE: ${code}`);
                    console.log(`📱 TARGET PHONE NUMBER: ${adminNum}`);
                    console.log('\nHOW TO USE:');
                    console.log('1. Open WhatsApp on your phone');
                    console.log('2. Linked Devices -> Link a Device');
                    console.log('3. Tap "Link with phone number instead" at the bottom');
                    console.log(`4. Enter '${adminNum}' then enter the code: ${code}`);
                } catch (err) {
                    console.log('Failed to generate pairing code, falling back to QR.');
                    qrcode.generate(qr);
                }
            } else {
                console.log('Scanning QR instead (Add ADMIN_WHATSAPP_NUMBER for Pairing Code):');
                qrcode.generate(qr);
            }
            console.log('========================================================\n');
        }

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('WhatsApp connection closed.', lastDisconnect?.error?.message || lastDisconnect?.error);
            console.log('Reconnecting:', shouldReconnect);

            if (shouldReconnect) {
                setTimeout(() => setupWhatsApp(io, ai, onQRUpdate), 3000);
            }
        } else if (connection === 'open') {
            console.log('✅ WhatsApp successfully connected!');
            if (onQRUpdate) onQRUpdate(null);
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message) return;

        const textMsg = msg.message.conversation || msg.message.extendedTextMessage?.text;
        if (!textMsg) return;

        // Ignore messages sent BY the bot
        if (textMsg.includes('💬 *New Website Chat*')) return;

        let sessionId = null;
        let replyText = textMsg;

        // Extract session from manual mention or quoted context
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
            console.log(`Routing Admin reply to [${sessionId}]: ${replyText}`);
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
                } catch (err) {
                    console.error("Logout error:", err);
                }
            }
        },
        sendMessageToAdmin: async (text) => {
            const adminNumVal = getAdminNumber();
            const cleanAdmin = adminNumVal ? adminNumVal.replace(/\D/g, '') : null;
            const jid = cleanAdmin ? `${cleanAdmin}@s.whatsapp.net` : null;
            if (jid && sock) {
                try {
                    await sock.sendMessage(jid, { text });
                } catch (err) {
                    console.error("Failed to send WA message:", err);
                }
            }
        }
    };
}

module.exports = setupWhatsApp;
