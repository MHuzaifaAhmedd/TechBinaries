"use client";

import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CountryCode } from "libphonenumber-js/min";
import { PHONE_COUNTRY_OPTIONS } from "@/lib/phone-country-options";

type Props = {
  valueIso2: CountryCode | null;
  onChange: (nextIso2: CountryCode, nextDialCode: string) => void;
  label?: string;
};

function normalizeSearch(value: string): string {
  return value.trim().toLowerCase();
}

function CountryFlag({ emojiFlag }: { emojiFlag: string }) {
  return (
    <span className="csd-hero-phone-flag" aria-hidden>
      {emojiFlag}
    </span>
  );
}

export function CsdPhoneCountrySelect({ valueIso2, onChange, label = "Country calling code" }: Props) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuBox, setMenuBox] = useState<{
    top: number;
    left: number;
    width: number;
    maxHeight: number;
  } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedCountry = useMemo(
    () => PHONE_COUNTRY_OPTIONS.find((option) => option.iso2 === valueIso2) ?? null,
    [valueIso2],
  );

  const filteredOptions = useMemo(() => {
    const q = normalizeSearch(query);
    if (!q) return PHONE_COUNTRY_OPTIONS;
    return PHONE_COUNTRY_OPTIONS.filter((option) => {
      const haystack = `${option.countryName} ${option.dialCode} ${option.iso2}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    if (!trigger) return;

    const updateMenuBox = () => {
      const rect = trigger.getBoundingClientRect();
      const gutter = 8;
      const viewportHeight = window.innerHeight;
      const availableBelow = Math.max(180, viewportHeight - rect.bottom - gutter);
      setMenuBox({
        top: rect.bottom + 4,
        left: rect.left,
        width: Math.min(320, Math.max(rect.width, 240)),
        maxHeight: Math.min(340, availableBelow),
      });
    };

    updateMenuBox();
    const onDown = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return;
      if (triggerRef.current?.contains(event.target)) return;
      if (menuRef.current?.contains(event.target)) return;
      setOpen(false);
    };

    const onResizeOrScroll = () => updateMenuBox();
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("resize", onResizeOrScroll);
    window.addEventListener("scroll", onResizeOrScroll, true);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", onResizeOrScroll);
      window.removeEventListener("scroll", onResizeOrScroll, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => searchInputRef.current?.focus(), 0);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const clampedIndex = Math.min(activeIndex, Math.max(filteredOptions.length - 1, 0));
    optionRefs.current[clampedIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, filteredOptions, open]);

  const openMenu = () => {
    setQuery("");
    const selectedIndex = Math.max(
      0,
      PHONE_COUNTRY_OPTIONS.findIndex((option) => option.iso2 === valueIso2),
    );
    setActiveIndex(selectedIndex);
    setOpen(true);
  };

  const closeMenu = () => {
    setOpen(false);
    setMenuBox(null);
    triggerRef.current?.focus();
  };

  const choose = (index: number) => {
    const option = filteredOptions[index];
    if (!option) return;
    onChange(option.iso2, option.dialCode);
    closeMenu();
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!open) openMenu();
    }
  };

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, Math.max(filteredOptions.length - 1, 0)));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      choose(activeIndex);
    }
  };

  return (
    <div className="csd-hero-service-dd csd-hero-phone-cc-dd">
      <button
        ref={triggerRef}
        type="button"
        className={`csd-hero-service-dd-trigger csd-hero-phone-cc-trigger${selectedCountry ? "" : " csd-hero-service-dd-trigger--placeholder"}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={onTriggerKeyDown}
      >
        {selectedCountry ? (
          <span className="csd-hero-phone-cc-value">
            <CountryFlag emojiFlag={selectedCountry.emojiFlag} />
            <span>{selectedCountry.dialCode}</span>
          </span>
        ) : (
          <span className="csd-hero-phone-cc-value">Select code</span>
        )}
        <span className={`csd-hero-service-dd-chevron${open ? " csd-hero-service-dd-chevron--open" : ""}`} aria-hidden />
      </button>
      <input type="hidden" name="countryCode" value={selectedCountry?.dialCode ?? ""} />
      <input type="hidden" name="phoneCountryIso2" value={selectedCountry?.iso2 ?? ""} />
      {open && menuBox && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={menuRef}
              className="csd-hero-service-dd-menu csd-hero-phone-menu"
              role="listbox"
              aria-label="Country calling code options"
              data-lenis-prevent
              data-lenis-prevent-wheel
              data-lenis-prevent-touch
              style={{
                position: "fixed",
                top: menuBox.top,
                left: menuBox.left,
                width: menuBox.width,
                maxHeight: menuBox.maxHeight,
                zIndex: 10050,
              }}
            >
              <div className="csd-hero-phone-search-wrap">
                <input
                  ref={searchInputRef}
                  className="csd-hero-phone-search-input"
                  type="text"
                  placeholder="Search country or code"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={onSearchKeyDown}
                  aria-label="Search countries"
                />
              </div>
              <div
                className="csd-hero-phone-menu-list"
                data-lenis-prevent
                data-lenis-prevent-wheel
                data-lenis-prevent-touch
              >
                {filteredOptions.length === 0 ? (
                  <div className="csd-hero-phone-empty">No countries found.</div>
                ) : (
                  filteredOptions.map((option, index) => (
                    <button
                      ref={(node) => {
                        optionRefs.current[index] = node;
                      }}
                      key={option.iso2}
                      type="button"
                      role="option"
                      aria-selected={valueIso2 === option.iso2}
                      className={`csd-hero-service-dd-option${index === activeIndex ? " csd-hero-service-dd-option--active" : ""}`}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => choose(index)}
                    >
                      <span className="csd-hero-phone-cc-option">
                        <CountryFlag emojiFlag={option.emojiFlag} />
                        <span>{option.dialCode}</span>
                        <span className="csd-hero-phone-cc-country">{option.countryName}</span>
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
