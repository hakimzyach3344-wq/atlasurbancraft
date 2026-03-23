const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd()); // Force load .env files early

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const setupWhatsApp = require('./server/whatsapp');
const setupAI = require('./server/ai');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
    const server = createServer(async (req, res) => {
        try {
            const parsedUrl = parse(req.url, true);
            await handle(req, res, parsedUrl);
        } catch (err) {
            console.error('Error occurred handling', req.url, err);
            res.statusCode = 500;
            res.end('internal server error');
        }
    });

    const io = new Server(server, {
        cors: { origin: "*" }
    });

    // Initialize AI & WhatsApp
    const ai = setupAI();
    let wa;
    try {
        wa = await setupWhatsApp(io, ai);
    } catch (err) {
        console.error("Failed to setup WhatsApp Baileys immediately:", err);
    }

    io.on('connection', (socket) => {
        console.log('Socket client connected:', socket.id);

        socket.on('register_session', (sessionId) => {
            if (sessionId) {
                console.log(`Socket ${socket.id} registered to session: ${sessionId}`);
                socket.join(sessionId);
            }
        });

        socket.on('send_message', async (data) => {
            // data: { sessionId, text }
            const { sessionId, text } = data;

            if (!sessionId || !text) return;

            console.log(`User message [${sessionId}]: ${text}`);

            // 1. Send to OpenAI for instant reply
            const aiReply = await ai.generateReply(text);

            // 2. Broadcast AI reply to user's session room
            io.to(sessionId).emit('receive_message', {
                text: aiReply,
                sender: 'ai',
                timestamp: Date.now()
            });

            // 3. Forward message + AI reply to WhatsApp Admin
            if (wa) {
                const adminLog = `💬 *New Website Chat*\n[Session: ${sessionId}]\n\n*User*: ${text}\n*AI*: ${aiReply}\n\n_Reply to this message to talk to the user directly._`;
                await wa.sendMessageToAdmin(adminLog);
            }
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected:', socket.id);
        });
    });

    server.once('error', (err) => {
        console.error(err);
        process.exit(1);
    });

    server.listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});
