"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

/** Pillar + sub-service labels (checkbox values). Labels are unique across groups. */
const CONTACT_SERVICE_GROUPS = [
  {
    title: "Custom Software Development",
    items: [
      "Custom Web Application Development",
      "iOS App Development",
      "Android App Development",
      "SaaS Product Development",
      "UI/UX Design Systems",
      "CMS & Admin Panel Development",
      "High-Performance Landing Pages",
    ],
  },
  {
    title: "Growth & Performance Engineering",
    items: [
      "Conversion-Focused Landing Systems",
      "Funnel Architecture & Optimization",
      "Performance Tracking Dashboards",
      "User Behavior Analytics Integration",
      "A/B Testing & Experimentation Systems",
      "Data-Driven Growth Optimization",
    ],
  },
  {
    title: "Search Visibility SEO",
    items: [
      "Technical SEO Optimization",
      "Website Performance & Indexing Improvements",
      "Scalable Content Architecture",
      "Keyword & Search Intent Mapping",
      "Competitor & Market Analysis Tools",
      "Search Growth Monitoring Systems",
    ],
  },
] as const;

type ContactFormData = {
  firstName: string;
  lastName: string;
  company: string;
  website: string;
  email: string;
  phone: string;
  budget: string;
  hearAbout: string;
  message: string;
  services: string[];
  consent: boolean;
};

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        parameters: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => number;
      reset: (widgetId?: number) => void;
      ready: (callback: () => void) => void;
    };
  }
}

