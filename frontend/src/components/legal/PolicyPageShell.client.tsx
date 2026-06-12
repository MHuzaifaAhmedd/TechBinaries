"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "@/styles/policy-page.css";

export type PolicyTocItem = {
  id: string;
  label: string;
};

type PolicyPageShellProps = {
  title: string;
  lastUpdated: string;
  intro: string;
  breadcrumbLabel: string;
  sections: PolicyTocItem[];
  children: React.ReactNode;
};

export default function PolicyPageShell({
  title,
  lastUpdated,
  intro,
  breadcrumbLabel,
  sections,
  children,
}: PolicyPageShellProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const sectionElements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-15% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 1],
      },
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div style={{ background: "#fafaf9", color: "#0a0a0a" }}>
      <SiteHeader />
      <main className="policy-page__main">
        <div className="policy-page__inner">
          <nav className="policy-page__toc" aria-label="Table of contents">
            <p className="policy-page__toc-title">On this page</p>
            <ul className="policy-page__toc-list">
              {sections.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={activeId === item.id ? "is-active" : undefined}
                    aria-current={activeId === item.id ? "location" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="policy-page__article">
            <div className="policy-page__breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden>/</span>
              <span>{breadcrumbLabel}</span>
            </div>

            <header className="policy-page__header">
              <h1>{title}</h1>
              <div className="policy-page__meta-row">
                <span className="policy-page__badge">Last updated: {lastUpdated}</span>
                <button type="button" className="policy-page__print-btn" onClick={() => window.print()}>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M7 8V4h10v4M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect x="7" y="14" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Print this page
                </button>
              </div>
              <p className="policy-page__intro">{intro}</p>
            </header>

            {children}
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
