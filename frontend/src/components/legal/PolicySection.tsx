import type { ReactNode } from "react";

type PolicySectionProps = {
  id: string;
  title: string;
  number?: number;
  children: ReactNode;
};

export default function PolicySection({ id, title, number, children }: PolicySectionProps) {
  return (
    <section id={id} className="policy-section">
      <h2>
        {number !== undefined ? `${number}. ` : ""}
        {title}
      </h2>
      <div className="policy-section__body">{children}</div>
    </section>
  );
}
