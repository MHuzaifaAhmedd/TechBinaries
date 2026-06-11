"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

const LAYOUT_ID = "footer-dispatch-subscribe-form";

const LAYOUT_SPRING = {
  type: "spring" as const,
  stiffness: 260,
  damping: 30,
  mass: 0.92,
};

const OVERLAY_TRANSITION = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

const FORM_STYLE: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  border: "1px solid rgba(10,10,10,0.16)",
  borderRadius: 999,
  padding: "7px 7px 7px 16px",
  background: "rgba(10,10,10,0.025)",
  transition: "border-color 0.25s, background 0.25s",
  boxSizing: "border-box",
};

const INPUT_STYLE: React.CSSProperties = {
  flex: 1,
  border: "none",
  background: "transparent",
  outline: "none",
  color: "#0a0a0a",
  fontSize: 14,
  fontFamily: "var(--font-body)",
  minWidth: 0,
};

const ELEVATED_INPUT_STYLE: React.CSSProperties = {
  flex: 1,
  border: "none",
  background: "transparent",
  outline: "none",
  minWidth: 0,
  color: "#ffffff",
  fontSize: 16,
  fontWeight: 700,
  fontFamily: "var(--font-body)",
  caretColor: "#ffffff",
  letterSpacing: "0.01em",
  WebkitTextFillColor: "#ffffff",
};

const BUTTON_STYLE: React.CSSProperties = {
  border: "none",
  borderRadius: 999,
  padding: "10px 16px",
  background: "#0a0a0a",
  color: "#fafaf9",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  transition: "transform 0.22s, background 0.22s",
  flexShrink: 0,
};

type FormMetrics = { width: number; height: number };

function openDispatchMailto(email: string) {
  const trimmed = email.trim();
  const body = trimmed
    ? `Please subscribe this email to The Dispatch:%0D%0A${encodeURIComponent(trimmed)}`
    : "Please subscribe me to The Dispatch.";
  window.location.href = `mailto:hello@techbinaries.com?subject=Subscribe%20to%20The%20Dispatch&body=${body}`;
}

type SubscribeFormProps = {
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  success: boolean;
  fixedWidth?: number;
  elevated?: boolean;
};

function SubscribeForm({
  email,
  onEmailChange,
  onSubmit,
  inputRef,
  success,
  fixedWidth,
  elevated = false,
  onInputFocus,
}: SubscribeFormProps & { onInputFocus?: () => void }) {
  return (
    <motion.form
      layoutId={LAYOUT_ID}
      className={
        elevated
          ? "footer-newsletter-form footer-newsletter-form--elevated"
          : "footer-newsletter-form"
      }
      onSubmit={onSubmit}
      transition={{ layout: LAYOUT_SPRING }}
      style={{
        ...FORM_STYLE,
        ...(fixedWidth ? { width: fixedWidth } : undefined),
      }}
    >
      <input
        ref={inputRef}
        type="email"
        name="email"
        required
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        onFocus={onInputFocus}
        placeholder="you@company.com"
        suppressHydrationWarning
        style={elevated ? ELEVATED_INPUT_STYLE : INPUT_STYLE}
        className={elevated ? "footer-newsletter-input--elevated" : undefined}
        aria-label="Email for The Dispatch newsletter"
      />
      <button
        className="footer-newsletter-btn"
        type="submit"
        suppressHydrationWarning
        style={{
          ...BUTTON_STYLE,
          ...(success ? { background: "#166534" } : {}),
        }}
        aria-live="polite"
      >
        {success ? "Subscribed ✓" : "Subscribe →"}
      </button>
    </motion.form>
  );
}

