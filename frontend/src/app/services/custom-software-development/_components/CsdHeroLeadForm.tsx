"use client";

import { FormEvent, useCallback, useState } from "react";
import { CountryCode, parsePhoneNumberFromString } from "libphonenumber-js/min";
import { parseHeroLeadResponse } from "./CsdHeroLeadForm.api";
import {
  BudgetField,
  CaptchaFooter,
  ContactFields,
  NameFields,
  ServiceField,
} from "./CsdHeroLeadFormSections";
import { CsdHeroLeadFormProps } from "./CsdHeroLeadForm.types";
import { useHeroCaptcha } from "./useHeroCaptcha";

const FORM_SUBMIT_ERROR = "Unable to submit your request.";
const CAPTCHA_EXPIRED_ERROR = "Captcha expired. Please refresh and try again.";
const CAPTCHA_REQUIRED_ERROR = "Please solve the captcha challenge.";
const PHONE_REQUIRED_ERROR = "Please add your contact number.";
const PHONE_COUNTRY_REQUIRED_ERROR = "Please select your country code.";
const PHONE_INVALID_ERROR = "Please enter a valid phone number for the selected country.";
const BUDGET_REQUIRED_ERROR = "Please select a budget range.";

export function CsdHeroLeadForm({ heroMenu, serviceControls }: CsdHeroLeadFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneCountryIso2, setPhoneCountryIso2] = useState<CountryCode | null>(null);
  const [countryCode, setCountryCode] = useState("");
  const [phoneNational, setPhoneNational] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneValidationMessage, setPhoneValidationMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleBeforeChallengeLoad = useCallback(() => {
    setErrorMessage("");
    setCaptchaAnswer("");
  }, []);
  const { challenge, loadingChallenge, hasLoadedChallengeOnce, refreshIconRef, loadChallenge, handleRefreshClick } =
    useHeroCaptcha({
      onLoadError: setErrorMessage,
      onBeforeLoad: handleBeforeChallengeLoad,
    });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setPhoneValidationMessage("");
    setSuccessMessage("");

    const isChallengeExpired = challenge ? Date.now() > challenge.expiresAt : true;
    if (!challenge || isChallengeExpired) {
      setErrorMessage(CAPTCHA_EXPIRED_ERROR);
      return;
    }

    if (!captchaAnswer.trim()) {
      setErrorMessage(CAPTCHA_REQUIRED_ERROR);
      return;
    }

    if (!budgetRange.trim()) {
      setErrorMessage(BUDGET_REQUIRED_ERROR);
      return;
    }

    if (!phoneCountryIso2 || !countryCode) {
      setPhoneValidationMessage(PHONE_COUNTRY_REQUIRED_ERROR);
      return;
    }

    if (!phoneNational.trim()) {
      setPhoneValidationMessage(PHONE_REQUIRED_ERROR);
      return;
    }

    const parsedPhone = parsePhoneNumberFromString(phoneNational, phoneCountryIso2);
    if (!parsedPhone || !parsedPhone.isValid()) {
      setPhoneValidationMessage(PHONE_INVALID_ERROR);
      return;
    }

    const phoneE164 = parsedPhone.number;
    const normalizedNational = parsedPhone.nationalNumber;

    setSubmitting(true);
    try {
      const response = await fetch("/api/hero-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          countryCode,
          phoneCountryIso2,
          phoneNational: normalizedNational,
          phoneE164,
          workEmail,
          budgetRange,
          serviceInterest: heroMenu.heroService?.href ?? "",
          projectDetails,
          challengeId: challenge.challengeId,
          captchaAnswer,
        }),
      });

      const payload: unknown = await response.json();
      const parsedPayload = parseHeroLeadResponse(payload);
      if (!response.ok) {
        throw new Error(parsedPayload?.message ?? FORM_SUBMIT_ERROR);
      }

      setSuccessMessage(parsedPayload?.message ?? "Consultation request submitted.");
      setFirstName("");
      setLastName("");
      setPhoneCountryIso2(null);
      setCountryCode("");
      setPhoneNational("");
      setWorkEmail("");
      setBudgetRange("");
      setProjectDetails("");
      setCaptchaAnswer("");
      setPhoneValidationMessage("");
      await loadChallenge();
    } catch (error) {
      const message = error instanceof Error ? error.message : FORM_SUBMIT_ERROR;
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
      <NameFields
        firstName={firstName}
        lastName={lastName}
        onFirstNameChange={setFirstName}
        onLastNameChange={setLastName}
      />
      <ContactFields
        phoneCountryIso2={phoneCountryIso2}
        phoneNational={phoneNational}
        workEmail={workEmail}
        phoneValidationMessage={phoneValidationMessage}
        onPhoneCountryChange={(nextIso2, nextDialCode) => {
          setPhoneCountryIso2(nextIso2);
          setCountryCode(nextDialCode);
          setPhoneValidationMessage("");
        }}
        onPhoneNationalChange={(value) => {
          setPhoneNational(value);
          setPhoneValidationMessage("");
        }}
        onWorkEmailChange={setWorkEmail}
      />

      <div className="csd-hero-form-grid">
        <BudgetField budgetRange={budgetRange} onChange={setBudgetRange} />
        <ServiceField
          heroService={heroMenu.heroService}
          heroServiceOpen={heroMenu.heroServiceOpen}
          heroServiceBtnRef={heroMenu.heroServiceBtnRef}
          openHeroServiceMenu={heroMenu.openHeroServiceMenu}
          closeHeroServiceMenu={heroMenu.closeHeroServiceMenu}
          serviceControls={serviceControls}
        />
      </div>

      <label className="csd-hero-form-field">
        <span>Describe your project</span>
        <textarea
          rows={3}
          placeholder="Describe your project"
          maxLength={8000}
          value={projectDetails}
          onChange={(e) => setProjectDetails(e.target.value)}
        />
      </label>

      <CaptchaFooter
        challenge={challenge}
        loadingChallenge={loadingChallenge}
        hasLoadedChallengeOnce={hasLoadedChallengeOnce}
        captchaAnswer={captchaAnswer}
        onCaptchaAnswerChange={setCaptchaAnswer}
        refreshIconRef={refreshIconRef}
        onRefresh={handleRefreshClick}
        submitting={submitting}
      />

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
