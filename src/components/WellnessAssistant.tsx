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

  const sendMessage = useCallback(async (override?: string) => {
    const text = (override ?? input).trim();
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
          content: "I'm thinking... please try again in a moment.",
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
          bottom: '20px',
          right: '20px',
          width: '56px',
          height: '64px',
          borderRadius: '16px',
          background: '#FF5A5F',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          boxShadow: '0 4px 16px rgba(255,90,95,0.4)',
          zIndex: 9998,
          transition: 'transform 0.2s, box-shadow 0.2s',
          animation: open ? 'none' : 'thermaePulse 4s ease-in-out infinite',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 24px rgba(255,90,95,0.55)';
          (e.currentTarget as HTMLButtonElement).style.animation = 'none';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(255,90,95,0.4)';
          if (!open) (e.currentTarget as HTMLButtonElement).style.animation = 'thermaePulse 4s ease-in-out infinite';
        }}
      >
        {open ? (
          <span style={{ color: '#fff', fontSize: '18px', lineHeight: 1 }}>✕</span>
        ) : (
          <>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 2C12 2 7 7 7 12a5 5 0 0010 0c0-5-5-10-5-10z" fill="white" opacity="0.95"/>
              <path d="M8 14c0 2.21 1.79 4 4 4s4-1.79 4-4c0-1.5-.8-2.8-2-3.5.3 1-.2 2.1-1 2.7C12.7 12.4 12 11.2 12 10c0 0-4 2-4 4z" fill="white" opacity="0.7"/>
              <path d="M7 20h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
              <path d="M9 22h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
            </svg>
            <span style={{
              color: '#fff',
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              lineHeight: 1,
              fontFamily: 'inherit',
              textTransform: 'uppercase',
            }}>
              Thermae AI
            </span>
          </>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '340px',
            height: '420px',
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
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
              background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
              color: '#fff',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>✨</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', lineHeight: 1.2 }}>Thermae AI Assistant</div>
                <div style={{ fontSize: '10px', opacity: 0.75, fontStyle: 'italic' }}>Powered by AI · Find your perfect spot</div>
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
            {messages.length === 1 && !loading && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingBottom: '4px' }}>
                {[
                  'Best saunas in Dublin 🔥',
                  'Cold plunge near me 🧊',
                  'Sauna under £20 in London',
                  'Hot springs in Iceland ♨️',
                  'Seaweed baths in Ireland 🌿',
                ].map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '20px',
                      border: '1.5px solid #FF5A5F',
                      background: 'transparent',
                      color: '#FF5A5F',
                      fontSize: '12px',
                      fontFamily: 'inherit',
                      cursor: 'pointer',
                      lineHeight: 1.3,
                      transition: 'background 0.15s, color 0.15s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = '#FF5A5F';
                      (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                      (e.currentTarget as HTMLButtonElement).style.color = '#FF5A5F';
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
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
              placeholder="Ask anything — location, budget, type..."
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
              onClick={() => sendMessage()}
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
        @keyframes thermaePulse {
          0%, 85%, 100% { transform: scale(1); box-shadow: 0 4px 16px rgba(255,90,95,0.4); }
          90%            { transform: scale(1.07); box-shadow: 0 6px 22px rgba(255,90,95,0.55); }
          95%            { transform: scale(1.03); box-shadow: 0 5px 18px rgba(255,90,95,0.45); }
        }
        @media (max-width: 440px) {
          .wellness-panel { width: calc(100vw - 32px) !important; right: 16px !important; }
        }
      `}</style>
    </>
  );
}
