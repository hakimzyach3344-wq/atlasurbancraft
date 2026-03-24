const setupWhatsApp = require('./whatsapp');
const fs = require('fs');
const path = require('path');

class SessionManager {
    constructor(io, ai) {
        this.io = io;
        this.ai = ai;
        this.sessions = new Map();

        // Use WA_AUTH_PATH from env, or default to local 'auth' folder
        // On Railway, this can be pointed to a Volume mount point like /app/backend/auth
        const customPath = process.env.WA_AUTH_PATH;
        this.baseAuthDir = customPath ? path.resolve(customPath) : path.join(__dirname, 'auth');

        if (!fs.existsSync(this.baseAuthDir)) {
            console.log(`Creating auth directory at: ${this.baseAuthDir}`);
            fs.mkdirSync(this.baseAuthDir, { recursive: true });
        }
    }

    async initAll() {
        console.log("Initializing saved sessions...");
        const sessionDirs = fs.readdirSync(this.baseAuthDir).filter(f => fs.statSync(path.join(this.baseAuthDir, f)).isDirectory());

        for (const sessionId of sessionDirs) {
            await this.addSession(sessionId);
        }
    }

    async addSession(sessionId) {
        if (this.sessions.has(sessionId)) return this.sessions.get(sessionId);

        console.log(`Setting up session: ${sessionId}`);
        const sessionAuthPath = path.join(this.baseAuthDir, sessionId);

        const wa = await setupWhatsApp(this.io, this.ai, sessionAuthPath, (qr) => {
            const sess = this.sessions.get(sessionId);
            if (sess) sess.currentQR = qr;
        });

        this.sessions.set(sessionId, {
            id: sessionId,
            wa,
            currentQR: null
        });

        return this.sessions.get(sessionId);
    }

    async removeSession(sessionId) {
        const sess = this.sessions.get(sessionId);
        if (sess) {
            await sess.wa.logout();
            this.sessions.delete(sessionId);
            // Optionally remove the auth folder
            const sessionAuthPath = path.join(this.baseAuthDir, sessionId);
            if (fs.existsSync(sessionAuthPath)) {
                fs.rmSync(sessionAuthPath, { recursive: true, force: true });
            }
        }
    }

    getAllSessions() {
        return Array.from(this.sessions.values()).map(s => ({
            id: s.id,
            connected: s.wa.isConnected(),
            qr: s.currentQR
        }));
    }

    async broadcastToAdmins(text) {
        for (const sess of this.sessions.values()) {
            if (sess.wa.isConnected()) {
                await sess.wa.sendMessageToAdmin(text);
            }
        }
    }
}

module.exports = SessionManager;
