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

// Health check endpoint
app.get('/health', (req, res) => {
    res.send('Backend is running!');
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
        wa = await setupWhatsApp(io, ai);
    } catch (err) {
        console.error("Failed to setup WhatsApp:", err);
    }
});
