'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useReduxData } from '@/hooks/useReduxData';
import { MessagesList, ChatInput, generateAIResponse } from '@/components/chat';
import type { Message } from '@/components/chat';
import { mockContentBank } from '@/data/mockData';

export default function ChatPage() {
  const router = useRouter();
  const { briefs, tasks, clients } = useReduxData();
  const contentBank = mockContentBank;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: {
        message: "Hello! I'm your social media assistant. How can I help you today?",
        suggestions: ['Show pipeline', "What's due?", 'Team workload', 'Add new idea'],
      },
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateAIResponse(currentInput, { contentBank, briefs, tasks, clients }),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleSuggestion = (suggestion: string) => {
    if (isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: suggestion,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Navigate based on suggestion
    const lowerSuggestion = suggestion.toLowerCase();
    if (lowerSuggestion.includes('pipeline')) {
      router.push('/pipeline');
    } else if (lowerSuggestion.includes('calendar')) {
      router.push('/calendar');
    } else if (lowerSuggestion.includes('team')) {
      router.push('/team');
    } else if (lowerSuggestion.includes('analytics')) {
      router.push('/analytics');
    } else if (lowerSuggestion.includes('client')) {
      router.push('/clients');
    } else if (lowerSuggestion.includes('problem')) {
      router.push('/problems');
    }

    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: {
          message: `Sure! I've opened "${suggestion}" for you. Is there anything specific you'd like to know?`,
          suggestions: ['Show recent content', 'Pending tasks', 'Performance report'],
        },
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      <MessagesList messages={messages} isTyping={isTyping} onSuggestionClick={handleSuggestion} />
      <ChatInput input={input} isTyping={isTyping} onInputChange={setInput} onSend={handleSend} />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