export default function ContactPage() {
  const recaptchaWidgetIdRef = useRef<number | null>(null);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReady, setCaptchaReady] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [contactForm, setContactForm] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    company: "",
    website: "",
    email: "",
    phone: "",
    budget: "",
    hearAbout: "",
    message: "",
    services: [],
    consent: false,
  });

  const mountRecaptcha = useCallback(() => {
    if (!recaptchaSiteKey || recaptchaWidgetIdRef.current !== null) return;
    if (!window.grecaptcha || !recaptchaContainerRef.current) return;

    window.grecaptcha.ready(() => {
      if (!recaptchaContainerRef.current || recaptchaWidgetIdRef.current !== null) return;
      recaptchaWidgetIdRef.current = window.grecaptcha!.render(recaptchaContainerRef.current, {
        sitekey: recaptchaSiteKey,
        callback: (token: string) => setCaptchaToken(token),
        "expired-callback": () => setCaptchaToken(""),
        "error-callback": () => setCaptchaToken(""),
      });
      setCaptchaReady(true);
    });
  }, [recaptchaSiteKey]);

  useEffect(() => {
    mountRecaptcha();
  }, [mountRecaptcha]);

  const toggleService = (service: string) => {
    setContactForm((prev) => {
      const exists = prev.services.includes(service);
      const services = exists
        ? prev.services.filter((item) => item !== service)
        : [...prev.services, service];

      return { ...prev, services };
    });
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!recaptchaSiteKey) {
      setFormError("reCAPTCHA site key is missing. Set NEXT_PUBLIC_RECAPTCHA_SITE_KEY.");
      return;
    }
    if (!captchaToken) {
      setFormError("Please complete the reCAPTCHA challenge.");
      return;
    }
    if (contactForm.services.length === 0) {
      setFormError("Please choose at least one service.");
      return;
    }
    if (!contactForm.consent) {
      setFormError("Please provide consent to receive communication.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contactForm, captchaToken }),
      });

      const payload = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(payload.message ?? "Unable to submit your request.");

      setFormSuccess("Thanks, your request has been submitted. We will contact you within 24 hours.");
      setContactForm({
        firstName: "",
        lastName: "",
        company: "",
        website: "",
        email: "",
        phone: "",
        budget: "",
        hearAbout: "",
        message: "",
        services: [],
        consent: false,
      });
      setCaptchaToken("");
      if (window.grecaptcha && recaptchaWidgetIdRef.current !== null) {
        window.grecaptcha.reset(recaptchaWidgetIdRef.current);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit your request.";
      setFormError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={mountRecaptcha}
      />
      <div style={{ background: "#fafaf9", color: "#0a0a0a", minHeight: "100vh" }}>
        <SiteHeader />
        <main style={{ padding: "140px 20px 80px" }}>
          <section style={{ maxWidth: 1320, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(10,10,10,0.46)" }}>
                Contact Us
              </p>
              <h1 style={{ margin: "0 0 12px", fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.03em", lineHeight: 1.02, fontWeight: 500 }}>
                Tell us what you are working on.
              </h1>
              <p style={{ margin: "0 auto", maxWidth: 760, fontSize: 16, lineHeight: 1.7, color: "rgba(10,10,10,0.58)" }}>
                Whether you are scaling, fixing performance issues, or exploring new ideas, share your goals with us.
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="contact-form-shell" noValidate>
              <div className="contact-grid-3">
                <label className="contact-field">
                  <span>First Name *</span>
                  <input type="text" required value={contactForm.firstName} onChange={(e) => setContactForm((prev) => ({ ...prev, firstName: e.target.value }))} />
                </label>
                <label className="contact-field">
                  <span>Last Name *</span>
                  <input type="text" required value={contactForm.lastName} onChange={(e) => setContactForm((prev) => ({ ...prev, lastName: e.target.value }))} />
                </label>
                <label className="contact-field">
                  <span>Company / Organization *</span>
                  <input type="text" required value={contactForm.company} onChange={(e) => setContactForm((prev) => ({ ...prev, company: e.target.value }))} />
                </label>
              </div>

              <div className="contact-grid-3">
                <label className="contact-field">
                  <span>Website</span>
                  <input type="url" value={contactForm.website} onChange={(e) => setContactForm((prev) => ({ ...prev, website: e.target.value }))} placeholder="https://" />
                </label>
                <label className="contact-field">
                  <span>Email Address *</span>
                  <input type="email" required value={contactForm.email} onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))} />
                </label>
                <label className="contact-field">
                  <span>Phone Number *</span>
                  <input type="tel" required value={contactForm.phone} onChange={(e) => setContactForm((prev) => ({ ...prev, phone: e.target.value }))} />
                </label>
              </div>

              <div className="contact-grid-2">
                <label className="contact-field">
                  <span>Monthly Marketing Budget *</span>
                  <input type="text" required value={contactForm.budget} onChange={(e) => setContactForm((prev) => ({ ...prev, budget: e.target.value }))} placeholder="e.g. $10,000 - $30,000" />
                </label>
                <label className="contact-field">
                  <span>How did you hear about us?</span>
                  <input type="text" value={contactForm.hearAbout} onChange={(e) => setContactForm((prev) => ({ ...prev, hearAbout: e.target.value }))} />
                </label>
              </div>

              <div style={{ marginTop: 20 }}>
                <p
                  style={{
                    margin: "0 0 16px",
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(10,10,10,0.5)",
                  }}
                >
                  Services *
                </p>
                <div className="contact-service-groups" role="group" aria-label="Services of interest">
                  {CONTACT_SERVICE_GROUPS.map((group) => (
                    <div key={group.title} className="contact-service-group">
                      <div className="contact-service-group-heading">{group.title}</div>
                      <div className="contact-service-group-items">
                        {group.items.map((service) => (
                          <label key={service} className="contact-check contact-check--nested">
                            <input
                              type="checkbox"
                              checked={contactForm.services.includes(service)}
                              onChange={() => toggleService(service)}
                            />
                            <span className="contact-service-glyph" aria-hidden>
                              ›
                            </span>
                            <span>{service}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <label className="contact-field" style={{ marginTop: 16 }}>
                <span>Tell us about your business *</span>
                <textarea
                  required
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Include goals, timeline, current stack, and what outcome you want."
                />
              </label>

              <label className="contact-check" style={{ marginTop: 16 }}>
                <input type="checkbox" checked={contactForm.consent} onChange={(e) => setContactForm((prev) => ({ ...prev, consent: e.target.checked }))} />
                <span>I consent to receive notifications and promotional messages.</span>
              </label>

              <div style={{ marginTop: 20 }}>
                {recaptchaSiteKey ? (
                  <div ref={recaptchaContainerRef} />
                ) : (
                  <p style={{ margin: 0, fontSize: 13, color: "#b91c1c" }}>
                    Missing reCAPTCHA site key. Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to enable form submission.
                  </p>
                )}
              </div>

              {formError ? <p style={{ marginTop: 12, marginBottom: 0, color: "#b91c1c", fontSize: 14 }}>{formError}</p> : null}
              {formSuccess ? <p style={{ marginTop: 12, marginBottom: 0, color: "#166534", fontSize: 14 }}>{formSuccess}</p> : null}

              <div style={{ marginTop: 26, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                <button type="submit" className="contact-submit-btn" disabled={submitting || !captchaReady}>
                  {submitting ? "Submitting..." : "Send Free Proposal"}
                </button>
                <a href="tel:+13322333684" style={{ color: "rgba(10,10,10,0.62)", fontSize: 15, textDecoration: "none" }}>
                  In a hurry? Call us at +1 332-233-3684
                </a>
              </div>
            </form>
          </section>
        </main>
        <SiteFooter />
      </div>

    </>
  );
}
