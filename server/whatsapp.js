const { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, Browsers } = require('@whiskeysockets/baileys');
const pino = require('pino');
const qrcode = require('qrcode-terminal');

// Dynamic getter so it picks up late-loaded env vars
const getAdminNumber = () => process.env.ADMIN_WHATSAPP_NUMBER;

async function setupWhatsApp(io, ai) {
    const { state, saveCreds } = await useMultiFileAuthState('./.auth_info_baileys');

    // Only log errors so we can see why it disconnects
    const logger = pino({ level: 'error' });

    // Fetch latest version to prevent connection failures
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(`Using WA v${version.join('.')}, isLatest: ${isLatest}`);

    let sock = makeWASocket({
        version,
        auth: state,
        logger: logger,
        browser: Browsers.macOS('Desktop')
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log('\n========================================================');
            console.log('📱 SCAN THIS QR CODE WITH YOUR WHATSAPP APP');
            console.log('    Settings -> Linked Devices -> Link a Device');
            console.log('========================================================\n');
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('WhatsApp connection closed.', lastDisconnect?.error?.message || lastDisconnect?.error);
            console.log('Reconnecting:', shouldReconnect);

            if (shouldReconnect) {
                setTimeout(() => setupWhatsApp(io, ai), 3000); // Add delay to prevent spamming
            }
        } else if (connection === 'open') {
            console.log('✅ WhatsApp successfully connected!');
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message) return;

        const textMsg = msg.message.conversation || msg.message.extendedTextMessage?.text;
        if (!textMsg) return;

        // Ignore messages sent BY the bot to prevent infinite echoing
        if (textMsg.includes('💬 *New Website Chat*')) return;

        let sessionId = null;
        let replyText = textMsg;

        // Check if the admin included it in the message manually
        const sessionMatch = textMsg.match(/\[Session:\s*([^\]]+)\]/);

        // Or check if admin replied to a quoted bot message
        const quotedMessageInfo = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
        const quotedText = quotedMessageInfo?.conversation || quotedMessageInfo?.extendedTextMessage?.text;
        let quotedSessionMatch = null;

        if (quotedText) {
            quotedSessionMatch = quotedText.match(/\[Session:\s*([^\]]+)\]/);
        }

        if (sessionMatch) {
            sessionId = sessionMatch[1];
            // Clean the text to send to user
            replyText = textMsg.replace(/\[Session:\s*[^\]]+\]/, '').trim();
        } else if (quotedSessionMatch) {
            sessionId = quotedSessionMatch[1];
        }

        if (sessionId && replyText) {
            console.log(`Routing Admin reply to web session ${sessionId}: ${replyText}`);
            // Emit event to the user's specific Socket.IO room
            io.to(sessionId).emit('receive_message', {
                text: replyText,
                sender: 'admin',
                timestamp: Date.now()
            });
        }
    });

    return {
        sendMessageToAdmin: async (text) => {
            const adminNumVal = getAdminNumber();
            const cleanAdmin = adminNumVal ? adminNumVal.replace(/\D/g, '') : null;
            const jid = cleanAdmin ? `${cleanAdmin}@s.whatsapp.net` : null;
            if (jid && sock) {
                try {
                    await sock.sendMessage(jid, { text });
                } catch (err) {
                    console.error("Failed to forward message to admin:", err);
                }
            } else {
                console.log("⚠️ Admin WhatsApp number not configured or WhatsApp socket disconnected.");
            }
        }
    };
}

module.exports = setupWhatsApp;
