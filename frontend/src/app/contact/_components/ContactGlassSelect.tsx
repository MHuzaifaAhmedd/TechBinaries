"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

export type ContactGlassOption = { readonly value: string; readonly label: string };

type Props = {
  options: readonly ContactGlassOption[];
  value: string;
  onChange: (value: string) => void;
  fieldLabel: string;
  placeholder: string;
  resolveDisplayLabel: (value: string) => string;
};

export function ContactGlassSelect({
  options,
  value,
  onChange,
  fieldLabel,
  placeholder,
  resolveDisplayLabel,
}: Props) {
  const listboxId = useId();
  const labelId = `${listboxId}-label`;
  const triggerId = `${listboxId}-trigger`;
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);

  const displayLabel = value ? resolveDisplayLabel(value) : "";

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const optionCount = options.length;

  useEffect(() => {
    if (!open) return;

    const onDocPointer = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el || el.contains(e.target as Node)) return;
      close();
    };

    document.addEventListener("pointerdown", onDocPointer, true);
    return () => document.removeEventListener("pointerdown", onDocPointer, true);
  }, [open, close]);

  useEffect(() => {
    if (!open || optionCount === 0) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        triggerRef.current?.focus();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlight((h) => Math.min(h + 1, optionCount - 1));
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlight((h) => Math.max(h - 1, 0));
        return;
      }

      if (e.key === "Home") {
        e.preventDefault();
        setHighlight(0);
        return;
      }

      if (e.key === "End") {
        e.preventDefault();
        setHighlight(optionCount - 1);
        return;
      }

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const opt = options[highlight];
        if (opt) {
          onChange(opt.value);
          close();
          triggerRef.current?.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, highlight, onChange, close, options, optionCount]);

  return (
    <div className="contact-field contact-field--select">
      <div className="contact-budget-dd" ref={containerRef}>
        <button
          ref={triggerRef}
          id={triggerId}
          type="button"
          className={`contact-budget-dd-trigger${displayLabel ? "" : " contact-budget-dd-trigger--placeholder"}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-labelledby={labelId}
          onClick={() => {
            if (open) {
              close();
            } else {
              const idx = options.findIndex((o) => o.value === value);
              setHighlight(idx >= 0 ? idx : 0);
              setOpen(true);
            }
          }}
        >
          <span className="contact-budget-dd-value">{displayLabel || placeholder}</span>
          <span className={`contact-budget-dd-chevron${open ? " contact-budget-dd-chevron--open" : ""}`} aria-hidden />
        </button>

        {open ? (
          <ul
            id={listboxId}
            role="listbox"
            aria-labelledby={labelId}
            className="contact-budget-dd-menu"
            tabIndex={-1}
          >
            {options.map((opt, i) => (
              <li key={opt.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={value === opt.value}
                  className={`contact-budget-dd-option${highlight === i ? " contact-budget-dd-option--highlight" : ""}`}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => {
                    onChange(opt.value);
                    close();
                    triggerRef.current?.focus();
                  }}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <span id={labelId}>{fieldLabel}</span>
    </div>
  );
}
