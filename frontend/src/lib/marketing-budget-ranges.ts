export const MARKETING_BUDGET_OPTIONS = [
  { value: "under-10k", label: "Under $10k" },
  { value: "10k-25k", label: "$10k - $25k" },
  { value: "25k-50k", label: "$25k - $50k" },
  { value: "50k-plus", label: "$50k+" },
] as const;

export type MarketingBudgetOption = (typeof MARKETING_BUDGET_OPTIONS)[number];
export type MarketingBudgetValue = MarketingBudgetOption["value"];

export function marketingBudgetLabel(value: string): string {
  const opt = MARKETING_BUDGET_OPTIONS.find((o) => o.value === value);
  return opt?.label ?? value;
}
