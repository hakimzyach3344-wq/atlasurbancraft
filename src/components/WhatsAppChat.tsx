"use client";

import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import styles from './WhatsAppChat.module.css';

const WHATSAPP_NUMBER = "+212708040530";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export default function WhatsAppChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [showHelpPopup, setShowHelpPopup] = useState(false);
    const [isHelpDisabled, setIsHelpDisabled] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [userInput, setUserInput] = useState("");
    const [sessionId, setSessionId] = useState<string>("");

    const socketRef = useRef<Socket | null>(null);
    const chatBodyRef = useRef<HTMLDivElement>(null);

    // 1. Initialize Session and Socket
    useEffect(() => {
        // Load or create Session ID
        let sid = localStorage.getItem('chat_session_id');
        if (!sid) {
            sid = uuidv4();
            localStorage.setItem('chat_session_id', sid);
        }
        setSessionId(sid);

        // Connect Socket
        const socket = io(BACKEND_URL);
        socketRef.current = socket;

        socket.on('connect', () => {
            console.log('Connected to backend');
            socket.emit('register_session', sid);
        });

        socket.on('chat_history', (history: any[]) => {
            setMessages(history);
        });

        socket.on('receive_message', (msg: any) => {
            setMessages(prev => [...prev, msg]);
        });

        // Initial help logic
        const disabled = localStorage.getItem('whatsapp_help_disabled') === 'true';
        setIsHelpDisabled(disabled);

        if (!disabled) {
            const initialTimer = setTimeout(() => {
                setShowHelpPopup(true);
                setTimeout(() => setShowHelpPopup(false), 4000);
            }, 10000);

            const interval = setInterval(() => {
                setShowHelpPopup(true);
                setTimeout(() => setShowHelpPopup(false), 4000);
            }, 7 * 60 * 1000);

            return () => {
                clearTimeout(initialTimer);
                clearInterval(interval);
                socket.disconnect();
            };
        }

        return () => socket.disconnect();
    }, []);

    // 2. Scroll to bottom when messages change
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const sendMessage = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!userInput.trim()) return;

        const text = userInput;
        setUserInput("");

        // Optimistically add to UI (though backend history will also sync)
        // setMessages(prev => [...prev, { text, sender: 'user', timestamp: Date.now() }]);

        try {
            await fetch(`${BACKEND_URL}/chat/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId,
                    text,
                    userName: 'Website Visitor' // Could be dynamic
                })
            });
        } catch (err) {
            console.error("Failed to send message:", err);
        }
    };

    const closeChatNotification = async () => {
        try {
            await fetch(`${BACKEND_URL}/chat/close`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId,
                    userName: 'Website Visitor'
                })
            });
            // Clear local history for the UI if desired
            setMessages([]);
            setIsOpen(false);
        } catch (err) {
            console.error("Failed to close chat:", err);
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setShowTooltip(false);
        setShowHelpPopup(false);
        if (!isHelpDisabled) {
            localStorage.setItem('whatsapp_help_disabled', 'true');
            setIsHelpDisabled(true);
        }
    };

    const handleWhatsAppRedirect = () => {
        const message = "Hi, I'm contacting you from the website support chat.";
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const formatTime = (ts: number) => {
        return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={styles.widgetContainer}>
            {/* Help Popup */}
            {showHelpPopup && !isOpen && (
                <div className={styles.helpPopup}>
                    <p>if you need help 3 agents online now</p>
                    <div className={styles.helpArrow}></div>
                </div>
            )}

            {/* Tooltip Message */}
            {showTooltip && !isOpen && (
                <div className={styles.tooltip}>
                    <p>Live Support 👋</p>
                    <button onClick={() => setShowTooltip(false)} className={styles.closeTooltip}>×</button>
                </div>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.chatHeader}>
                        <div className={styles.headerInfo}>
                            <div className={styles.avatar}>
                                <div className={styles.onlineStatus} />
                            </div>
                            <div>
                                <h4 className={styles.agentName}>Atlas Concierge</h4>
                                <p className={styles.statusText}>Online | Fast Response</p>
                            </div>
                        </div>
                        <div className={styles.headerActions}>
                            <button onClick={closeChatNotification} className={styles.closeChatBtn} title="Close this chat">
                                Close Chat
                            </button>
                            <button onClick={toggleChat} className={styles.closeIcon}>×</button>
                        </div>
                    </div>

                    <div className={styles.chatBody} ref={chatBodyRef}>
                        {messages.length === 0 ? (
                            <div className={styles.welcomeMessage}>
                                <div className={styles.logoCircle}>A</div>
                                <h3>How can we help?</h3>
                                <p>Start a conversation and our specialized agents will get back to you immediately via WhatsApp.</p>
                            </div>
                        ) : (
                            <div className={styles.messagesList}>
                                {messages.map((m, i) => (
                                    <div key={i} className={`${styles.messageWrapper} ${m.sender === 'user' ? styles.userMsg : styles.agentMsg}`}>
                                        <div className={styles.messageBubble}>
                                            <p>{m.text}</p>
                                            <span className={styles.msgTime}>{formatTime(m.timestamp)}</span>
                                        </div>
                                    </div>
                                ))}
                                {/* Show Redirect Button if the last message was from agent/ai */}
                                {messages.length > 0 && messages[messages.length - 1].sender !== 'user' && (
                                    <div className={styles.waRedirectContainer}>
                                        <button onClick={handleWhatsAppRedirect} className={styles.continueWA}>
                                            Continue on WhatsApp
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className={styles.chatFooterInput}>
                        <form onSubmit={sendMessage} className={styles.inputContainer}>
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                className={styles.textInput}
                            />
                            <button type="submit" className={styles.sendIconBtn}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button
                className={`${styles.floatingBtn} ${isOpen ? styles.active : ''}`}
                onClick={toggleChat}
                aria-label="Toggle live chat"
            >
                {isOpen ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </button>
        </div>
    );
}

