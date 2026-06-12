import PolicyPageShell from "@/components/legal/PolicyPageShell.client";
import PolicySection from "@/components/legal/PolicySection";

const LAST_UPDATED = "[DATE]";

const TOC = [
  { id: "introduction", label: "Introduction & Acceptance" },
  { id: "services-provided", label: "Services Provided" },
  { id: "client-responsibilities", label: "Client Responsibilities" },
  { id: "payment-terms", label: "Payment Terms" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "confidentiality", label: "Confidentiality" },
  { id: "project-scope", label: "Project Scope & Change Requests" },
  { id: "warranties-disclaimers", label: "Warranties & Disclaimers" },
  { id: "limitation-of-liability", label: "Limitation of Liability" },
  { id: "termination", label: "Termination" },
  { id: "governing-law", label: "Governing Law & Jurisdiction" },
  { id: "changes-to-terms", label: "Changes to Terms" },
];

export default function TermsOfServicePage() {
  return (
    <PolicyPageShell
      title="Terms of Service"
      lastUpdated={LAST_UPDATED}
      breadcrumbLabel="Terms of Service"
      sections={TOC}
      intro="These Terms of Service (&quot;Terms&quot;) govern your access to and use of [COMPANY NAME] websites, platforms, and software development services. Please read them carefully before engaging with us."
    >
      <PolicySection id="introduction" title="Introduction & Acceptance of Terms" number={1}>
        <p>
          These Terms constitute a legally binding agreement between you (&quot;Client,&quot; &quot;you,&quot; or
          &quot;your&quot;) and [COMPANY NAME] (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), a software
          development company based in [COUNTRY].
        </p>
        <p>
          By accessing our website, requesting a proposal, signing a statement of work (SOW), or otherwise using
          our services, you agree to be bound by these Terms and any applicable project-specific agreements. If
          you are entering into an agreement on behalf of a company, you represent that you have authority to bind
          that entity.
        </p>
        <p>
          If you do not agree to these Terms, you must not use our services. Project-specific SOWs, master
          service agreements (MSAs), and NDAs may supplement or override certain provisions where explicitly
          stated.
        </p>
      </PolicySection>

      <PolicySection id="services-provided" title="Services Provided" number={2}>
        <p>
          [COMPANY NAME] provides professional software development and related services, which may include but
          are not limited to:
        </p>
        <ul>
          <li>Custom web application and API development</li>
          <li>Mobile application development (iOS, Android, cross-platform)</li>
          <li>SaaS product engineering and MVP development</li>
          <li>UI/UX design, design systems, and prototyping</li>
          <li>CMS and admin panel development</li>
          <li>Technical consulting, code audits, and architecture reviews</li>
          <li>DevOps, cloud infrastructure setup, and deployment support</li>
          <li>Ongoing maintenance, bug fixes, and feature enhancements</li>
        </ul>
        <p>
          The specific scope, deliverables, timeline, and fees for each engagement are defined in a signed SOW or
          proposal. Services are provided on a time-and-materials, fixed-price, or retainer basis as agreed in
          writing.
        </p>
      </PolicySection>

      <PolicySection id="client-responsibilities" title="Client Responsibilities" number={3}>
        <p>To enable successful project delivery, you agree to:</p>
        <ul>
          <li>Provide timely access to stakeholders, requirements, brand assets, and technical documentation</li>
          <li>Designate a primary point of contact with decision-making authority</li>
          <li>Review and approve deliverables within agreed review periods (typically 3–5 business days)</li>
          <li>Supply accurate information regarding third-party accounts, APIs, hosting, and licenses</li>
          <li>Ensure you have rights to all content, data, and materials you provide to us</li>
          <li>Maintain backups of your data and systems where applicable</li>
        </ul>
        <p>
          Delays caused by late feedback, missing assets, or scope ambiguity may result in timeline adjustments
          and additional fees. We are not responsible for failures arising from incomplete or inaccurate client
          inputs.
        </p>
      </PolicySection>

      <PolicySection id="payment-terms" title="Payment Terms" number={4}>
        <h3>Invoicing</h3>
        <p>
          Fees are invoiced according to the payment schedule in your SOW — commonly milestone-based, monthly
          retainer, or upon completion of defined phases. Unless otherwise stated, invoices are due within 15
          calendar days of issuance.
        </p>

        <h3>Late Fees</h3>
        <p>
          Overdue balances may accrue interest at a rate of 1.5% per month (or the maximum permitted by law,
          whichever is lower) from the due date until paid in full. We reserve the right to pause work on active
          projects if invoices remain unpaid beyond 30 days after the due date.
        </p>

        <h3>Refunds</h3>
        <p>
          Fees for work already performed are generally non-refundable. For fixed-price engagements, any refund
          eligibility is limited to the terms specified in your SOW. Deposits and kickoff fees are non-refundable
          once project work has commenced. Disputes regarding invoice amounts must be raised in writing within 10
          business days of receipt.
        </p>

        <h3>Expenses</h3>
        <p>
          Third-party costs (licenses, hosting, stock assets, paid APIs, travel) are billed at cost unless
          included in the agreed fee. Material expenses exceeding an agreed threshold require prior written
          approval.
        </p>
      </PolicySection>

      <PolicySection id="intellectual-property" title="Intellectual Property" number={5}>
        <h3>Work Product</h3>
        <p>
          Upon receipt of full payment for the applicable deliverables, custom work product created specifically
          for your project (source code, designs, documentation) is assigned to you as work-for-hire, unless
          otherwise specified in your SOW. We retain no ownership interest in client-specific deliverables once
          payment is complete and assignment terms are satisfied.
        </p>

        <h3>Retained Tools & Frameworks</h3>
        <p>
          [COMPANY NAME] retains ownership of pre-existing intellectual property, including internal frameworks,
          boilerplate code, libraries, development tools, methodologies, and general know-how developed prior to or
          independently of your project (&quot;Background IP&quot;). You receive a perpetual, non-exclusive,
          royalty-free license to use Background IP embedded in deliverables solely as part of the delivered
          solution.
        </p>

        <h3>Third-Party Components</h3>
        <p>
          Deliverables may incorporate open-source libraries and third-party services subject to their respective
          licenses. We will identify material third-party dependencies and recommend appropriate license
          compliance measures.
        </p>

        <h3>Portfolio Rights</h3>
        <p>
          Unless restricted by NDA, we may display non-confidential project descriptions, screenshots, and case
          studies in our portfolio and marketing materials, with your prior approval where required.
        </p>
      </PolicySection>

      <PolicySection id="confidentiality" title="Confidentiality" number={6}>
        <p>
          Each party agrees to protect the other&apos;s confidential information using at least the same degree of
          care it uses for its own confidential information, but no less than reasonable care. Confidential
          information includes business plans, technical data, source code, trade secrets, financial information,
          and any materials marked or reasonably understood to be confidential.
        </p>
        <p>Confidential information does not include information that:</p>
        <ul>
          <li>Is or becomes publicly available through no fault of the receiving party</li>
          <li>Was already known to the receiving party without restriction</li>
          <li>Is independently developed without use of confidential information</li>
          <li>Is disclosed with the disclosing party&apos;s written consent</li>
          <li>Must be disclosed by law, provided the receiving party gives prompt notice where permitted</li>
        </ul>
        <p>
          Confidentiality obligations survive termination of the engagement for a period of three (3) years, or
          longer where trade secrets are involved. A separate NDA may impose additional or stricter terms.
        </p>
      </PolicySection>

      <PolicySection id="project-scope" title="Project Scope & Change Requests" number={7}>
        <p>
          All project work is governed by the scope defined in the signed SOW, proposal, or specification
          document. Requests for features, revisions, or deliverables outside the agreed scope constitute change
          requests.
        </p>
        <p>Change requests are handled as follows:</p>
        <ul>
          <li>Submitted in writing (email, project management tool, or formal change order)</li>
          <li>Assessed for impact on timeline, budget, and technical architecture</li>
          <li>Documented in a change order with revised estimates before work begins</li>
          <li>Billed at the agreed hourly rate or revised fixed price upon approval</li>
        </ul>
        <p>
          We are not obligated to perform out-of-scope work without a signed change order or written approval.
          Emergency fixes may be addressed under a separate support agreement where applicable.
        </p>
      </PolicySection>

      <PolicySection id="warranties-disclaimers" title="Warranties & Disclaimers" number={8}>
        <p>
          We warrant that services will be performed in a professional and workmanlike manner consistent with
          industry standards. For a period of 30 days following delivery of a milestone or final release, we will
          correct material defects in deliverables that deviate from the agreed specifications, provided the issue
          is reported promptly and is not caused by client modifications, third-party services, or misuse.
        </p>
        <p>
          EXCEPT AS EXPRESSLY STATED ABOVE, OUR SERVICES AND DELIVERABLES ARE PROVIDED &quot;AS IS&quot; AND
          &quot;AS AVAILABLE.&quot; WE DISCLAIM ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
        <p>
          We do not warrant uninterrupted or error-free operation of third-party platforms, hosting providers, app
          stores, or external APIs. Performance depends in part on factors outside our control.
        </p>
      </PolicySection>

      <PolicySection id="limitation-of-liability" title="Limitation of Liability" number={9}>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, [COMPANY NAME] SHALL NOT BE LIABLE FOR ANY INDIRECT,
          INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST REVENUE, LOST
          DATA, OR BUSINESS INTERRUPTION, ARISING FROM OR RELATED TO THESE TERMS OR OUR SERVICES.
        </p>
        <p>
          OUR TOTAL AGGREGATE LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATING TO AN ENGAGEMENT SHALL NOT EXCEED
          THE TOTAL FEES PAID BY YOU TO [COMPANY NAME] FOR THAT ENGAGEMENT IN THE TWELVE (12) MONTHS PRECEDING
          THE EVENT GIVING RISE TO THE CLAIM.
        </p>
        <p>
          These limitations apply regardless of the theory of liability and even if we have been advised of the
          possibility of such damages. Some jurisdictions do not allow certain limitations, so portions of this
          section may not apply to you.
        </p>
      </PolicySection>

      <PolicySection id="termination" title="Termination" number={10}>
        <p>Either party may terminate an engagement under the following conditions:</p>
        <ul>
          <li>
            <strong>Convenience</strong> — with 30 days&apos; written notice, subject to payment for all work
            completed through the termination date
          </li>
          <li>
            <strong>Material breach</strong> — if the other party fails to cure a material breach within 15
            business days of written notice
          </li>
          <li>
            <strong>Insolvency</strong> — immediately upon bankruptcy, assignment for the benefit of creditors,
            or cessation of business operations
          </li>
        </ul>
        <p>Upon termination:</p>
        <ul>
          <li>All outstanding invoices become immediately due and payable</li>
          <li>We will deliver work-in-progress and project assets upon receipt of payment for completed work</li>
          <li>Each party will return or destroy confidential information per the confidentiality section</li>
          <li>Sections regarding IP, confidentiality, payment, warranties, liability, and governing law survive</li>
        </ul>
      </PolicySection>

      <PolicySection id="governing-law" title="Governing Law & Jurisdiction" number={11}>
        <p>
          These Terms are governed by and construed in accordance with the laws of [COUNTRY], without regard to
          conflict-of-law principles. Any dispute arising from these Terms or our services shall be subject to
          the exclusive jurisdiction of the courts located in [COUNTRY], unless the parties agree in writing to
          binding arbitration.
        </p>
        <p>
          Before initiating formal proceedings, the parties agree to attempt good-faith negotiation for a period
          of 30 days. Nothing in this section prevents either party from seeking injunctive relief for
          intellectual property or confidentiality violations.
        </p>
      </PolicySection>

      <PolicySection id="changes-to-terms" title="Changes to Terms" number={12}>
        <p>
          We may update these Terms from time to time to reflect changes in our services, legal requirements, or
          business practices. When we make material changes, we will update the &quot;Last updated&quot; date at
          the top of this page and, where appropriate, notify active clients via email.
        </p>
        <p>
          Continued use of our website or services after changes take effect constitutes acceptance of the
          revised Terms. For active engagements, the Terms in effect at the time of SOW execution govern that
          project unless both parties agree otherwise in writing.
        </p>
        <p>
          Questions about these Terms may be directed to <a href="mailto:[EMAIL]">[EMAIL]</a>.
        </p>
      </PolicySection>
    </PolicyPageShell>
  );
}
