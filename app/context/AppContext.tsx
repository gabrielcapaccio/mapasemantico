"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { User, Match, Message, SwipeAction } from '../types';
import { mockUsers, currentUser } from '../data/mockUsers';

interface AppContextType {
  currentUser: User;
  users: User[];
  currentIndex: number;
  matches: Match[];
  messages: Message[];
  handleSwipe: (action: SwipeAction) => void;
  sendMessage: (matchId: string, text: string) => void;
  getMatchedUsers: () => User[];
  getMessagesForMatch: (matchId: string) => Message[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [users] = useState<User[]>(mockUsers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<Match[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSwipe = (action: SwipeAction) => {
    if (currentIndex >= users.length) return;

    if (action === 'like') {
      // Simulate a match (50% chance)
      const isMatch = Math.random() > 0.5;

      if (isMatch) {
        const newMatch: Match = {
          id: `match-${Date.now()}`,
          userId: currentUser.id,
          matchedUserId: users[currentIndex].id,
          timestamp: new Date(),
        };
        setMatches([...matches, newMatch]);
      }
    }

    // Move to next user
    setCurrentIndex(currentIndex + 1);
  };

  const sendMessage = (matchId: string, text: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      matchId,
      senderId: currentUser.id,
      text,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);

    // Simulate response after 2 seconds
    setTimeout(() => {
      const match = matches.find(m => m.id === matchId);
      if (match) {
        const responses = [
          '¡Hola! ¿Cómo estás?',
          'Me encantó tu perfil 😊',
          '¿Qué planes tienes para hoy?',
          'Me gustaría conocerte mejor',
          '¡Qué bien! Cuéntame más',
        ];
        const responseText = responses[Math.floor(Math.random() * responses.length)];
        const response: Message = {
          id: `msg-${Date.now()}-response`,
          matchId,
          senderId: match.matchedUserId,
          text: responseText,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, response]);
      }
    }, 2000);
  };

  const getMatchedUsers = (): User[] => {
    return matches.map(match => {
      const matchedUser = users.find(u => u.id === match.matchedUserId);
      return matchedUser!;
    }).filter(Boolean);
  };

  const getMessagesForMatch = (matchId: string): Message[] => {
    return messages.filter(msg => msg.matchId === matchId);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        currentIndex,
        matches,
        messages,
        handleSwipe,
        sendMessage,
        getMatchedUsers,
        getMessagesForMatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
