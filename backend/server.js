require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const SessionManager = require('./sessionManager');
const setupAI = require('./ai');

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const ai = setupAI();
const manager = new SessionManager(io, ai);

// DASHBOARD
app.get('/', (req, res) => {
    const sessions = manager.getAllSessions();
    res.send(`
        <div style="max-width: 800px; margin: 40px auto; font-family: sans-serif; background: #f9f9f9; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <h1 style="border-bottom: 2px solid #333; padding-bottom: 10px;">WhatsApp Admin Dashboard</h1>
            
            <div style="margin: 20px 0;">
                <form action="/sessions/add" method="POST">
                    <input name="id" placeholder="Admin Name (e.g. Sara-Private)" required style="padding: 10px; border-radius: 5px; border: 1px solid #ccc; width: 250px;" />
                    <button type="submit" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Add New Account</button>
                </form>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
                ${sessions.map(s => `
                    <div style="background: white; padding: 15px; border-radius: 8px; border-left: 5px solid ${s.connected ? '#28a745' : '#ffc107'}; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                        <h3 style="margin-top: 0;">${s.id}</h3>
                        <p>Status: <strong>${s.connected ? '✅ Connected' : '⏳ Waiting for QR'}</strong></p>
                        ${!s.connected ? `<a href="/qr/${s.id}" style="display: inline-block; padding: 8px 12px; background: #333; color: white; text-decoration: none; border-radius: 4px; font-size: 14px;">View QR Code</a>` : ''}
                        <a href="/logout/${s.id}" style="display: inline-block; padding: 8px 12px; background: #dc3545; color: white; text-decoration: none; border-radius: 4px; font-size: 14px; margin-left: 10px;">Logout</a>
                    </div>
                `).join('')}
                ${sessions.length === 0 ? '<p>No accounts linked yet.</p>' : ''}
            </div>
            
            <div style="margin-top: 40px; padding: 15px; background: #e9ecef; border-radius: 8px;">
                <h3>Health Status</h3>
                <p>Backend is active. Monitoring ${sessions.length} sessions.</p>
            </div>
        </div>
    `);
});

const QRCode = require('qrcode');
app.get('/qr/:id', async (req, res) => {
    const session = manager.sessions.get(req.params.id);
    if (!session || !session.currentQR) {
        return res.send('<h1>QR is not ready or session is already connected.</h1><a href="/">Go Back</a>');
    }

    try {
        const qrImage = await QRCode.toDataURL(session.currentQR);
        res.send(`
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif;">
                <h1>Scan for session: ${session.id}</h1>
                <img src="${qrImage}" style="border: 20px solid white; box-shadow: 0 0 20px rgba(0,0,0,0.1); width: 300px;" />
                <p><a href="/">Go Back to Dashboard</a></p>
            </div>
        `);
    } catch (err) { res.status(500).send('Error.'); }
});

app.post('/sessions/add', async (req, res) => {
    const { id } = req.body;
    await manager.addSession(id);
    res.redirect('/');
});

app.get('/logout/:id', async (req, res) => {
    await manager.removeSession(req.params.id);
    res.redirect('/');
});

// REST API to send a message
app.post('/chat/send', async (req, res) => {
    const { sessionId, text } = req.body;
    if (!sessionId || !text) return res.status(400).json({ error: 'Missing data' });

    console.log(`User message [${sessionId}]: ${text}`);
    const aiReply = await ai.generateReply(text);

    io.to(sessionId).emit('receive_message', { text: aiReply, sender: 'ai', timestamp: Date.now() });

    // Broadcast to ALL active sessions
    const adminLog = `💬 *New Website Chat*\n[Session: ${sessionId}]\n\n*User*: ${text}\n*AI*: ${aiReply}`;
    await manager.broadcastToAdmins(adminLog);

    res.json({ success: true, aiReply });
});

io.on('connection', (socket) => {
    socket.on('register_session', (sessionId) => {
        if (sessionId) socket.join(sessionId);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, async () => {
    console.log(`Multi-Account Backend listening on port ${PORT}`);
    await manager.initAll();
});
