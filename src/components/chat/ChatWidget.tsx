"use client";

import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MarkdownMessage from "./MarkdownMessage";

const SUGGESTIONS = [
  "What services do you offer?",
  "Tell me about digital marketing & SEO",
  "How does the Money-Making System work?",
  "How can I get a custom quote?",
];

// Sleek modern AI Chat & Sparkle Icons (Replacing WhatsApp-like icon)
function ModernChatIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M12 8v2" strokeWidth={2} />
      <path d="M12 14h.01" strokeWidth={2.5} />
    </svg>
  );
}

function CloseIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 2L11 13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

export default function ChatWidget() {
  // Always open on page load as requested by user
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // useChat options in AI SDK v7 accepts `messages` and defaults to `/api/chat` transport
  const { messages, sendMessage, status } = useChat({
    messages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Welcome to Sathya Enterprises! I'm your AI assistant for our connected business ecosystem. How can I assist you with our services or growth solutions today?",
          },
        ],
      },
    ],
  });

  const isLoading = status === "streaming" || status === "submitted";

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 400);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const submit = (text: string) => {
    if (!text.trim() || isLoading) return;
    setShowSuggestions(false);
    sendMessage({ text });
    setInput("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(input);
  };

  const handleSuggestion = (text: string) => {
    submit(text);
  };

  // Safely extract text from typed parts in AI SDK v7 UIMessage
  const getMessageText = (msg: UIMessage): string => {
    if (!msg.parts || !Array.isArray(msg.parts)) return "";
    return msg.parts
      .filter((p) => p.type === "text")
      .map((p) => (p as { text: string }).text)
      .join("");
  };

  return (
    <>
      {/* Chat window */}
      <div
        className="chat-window"
        data-open={open ? "true" : "false"}
        role="dialog"
        aria-label="Chat with Sathya AI"
        aria-modal="true"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header__info">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-amber-400/40 bg-zinc-900 shrink-0 flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Sathya Enterprises Emblem"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <p className="chat-header__name flex items-center gap-1">
                <span>Sathya AI Assistant</span>
              </p>
              <p className="chat-header__status flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Online · Always Available</span>
              </p>
            </div>
          </div>
          <button
            className="chat-close"
            onClick={() => setOpen(false)}
            aria-label="Minimize chat"
            title="Minimize chat"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Messages */}
        <div
          className="chat-messages"
          role="log"
          aria-live="polite"
          aria-label="Conversation history"
        >
          {messages.map((msg) => {
            const text = getMessageText(msg);
            if (!text) return null;
            return (
              <div
                key={msg.id}
                className={`chat-bubble ${
                  msg.role === "assistant"
                    ? "chat-bubble--ai"
                    : "chat-bubble--user"
                }`}
              >
                {msg.role === "assistant" ? (
                  <MarkdownMessage content={text} />
                ) : (
                  <span>{text}</span>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div
              className="chat-bubble chat-bubble--typing"
              aria-label="Sathya AI is thinking…"
            >
              <span className="chat-dot" />
              <span className="chat-dot" />
              <span className="chat-dot" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick suggestions */}
        {showSuggestions && messages.length <= 1 && (
          <div
            className="chat-suggestions"
            role="group"
            aria-label="Suggested topics"
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                className="chat-suggestion"
                onClick={() => handleSuggestion(s)}
                type="button"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input form */}
        <form className="chat-form" onSubmit={handleFormSubmit}>
          <input
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about digital, tech, or services…"
            aria-label="Chat input message"
            disabled={isLoading}
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit(input);
              }
            }}
          />
          <button
            type="submit"
            className="chat-send"
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
            title="Send"
          >
            <SendIcon />
          </button>
        </form>
      </div>

      {/* Floating Chat Trigger Button */}
      <button
        className="chat-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat window" : "Open Sathya AI Chatbot"}
        aria-expanded={open}
        title={open ? "Close Chat" : "Talk with Sathya AI"}
      >
        {open ? <CloseIcon size={22} /> : <ModernChatIcon size={24} />}
      </button>
    </>
  );
}
