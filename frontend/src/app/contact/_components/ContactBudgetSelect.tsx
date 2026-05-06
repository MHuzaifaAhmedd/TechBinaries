"use client";

import { ContactGlassSelect } from "./ContactGlassSelect";
import { MARKETING_BUDGET_OPTIONS, marketingBudgetLabel } from "@/lib/marketing-budget-ranges";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function ContactBudgetSelect({ value, onChange }: Props) {
  return (
    <ContactGlassSelect
      options={MARKETING_BUDGET_OPTIONS}
      value={value}
      onChange={onChange}
      fieldLabel="Monthly Marketing Budget *"
      placeholder="Select a budget range"
      resolveDisplayLabel={(v) => (v ? marketingBudgetLabel(v) : "")}
    />
  );
}
