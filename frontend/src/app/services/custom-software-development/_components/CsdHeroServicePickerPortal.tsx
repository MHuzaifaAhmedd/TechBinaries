"use client";

import { SERVICE_CATEGORIES } from "@/data/serviceCategories";
import { createPortal } from "react-dom";
import type { UseCsdHeroServiceMenuResult } from "../_hooks/useCsdHeroServiceMenu";

export const CSD_HERO_PICKER_DOM_IDS_DEFAULT = {
  trigger: "hero-service-trigger",
  listbox: "hero-service-listbox",
  sheetTitle: "hero-service-sheet-title",
} as const;

export type CsdHeroPickerDomIds = {
  trigger: string;
  listbox: string;
  sheetTitle: string;
};

export type CsdHeroServicePickerPortalProps = {
  heroMenu: UseCsdHeroServiceMenuResult;
  isHeroNarrow: boolean;
  /** When omitted, CSD defaults apply (parent page unchanged). */
  pickerDomIds?: CsdHeroPickerDomIds;
};

export function CsdHeroServicePickerPortal({
  heroMenu,
  isHeroNarrow,
  pickerDomIds,
}: CsdHeroServicePickerPortalProps) {
  const ids: CsdHeroPickerDomIds = { ...CSD_HERO_PICKER_DOM_IDS_DEFAULT, ...pickerDomIds };
  const {
    heroServiceOpen,
    heroService,
    setHeroService,
    heroServiceMenuBox,
    heroServiceMenuRef,
    heroServiceSheetRef,
    closeHeroServiceMenu,
  } = heroMenu;

  if (!heroServiceOpen || typeof document === "undefined") return null;

  const optionNodes = SERVICE_CATEGORIES.map((cat) => (
    <div key={cat.id} className="csd-hero-service-dd-group">
      <div className="csd-hero-service-dd-group-label" aria-hidden>
        {cat.title}
      </div>
      <button
        type="button"
        role="option"
        aria-selected={heroService?.href === cat.href}
        className="csd-hero-service-dd-option"
        onClick={() => {
          setHeroService({ href: cat.href, label: `${cat.title} (overview)` });
          closeHeroServiceMenu();
        }}
      >
        {cat.title} (overview)
      </button>
      {cat.links.map((link) => (
        <button
          key={link.href}
          type="button"
          role="option"
          aria-selected={heroService?.href === link.href}
          className="csd-hero-service-dd-option"
          onClick={() => {
            setHeroService({ href: link.href, label: link.label });
            closeHeroServiceMenu();
          }}
        >
          {link.label}
        </button>
      ))}
    </div>
  ));

  return createPortal(
    isHeroNarrow ? (
      <>
        <div
          className="csd-hero-service-dd-backdrop"
          aria-hidden
          onPointerDown={(e) => {
            e.preventDefault();
            closeHeroServiceMenu();
          }}
        />
        <div
          ref={heroServiceSheetRef}
          className="csd-hero-service-dd-sheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby={ids.sheetTitle}
        >
          <div className="csd-hero-service-dd-sheet-grab" aria-hidden />
          <div className="csd-hero-service-dd-sheet-head">
            <span id={ids.sheetTitle}>Services</span>
            <button
              type="button"
              className="csd-hero-service-dd-sheet-close"
              aria-label="Close service picker"
              onClick={closeHeroServiceMenu}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                <path
                  d="M5 5l8 8M13 5l-8 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div
            ref={heroServiceMenuRef}
            id={ids.listbox}
            className="csd-hero-service-dd-menu csd-hero-service-dd-menu--sheet"
            role="listbox"
            aria-labelledby={ids.trigger}
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
          >
            {optionNodes}
          </div>
        </div>
      </>
    ) : heroServiceMenuBox ? (
      <div
        ref={heroServiceMenuRef}
        id={ids.listbox}
        className="csd-hero-service-dd-menu"
        role="listbox"
        aria-labelledby={ids.trigger}
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
        style={{
          position: "fixed",
          top: heroServiceMenuBox.top,
          left: heroServiceMenuBox.left,
          width: heroServiceMenuBox.width,
          maxHeight: heroServiceMenuBox.maxHeight,
          zIndex: 10050,
        }}
      >
        {optionNodes}
      </div>
    ) : null,
    document.body
  );
}
