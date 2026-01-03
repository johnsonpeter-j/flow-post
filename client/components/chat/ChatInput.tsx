'use client';

import { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  input: string;
  isTyping: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
}

export default function ChatInput({ input, isTyping, onInputChange, onSend }: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="input-area px-5 py-3.5 pb-5 bg-white border-t border-[#F3F4F6]">
      <div className="input-container flex items-center gap-2.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[10px] px-3.5 py-1.5 pl-3.5 focus-within:border-[#9CA3AF] focus-within:bg-white">
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-[0.85rem] text-[#1F2937] font-inherit placeholder:text-[#9CA3AF]"
          disabled={isTyping}
        />
        <button
          className="send-btn w-9 h-9 rounded-lg bg-[#111827] border-none flex items-center justify-center cursor-pointer text-white transition-colors hover:bg-[#1F2937] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onSend}
          disabled={!input.trim() || isTyping}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}





