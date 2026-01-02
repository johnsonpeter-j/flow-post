'use client';

import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import type { Message } from './types';

interface MessagesListProps {
  messages: Message[];
  isTyping: boolean;
  onSuggestionClick?: (suggestion: string) => void;
}

export default function MessagesList({
  messages,
  isTyping,
  onSuggestionClick,
}: MessagesListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-5 bg-[#FAFAFA]">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} onSuggestionClick={onSuggestionClick} />
      ))}

      {isTyping && <TypingIndicator />}

      <div ref={messagesEndRef} />
    </div>
  );
}


