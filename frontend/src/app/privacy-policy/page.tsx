import PolicyPageShell from "@/components/legal/PolicyPageShell.client";
import PolicySection from "@/components/legal/PolicySection";

const LAST_UPDATED = "[DATE]";
const EFFECTIVE_DATE = "[DATE]";

const TOC = [
  { id: "introduction", label: "Introduction" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use-information", label: "How We Use Information" },
  { id: "data-sharing", label: "Data Sharing & Third Parties" },
  { id: "data-storage-security", label: "Data Storage & Security" },
  { id: "cookies-tracking", label: "Cookies & Tracking" },
  { id: "your-rights", label: "Your Rights" },
  { id: "data-retention", label: "Data Retention Policy" },
  { id: "childrens-privacy", label: "Children's Privacy" },
  { id: "contact-us", label: "Contact Us" },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyPageShell
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      breadcrumbLabel="Privacy Policy"
      sections={TOC}
      intro="This Privacy Policy explains how [COMPANY NAME] (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, discloses, and safeguards information when you visit our website, engage our software development services, or otherwise interact with us."
    >
      <PolicySection id="introduction" title="Introduction" number={1}>
        <p>
          Effective date: <strong>{EFFECTIVE_DATE}</strong>
        </p>
        <p>
          [COMPANY NAME] is a software development company headquartered in [COUNTRY]. We are committed to
          protecting the privacy of our website visitors, prospective clients, and active customers. This policy
          applies to information collected through our website, sales and onboarding processes, project
          collaboration tools, and support channels.
        </p>
        <p>
          By using our services or submitting information to us, you acknowledge that you have read and
          understood this Privacy Policy. If you do not agree with our practices, please do not use our services
          or provide personal information.
        </p>
      </PolicySection>

      <PolicySection id="information-we-collect" title="Information We Collect" number={2}>
        <h3>Personal Data</h3>
        <p>We may collect personal information that you voluntarily provide, including:</p>
        <ul>
          <li>Name, job title, company name, and business contact details</li>
          <li>Email address, phone number, and mailing address</li>
          <li>Billing and invoicing information (processed through secure payment providers)</li>
          <li>Communications you send us via contact forms, email, chat, or project management tools</li>
          <li>Resume and employment-related data when you apply for a position with us</li>
        </ul>

        <h3>Usage Data</h3>
        <p>When you visit our website or use our digital properties, we may automatically collect:</p>
        <ul>
          <li>IP address, browser type, device identifiers, and operating system</li>
          <li>Pages viewed, referring URLs, session duration, and clickstream data</li>
          <li>Approximate geographic location derived from IP address</li>
          <li>Error logs and performance diagnostics to maintain service reliability</li>
        </ul>

        <h3>Client Project Data</h3>
        <p>
          In the course of delivering custom software, mobile applications, and related services, we may process
          data on behalf of our clients. This may include source code, design assets, API credentials (stored in
          secure vaults), staging and production environment data, user analytics, and business documentation
          shared for project execution. The ownership and permitted use of client project data is governed by our
          service agreements and applicable confidentiality terms.
        </p>
      </PolicySection>

      <PolicySection id="how-we-use-information" title="How We Use Information" number={3}>
        <p>We use collected information for legitimate business purposes, including to:</p>
        <ul>
          <li>Respond to inquiries, provide proposals, and deliver contracted software development services</li>
          <li>Manage client accounts, project workflows, invoicing, and support requests</li>
          <li>Improve our website, services, and internal development processes</li>
          <li>Send service-related notices, security alerts, and administrative communications</li>
          <li>Comply with legal obligations, enforce agreements, and protect our rights</li>
          <li>
            Send marketing communications where permitted by law and subject to your opt-out preferences
          </li>
        </ul>
        <p>
          We process personal data based on contractual necessity, legitimate interests, consent (where required),
          and legal compliance, depending on the context of collection.
        </p>
      </PolicySection>

      <PolicySection id="data-sharing" title="Data Sharing & Third Parties" number={4}>
        <p>We do not sell personal information. We may share information with trusted third parties when necessary:</p>
        <ul>
          <li>
            <strong>Cloud providers</strong> — such as AWS, Google Cloud, Microsoft Azure, or Vercel for hosting,
            storage, and deployment infrastructure
          </li>
          <li>
            <strong>Analytics tools</strong> — such as Google Analytics, Plausible, or similar services to
            understand website usage and improve user experience
          </li>
          <li>
            <strong>Subcontractors and specialists</strong> — freelance developers, designers, QA engineers, or
            agencies engaged under confidentiality agreements to support project delivery
          </li>
          <li>
            <strong>Business tools</strong> — CRM, email, accounting, project management, and communication
            platforms (e.g., Slack, Jira, Notion, HubSpot)
          </li>
          <li>
            <strong>Legal and compliance</strong> — when required by law, court order, or to protect the safety
            and rights of [COMPANY NAME], our clients, and the public
          </li>
        </ul>
        <p>
          All third-party processors are selected based on security practices and contractual data protection
          obligations. International transfers, where applicable, are conducted with appropriate safeguards such as
          Standard Contractual Clauses.
        </p>
      </PolicySection>

      <PolicySection id="data-storage-security" title="Data Storage & Security" number={5}>
        <p>
          We implement technical and organizational measures designed to protect information against unauthorized
          access, alteration, disclosure, or destruction. These measures include:
        </p>
        <ul>
          <li>Encryption in transit (TLS/HTTPS) and encryption at rest for sensitive data where supported</li>
          <li>Role-based access control, least-privilege principles, and multi-factor authentication</li>
          <li>Secure credential management using password managers and secrets vaults</li>
          <li>Regular backups, monitoring, and incident response procedures</li>
          <li>Employee confidentiality training and background checks where appropriate</li>
        </ul>
        <p>
          No method of transmission or storage is completely secure. While we strive to protect your information,
          we cannot guarantee absolute security. You are responsible for maintaining the confidentiality of any
          credentials shared with you for project collaboration.
        </p>
      </PolicySection>

      <PolicySection id="cookies-tracking" title="Cookies & Tracking" number={6}>
        <p>
          Our website may use cookies, local storage, and similar technologies to enable core functionality,
          remember preferences, and analyze traffic patterns.
        </p>
        <ul>
          <li>
            <strong>Essential cookies</strong> — required for site operation, security, and form submissions
          </li>
          <li>
            <strong>Analytics cookies</strong> — help us understand how visitors interact with our pages
          </li>
          <li>
            <strong>Marketing cookies</strong> — may be used to measure campaign effectiveness (only with consent
            where required)
          </li>
        </ul>
        <p>
          You can control cookies through your browser settings. Disabling certain cookies may affect site
          functionality. Where required by law, we present a cookie consent banner before placing non-essential
          tracking technologies.
        </p>
      </PolicySection>

      <PolicySection id="your-rights" title="Your Rights" number={7}>
        <p>
          Depending on your location, you may have rights regarding your personal data under laws such as the
          General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), as amended by
          CPRA.
        </p>
        <p>These rights may include the ability to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate or incomplete data</li>
          <li>Request deletion of personal information, subject to legal exceptions</li>
          <li>Object to or restrict certain processing activities</li>
          <li>Request data portability in a structured, machine-readable format</li>
          <li>Withdraw consent where processing is based on consent</li>
          <li>Opt out of the sale or sharing of personal information (we do not sell personal data)</li>
          <li>Lodge a complaint with a supervisory authority in your jurisdiction</li>
        </ul>
        <p>
          To exercise your rights, contact us at <a href="mailto:[EMAIL]">[EMAIL]</a>. We will respond within the
          timeframe required by applicable law, typically within 30 days.
        </p>
      </PolicySection>

      <PolicySection id="data-retention" title="Data Retention Policy" number={8}>
        <p>
          We retain personal information only for as long as necessary to fulfill the purposes described in this
          policy, unless a longer retention period is required or permitted by law.
        </p>
        <ul>
          <li>
            <strong>Marketing and inquiry data</strong> — retained for up to 24 months after last interaction,
            unless you request earlier deletion
          </li>
          <li>
            <strong>Client project records</strong> — retained for the duration of the engagement and typically
            3–7 years thereafter for legal, tax, and dispute resolution purposes
          </li>
          <li>
            <strong>Website analytics</strong> — aggregated or anonymized data may be retained indefinitely
          </li>
        </ul>
        <p>
          When data is no longer needed, we securely delete or anonymize it in accordance with our data disposal
          procedures.
        </p>
      </PolicySection>

      <PolicySection id="childrens-privacy" title="Children's Privacy" number={9}>
        <p>
          Our services are directed at businesses and professionals. We do not knowingly collect personal
          information from children under the age of 16 (or the applicable age of digital consent in your
          jurisdiction). If you believe we have inadvertently collected information from a child, please contact
          us at <a href="mailto:[EMAIL]">[EMAIL]</a> and we will take steps to delete it promptly.
        </p>
      </PolicySection>

      <PolicySection id="contact-us" title="Contact Us" number={10}>
        <p>
          If you have questions, concerns, or requests regarding this Privacy Policy or our data practices,
          please contact:
        </p>
        <p>
          <strong>[COMPANY NAME]</strong>
          <br />
          Email: <a href="mailto:[EMAIL]">[EMAIL]</a>
          <br />
          Country: [COUNTRY]
        </p>
        <p>
          For GDPR-related inquiries, you may also contact our Data Protection Officer (if appointed) at the same
          email address with the subject line &quot;Data Protection Request.&quot;
        </p>
      </PolicySection>
    </PolicyPageShell>
  );
}
