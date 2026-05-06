"use client";

import { FormEvent, RefObject, useEffect, useRef, useState } from "react";
import { HERO_PHONE_COUNTRY_CODES } from "../_lib/csd-data";
import { MARKETING_BUDGET_OPTIONS } from "@/lib/marketing-budget-ranges";

type HeroMenuValue = {
  href: string;
  label: string;
};

type HeroMenuProps = {
  heroService: HeroMenuValue | null;
  heroServiceOpen: boolean;
  heroServiceBtnRef: RefObject<HTMLButtonElement | null>;
  openHeroServiceMenu: () => void;
  closeHeroServiceMenu: () => void;
};

type Props = {
  heroMenu: HeroMenuProps;
  serviceControls: {
    listboxId: string;
    triggerId: string;
  };
};

type ChallengePayload = {
  challengeId: string;
  challengeText: string;
  expiresAt: number;
};

export function CsdHeroLeadForm({ heroMenu, serviceControls }: Props) {
  const refreshIconRef = useRef<SVGSVGElement | null>(null);
  const refreshSpinTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+92");
  const [phoneNational, setPhoneNational] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [challenge, setChallenge] = useState<ChallengePayload | null>(null);
  const [loadingChallenge, setLoadingChallenge] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [hasLoadedChallengeOnce, setHasLoadedChallengeOnce] = useState(false);

  async function loadChallenge() {
    setLoadingChallenge(true);
    setErrorMessage("");
    try {
      const response = await fetch("/api/hero-captcha/challenge", { cache: "no-store" });
      const payload = (await response.json()) as Partial<ChallengePayload>;
      if (!response.ok || !payload.challengeId || !payload.challengeText || !payload.expiresAt) {
        throw new Error("Could not load captcha challenge.");
      }
      setChallenge({
        challengeId: payload.challengeId,
        challengeText: payload.challengeText,
        expiresAt: payload.expiresAt,
      });
      setHasLoadedChallengeOnce(true);
      setCaptchaAnswer("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not load captcha challenge.";
      setErrorMessage(message);
    } finally {
      setLoadingChallenge(false);
    }
  }

  useEffect(() => {
    void loadChallenge();

    return () => {
      if (refreshSpinTimeoutRef.current) {
        clearTimeout(refreshSpinTimeoutRef.current);
      }
    };
  }, []);

  function handleRefreshClick() {
    void loadChallenge();
    const icon = refreshIconRef.current;
    if (!icon) return;

    icon.classList.add("spin-animation");
    if (refreshSpinTimeoutRef.current) {
      clearTimeout(refreshSpinTimeoutRef.current);
    }
    refreshSpinTimeoutRef.current = setTimeout(() => {
      icon.classList.remove("spin-animation");
    }, 500);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const isChallengeExpired = challenge ? Date.now() > challenge.expiresAt : true;
    if (!challenge || isChallengeExpired) {
      setErrorMessage("Captcha expired. Please refresh and try again.");
      return;
    }

    if (!captchaAnswer.trim()) {
      setErrorMessage("Please solve the captcha challenge.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/hero-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          countryCode,
          phoneNational,
          workEmail,
          budgetRange,
          serviceInterest: heroMenu.heroService?.href ?? "",
          projectDetails,
          challengeId: challenge.challengeId,
          captchaAnswer,
        }),
      });

      const payload = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(payload.message ?? "Unable to submit your request.");
      }

      setSuccessMessage(payload.message ?? "Consultation request submitted.");
      setFirstName("");
      setLastName("");
      setCountryCode("+92");
      setPhoneNational("");
      setWorkEmail("");
      setBudgetRange("");
      setProjectDetails("");
      setCaptchaAnswer("");
      await loadChallenge();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit your request.";
      setErrorMessage(message);
      if (challenge && Date.now() > challenge.expiresAt) {
        await loadChallenge();
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="csd-hero-form" onSubmit={handleSubmit}>
      <div className="csd-hero-form-grid">
        <label className="csd-hero-form-field">
          <span>First Name</span>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            autoComplete="given-name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label className="csd-hero-form-field">
          <span>Last Name</span>
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            autoComplete="family-name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>

      <div className="csd-hero-form-grid">
        <label className="csd-hero-form-field csd-hero-form-field--phone">
          <span>Contact Number</span>
          <div className="csd-hero-phone-row">
            <select
              className="csd-hero-phone-cc"
              name="countryCode"
              aria-label="Country calling code"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              {HERO_PHONE_COUNTRY_CODES.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
            <span className="csd-hero-phone-sep" aria-hidden />
            <input
              className="csd-hero-phone-num"
              type="tel"
              name="phoneNational"
              placeholder="Enter Your Number*"
              autoComplete="tel-national"
              aria-label="Phone number"
              required
              value={phoneNational}
              onChange={(e) => setPhoneNational(e.target.value)}
            />
          </div>
        </label>
        <label className="csd-hero-form-field">
          <span>Work Email</span>
          <input
            type="email"
            placeholder="Enter your email address"
            required
            value={workEmail}
            onChange={(e) => setWorkEmail(e.target.value)}
          />
        </label>
      </div>

      <div className="csd-hero-form-grid">
        <label className="csd-hero-form-field">
          <span>Budget Range</span>
          <select name="budgetRange" value={budgetRange} onChange={(e) => setBudgetRange(e.target.value)}>
            <option value="" disabled>
              Select a budget range
            </option>
            {MARKETING_BUDGET_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <label className="csd-hero-form-field">
          <span>Services</span>
          <div className="csd-hero-service-dd">
            <input type="hidden" name="serviceInterest" value={heroMenu.heroService?.href ?? ""} />
            <button
              ref={heroMenu.heroServiceBtnRef}
              type="button"
              className={`csd-hero-service-dd-trigger${heroMenu.heroService ? "" : " csd-hero-service-dd-trigger--placeholder"}`}
              aria-expanded={heroMenu.heroServiceOpen}
              aria-haspopup="listbox"
              aria-controls={serviceControls.listboxId}
              id={serviceControls.triggerId}
              aria-label="Service you are interested in"
              onClick={() =>
                heroMenu.heroServiceOpen ? heroMenu.closeHeroServiceMenu() : heroMenu.openHeroServiceMenu()
              }
            >
              <span className="csd-hero-service-dd-value">
                {heroMenu.heroService ? heroMenu.heroService.label : "Select a service"}
              </span>
              <span
                className={`csd-hero-service-dd-chevron${heroMenu.heroServiceOpen ? " csd-hero-service-dd-chevron--open" : ""}`}
                aria-hidden
              />
            </button>
          </div>
        </label>
      </div>

      <label className="csd-hero-form-field">
        <span>Describe your project</span>
        <textarea
          rows={3}
          placeholder="Describe your project"
          value={projectDetails}
          onChange={(e) => setProjectDetails(e.target.value)}
        />
      </label>

      <div className="csd-hero-form-foot">
        <div className="csd-hero-form-captcha">
          <span>
            {challenge?.challengeText ??
              (loadingChallenge && !hasLoadedChallengeOnce ? "Loading..." : "Captcha unavailable")}
          </span>
          <input
            type="text"
            inputMode="numeric"
            aria-label="Captcha answer"
            required
            value={captchaAnswer}
            onChange={(e) => setCaptchaAnswer(e.target.value)}
            disabled={loadingChallenge || !challenge}
          />
          <button
            type="button"
            onClick={handleRefreshClick}
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

      {errorMessage ? <p className="csd-hero-form-note" style={{ color: "#b91c1c" }}>{errorMessage}</p> : null}
      {successMessage ? <p className="csd-hero-form-note" style={{ color: "#166534" }}>{successMessage}</p> : null}
      <p className="csd-hero-form-note">Fast, high-touch engagement under strict NDA protection.</p>
      <style jsx>{`
        .spin-animation {
          animation: spin-animation 500ms linear;
        }
        @keyframes spin-animation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </form>
  );
}
