"use client";

import Image from "next/image";
import { FormEvent, KeyboardEvent as ReactKeyboardEvent, WheelEvent, useEffect, useMemo, useRef, useState } from "react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type LeadFormState = {
  name: string;
  email: string;
  phone: string;
};

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hey! I’m Binexa 👋 I help people figure out if Tech Binaries is the right fit for what they’re building or working on. What brings you here today?",
};

const starterPrompts = [
  "I want to build a SaaS MVP",
  "What services do you offer?",
  "I need a mobile app",
  "Talk to an expert",
];

function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getSessionId(): string {
  const storageKey = "techbinaries-chat-session";
  const existing = window.sessionStorage.getItem(storageKey);

  if (existing) return existing;

  const created = createId("session");
  window.sessionStorage.setItem(storageKey, created);
  return created;
}

function getApiUrl(): string {
  if (process.env.NEXT_PUBLIC_AI_CHATBOT_API_URL) {
    return process.env.NEXT_PUBLIC_AI_CHATBOT_API_URL;
  }

  if (window.location.hostname === "localhost") {
    return "http://localhost:8008/api/chat";
  }

  return "/api/chat";
}

function getLeadCaptureApiUrl(): string {
  const base = getApiUrl();
  return base.endsWith("/api/chat") ? `${base}/capture-lead` : "/api/chat/capture-lead";
}

