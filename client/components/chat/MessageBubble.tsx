'use client';

import type { Message } from './types';

interface MessageBubbleProps {
  message: Message;
  onSuggestionClick?: (suggestion: string) => void;
}

export default function MessageBubble({ message, onSuggestionClick }: MessageBubbleProps) {
  const isUser = message.type === 'user';
  const content = typeof message.content === 'string' ? message.content : message.content.message;
  const suggestions = typeof message.content === 'object' ? message.content.suggestions : undefined;

  return (
    <div className={`message mb-4 animate-[fadeIn_0.25s_ease] ${isUser ? 'user' : ''}`}>
      <div className="message-content">
        {isUser ? (
          <div className="bg-[#111827] text-white rounded-[16px_16px_4px_16px] px-3.5 py-2.5 max-w-[70%] text-[0.85rem]">
            {content}
          </div>
        ) : (
          <div className="ai-bubble bg-white border border-[#E5E7EB] rounded-xl px-4 py-3.5 max-w-[85%]">
            <div className="ai-text text-[0.85rem] leading-relaxed text-[#374151]">{content}</div>
            {suggestions && suggestions.length > 0 && (
              <div className="suggestions flex flex-wrap gap-1.5 mt-3">
                {suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    className="suggestion-chip px-3 py-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl text-[0.75rem] text-[#4B5563] cursor-pointer font-medium transition-all hover:bg-[#F3F4F6] hover:border-[#D1D5DB]"
                    onClick={() => onSuggestionClick?.(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


