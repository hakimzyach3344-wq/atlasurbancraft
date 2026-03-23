"use client";
import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import styles from './ChatWidget.module.css';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai' | 'admin';
    timestamp: number;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const socketRef = useRef<Socket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial setup
    useEffect(() => {
        // 1. Manage Session
        let currentSessionId = localStorage.getItem('chat_session_id');
        if (!currentSessionId) {
            currentSessionId = uuidv4();
            localStorage.setItem('chat_session_id', currentSessionId);
        }
        setSessionId(currentSessionId);

        // 2. Load History
        const savedMessages = localStorage.getItem('chat_messages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        } else {
            // Initial AI Greeting
            const welcomeMsg: Message = {
                id: uuidv4(),
                text: "Hi there! I'm Sara from Atlas Urban Craft. I can help you choose the perfect bag or decor piece 😊",
                sender: 'ai',
                timestamp: Date.now()
            };
            setMessages([welcomeMsg]);
            localStorage.setItem('chat_messages', JSON.stringify([welcomeMsg]));
        }

        // 3. Connect Socket.IO to external backend
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
        socketRef.current = io(backendUrl);

        socketRef.current.on('connect', () => {
            console.log("Connected to remote chat server");
            socketRef.current?.emit('register_session', currentSessionId);
        });

        socketRef.current.on('receive_message', (msg: Omit<Message, 'id'>) => {
            setIsTyping(false);
            setMessages((prev) => {
                const newMessages = [...prev, { ...msg, id: uuidv4() }];
                localStorage.setItem('chat_messages', JSON.stringify(newMessages));
                return newMessages;
            });
            // Play a soft notification sound if open
            try {
                const audio = new Audio('/notification.mp3'); // Optional: add a tiny click sound to public/
                audio.play().catch(() => { });
            } catch (e) { }
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    // Auto-scroll
    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping, isOpen]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMsg: Message = {
            id: uuidv4(),
            text: input,
            sender: 'user',
            timestamp: Date.now()
        };

        const updatedMessages = [...messages, newMsg];
        setMessages(updatedMessages);
        localStorage.setItem('chat_messages', JSON.stringify(updatedMessages));
        setInput('');
        setIsTyping(true);

        // Send to Railway Backend via REST API
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
        try {
            await fetch(`${backendUrl}/chat/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId,
                    text: newMsg.text
                })
            });
        } catch (error) {
            console.error("Failed to send message:", error);
            setIsTyping(false);
        }
    };

    const toggleChat = () => setIsOpen(!isOpen);

    return (
        <div className={styles.widgetContainer}>
            {/* Chat Window */}
            {isOpen && (
                <div className={`${styles.chatWindow} slide-up`}>
                    <div className={styles.chatHeader}>
                        <div className={styles.headerInfo}>
                            <div className={styles.avatar}>
                                <div className={styles.onlineBadge}></div>
                            </div>
                            <div>
                                <h3>Sara</h3>
                                <p>Customer Success</p>
                            </div>
                        </div>
                        <button onClick={toggleChat} className={styles.closeBtn}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className={styles.messagesContainer}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`${styles.messageWrapper} ${msg.sender === 'user' ? styles.userMsg : styles.agentMsg}`}
                            >
                                <div className={styles.bubble}>
                                    <p>{msg.text}</p>
                                    <span className={styles.time}>
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className={`${styles.messageWrapper} ${styles.agentMsg}`}>
                                <div className={styles.typingIndicator}>
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSend} className={styles.inputArea}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className={styles.inputField}
                        />
                        <button type="submit" className={styles.sendBtn} disabled={!input.trim()}>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}

            {/* Floating Toggle Button */}
            {!isOpen && (
                <button onClick={toggleChat} className={`${styles.floatingBtn} fade-in`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </button>
            )}
        </div>
    );
}