export default function FooterNewsletterForm() {
  const [email, setEmail] = useState("");
  const [elevated, setElevated] = useState(false);
  const [success, setSuccess] = useState(false);
  const [metrics, setMetrics] = useState<FormMetrics | null>(null);
  const [mounted, setMounted] = useState(false);

  const anchorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (returnTimerRef.current) clearTimeout(returnTimerRef.current);
    };
  }, []);

  const dismiss = useCallback(() => {
    if (returnTimerRef.current) clearTimeout(returnTimerRef.current);
    setElevated(false);
    setSuccess(false);
    setEmail("");
    setMetrics(null);
  }, []);

  const measureForm = useCallback((): FormMetrics | null => {
    const formEl = anchorRef.current?.querySelector(
      ".footer-newsletter-form",
    ) as HTMLElement | null;
    if (!formEl) return null;
    return { width: formEl.offsetWidth, height: formEl.offsetHeight };
  }, []);

  const elevateForm = useCallback(() => {
    if (elevated) return;
    const nextMetrics = measureForm();
    if (nextMetrics) setMetrics(nextMetrics);
    setElevated(true);
  }, [elevated, measureForm]);

  const handleEmailChange = (value: string) => {
    setEmail(value);

    if (!elevated && value.length > 0) {
      elevateForm();
      return;
    }

    if (elevated && value.length === 0 && !success) {
      setElevated(false);
      setMetrics(null);
    }
  };

  const handleInputFocus = useCallback(() => {
    elevateForm();
  }, [elevateForm]);

  useEffect(() => {
    if (!elevated) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        dismiss();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [elevated, dismiss]);

  useEffect(() => {
    if (!elevated) return;
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [elevated]);

  useEffect(() => {
    if (!elevated) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [elevated]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (success) return;

    openDispatchMailto(email);
    setSuccess(true);

    returnTimerRef.current = setTimeout(() => {
      setSuccess(false);
      setElevated(false);
      setEmail("");
      setMetrics(null);
    }, 1800);
  };

  const sharedFormProps = {
    email,
    onEmailChange: handleEmailChange,
    onSubmit: handleSubmit,
    inputRef,
    success,
    fixedWidth: metrics?.width,
    onInputFocus: handleInputFocus,
  };

  return (
    <LayoutGroup id="dispatch-newsletter">
      <div ref={anchorRef} className="footer-newsletter-form-anchor">
        {elevated ? (
          <div
            aria-hidden
            style={{
              width: metrics?.width ?? "100%",
              height: metrics?.height ?? 48,
              flexShrink: 0,
            }}
          />
        ) : (
          <SubscribeForm {...sharedFormProps} />
        )}
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {elevated && (
              <>
                <motion.div
                  key="dispatch-overlay"
                  className="footer-newsletter-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={OVERLAY_TRANSITION}
                  aria-hidden
                />
                <div className="footer-newsletter-focus-layer">
                  <SubscribeForm {...sharedFormProps} elevated />
                </div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}

      <style>{`
        .footer-newsletter-form-anchor {
          width: 100%;
        }
        .footer-newsletter-overlay {
          position: fixed;
          inset: 0;
          z-index: 9998;
          background: rgba(8, 8, 8, 0.45);
          backdrop-filter: blur(40px) saturate(160%);
          -webkit-backdrop-filter: blur(40px) saturate(160%);
          pointer-events: none;
        }
        .footer-newsletter-focus-layer {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .footer-newsletter-focus-layer .footer-newsletter-form {
          pointer-events: auto;
        }
        .footer-newsletter-form--elevated {
          background: rgba(255, 255, 255, 0.14) !important;
          border-color: rgba(255, 255, 255, 0.32) !important;
          backdrop-filter: blur(64px) saturate(200%);
          -webkit-backdrop-filter: blur(64px) saturate(200%);
          box-shadow:
            0 16px 48px rgba(0, 0, 0, 0.38),
            inset 0 1px 0 rgba(255, 255, 255, 0.35),
            inset 0 -1px 0 rgba(255, 255, 255, 0.08);
          isolation: isolate;
        }
        .footer-newsletter-input--elevated {
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          font-size: 16px !important;
          font-weight: 700 !important;
          caret-color: #ffffff !important;
          text-shadow: 0 1px 12px rgba(0, 0, 0, 0.45);
        }
        .footer-newsletter-input--elevated::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
          -webkit-text-fill-color: rgba(255, 255, 255, 0.5) !important;
          font-weight: 600 !important;
          text-shadow: none;
        }
        .footer-newsletter-input--elevated:-webkit-autofill,
        .footer-newsletter-input--elevated:-webkit-autofill:hover,
        .footer-newsletter-input--elevated:-webkit-autofill:focus {
          -webkit-text-fill-color: #ffffff;
          transition: background-color 9999s ease-out 0s;
        }
      `}</style>
    </LayoutGroup>
  );
}
