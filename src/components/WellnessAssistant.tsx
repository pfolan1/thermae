'use client';

import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Hi! I can help you find the perfect sauna, cold plunge, hot spring or seaweed bath. Tell me what you're looking for — location, budget, type of experience — and I'll find the best options for you.",
};

// Parse streaming SSE chunks from Anthropic
function extractTextFromChunk(chunk: string): string {
  let text = '';
  const lines = chunk.split('\n');
  for (const line of lines) {
    if (!line.startsWith('data: ')) continue;
    const data = line.slice(6).trim();
    if (!data || data === '[DONE]') continue;
    try {
      const parsed = JSON.parse(data);
      if (
        parsed.type === 'content_block_delta' &&
        parsed.delta?.type === 'text_delta' &&
        typeof parsed.delta.text === 'string'
      ) {
        text += parsed.delta.text;
      }
    } catch {
      // skip malformed JSON
    }
  }
  return text;
}

// Render message content — turn [text](url) links into <a> elements
function MessageContent({ content }: { content: string }) {
  const parts: ReactNode[] = [];
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(content)) !== null) {
    if (match.index > last) {
      parts.push(<span key={last}>{content.slice(last, match.index)}</span>);
    }
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#FF5A5F', fontWeight: 600, textDecoration: 'underline' }}
      >
        {match[1]}
      </a>
    );
    last = match.index + match[0].length;
  }
  if (last < content.length) {
    parts.push(<span key={last}>{content.slice(last)}</span>);
  }
  return <span style={{ whiteSpace: 'pre-wrap' }}>{parts}</span>;
}

export default function WellnessAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: 'user', content: text };
    const history = [...messages, userMessage];
    setMessages(history);
    setInput('');
    setLoading(true);

    // Placeholder for the streaming assistant reply
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          messages: history.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error('API error');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // Process complete SSE events (split on double newline)
        const parts = buffer.split('\n\n');
        buffer = parts.pop() ?? '';

        for (const part of parts) {
          const delta = extractTextFromChunk(part);
          if (delta) {
            setMessages(prev => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: 'assistant',
                content: updated[updated.length - 1].content + delta,
              };
              return updated;
            });
          }
        }
      }

      // Flush any remaining buffer
      if (buffer) {
        const delta = extractTextFromChunk(buffer);
        if (delta) {
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: 'assistant',
              content: updated[updated.length - 1].content + delta,
            };
            return updated;
          });
        }
      }
    } catch {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: "Sorry, I couldn't connect right now. Please try again in a moment.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open wellness assistant"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#FF5A5F',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          boxShadow: '0 4px 20px rgba(255,90,95,0.4)',
          zIndex: 9998,
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 28px rgba(255,90,95,0.5)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(255,90,95,0.4)';
        }}
      >
        {open ? '✕' : '♨️'}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '92px',
            right: '24px',
            width: '380px',
            height: '520px',
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 9997,
            fontFamily: 'inherit',
            animation: 'slideUpChat 0.2s ease-out',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: '#FF5A5F',
              color: '#fff',
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>♨️</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '15px', lineHeight: 1.2 }}>Thermae Assistant</div>
                <div style={{ fontSize: '11px', opacity: 0.85, fontStyle: 'italic' }}>Find your perfect wellness spot</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'inherit',
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages area */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '84%',
                    padding: '10px 14px',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.role === 'user' ? '#FF5A5F' : '#F5F5F5',
                    color: msg.role === 'user' ? '#fff' : '#222',
                    fontSize: '14px',
                    lineHeight: 1.5,
                  }}
                >
                  {msg.content === '' && loading && i === messages.length - 1 ? (
                    <span style={{ opacity: 0.5 }}>●●●</span>
                  ) : (
                    <MessageContent content={msg.content} />
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div
            style={{
              padding: '12px 14px',
              borderTop: '1px solid #EBEBEB',
              display: 'flex',
              gap: '8px',
              flexShrink: 0,
              background: '#fff',
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about saunas, locations, prices..."
              disabled={loading}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '24px',
                border: '1px solid #EBEBEB',
                background: '#F7F7F7',
                fontSize: '14px',
                fontFamily: 'inherit',
                outline: 'none',
                color: '#222',
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: loading || !input.trim() ? '#E0E0E0' : '#FF5A5F',
                border: 'none',
                cursor: loading || !input.trim() ? 'default' : 'pointer',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 0.15s',
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUpChat {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 440px) {
          /* Full-width on small phones */
          .wellness-panel { width: calc(100vw - 32px) !important; right: 16px !important; }
        }
      `}</style>
    </>
  );
}
