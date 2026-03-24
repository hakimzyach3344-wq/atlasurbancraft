require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const setupWhatsApp = require('./whatsapp');
const setupAI = require('./ai');

const app = express();
app.use(cors({ origin: "*" })); // In production, replace with your Vercel URL
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
    cors: { origin: "*" } // In production, replace with your Vercel URL
});

const ai = setupAI();
let wa;
let currentQR = null;

// Health check endpoint
app.get('/health', (req, res) => {
    res.send('Backend is running!');
});

// Route to view the QR code clearly
const QRCode = require('qrcode');
app.get('/qr', async (req, res) => {
    if (!currentQR) {
        return res.send('<h1>WhatsApp is already connected or QR is not ready yet.</h1><p>Please check Railway Logs or refresh in a moment.</p>');
    }

    try {
        const qrImage = await QRCode.toDataURL(currentQR);
        res.send(`
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif;">
                <h1>Scan this QR Code</h1>
                <img src="${qrImage}" style="border: 20px solid white; box-shadow: 0 0 20px rgba(0,0,0,0.1); width: 300px;" />
                <p>Refresh this page if the code expires.</p>
            </div>
        `);
    } catch (err) {
        res.status(500).send('Failed to generate QR image.');
    }
});

// REST API to send a message
app.post('/chat/send', async (req, res) => {
    const { sessionId, text } = req.body;

    if (!sessionId || !text) {
        return res.status(400).json({ error: 'Missing sessionId or text' });
    }

    console.log(`User message [${sessionId}]: ${text}`);

    // 1. Generate AI Reply
    const aiReply = await ai.generateReply(text);

    // 2. Broadcast AI Reply to Socket User
    io.to(sessionId).emit('receive_message', {
        text: aiReply,
        sender: 'ai',
        timestamp: Date.now()
    });

    // 3. Forward to WhatsApp Admin
    if (wa) {
        const adminLog = `💬 *New Website Chat*\n[Session: ${sessionId}]\n\n*User*: ${text}\n*AI*: ${aiReply}\n\n_Reply to this message to talk to the user directly._`;
        await wa.sendMessageToAdmin(adminLog);
    }

    res.json({ success: true, aiReply });
});

io.on('connection', (socket) => {
    console.log('Socket client connected:', socket.id);

    socket.on('register_session', (sessionId) => {
        if (sessionId) {
            console.log(`Socket ${socket.id} registered to session: ${sessionId}`);
            socket.join(sessionId);
        }
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, async () => {
    console.log(`Backend server listening on port ${PORT}`);
    try {
        wa = await setupWhatsApp(io, ai, (qr) => {
            currentQR = qr;
        });

        // Clear QR when connected
        io.on('connection', (socket) => {
            if (wa && wa.isConnected) currentQR = null;
        });

    } catch (err) {
        console.error("Failed to setup WhatsApp:", err);
    }
});
