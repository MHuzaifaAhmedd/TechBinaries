"use client";

import {
  Dispatch,
  InputHTMLAttributes,
  KeyboardEvent,
  RefObject,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { CountryCode } from "libphonenumber-js/min";
import { MARKETING_BUDGET_OPTIONS } from "@/lib/marketing-budget-ranges";
import { ChallengePayload, HeroMenuValue, ServiceControls } from "./CsdHeroLeadForm.types";
import { CsdPhoneCountrySelect } from "./CsdPhoneCountrySelect";

type TextInputFieldProps = {
  label: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
};

function TextInputField({ label, inputProps }: TextInputFieldProps) {
  return (
    <label className="csd-hero-form-field">
      <span>{label}</span>
      <input {...inputProps} />
    </label>
  );
}

type NameFieldsProps = {
  firstName: string;
  lastName: string;
  onFirstNameChange: Dispatch<SetStateAction<string>>;
  onLastNameChange: Dispatch<SetStateAction<string>>;
};

export function NameFields({ firstName, lastName, onFirstNameChange, onLastNameChange }: NameFieldsProps) {
  return (
    <div className="csd-hero-form-grid">
      <TextInputField
        label="First Name"
        inputProps={{
          type: "text",
          name: "firstName",
          placeholder: "First name",
          autoComplete: "given-name",
          required: true,
          maxLength: 120,
          value: firstName,
          onChange: (event) => onFirstNameChange(event.target.value),
        }}
      />
      <TextInputField
        label="Last Name"
        inputProps={{
          type: "text",
          name: "lastName",
          placeholder: "Last name",
          autoComplete: "family-name",
          required: true,
          maxLength: 120,
          value: lastName,
          onChange: (event) => onLastNameChange(event.target.value),
        }}
      />
    </div>
  );
}

type ContactFieldsProps = {
  phoneCountryIso2: CountryCode | null;
  phoneNational: string;
  workEmail: string;
  phoneValidationMessage: string;
  onPhoneCountryChange: (nextIso2: CountryCode, nextDialCode: string) => void;
  onPhoneNationalChange: Dispatch<SetStateAction<string>>;
  onWorkEmailChange: Dispatch<SetStateAction<string>>;
};

export function ContactFields({
  phoneCountryIso2,
  phoneNational,
  workEmail,
  phoneValidationMessage,
  onPhoneCountryChange,
  onPhoneNationalChange,
  onWorkEmailChange,
}: ContactFieldsProps) {
  return (
    <div className="csd-hero-form-grid">
      <label className="csd-hero-form-field csd-hero-form-field--phone">
        <span>Contact Number</span>
        <div className="csd-hero-phone-row">
          <CsdPhoneCountrySelect valueIso2={phoneCountryIso2} onChange={onPhoneCountryChange} />
          <span className="csd-hero-phone-sep" aria-hidden />
          <input
            className="csd-hero-phone-num"
            type="tel"
            name="phoneNational"
            placeholder="Enter Your Number*"
            autoComplete="tel-national"
            aria-label="Phone number"
            required
            maxLength={32}
            value={phoneNational}
            onChange={(event) => onPhoneNationalChange(event.target.value)}
          />
        </div>
        {phoneValidationMessage ? <p className="csd-hero-form-note csd-hero-form-note--error">{phoneValidationMessage}</p> : null}
      </label>
      <TextInputField
        label="Work Email"
        inputProps={{
          type: "email",
          placeholder: "Enter your email address",
          required: true,
          maxLength: 254,
          value: workEmail,
          onChange: (event) => onWorkEmailChange(event.target.value),
        }}
      />
    </div>
  );
}

type BudgetFieldProps = {
  budgetRange: string;
  onChange: (value: string) => void;
};

export function BudgetField({ budgetRange, onChange }: BudgetFieldProps) {
  const budgetTriggerRef = useRef<HTMLButtonElement | null>(null);
  const budgetMenuRef = useRef<HTMLDivElement | null>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [budgetMenuBox, setBudgetMenuBox] = useState<{
    top: number;
    left: number;
    width: number;
    maxHeight: number;
  } | null>(null);

  useEffect(() => {
    if (!budgetOpen) return;
    const trigger = budgetTriggerRef.current;
    if (!trigger) return;

    const updateMenuBox = () => {
      const rect = trigger.getBoundingClientRect();
      const gutter = 8;
      const viewportHeight = window.innerHeight;
      const availableBelow = Math.max(140, viewportHeight - rect.bottom - gutter);
      setBudgetMenuBox({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
        maxHeight: Math.min(260, availableBelow),
      });
    };

    updateMenuBox();
    const onDown = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return;
      if (budgetTriggerRef.current?.contains(event.target)) return;
      if (budgetMenuRef.current?.contains(event.target)) return;
      setBudgetOpen(false);
    };
    const onScrollOrResize = () => updateMenuBox();
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("scroll", onScrollOrResize, true);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize, true);
    };
  }, [budgetOpen]);

  useEffect(() => {
    if (!budgetOpen) return;
    const timer = setTimeout(() => budgetMenuRef.current?.focus(), 0);
    return () => clearTimeout(timer);
  }, [budgetOpen]);

  useEffect(() => {
    if (!budgetOpen) return;
    const clampedIndex = Math.min(activeIndex, Math.max(MARKETING_BUDGET_OPTIONS.length - 1, 0));
    optionRefs.current[clampedIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, budgetOpen]);

  const selectedBudgetLabel = useMemo(
    () => MARKETING_BUDGET_OPTIONS.find((option) => option.value === budgetRange)?.label ?? budgetRange,
    [budgetRange],
  );

  const closeMenu = () => {
    setBudgetOpen(false);
    setBudgetMenuBox(null);
    budgetTriggerRef.current?.focus();
  };

  const openMenu = () => {
    const selectedIndex = Math.max(
      0,
      MARKETING_BUDGET_OPTIONS.findIndex((option) => option.value === budgetRange),
    );
    setActiveIndex(selectedIndex);
    setBudgetOpen(true);
  };

  const selectBudget = (index: number) => {
    const option = MARKETING_BUDGET_OPTIONS[index];
    if (!option) return;
    onChange(option.value);
    closeMenu();
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape" && budgetOpen) {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!budgetOpen) openMenu();
    }
  };

  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, MARKETING_BUDGET_OPTIONS.length - 1));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectBudget(activeIndex);
    }
  };

  return (
    <div className="csd-hero-form-field">
      <span>Budget Range</span>
      <div className="csd-hero-service-dd">
        <input type="hidden" name="budgetRange" value={budgetRange} required />
        <button
          ref={budgetTriggerRef}
          type="button"
          className={`csd-hero-service-dd-trigger${budgetRange ? "" : " csd-hero-service-dd-trigger--placeholder"}`}
          aria-haspopup="listbox"
          aria-expanded={budgetOpen}
          aria-label="Budget range"
          onClick={() => (budgetOpen ? closeMenu() : openMenu())}
          onKeyDown={onTriggerKeyDown}
        >
          <span className="csd-hero-service-dd-value">
            {budgetRange ? selectedBudgetLabel : "Select a budget range"}
          </span>
          <span
            className={`csd-hero-service-dd-chevron${budgetOpen ? " csd-hero-service-dd-chevron--open" : ""}`}
            aria-hidden
          />
        </button>
      </div>
      {budgetOpen && budgetMenuBox && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={budgetMenuRef}
              className="csd-hero-service-dd-menu"
              role="listbox"
              aria-label="Budget range options"
              tabIndex={-1}
              onKeyDown={onMenuKeyDown}
              data-lenis-prevent
              data-lenis-prevent-wheel
              data-lenis-prevent-touch
              onWheel={(event) => event.stopPropagation()}
              style={{
                position: "fixed",
                top: budgetMenuBox.top,
                left: budgetMenuBox.left,
                width: budgetMenuBox.width,
                maxHeight: budgetMenuBox.maxHeight,
                zIndex: 10050,
              }}
            >
              {MARKETING_BUDGET_OPTIONS.map((option, index) => (
                <button
                  ref={(node) => {
                    optionRefs.current[index] = node;
                  }}
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={budgetRange === option.value}
                  className={`csd-hero-service-dd-option${index === activeIndex ? " csd-hero-service-dd-option--active" : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectBudget(index)}
                >
                  {option.label}
                </button>
              ))}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

type ServiceFieldProps = {
  heroService: HeroMenuValue | null;
  heroServiceOpen: boolean;
  heroServiceBtnRef: RefObject<HTMLButtonElement | null>;
  openHeroServiceMenu: () => void;
  closeHeroServiceMenu: () => void;
  serviceControls: ServiceControls;
};

export function ServiceField({
  heroService,
  heroServiceOpen,
  heroServiceBtnRef,
  openHeroServiceMenu,
  closeHeroServiceMenu,
  serviceControls,
}: ServiceFieldProps) {
  return (
    <div className="csd-hero-form-field">
      <span>Services</span>
      <div className="csd-hero-service-dd">
        <input type="hidden" name="serviceInterest" value={heroService?.href ?? ""} />
        <button
          ref={heroServiceBtnRef}
          type="button"
          className={`csd-hero-service-dd-trigger${heroService ? "" : " csd-hero-service-dd-trigger--placeholder"}`}
          aria-expanded={heroServiceOpen}
          aria-haspopup="listbox"
          aria-controls={serviceControls.listboxId}
          id={serviceControls.triggerId}
          aria-label="Service you are interested in"
          onClick={() => (heroServiceOpen ? closeHeroServiceMenu() : openHeroServiceMenu())}
        >
          <span className="csd-hero-service-dd-value">{heroService ? heroService.label : "Select a service"}</span>
          <span
            className={`csd-hero-service-dd-chevron${heroServiceOpen ? " csd-hero-service-dd-chevron--open" : ""}`}
            aria-hidden
          />
        </button>
      </div>
    </div>
  );
}

type CaptchaFooterProps = {
  challenge: ChallengePayload | null;
  loadingChallenge: boolean;
  hasLoadedChallengeOnce: boolean;
  captchaAnswer: string;
  onCaptchaAnswerChange: Dispatch<SetStateAction<string>>;
  refreshIconRef: RefObject<SVGSVGElement | null>;
  onRefresh: () => void;
  submitting: boolean;
};

export function CaptchaFooter({
  challenge,
  loadingChallenge,
  hasLoadedChallengeOnce,
  captchaAnswer,
  onCaptchaAnswerChange,
  refreshIconRef,
  onRefresh,
  submitting,
}: CaptchaFooterProps) {
  return (
    <div className="csd-hero-form-foot">
      <div className="csd-hero-form-captcha">
        <span>
          {challenge?.challengeText ?? (loadingChallenge && !hasLoadedChallengeOnce ? "Loading..." : "Captcha unavailable")}
        </span>
        <input
          type="text"
          inputMode="numeric"
          aria-label="Captcha answer"
          required
          value={captchaAnswer}
          onChange={(event) => onCaptchaAnswerChange(event.target.value)}
          disabled={loadingChallenge || !challenge}
        />
        <button
          type="button"
          onClick={onRefresh}
          aria-label="Refresh captcha challenge"
          title="Refresh captcha challenge"
          style={{
            border: "none",
            background: "transparent",
            padding: 0,
            width: 24,
            height: 24,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#ffffff",
          }}
        >
          <svg ref={refreshIconRef} aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 12a8 8 0 1 1-2.34-5.66M20 4v6h-6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <button type="submit" className="csd-hero-form-submit" disabled={submitting || loadingChallenge || !challenge}>
        {submitting ? "Submitting..." : "Schedule a Technical Consultation"}
      </button>
    </div>
  );
}
