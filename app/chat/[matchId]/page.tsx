"use client";

import { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function ChatPage() {
  const params = useParams();
  const matchId = params.matchId as string;
  const router = useRouter();
  const { matches, users, currentUser, sendMessage, getMessagesForMatch } = useApp();
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const match = matches.find(m => m.id === matchId);
  const matchedUser = match ? users.find(u => u.id === match.matchedUserId) : null;
  const messages = getMessagesForMatch(matchId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!match || !matchedUser) {
    return (
      <div>
        <nav className="navbar">
          <h1>💕 DateApp</h1>
          <div className="nav-links">
            <Link href="/">Descubrir</Link>
            <Link href="/matches">Matches</Link>
          </div>
        </nav>
        <div className="container">
          <div className="empty-state">
            <h2>Match no encontrado</h2>
            <Link href="/matches">Volver a matches</Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    sendMessage(matchId, messageText);
    setMessageText('');
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <nav className="navbar">
        <h1>💕 DateApp</h1>
        <div className="nav-links">
          <Link href="/">Descubrir</Link>
          <Link href="/matches">Matches</Link>
        </div>
      </nav>

      <div className="container">
        <div className="chat-container">
          <div className="chat-header">
            <div
              className="chat-header-image"
              style={{ backgroundImage: `url(${matchedUser.photos[0]})` }}
            />
            <div>
              <h2>{matchedUser.name}</h2>
              <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>
                {matchedUser.location}
              </p>
            </div>
          </div>

          <div className="chat-messages">
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
                <p>¡Es un match! Di hola a {matchedUser.name}</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.senderId === currentUser.id ? 'sent' : 'received'}`}
                >
                  <div>
                    <div className="message-bubble">
                      {message.text}
                    </div>
                    <div className="message-time">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <button type="submit" disabled={!messageText.trim()}>
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
