import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { withCanonical } from "@/lib/page-metadata";

const BLOG = {
  slug: "state-of-software-development-2026",
  category: "Newsroom",
  date: "May 8, 2026",
  readTime: "10 min. read",
  title: "The State of Software Development in 2026: Trends, Challenges, and Opportunities",
  author: "Senior Content Strategist",
  image: "/images/blogs/state-of-software-development-2026/title.jpg",
  intro:
    "Software development remains the beating heart of the technology industry. As we move through 2026, AI-driven workflows, cloud-native platforms, and rising expectations for speed and reliability are redefining how teams build products.",
};

const TOC = [
  { id: "evolution", label: "The Evolution of Software Development" },
  { id: "major-trends", label: "Major Trends Shaping Software Development in 2026" },
  { id: "in-demand-skills", label: "Most In-Demand Skills in 2026" },
  { id: "major-challenges", label: "Major Challenges Facing the Industry" },
  { id: "career-advice", label: "Career Advice for 2026 and Beyond" },
  { id: "future-outlook", label: "The Future Outlook" },
  { id: "faqs", label: "FAQs" },
];

const FAQS = [
  {
    question: "Will AI replace software developers?",
    answer:
      "AI is accelerating development, but high-value engineering still depends on human judgment, product context, and system design decisions. The strongest teams use AI as a collaborator, not a replacement for engineering ownership.",
  },
  {
    question: "Which trend will affect teams the most in the next 2-3 years?",
    answer:
      "AI-augmented workflows and platform engineering are likely to have the biggest practical impact because they directly improve developer speed, consistency, and delivery quality across multiple teams.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug !== BLOG.slug) {
    return withCanonical("/blogs", { title: "Blog post" });
  }

  return withCanonical(`/blogs/${slug}`, {
    title: BLOG.title,
    description: BLOG.intro,
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug !== BLOG.slug) {
    notFound();
  }

  return (
    <div style={{ background: "#fafaf9", color: "#0a0a0a" }}>
      <SiteHeader />
      <main className="blog-detail">
        <div className="blog-detail__inner">
          <nav className="blog-detail__toc" aria-label="Table of contents">
            <p className="blog-detail__toc-title">On this page</p>
            <ul className="blog-detail__toc-list">
              {TOC.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="blog-detail__article">
            <div className="blog-detail__breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden>/</span>
              <Link href="/blogs">Blog</Link>
              <span aria-hidden>/</span>
              <span>{BLOG.category}</span>
            </div>

            <header className="blog-detail__header">
              <h1>{BLOG.title}</h1>
              <div className="blog-detail__meta-row" aria-label="Article metadata">
                <span className="blog-detail__meta-item">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <rect x="2.5" y="3" width="15" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M6 1.8v2.4M14 1.8v2.4M2.5 7h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <rect x="5.5" y="9.8" width="2" height="2" rx=".4" fill="currentColor" />
                    <rect x="9" y="9.8" width="2" height="2" rx=".4" fill="currentColor" />
                  </svg>
                  <span>Published: <time>{BLOG.date}</time></span>
                </span>
                <span className="blog-detail__meta-item">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <circle cx="10" cy="10" r="7.2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10 6.4v4.1l2.8 1.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{BLOG.readTime}</span>
                </span>
                <a
                  className="blog-detail__meta-item blog-detail__meta-link"
                  href={`https://chat.openai.com/?q=${encodeURIComponent(`${BLOG.title} ${BLOG.intro}`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 3.5a4.6 4.6 0 0 1 4.53 3.87 4.5 4.5 0 0 1 2.83 1.3 4.62 4.62 0 0 1-.6 7.15 4.6 4.6 0 0 1-1.24 5.78 4.58 4.58 0 0 1-6.02-.17 4.58 4.58 0 0 1-6.02.17 4.6 4.6 0 0 1-1.24-5.78 4.62 4.62 0 0 1-.6-7.15 4.5 4.5 0 0 1 2.83-1.3A4.6 4.6 0 0 1 12 3.5Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8.4 9.1 12 7m0 0 3.6 2.1M12 7v4.2m0 0 3.7 2.1M12 11.2l-3.7 2.1m0 0v4.2m0-4.2 3.7 2.1m0 0 3.7-2.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Summarize in ChatGPT</span>
                </a>
              </div>
              <p className="blog-detail__author">By {BLOG.author}</p>
              <p className="blog-detail__intro">{BLOG.intro}</p>

              <figure className="blog-detail__hero-image">
                <Image src={BLOG.image} alt={BLOG.title} fill priority sizes="(max-width: 1080px) 100vw, 860px" />
              </figure>
            </header>

            <section id="evolution">
              <h2>1. The Evolution of Software Development</h2>
              <p>
                Software development has evolved from rigid waterfall plans into continuous, iterative delivery models
                built for speed and resilience.
              </p>
              <ul>
                <li>
                  <strong>1990s-2000s:</strong> Waterfall dominated, with complete planning before development.
                </li>
                <li>
                  <strong>2010s:</strong> Agile and DevOps transformed release velocity through CI/CD.
                </li>
                <li>
                  <strong>2020s:</strong> Cloud-native architecture, microservices, and IaC made global scale
                  practical.
                </li>
              </ul>
              <p>
                In 2026, teams operate in an AI-augmented environment where assistants reduce boilerplate and elevate
                focus toward architecture, product thinking, and system design.
              </p>
            </section>

            <section id="major-trends">
              <h2>2. Major Trends Shaping Software Development in 2026</h2>
              <h3>AI-Powered Development (The New Normal)</h3>
              <p>
                AI coding tools increasingly generate features, explain legacy code, and propose implementation options.
                Teams reporting the best outcomes pair AI speed with strong engineering review standards.
              </p>
              <h3>Platform Engineering and Internal Developer Portals</h3>
              <p>
                Organizations are investing in platform teams to create reusable golden paths for infrastructure,
                security, and release automation.
              </p>
              <h3>Edge Computing and Distributed Systems</h3>
              <p>
                As connected devices expand, more workloads are moving closer to users. Engineers are prioritizing
                low-latency architecture, multi-region consistency, and operational observability.
              </p>
              <h3>Low-Code/No-Code + Pro-Code Collaboration</h3>
              <p>
                Business users handle simple workflows while engineering teams focus on complex integrations and
                mission-critical systems.
              </p>
              <h3>Sustainability and Green Software</h3>
              <p>
                Efficient code, carbon-aware workloads, and optimized compute usage are becoming practical business
                priorities.
              </p>
              <h3>Security as Code (Shift-Left Security)</h3>
              <p>
                Supply-chain risks and compliance expectations are making built-in security scanning and policy checks
                part of normal development pipelines.
              </p>
            </section>

            <section id="in-demand-skills">
              <h2>3. Most In-Demand Skills in 2026</h2>
              <ul>
                <li>
                  <strong>Core Programming:</strong> TypeScript, Python, Go, Rust, and Kotlin remain highly relevant.
                </li>
                <li>
                  <strong>System Design:</strong> Designing reliable systems under scale and uncertainty.
                </li>
                <li>
                  <strong>AI Literacy:</strong> Effective prompting, validation, and understanding model limitations.
                </li>
                <li>
                  <strong>Cloud and DevOps:</strong> Terraform, Kubernetes, GitOps, and production observability.
                </li>
                <li>
                  <strong>Domain Expertise:</strong> Industry context in sectors like fintech, healthcare, and climate.
                </li>
                <li>
                  <strong>Leadership Skills:</strong> Communication, mentoring, and cross-functional collaboration.
                </li>
              </ul>
            </section>

            <section id="major-challenges">
              <h2>4. Major Challenges Facing the Industry</h2>
              <ul>
                <li>Specialized senior talent remains difficult to hire and retain.</li>
                <li>Over-reliance on AI can introduce hidden technical debt and security gaps.</li>
                <li>Tool sprawl and context switching continue to increase developer fatigue.</li>
                <li>Modernizing legacy systems requires long-term investment and careful rollout.</li>
                <li>Regulatory requirements around privacy, AI governance, and accessibility are expanding.</li>
              </ul>
            </section>

            <section id="career-advice">
              <h2>5. Career Advice for 2026 and Beyond</h2>
              <ol>
                <li>Build in public through open source, writing, and practical project portfolios.</li>
                <li>Develop T-shaped or comb-shaped expertise that combines depth and breadth.</li>
                <li>Master AI tools while protecting first-principles engineering fundamentals.</li>
                <li>Prioritize measurable business outcomes, not just code output.</li>
                <li>Make continuous learning a weekly discipline.</li>
              </ol>
            </section>

            <section id="future-outlook">
              <h2>The Future Outlook</h2>
              <p>By 2030, software delivery will likely include:</p>
              <ul>
                <li>More autonomous AI agents for repetitive engineering workflows.</li>
                <li>Broader adoption of formal methods in critical systems.</li>
                <li>Greater emphasis on ethical, secure, and responsible software practices.</li>
                <li>New programming paradigms that blend natural language and code.</li>
              </ul>
              <p>
                The developers who will stand out are those who can combine technical judgment, architectural clarity,
                and AI collaboration to build the right systems.
              </p>
            </section>

            <section id="faqs">
              <h2>FAQs</h2>
              <div className="blog-detail__faq-list">
                {FAQS.map((faq, index) => (
                  <details key={faq.question} className="blog-detail__faq-item">
                    <summary className="blog-detail__faq-question">
                      <span>{faq.question}</span>
                      <span className="blog-detail__faq-icon" aria-hidden>
                        +
                      </span>
                    </summary>
                    <p className="blog-detail__faq-answer">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </article>
        </div>
      </main>
      <SiteFooter />

      <style>{`
        .blog-detail {
          padding: 124px 20px 88px;
        }
        .blog-detail__inner {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 250px minmax(0, 1fr);
          gap: 34px;
        }
        .blog-detail__toc {
          position: sticky;
          top: calc(var(--header-h, 84px) + 18px);
          align-self: start;
          border-left: 1px solid rgba(10, 10, 10, 0.15);
          padding-left: 16px;
        }
        .blog-detail__toc-title {
          margin: 0 0 14px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: rgba(10, 10, 10, 0.6);
        }
        .blog-detail__toc-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 10px;
        }
        .blog-detail__toc-list a {
          text-decoration: none;
          color: rgba(10, 10, 10, 0.68);
          font-size: 13px;
          line-height: 1.4;
        }
        .blog-detail__toc-list a:hover {
          color: #0a0a0a;
        }
        .blog-detail__article {
          max-width: 860px;
        }
        .blog-detail__breadcrumbs {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 22px;
          font-family: var(--font-display);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #0a0a0a;
          font-weight: 500;
        }
        .blog-detail__breadcrumbs a {
          text-decoration: none;
          color: inherit;
        }
        .blog-detail__breadcrumbs a:hover {
          opacity: 0.75;
        }
        .blog-detail__header h1 {
          margin: 0 0 20px;
          max-width: 15ch;
          font-size: clamp(38px, 5.8vw, 72px);
          line-height: 0.95;
          letter-spacing: -0.04em;
          font-family: var(--font-body);
          font-weight: 800;
        }
        .blog-detail__meta-row {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
          margin: 0 0 16px;
          color: rgba(16, 40, 72, 0.55);
        }
        .blog-detail__meta-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          line-height: 1.2;
          color: rgba(22, 48, 80, 0.62);
        }
        .blog-detail__meta-item svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }
        .blog-detail__meta-link {
          text-decoration: none;
          color: #0c1728;
          transition: opacity 0.2s ease;
        }
        .blog-detail__meta-link:hover {
          opacity: 0.75;
        }
        .blog-detail__author {
          margin: 0 0 12px;
          font-size: 18px;
          color: rgba(10, 10, 10, 0.8);
        }
        .blog-detail__intro {
          margin: 0 0 24px;
          font-size: 19px;
          line-height: 1.6;
          color: rgba(10, 10, 10, 0.78);
        }
        .blog-detail__hero-image {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 14px;
          overflow: hidden;
          margin: 0 0 34px;
          border: 1px solid rgba(10, 10, 10, 0.08);
        }
        .blog-detail__article section {
          scroll-margin-top: calc(var(--header-h, 84px) + 24px);
          margin-bottom: 34px;
        }
        .blog-detail__article h2 {
          margin: 0 0 14px;
          font-size: clamp(28px, 3.2vw, 40px);
          line-height: 1.15;
          font-family: var(--font-display);
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .blog-detail__article h3 {
          margin: 18px 0 8px;
          font-size: 22px;
          line-height: 1.2;
          font-family: var(--font-display);
          letter-spacing: -0.01em;
        }
        .blog-detail__article p,
        .blog-detail__article li {
          font-size: 18px;
          line-height: 1.75;
          color: rgba(10, 10, 10, 0.84);
        }
        .blog-detail__article ul,
        .blog-detail__article ol {
          margin: 0;
          padding-left: 24px;
          display: grid;
          gap: 8px;
        }
        .blog-detail__faq-list {
          display: grid;
          gap: 12px;
        }
        .blog-detail__faq-item {
          border: 1px solid rgba(10, 10, 10, 0.12);
          border-radius: 12px;
          background: transparent;
          overflow: clip;
        }
        .blog-detail__faq-question {
          list-style: none;
          cursor: pointer;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          font-family: var(--font-display);
          font-size: clamp(18px, 1.9vw, 22px);
          font-weight: 500;
          line-height: 1.2;
          color: #0a0a0a;
          user-select: none;
        }
        .blog-detail__faq-question::-webkit-details-marker {
          display: none;
        }
        .blog-detail__faq-icon {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          border: 1px solid rgba(10, 10, 10, 0.18);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          line-height: 1;
          color: rgba(10, 10, 10, 0.8);
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }
        .blog-detail__faq-item[open] .blog-detail__faq-icon {
          transform: rotate(45deg);
        }
        .blog-detail__faq-answer {
          margin: 0;
          padding: 0 20px 18px;
          font-size: 17px;
          line-height: 1.7;
          color: rgba(10, 10, 10, 0.78);
        }
        @media (max-width: 1080px) {
          .blog-detail {
            padding-top: 112px;
          }
          .blog-detail__inner {
            grid-template-columns: 1fr;
          }
          .blog-detail__toc {
            position: static;
            border-left: none;
            border: 1px solid rgba(10, 10, 10, 0.12);
            border-radius: 12px;
            padding: 14px;
            background: #fff;
          }
        }
        @media (max-width: 700px) {
          .blog-detail {
            padding: 102px 16px 72px;
          }
          .blog-detail__article p,
          .blog-detail__article li {
            font-size: 16px;
            line-height: 1.7;
          }
          .blog-detail__faq-question {
            font-size: 18px;
            padding: 16px;
          }
          .blog-detail__faq-answer {
            padding: 0 16px 16px;
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}
