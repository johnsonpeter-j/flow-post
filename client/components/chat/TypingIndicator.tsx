'use client';

export default function TypingIndicator() {
  return (
    <div className="message mb-4">
      <div className="message-content">
        <div className="ai-bubble bg-white border border-[#E5E7EB] rounded-xl px-4 py-3.5 max-w-[85%]">
          <div className="flex gap-1.5">
            <div
              className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce"
              style={{ animationDelay: '0ms' }}
            />
            <div
              className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce"
              style={{ animationDelay: '150ms' }}
            />
            <div
              className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce"
              style={{ animationDelay: '300ms' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