function shouldShowLeadForm(content: string): boolean {
  return /(what'?s your name|may i have your name|share your email|email address|best email|right person from our team follows up)/i.test(
    content
  );
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [leadForm, setLeadForm] = useState<LeadFormState>({ name: "", email: "", phone: "" });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const sessionIdRef = useRef<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const apiUrl = useMemo(() => (typeof window === "undefined" ? "/api/chat" : getApiUrl()), []);
  const leadCaptureApiUrl = useMemo(
    () => (typeof window === "undefined" ? "/api/chat/capture-lead" : getLeadCaptureApiUrl()),
    []
  );

  useEffect(() => {
    sessionIdRef.current = getSessionId();
  }, []);

  useEffect(() => {
    function handleEscapeClose(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscapeClose);
    return () => window.removeEventListener("keydown", handleEscapeClose);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isSending]);

  // Lock background page scroll while the chat is open on phones so the
  // full-screen overlay does not fight the page scroll on Android/iOS.
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousTouchAction = body.style.touchAction;

    function applyLock() {
      if (isOpen && mediaQuery.matches) {
        body.style.overflow = "hidden";
        body.style.touchAction = "none";
      } else {
        body.style.overflow = previousOverflow;
        body.style.touchAction = previousTouchAction;
      }
    }

    applyLock();
    mediaQuery.addEventListener("change", applyLock);

    return () => {
      mediaQuery.removeEventListener("change", applyLock);
      body.style.overflow = previousOverflow;
      body.style.touchAction = previousTouchAction;
    };
  }, [isOpen]);

  async function sendMessage(nextContent: string) {
    const content = nextContent.trim();
    if (!content || isSending) return;

    const userMessage: ChatMessage = {
      id: createId("user"),
      role: "user",
      content,
    };
    const assistantMessage: ChatMessage = {
      id: createId("assistant"),
      role: "assistant",
      content: "",
    };
    const nextMessages = [...messages, userMessage, assistantMessage];

    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsSending(true);
    setShowLeadForm(false);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionIdRef.current,
          messages: nextMessages
            .filter((message) => message.id !== "welcome" && message.content.trim().length > 0)
            .slice(-16)
            .map((message) => ({ role: message.role, content: message.content })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("The assistant is unavailable right now.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantMessage.id
              ? { ...message, content: `${message.content}${chunk}` }
              : message
          )
        );
      }
      if (shouldShowLeadForm(assistantContent) && !leadCaptured) {
        setShowLeadForm(true);
      }
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Something went wrong.");
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantMessage.id
            ? {
                ...message,
                content:
                  "Sorry, I could not reach the chatbot service. Please try again or contact TechBinaries directly.",
              }
            : message
        )
      );
    } finally {
      setIsSending(false);
      textareaRef.current?.focus();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  async function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmittingLead) return;
    const name = leadForm.name.trim();
    const email = leadForm.email.trim();
    const phone = leadForm.phone.trim();
    if (!name || !email || !phone) {
      setError("Please fill name, email, and phone number.");
      return;
    }

    setError("");
    setIsSubmittingLead(true);
    try {
      const response = await fetch(leadCaptureApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionIdRef.current,
          name,
          email,
          phone,
          messages: messages
            .filter((message) => message.id !== "welcome" && message.content.trim().length > 0)
            .slice(-16)
            .map((message) => ({ role: message.role, content: message.content })),
        }),
      });

      if (!response.ok) {
        let errorMessage = "Could not submit lead details. Please try again.";
        try {
          const data = (await response.json()) as { detail?: string; message?: string };
          errorMessage = data.detail || data.message || errorMessage;
        } catch {
          // Keep default message when response is not JSON.
        }
        throw new Error(errorMessage);
      }

      setLeadCaptured(true);
      setShowLeadForm(false);
      setLeadForm({ name: "", email: "", phone: "" });
      setMessages((current) => [
        ...current,
        {
          id: createId("assistant"),
          role: "assistant",
          content:
            "Perfect — your details are received and shared with our team. You will hear back soon with something tailored to your project.",
        },
      ]);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Something went wrong.");
    } finally {
      setIsSubmittingLead(false);
    }
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  }

  function handleMessagesWheel(event: WheelEvent<HTMLDivElement>) {
    const container = scrollRef.current;
    if (!container) return;

    const deltaY = event.deltaY;
    const atTop = container.scrollTop <= 0;
    const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 1;

    if ((deltaY < 0 && atTop) || (deltaY > 0 && atBottom)) {
      event.preventDefault();
    }

    event.stopPropagation();
  }

  return (
    <div className={`tb-chat ${isOpen ? "tb-chat--open" : ""}`}>
      <button
        className="tb-chat__launcher"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="techbinaries-chat-panel"
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        <span className="tb-chat__launcher-orb" aria-hidden="true">
          <Image
            className="tb-chat__launcher-logo"
            src="/images/AI-Bot/ai-logo.webp"
            alt=""
            width={32}
            height={32}
            sizes="32px"
            priority
          />
        </span>
      </button>

      <section
        className="tb-chat__panel"
        id="techbinaries-chat-panel"
        aria-label="TechBinaries AI chat"
        aria-hidden={!isOpen}
      >
          <header className="tb-chat__header">
            <img
              className="tb-chat__header-logo"
              src="/images/AI-Bot/chat-widget-header-cropped.png"
              alt="TechBinaries"
              width={220}
              height={40}
              loading="lazy"
              decoding="async"
            />
            <button className="tb-chat__close" type="button" onClick={() => setIsOpen(false)} aria-label="Close chat">
              ×
            </button>
          </header>

          <div className="tb-chat__messages" ref={scrollRef} onWheel={handleMessagesWheel}>
            {messages.map((message) => (
              <article
                className={`tb-chat__message tb-chat__message--${message.role}`}
                key={message.id}
                aria-live={message.role === "assistant" ? "polite" : undefined}
              >
                <span className="tb-chat__message-label">
                  {message.role === "assistant" ? "TechBinaries" : "You"}
                </span>
                <p>{message.content || "Thinking..."}</p>
              </article>
            ))}
          </div>

          {messages.length <= 1 ? (
            <div className="tb-chat__starters" aria-label="Suggested prompts">
              {starterPrompts.map((prompt) => (
                <button type="button" key={prompt} onClick={() => void sendMessage(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
          ) : null}

          {error ? <p className="tb-chat__error">{error}</p> : null}

          {showLeadForm && !leadCaptured ? (
            <form className="tb-chat__form tb-chat__lead-form" onSubmit={handleLeadSubmit}>
              <input
                type="text"
                value={leadForm.name}
                onChange={(event) => setLeadForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Your name"
                autoComplete="name"
                disabled={isSubmittingLead}
              />
              <input
                type="email"
                value={leadForm.email}
                onChange={(event) => setLeadForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="Your email"
                autoComplete="email"
                disabled={isSubmittingLead}
              />
              <input
                type="tel"
                value={leadForm.phone}
                onChange={(event) => setLeadForm((current) => ({ ...current, phone: event.target.value }))}
                placeholder="Phone number"
                autoComplete="tel"
                disabled={isSubmittingLead}
              />
              <button type="submit" className="tb-chat__lead-submit" disabled={isSubmittingLead}>
                {isSubmittingLead ? "Submitting..." : "Submit details"}
              </button>
            </form>
          ) : (
            <form className="tb-chat__form" onSubmit={handleSubmit}>
              <div className="tb-chat__composer">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message..."
                  rows={2}
                  disabled={false}
                />

                <div className="tb-chat__composer-bottom">
                  <div className="tb-chat__composer-tools" aria-label="Composer tools">
                    <button type="button" className="tb-chat__tool-btn" disabled aria-label="Attach file (coming soon)">
                      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                        <path
                          d="M21.44 11.05l-8.49 8.49a6 6 0 01-8.49-8.49l8.49-8.49a4 4 0 115.66 5.66l-8.5 8.49a2 2 0 11-2.82-2.83l7.78-7.78"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button type="button" className="tb-chat__tool-btn" disabled aria-label="Emoji (coming soon)">
                      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
                        <circle cx="9" cy="10" r="1" fill="currentColor" />
                        <circle cx="15" cy="10" r="1" fill="currentColor" />
                        <path d="M8 14.5c1 1.6 2.4 2.5 4 2.5s3-.9 4-2.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </button>
                    <button type="button" className="tb-chat__tool-btn tb-chat__tool-btn--gif" disabled aria-label="GIF (coming soon)">
                      GIF
                    </button>
                    <button type="button" className="tb-chat__tool-btn" disabled aria-label="Voice (coming soon)">
                      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                        <rect x="9" y="3.5" width="6" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M6.5 11.5a5.5 5.5 0 0011 0M12 17v3.5M9.5 20.5h5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  <button className="tb-chat__send-pill" type="submit" disabled={isSending || input.trim().length === 0} aria-label="Send message">
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          )}
      </section>
    </div>
  );
}
