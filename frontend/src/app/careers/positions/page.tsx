import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function CareersPositionsPage() {
  return (
    <>
      <div
        style={{
          background: "#fafaf9",
          color: "#0a0a0a",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SiteHeader />
        <main
          id="main-content"
          style={{
            flex: 1,
            padding: "clamp(120px, 18vw, 160px) 20px clamp(80px, 12vw, 120px)",
            maxWidth: 720,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(10,10,10,0.45)",
              marginBottom: 16,
            }}
          >
            Careers
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 6vw, 44px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              margin: "0 0 20px",
            }}
          >
            Open positions
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: "rgba(10,10,10,0.72)",
              margin: "0 0 28px",
            }}
          >
            We post roles here as soon as they&apos;re live. If nothing matches today,
            we still read thoughtful introductions — send your work and what you want to
            build to{" "}
            <a
              href="mailto:careers@techbinaries.com"
              style={{ color: "#0a0a0a", fontWeight: 600 }}
            >
              careers@techbinaries.com
            </a>
            .
          </p>
          <div
            style={{
              padding: "28px 24px",
              borderRadius: 14,
              border: "1px solid rgba(10,10,10,0.12)",
              background: "rgba(255,255,255,0.6)",
              marginBottom: 36,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 15,
                lineHeight: 1.6,
                color: "rgba(10,10,10,0.55)",
              }}
            >
              There are no open listings at the moment. Check back soon, or reach out
              anyway — we hire deliberately and sometimes open a seat for the right person
              before a post goes up.
            </p>
          </div>
          <Link
            href="/careers"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-display)",
              fontSize: 15,
              fontWeight: 600,
              color: "#0a0a0a",
              textDecoration: "none",
            }}
          >
            <span aria-hidden>←</span> Back to Careers
          </Link>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
