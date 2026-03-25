"use client";

import { useState, useEffect } from 'react';
import styles from './WhatsAppChat.module.css';

const WHATSAPP_NUMBER = "+212708040530"; // Replace with actual number or allow as prop

export default function WhatsAppChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [showHelpPopup, setShowHelpPopup] = useState(false);
    const [isHelpDisabled, setIsHelpDisabled] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        const disabled = localStorage.getItem('whatsapp_help_disabled') === 'true';
        setIsHelpDisabled(disabled);

        if (!disabled) {
            // Initial showing after 10 seconds
            const initialTimer = setTimeout(() => {
                setShowHelpPopup(true);
                setTimeout(() => setShowHelpPopup(false), 4000);
            }, 10000);

            // Repeat every 7 minutes
            const interval = setInterval(() => {
                setShowHelpPopup(true);
                setTimeout(() => setShowHelpPopup(false), 4000);
            }, 7 * 60 * 1000);

            return () => {
                clearTimeout(initialTimer);
                clearInterval(interval);
            };
        }
    }, [isHelpDisabled]);

    const sendMessage = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!userInput.trim()) return;

        const newMsg = { text: userInput, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages([...messages, newMsg]);

        // Forwarding logic placeholder: This is where you'd connect to Respond.io or Tiledesk
        // For now, we simulate a bot response that leads to WhatsApp
        setTimeout(() => {
            setMessages(prev => [...prev, {
                text: "Thanks! Our team has been notified. We reply via WhatsApp for speed. Click below to continue our chat there directly.",
                sender: 'agent',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }, 1000);

        setUserInput("");
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
                        <button onClick={toggleChat} className={styles.closeChat}>×</button>
                    </div>

                    <div className={styles.chatBody}>
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
                                            <span className={styles.msgTime}>{m.time}</span>
                                        </div>
                                        {m.sender === 'agent' && i === messages.length - 1 && (
                                            <button onClick={handleWhatsAppRedirect} className={styles.continueWA}>
                                                Continue on WhatsApp
                                            </button>
                                        )}
                                    </div>
                                ))}
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
