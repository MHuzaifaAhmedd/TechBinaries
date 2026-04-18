// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "@studio-freight/lenis";

// gsap.registerPlugin(ScrollTrigger);

// // ── DATA ──────────────────────────────────────────────────────────────────────

// const SERVICES = [
//   {
//     num: "01",
//     title: "Product Engineering",
//     desc: "Full-stack product development from architecture to deployment. We ship robust, scalable applications that users love.",
//     tags: ["React", "Node.js", "TypeScript", "AWS"],
//   },
//   {
//     num: "02",
//     title: "Mobile Development",
//     desc: "Native and cross-platform mobile applications built for performance and delightful user experiences.",
//     tags: ["React Native", "Swift", "Kotlin"],
//   },
//   {
//     num: "03",
//     title: "Cloud & DevOps",
//     desc: "Infrastructure as code, CI/CD pipelines, and cloud architecture that scales automatically with your growth.",
//     tags: ["Kubernetes", "Terraform", "GCP", "Docker"],
//   },
//   {
//     num: "04",
//     title: "AI & Data Engineering",
//     desc: "Machine learning models, data pipelines, and AI-powered features that give your product a competitive edge.",
//     tags: ["Python", "PyTorch", "LangChain"],
//   },
//   {
//     num: "05",
//     title: "UX/UI Design",
//     desc: "Design systems, interaction design, and user research that transforms complex problems into elegant interfaces.",
//     tags: ["Figma", "Framer", "Design Systems"],
//   },
//   {
//     num: "06",
//     title: "Tech Strategy & CTO",
//     desc: "Fractional CTO services, architecture reviews, and technical roadmapping for startups and scale-ups.",
//     tags: ["Architecture", "Roadmap", "Audits"],
//   },
// ];

// const CASE_STUDIES = [
//   {
//     id: "01",
//     name: "FinEdge",
//     category: "Fintech Platform",
//     metric: "340%",
//     metricLabel: "User activation increase",
//     desc: "Rebuilt a legacy fintech platform into a modern, real-time trading dashboard serving institutional investors across 14 markets.",
//     tags: ["Platform", "Real-time", "FinTech"],
//   },
//   {
//     id: "02",
//     name: "MedCore",
//     category: "HealthTech",
//     metric: "2.1M",
//     metricLabel: "Patients served",
//     desc: "Built a HIPAA-compliant patient management system that streamlined care coordination across a national hospital network.",
//     tags: ["HIPAA", "HealthTech", "Scale"],
//   },
//   {
//     id: "03",
//     name: "ShipFast",
//     category: "Logistics AI",
//     metric: "60%",
//     metricLabel: "Cost reduction",
//     desc: "Developed an AI-powered route optimization engine that reduced operational costs and improved delivery SLAs.",
//     tags: ["AI", "Logistics", "Optimization"],
//   },
// ];

// const STATS = [
//   { value: "150+", label: "Products shipped" },
//   { value: "98%", label: "Client retention" },
//   { value: "12+", label: "Years building" },
//   { value: "40+", label: "Engineers" },
// ];

// const PROCESS = [
//   {
//     num: "01",
//     title: "Discovery",
//     desc: "Deep-dive into your business, users, and technical landscape to uncover what actually needs to be built.",
//   },
//   {
//     num: "02",
//     title: "Architecture",
//     desc: "We design the technical blueprint — systems design, stack selection, and scalability planning before writing a single line of code.",
//   },
//   {
//     num: "03",
//     title: "Build",
//     desc: "Agile sprints with weekly demos. You stay close to the work. We ship fast without cutting corners.",
//   },
//   {
//     num: "04",
//     title: "Launch & Scale",
//     desc: "Deployment, monitoring, and post-launch support. We don't disappear after go-live.",
//   },
// ];

// const TESTIMONIALS = [
//   {
//     quote:
//       "TechBinaries didn't just build our product — they challenged our assumptions, improved our roadmap, and shipped faster than any team we've worked with. Exceptional craft.",
//     name: "Sarah Chen",
//     title: "CTO, FinEdge",
//     initials: "SC",
//   },
//   {
//     quote:
//       "We went from idea to production in 11 weeks. The architecture they designed has scaled to 2M+ users without a single major incident. That's engineering excellence.",
//     name: "Marcus Williams",
//     title: "CEO, MedCore",
//     initials: "MW",
//   },
//   {
//     quote:
//       "Their AI team understood our logistics domain immediately. The route optimization model they built saved us $4M in year one. ROI was clear from week two.",
//     name: "Priya Nair",
//     title: "VP Engineering, ShipFast",
//     initials: "PN",
//   },
// ];

// const TECH = [
//   "React", "TypeScript", "Node.js", "Python", "Go", "Rust",
//   "AWS", "GCP", "Kubernetes", "PostgreSQL", "Redis", "GraphQL",
// ];

// // ── COMPONENT ─────────────────────────────────────────────────────────────────

// export default function HomePage() {
//   const cursorDot = useRef<HTMLDivElement>(null);
//   const cursorRing = useRef<HTMLDivElement>(null);
//   const [activeTestimonial, setActiveTestimonial] = useState(0);

//   // Smooth scroll
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.4,
//       easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//     });
//     lenis.on("scroll", ScrollTrigger.update);
//     const ticker = (time: number) => lenis.raf(time * 1000);
//     gsap.ticker.add(ticker);
//     gsap.ticker.lagSmoothing(0);
//     return () => {
//       gsap.ticker.remove(ticker);
//       lenis.destroy();
//     };
//   }, []);

//   // Custom cursor
//   useEffect(() => {
//     const dot = cursorDot.current;
//     const ring = cursorRing.current;
//     if (!dot || !ring) return;
//     let mx = 0, my = 0, rx = 0, ry = 0, rafId = 0;

//     const onMove = (e: MouseEvent) => {
//       mx = e.clientX;
//       my = e.clientY;
//       dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
//     };

//     const animateRing = () => {
//       rx += (mx - rx) * 0.1;
//       ry += (my - ry) * 0.1;
//       ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
//       rafId = requestAnimationFrame(animateRing);
//     };
//     animateRing();
//     window.addEventListener("mousemove", onMove);

//     const onEnter = () => {
//       ring.style.width = "56px";
//       ring.style.height = "56px";
//       ring.style.borderColor = "#000";
//     };
//     const onLeave = () => {
//       ring.style.width = "40px";
//       ring.style.height = "40px";
//       ring.style.borderColor = "rgba(0,0,0,0.25)";
//     };
//     document.querySelectorAll("a, button").forEach((el) => {
//       el.addEventListener("mouseenter", onEnter);
//       el.addEventListener("mouseleave", onLeave);
//     });

//     return () => {
//       window.removeEventListener("mousemove", onMove);
//       cancelAnimationFrame(rafId);
//     };
//   }, []);

//   // Navbar scroll effect
//   useEffect(() => {
//     const nav = document.getElementById("nav");
//     if (!nav) return;
//     const handler = () => {
//       if (window.scrollY > 50) {
//         nav.style.background = "rgba(255,255,255,0.92)";
//         nav.style.backdropFilter = "blur(24px)";
//         nav.style.borderBottomColor = "rgba(0,0,0,0.08)";
//       } else {
//         nav.style.background = "transparent";
//         nav.style.backdropFilter = "none";
//         nav.style.borderBottomColor = "transparent";
//       }
//     };
//     window.addEventListener("scroll", handler, { passive: true });
//     return () => window.removeEventListener("scroll", handler);
//   }, []);

//   // GSAP animations
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Hero: clip-path word reveal
//       gsap.fromTo(
//         ".hw",
//         { yPercent: 115 },
//         { yPercent: 0, duration: 1.1, stagger: 0.07, ease: "power4.out", delay: 0.15 }
//       );
//       // Hero: fade elements
//       gsap.fromTo(
//         ".hf",
//         { opacity: 0, y: 22 },
//         { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, delay: 0.75, ease: "power3.out" }
//       );

//       // Services grid
//       gsap.fromTo(
//         ".svc",
//         { opacity: 0, y: 50 },
//         {
//           opacity: 1, y: 0, duration: 0.75, stagger: 0.07, ease: "power3.out",
//           scrollTrigger: { trigger: "#services", start: "top 78%" },
//         }
//       );

//       // Work cards
//       gsap.fromTo(
//         ".wk",
//         { opacity: 0, y: 70 },
//         {
//           opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
//           scrollTrigger: { trigger: "#work", start: "top 75%" },
//         }
//       );

//       // Process steps
//       gsap.fromTo(
//         ".ps",
//         { opacity: 0, x: -30 },
//         {
//           opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
//           scrollTrigger: { trigger: "#process", start: "top 75%" },
//         }
//       );

//       // Section headers
//       gsap.utils.toArray<HTMLElement>(".sh").forEach((el) => {
//         gsap.fromTo(
//           el,
//           { opacity: 0, y: 36 },
//           { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }
//         );
//       });

//       // CTA block
//       gsap.fromTo(
//         "#cta-inner",
//         { opacity: 0, y: 60 },
//         { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: "#cta-inner", start: "top 82%" } }
//       );
//     });
//     return () => ctx.revert();
//   }, []);

//   return (
//     <>
//       {/* ── CURSOR ── */}
//       <div
//         ref={cursorDot}
//         style={{
//           position: "fixed", top: 0, left: 0, width: 8, height: 8,
//           background: "#000", borderRadius: "50%", pointerEvents: "none",
//           zIndex: 9999, willChange: "transform",
//         }}
//       />
//       <div
//         ref={cursorRing}
//         style={{
//           position: "fixed", top: 0, left: 0, width: 40, height: 40,
//           border: "1.5px solid rgba(0,0,0,0.25)", borderRadius: "50%",
//           pointerEvents: "none", zIndex: 9998, willChange: "transform",
//           transition: "width 0.3s, height 0.3s, border-color 0.3s",
//         }}
//       />

//       {/* ── GRAIN OVERLAY ── */}
//       <div
//         aria-hidden
//         style={{
//           position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9997,
//           backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
//           backgroundSize: "200px 200px",
//           opacity: 0.035,
//         }}
//       />

//       <div style={{ background: "#fff", color: "#000", fontFamily: "'Inter', sans-serif", overflowX: "hidden", cursor: "none" }}>

//         {/* ── NAVBAR ── */}
//         <nav
//           id="nav"
//           style={{
//             position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
//             height: 68, display: "flex", alignItems: "center",
//             justifyContent: "space-between", padding: "0 52px",
//             borderBottom: "1px solid transparent", transition: "all 0.4s ease",
//           }}
//         >
//           <a
//             href="/"
//             style={{
//               textDecoration: "none", color: "#000",
//               fontFamily: "'Space Grotesk', sans-serif",
//               fontWeight: 800, fontSize: 17, letterSpacing: "0.04em",
//             }}
//           >
//             TECHBINARIES
//           </a>
//           <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
//             {["Services", "Work", "Process", "Contact"].map((l) => (
//               <a
//                 key={l}
//                 href={`#${l.toLowerCase()}`}
//                 className="nav-link"
//                 style={{
//                   color: "rgba(0,0,0,0.45)", textDecoration: "none",
//                   fontSize: 13, fontWeight: 500, letterSpacing: "0.07em",
//                   textTransform: "uppercase", transition: "color 0.2s",
//                 }}
//               >
//                 {l}
//               </a>
//             ))}
//             <a
//               href="mailto:hello@techbinaries.com"
//               style={{
//                 padding: "9px 22px", background: "#000", color: "#fff",
//                 borderRadius: 2, fontSize: 12, fontWeight: 700,
//                 letterSpacing: "0.08em", textTransform: "uppercase",
//                 textDecoration: "none", transition: "opacity 0.2s",
//               }}
//             >
//               Start a Project
//             </a>
//           </div>
//         </nav>

//         {/* ── HERO ── */}
//         <section
//           style={{
//             minHeight: "100vh", display: "flex", flexDirection: "column",
//             justifyContent: "center", padding: "100px 52px 80px",
//             position: "relative", overflow: "hidden",
//           }}
//         >
//           {/* Dot grid */}
//           <div
//             aria-hidden
//             style={{
//               position: "absolute", inset: 0,
//               backgroundImage: "radial-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)",
//               backgroundSize: "40px 40px",
//               maskImage: "radial-gradient(ellipse 70% 65% at 30% 50%, black 0%, transparent 100%)",
//               WebkitMaskImage: "radial-gradient(ellipse 70% 65% at 30% 50%, black 0%, transparent 100%)",
//               pointerEvents: "none",
//             }}
//           />
//           {/* Edge vignette */}
//           <div
//             aria-hidden
//             style={{
//               position: "absolute", inset: 0,
//               background: "radial-gradient(ellipse 100% 60% at 50% 50%, transparent 35%, rgba(0,0,0,0.035) 100%)",
//               pointerEvents: "none",
//             }}
//           />

//           <div style={{ maxWidth: 1100, position: "relative", zIndex: 1 }}>
//             {/* Eyebrow */}
//             <div className="hf" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 44, opacity: 0 }}>
//               <span style={{ width: 28, height: 1, background: "rgba(0,0,0,0.18)", display: "inline-block", flexShrink: 0 }} />
//               <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)" }}>
//                 Software Development Studio
//               </span>
//             </div>

//             {/* Headline with clip-path word reveal */}
//             <h1
//               style={{
//                 fontFamily: "'Space Grotesk', sans-serif",
//                 fontSize: "clamp(58px, 8.5vw, 126px)",
//                 fontWeight: 800, lineHeight: 0.93,
//                 letterSpacing: "-0.03em", margin: "0 0 48px",
//               }}
//             >
//               <div style={{ overflow: "hidden", marginBottom: "0.06em" }}>
//                 <span className="hw" style={{ display: "inline-block" }}>We build</span>
//               </div>
//               <div style={{ overflow: "hidden", marginBottom: "0.06em" }}>
//                 <span className="hw" style={{ display: "inline-block", color: "transparent", WebkitTextStroke: "1.5px rgba(0,0,0,0.35)", marginRight: "0.22em" }}>
//                   digital
//                 </span>
//                 <span className="hw" style={{ display: "inline-block" }}>products</span>
//               </div>
//               <div style={{ overflow: "hidden" }}>
//                 <span className="hw" style={{ display: "inline-block" }}>that scale.</span>
//               </div>
//             </h1>

//             <p
//               className="hf"
//               style={{
//                 fontSize: 18, color: "rgba(0,0,0,0.5)", maxWidth: 500,
//                 lineHeight: 1.78, marginBottom: 48, fontWeight: 400, opacity: 0,
//               }}
//             >
//               We partner with ambitious companies to design, build, and scale software products. From zero to production — and beyond.
//             </p>

//             <div className="hf" style={{ display: "flex", gap: 14, marginBottom: 92, opacity: 0 }}>
//               <a
//                 href="mailto:hello@techbinaries.com"
//                 style={{
//                   padding: "13px 30px", background: "#000", color: "#fff",
//                   textDecoration: "none", fontSize: 13, fontWeight: 700,
//                   letterSpacing: "0.07em", textTransform: "uppercase", borderRadius: 2,
//                 }}
//               >
//                 Start a project →
//               </a>
//               <a
//                 href="#work"
//                 className="ghost-btn"
//                 style={{
//                   padding: "13px 30px", border: "1px solid rgba(0,0,0,0.18)",
//                   color: "rgba(0,0,0,0.55)", textDecoration: "none",
//                   fontSize: 13, fontWeight: 500, letterSpacing: "0.07em",
//                   textTransform: "uppercase", borderRadius: 2, transition: "all 0.25s",
//                 }}
//               >
//                 View work
//               </a>
//             </div>

//             {/* Stats row */}
//             <div
//               className="hf"
//               style={{
//                 display: "flex", gap: 0, opacity: 0,
//                 borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 40,
//               }}
//             >
//               {STATS.map((s, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     paddingRight: 44, marginRight: 44,
//                     borderRight: i < STATS.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
//                   }}
//                 >
//                   <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(26px, 3vw, 44px)", fontWeight: 800, lineHeight: 1 }}>
//                     {s.value}
//                   </div>
//                   <div style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", marginTop: 6, fontWeight: 500, letterSpacing: "0.04em" }}>
//                     {s.label}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── TECH TICKER ── */}
//         <div
//           style={{
//             borderTop: "1px solid rgba(0,0,0,0.06)",
//             borderBottom: "1px solid rgba(0,0,0,0.06)",
//             padding: "18px 0", overflow: "hidden",
//           }}
//         >
//           <div style={{ display: "flex", width: "max-content", animation: "ticker 32s linear infinite" }}>
//             {[...TECH, ...TECH].map((t, i) => (
//               <span
//                 key={i}
//                 style={{
//                   fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
//                   textTransform: "uppercase", color: "rgba(0,0,0,0.22)",
//                   flexShrink: 0, whiteSpace: "nowrap",
//                   display: "inline-flex", alignItems: "center", gap: 32, padding: "0 32px",
//                 }}
//               >
//                 {t}
//                 <span style={{ color: "rgba(0,0,0,0.1)", fontSize: 7 }}>◆</span>
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* ── SERVICES ── */}
//         <section id="services" style={{ padding: "140px 52px" }}>
//           <div style={{ maxWidth: 1240, margin: "0 auto" }}>
//             <div className="sh" style={{ marginBottom: 80, opacity: 0 }}>
//               <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.38)", marginBottom: 20 }}>
//                 What we do
//               </p>
//               <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(40px, 5.5vw, 80px)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 0.92, margin: 0 }}>
//                 Full-stack<br />
//                 <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(0,0,0,0.28)" }}>capabilities.</span>
//               </h2>
//             </div>

//             <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(0,0,0,0.08)" }}>
//               {SERVICES.map((s, i) => (
//                 <div key={i} className="svc svc-card" style={{ padding: "48px 40px", background: "#fff", opacity: 0, transition: "background 0.35s" }}>
//                   <div className="svc-num" style={{ fontSize: 12, fontWeight: 700, color: "rgba(0,0,0,0.12)", letterSpacing: "0.08em", marginBottom: 28, transition: "color 0.35s" }}>
//                     {s.num}
//                   </div>
//                   <h3 className="svc-title" style={{ fontSize: 21, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, marginBottom: 16, lineHeight: 1.2, transition: "color 0.35s" }}>
//                     {s.title}
//                   </h3>
//                   <p className="svc-desc" style={{ fontSize: 14, color: "rgba(0,0,0,0.52)", lineHeight: 1.75, marginBottom: 28, transition: "color 0.35s" }}>
//                     {s.desc}
//                   </p>
//                   <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//                     {s.tags.map((t) => (
//                       <span key={t} className="svc-tag" style={{ padding: "4px 10px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 2, fontSize: 10, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "rgba(0,0,0,0.42)", transition: "all 0.35s" }}>
//                         {t}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── WORK ── */}
//         <section id="work" style={{ padding: "140px 52px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
//           <div style={{ maxWidth: 1240, margin: "0 auto" }}>
//             <div className="sh" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 80, opacity: 0 }}>
//               <div>
//                 <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.38)", marginBottom: 20 }}>
//                   Case studies
//                 </p>
//                 <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(40px, 5.5vw, 80px)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 0.92, margin: 0 }}>
//                   Selected<br />
//                   <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(0,0,0,0.28)" }}>work.</span>
//                 </h2>
//               </div>
//               <a href="#" className="subtle-link" style={{ fontSize: 13, color: "rgba(0,0,0,0.45)", textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.12)", paddingBottom: 3, alignSelf: "flex-end", transition: "color 0.2s" }}>
//                 All projects →
//               </a>
//             </div>

//             <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "rgba(0,0,0,0.08)" }}>
//               {CASE_STUDIES.map((cs, i) => (
//                 <div key={i} className="wk wk-card" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, padding: "72px 56px", background: "#fff", opacity: 0, transition: "background 0.4s", cursor: "pointer" }}>
//                   <div>
//                     <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
//                       <span style={{ fontSize: 12, color: "rgba(0,0,0,0.35)", fontWeight: 700 }}>{cs.id}</span>
//                       <span style={{ width: 20, height: 1, background: "rgba(0,0,0,0.12)", display: "block" }} />
//                       <span style={{ fontSize: 11, color: "rgba(0,0,0,0.45)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
//                         {cs.category}
//                       </span>
//                     </div>
//                     <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(32px, 4vw, 54px)", fontWeight: 800, letterSpacing: "-0.025em", margin: "0 0 24px" }}>
//                       {cs.name}
//                     </h3>
//                     <p style={{ fontSize: 15, color: "rgba(0,0,0,0.52)", lineHeight: 1.75, maxWidth: 380, marginBottom: 32 }}>
//                       {cs.desc}
//                     </p>
//                     <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
//                       {cs.tags.map((t) => (
//                         <span key={t} style={{ padding: "4px 10px", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 2, fontSize: 10, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)" }}>
//                           {t}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", textAlign: "right" }}>
//                     <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(68px, 9vw, 128px)", fontWeight: 800, lineHeight: 0.85, color: "transparent", WebkitTextStroke: "1px rgba(0,0,0,0.2)" }}>
//                       {cs.metric}
//                     </div>
//                     <div style={{ fontSize: 13, color: "rgba(0,0,0,0.42)", marginTop: 14 }}>
//                       {cs.metricLabel}
//                     </div>
//                     <div style={{ marginTop: 36, fontSize: 13, color: "rgba(0,0,0,0.5)", borderBottom: "1px solid rgba(0,0,0,0.12)", paddingBottom: 2 }}>
//                       View case study →
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── PROCESS ── */}
//         <section id="process" style={{ padding: "140px 52px", borderTop: "1px solid rgba(0,0,0,0.06)", background: "#fff" }}>
//           <div style={{ maxWidth: 1240, margin: "0 auto" }}>
//             <div className="sh" style={{ marginBottom: 100, opacity: 0 }}>
//               <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.38)", marginBottom: 20 }}>
//                 How we work
//               </p>
//               <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(40px, 5.5vw, 80px)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 0.92, margin: 0 }}>
//                 Our<br />
//                 <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(0,0,0,0.28)" }}>process.</span>
//               </h2>
//             </div>

//             <div style={{ position: "relative", paddingLeft: 32 }}>
//               <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "rgba(0,0,0,0.1)" }} />
//               {PROCESS.map((step, i) => (
//                 <div
//                   key={i}
//                   className="ps"
//                   style={{
//                     display: "grid", gridTemplateColumns: "300px 1fr", gap: 64,
//                     padding: "64px 0", position: "relative", opacity: 0,
//                     borderBottom: i < PROCESS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
//                   }}
//                 >
//                   <div style={{ position: "absolute", left: -36, top: "50%", transform: "translateY(-50%)", width: 10, height: 10, background: "#fff", border: "1px solid rgba(0,0,0,0.22)", borderRadius: "50%" }} />
//                   <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
//                     <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(52px, 6vw, 88px)", fontWeight: 800, color: "rgba(0,0,0,0.06)", lineHeight: 1, flexShrink: 0 }}>
//                       {step.num}
//                     </span>
//                     <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
//                       {step.title}
//                     </h3>
//                   </div>
//                   <div style={{ display: "flex", alignItems: "center" }}>
//                     <p style={{ fontSize: 16, color: "rgba(0,0,0,0.52)", lineHeight: 1.8, margin: 0 }}>
//                       {step.desc}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── TESTIMONIALS ── */}
//         <section id="contact" style={{ padding: "140px 52px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
//           <div style={{ maxWidth: 920, margin: "0 auto" }}>
//             <div className="sh" style={{ marginBottom: 80, opacity: 0 }}>
//               <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.38)", marginBottom: 20 }}>
//                 Client voices
//               </p>
//               <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 0.92, margin: 0 }}>
//                 What clients<br />
//                 <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(0,0,0,0.28)" }}>say.</span>
//               </h2>
//             </div>

//             <div style={{ position: "relative", minHeight: 320 }}>
//               {TESTIMONIALS.map((t, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     position: i === 0 ? "relative" : "absolute",
//                     top: 0, left: 0, right: 0,
//                     opacity: activeTestimonial === i ? 1 : 0,
//                     transform: `translateY(${activeTestimonial === i ? 0 : 16}px)`,
//                     transition: "opacity 0.5s ease, transform 0.5s ease",
//                     pointerEvents: activeTestimonial === i ? "auto" : "none",
//                   }}
//                 >
//                   <blockquote style={{ fontSize: "clamp(17px, 2.2vw, 24px)", fontWeight: 400, lineHeight: 1.65, color: "rgba(0,0,0,0.72)", margin: "0 0 48px", fontStyle: "italic", borderLeft: "2px solid rgba(0,0,0,0.12)", paddingLeft: 32 }}>
//                     &ldquo;{t.quote}&rdquo;
//                   </blockquote>
//                   <div style={{ display: "flex", alignItems: "center", gap: 16, paddingLeft: 32 }}>
//                     <div style={{ width: 40, height: 40, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.12)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", flexShrink: 0 }}>
//                       {t.initials}
//                     </div>
//                     <div>
//                       <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
//                       <div style={{ fontSize: 13, color: "rgba(0,0,0,0.45)" }}>{t.title}</div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div style={{ display: "flex", gap: 8, marginTop: 72 }}>
//               {TESTIMONIALS.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setActiveTestimonial(i)}
//                   style={{
//                     width: activeTestimonial === i ? 36 : 8, height: 2,
//                     background: activeTestimonial === i ? "#000" : "rgba(0,0,0,0.15)",
//                     border: "none", cursor: "pointer", padding: 0,
//                     transition: "all 0.35s ease", borderRadius: 0,
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── CTA ── */}
//         <section style={{ padding: "0 52px 100px" }}>
//           <div
//             id="cta-inner"
//             style={{
//               border: "1px solid rgba(0,0,0,0.12)", borderRadius: 4,
//               padding: "120px 80px", position: "relative", overflow: "hidden",
//               background: "#000", opacity: 0,
//             }}
//           >
//             {/* Grid lines */}
//             <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
//             {/* Glow */}
//             <div aria-hidden style={{ position: "absolute", top: "-30%", right: "-5%", width: 500, height: 500, background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

//             <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
//               <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 28 }}>
//                 Ready to build?
//               </p>
//               <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(44px, 6.5vw, 100px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 0.9, margin: "0 0 36px", color: "#fff" }}>
//                 Let&apos;s turn your<br />
//                 <span style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.45)" }}>vision</span>{" "}into product.
//               </h2>
//               <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", marginBottom: 48 }}>
//                 Free discovery call. No commitments. Just clarity.
//               </p>
//               <a
//                 href="mailto:hello@techbinaries.com"
//                 style={{
//                   display: "inline-flex", alignItems: "center", gap: 12,
//                   padding: "15px 36px", background: "#fff", color: "#000",
//                   textDecoration: "none", fontSize: 13, fontWeight: 700,
//                   letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 2,
//                   transition: "opacity 0.2s",
//                 }}
//               >
//                 Book a discovery call →
//               </a>
//             </div>
//           </div>
//         </section>

//         {/* ── FOOTER ── */}
//         <footer style={{ padding: "40px 52px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
//           <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "0.04em" }}>
//             TECHBINARIES
//           </div>
//           <div style={{ fontSize: 12, color: "rgba(0,0,0,0.4)" }}>
//             © 2024 TechBinaries. All rights reserved.
//           </div>
//           <div style={{ display: "flex", gap: 28 }}>
//             {["Privacy", "Terms", "LinkedIn"].map((l) => (
//               <a key={l} href="#" className="subtle-link" style={{ fontSize: 12, color: "rgba(0,0,0,0.4)", textDecoration: "none", transition: "color 0.2s" }}>
//                 {l}
//               </a>
//             ))}
//           </div>
//         </footer>
//       </div>

//       {/* ── GLOBAL STYLES ── */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//         html, body { cursor: none !important; background: #fff; }
//         ::selection { background: rgba(0,0,0,0.12); color: #000; }

//         @keyframes ticker {
//           from { transform: translateX(0); }
//           to   { transform: translateX(-50%); }
//         }

//         /* Navbar links */
//         .nav-link:hover { color: #000 !important; }

//         /* Service card inversion on hover */
//         .svc-card:hover                { background: #000 !important; }
//         .svc-card:hover .svc-num       { color: rgba(255,255,255,0.2) !important; }
//         .svc-card:hover .svc-title     { color: #fff !important; }
//         .svc-card:hover .svc-desc      { color: rgba(255,255,255,0.65) !important; }
//         .svc-card:hover .svc-tag       { border-color: rgba(255,255,255,0.22) !important; color: rgba(255,255,255,0.75) !important; }

//         /* Work card hover */
//         .wk-card:hover { background: #f5f5f5 !important; }

//         /* Ghost button hover */
//         .ghost-btn:hover { border-color: rgba(0,0,0,0.45) !important; color: #000 !important; }

//         /* Subtle links hover */
//         .subtle-link:hover { color: rgba(0,0,0,0.75) !important; }

//         /* ── RESPONSIVE ── */
//         @media (max-width: 1100px) {
//           div[style*="repeat(3, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
//         }
//         @media (max-width: 768px) {
//           #nav { padding: 0 24px !important; }
//           #nav > div:last-child > a:not(:last-child) { display: none; }
//           section, div[style*="padding: \\"0 52px"] { padding-left: 24px !important; padding-right: 24px !important; }
//           div[style*="repeat(3, 1fr)"],
//           div[style*="repeat(2, 1fr)"],
//           div[style*="1fr 1fr"],
//           div[style*="300px 1fr"] { grid-template-columns: 1fr !important; }
//           div[style*="gap: 64"] { gap: 32px !important; }
//           #cta-inner { padding: 64px 32px !important; }
//         }
//       `}</style>
//     </>
//   );
// }

//version 2
// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "@studio-freight/lenis";

// gsap.registerPlugin(ScrollTrigger);

// // ── DATA ──────────────────────────────────────────────────────────────────────

// const SERVICES = [
//   {
//     num: "01",
//     title: "Product Engineering",
//     desc: "Full-stack product development from architecture to deployment. We ship robust, scalable applications that users love.",
//     tags: ["React", "Node.js", "TypeScript", "AWS"],
//   },
//   {
//     num: "02",
//     title: "Mobile Development",
//     desc: "Native and cross-platform mobile applications built for performance and delightful user experiences.",
//     tags: ["React Native", "Swift", "Kotlin"],
//   },
//   {
//     num: "03",
//     title: "Cloud & DevOps",
//     desc: "Infrastructure as code, CI/CD pipelines, and cloud architecture that scales automatically with your growth.",
//     tags: ["Kubernetes", "Terraform", "GCP", "Docker"],
//   },
//   {
//     num: "04",
//     title: "AI & Data Engineering",
//     desc: "Machine learning models, data pipelines, and AI-powered features that give your product a competitive edge.",
//     tags: ["Python", "PyTorch", "LangChain"],
//   },
//   {
//     num: "05",
//     title: "UX/UI Design",
//     desc: "Design systems, interaction design, and user research that transforms complex problems into elegant interfaces.",
//     tags: ["Figma", "Framer", "Design Systems"],
//   },
//   {
//     num: "06",
//     title: "Tech Strategy & CTO",
//     desc: "Fractional CTO services, architecture reviews, and technical roadmapping for startups and scale-ups.",
//     tags: ["Architecture", "Roadmap", "Audits"],
//   },
// ];

// const CASE_STUDIES = [
//   {
//     id: "01",
//     name: "FinEdge",
//     category: "Fintech Platform",
//     year: "2024",
//     metric: "340%",
//     metricLabel: "User activation",
//     desc: "Rebuilt a legacy fintech platform into a modern, real-time trading dashboard serving institutional investors across 14 markets.",
//     tags: ["Platform", "Real-time", "FinTech"],
//   },
//   {
//     id: "02",
//     name: "MedCore",
//     category: "HealthTech",
//     year: "2024",
//     metric: "2.1M",
//     metricLabel: "Patients served",
//     desc: "Built a HIPAA-compliant patient management system that streamlined care coordination across a national hospital network.",
//     tags: ["HIPAA", "HealthTech", "Scale"],
//   },
//   {
//     id: "03",
//     name: "ShipFast",
//     category: "Logistics AI",
//     year: "2023",
//     metric: "60%",
//     metricLabel: "Cost reduction",
//     desc: "Developed an AI-powered route optimization engine that reduced operational costs and improved delivery SLAs.",
//     tags: ["AI", "Logistics", "Optimization"],
//   },
// ];

// const STATS = [
//   { value: "150+", label: "Products shipped" },
//   { value: "98%", label: "Client retention" },
//   { value: "12+", label: "Years building" },
//   { value: "40+", label: "Engineers" },
// ];

// const PROCESS = [
//   {
//     num: "01",
//     title: "Discovery",
//     desc: "Deep-dive into your business, users, and technical landscape to uncover what actually needs to be built.",
//     points: ["Stakeholder interviews", "Technical audit", "Opportunity mapping"],
//   },
//   {
//     num: "02",
//     title: "Architecture",
//     desc: "We design the technical blueprint — systems design, stack selection, and scalability planning before writing code.",
//     points: ["Systems design", "Stack selection", "Scalability plan"],
//   },
//   {
//     num: "03",
//     title: "Build",
//     desc: "Agile sprints with weekly demos. You stay close to the work. We ship fast without cutting corners.",
//     points: ["Weekly demos", "CI/CD pipeline", "Continuous QA"],
//   },
//   {
//     num: "04",
//     title: "Launch & Scale",
//     desc: "Deployment, monitoring, and post-launch support. We don't disappear after go-live.",
//     points: ["Production launch", "Observability", "Ongoing support"],
//   },
// ];

// const TESTIMONIALS = [
//   {
//     quote:
//       "TechBinaries didn't just build our product — they challenged our assumptions, improved our roadmap, and shipped faster than any team we've worked with. Exceptional craft.",
//     name: "Sarah Chen",
//     title: "CTO, FinEdge",
//     initials: "SC",
//   },
//   {
//     quote:
//       "We went from idea to production in 11 weeks. The architecture they designed has scaled to 2M+ users without a single major incident. That's engineering excellence.",
//     name: "Marcus Williams",
//     title: "CEO, MedCore",
//     initials: "MW",
//   },
//   {
//     quote:
//       "Their AI team understood our logistics domain immediately. The route optimization model they built saved us $4M in year one. ROI was clear from week two.",
//     name: "Priya Nair",
//     title: "VP Engineering, ShipFast",
//     initials: "PN",
//   },
// ];

// const TECH = [
//   "React", "TypeScript", "Node.js", "Python", "Go", "Rust",
//   "AWS", "GCP", "Kubernetes", "PostgreSQL", "Redis", "GraphQL",
//   "Next.js", "PyTorch", "Terraform", "Docker",
// ];

// const CLIENTS = ["FinEdge", "MedCore", "ShipFast", "Atlas", "Northwind", "Orbital", "Veritas", "Helix"];

// // ── COMPONENT ─────────────────────────────────────────────────────────────────

// export default function HomePage() {
//   const cursorDot = useRef<HTMLDivElement>(null);
//   const cursorRing = useRef<HTMLDivElement>(null);
//   const [activeTestimonial, setActiveTestimonial] = useState(0);
//   const [time, setTime] = useState("");

//   // Live clock (Karachi local feel — small studio signal)
//   useEffect(() => {
//     const update = () => {
//       const d = new Date();
//       const hh = d.getHours().toString().padStart(2, "0");
//       const mm = d.getMinutes().toString().padStart(2, "0");
//       setTime(`${hh}:${mm}`);
//     };
//     update();
//     const id = setInterval(update, 30_000);
//     return () => clearInterval(id);
//   }, []);

//   // Smooth scroll (Lenis) — tighter settings so pinned sections don't desync
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.1,
//       easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       wheelMultiplier: 1,
//       touchMultiplier: 1.4,
//       smoothWheel: true,
//     });
//     lenis.on("scroll", ScrollTrigger.update);
//     const ticker = (time: number) => lenis.raf(time * 1000);
//     gsap.ticker.add(ticker);
//     gsap.ticker.lagSmoothing(0);
//     return () => {
//       gsap.ticker.remove(ticker);
//       lenis.destroy();
//     };
//   }, []);

//   // Custom cursor
//   useEffect(() => {
//     const dot = cursorDot.current;
//     const ring = cursorRing.current;
//     if (!dot || !ring) return;
//     let mx = 0, my = 0, rx = 0, ry = 0, rafId = 0;

//     const onMove = (e: MouseEvent) => {
//       mx = e.clientX;
//       my = e.clientY;
//       dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
//     };

//     const animateRing = () => {
//       rx += (mx - rx) * 0.14;
//       ry += (my - ry) * 0.14;
//       ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
//       rafId = requestAnimationFrame(animateRing);
//     };
//     animateRing();
//     window.addEventListener("mousemove", onMove);

//     const onEnter = () => {
//       ring.style.width = "48px";
//       ring.style.height = "48px";
//       ring.style.borderColor = "rgba(0,0,0,0.6)";
//     };
//     const onLeave = () => {
//       ring.style.width = "32px";
//       ring.style.height = "32px";
//       ring.style.borderColor = "rgba(0,0,0,0.2)";
//     };
//     const interactive = document.querySelectorAll("a, button, [data-cursor]");
//     interactive.forEach((el) => {
//       el.addEventListener("mouseenter", onEnter);
//       el.addEventListener("mouseleave", onLeave);
//     });

//     return () => {
//       window.removeEventListener("mousemove", onMove);
//       cancelAnimationFrame(rafId);
//       interactive.forEach((el) => {
//         el.removeEventListener("mouseenter", onEnter);
//         el.removeEventListener("mouseleave", onLeave);
//       });
//     };
//   }, []);

//   // Navbar scroll effect
//   useEffect(() => {
//     const nav = document.getElementById("nav");
//     if (!nav) return;
//     const handler = () => {
//       if (window.scrollY > 40) {
//         nav.style.background = "rgba(255,255,255,0.78)";
//         nav.style.backdropFilter = "blur(20px)";
//         (nav.style as any).WebkitBackdropFilter = "blur(20px)";
//         nav.style.borderBottomColor = "rgba(0,0,0,0.06)";
//       } else {
//         nav.style.background = "transparent";
//         nav.style.backdropFilter = "none";
//         (nav.style as any).WebkitBackdropFilter = "none";
//         nav.style.borderBottomColor = "transparent";
//       }
//     };
//     handler();
//     window.addEventListener("scroll", handler, { passive: true });
//     return () => window.removeEventListener("scroll", handler);
//   }, []);

//   // GSAP animations
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Hero: line-by-line word reveal
//       gsap.fromTo(
//         ".hw",
//         { yPercent: 115 },
//         { yPercent: 0, duration: 1.15, stagger: 0.065, ease: "power4.out", delay: 0.2 }
//       );
//       gsap.fromTo(
//         ".hf",
//         { opacity: 0, y: 24 },
//         { opacity: 1, y: 0, duration: 0.95, stagger: 0.1, delay: 0.85, ease: "power3.out" }
//       );

//       // Count-up for stats
//       gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
//         const raw = el.dataset.val || "";
//         const m = raw.match(/^([\d.]+)(.*)$/);
//         if (!m) return;
//         const target = parseFloat(m[1]);
//         const suffix = m[2];
//         const isInt = Number.isInteger(target);
//         const obj = { v: 0 };
//         gsap.to(obj, {
//           v: target,
//           duration: 1.6,
//           ease: "power2.out",
//           scrollTrigger: { trigger: el, start: "top 85%" },
//           onUpdate: () => {
//             el.textContent = (isInt ? Math.round(obj.v).toString() : obj.v.toFixed(1)) + suffix;
//           },
//         });
//       });

//       // Services rows — reveal + animate underline
//       gsap.utils.toArray<HTMLElement>(".svc-row").forEach((row, i) => {
//         gsap.fromTo(
//           row,
//           { opacity: 0, y: 30 },
//           {
//             opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
//             delay: i * 0.05,
//             scrollTrigger: { trigger: row, start: "top 88%" },
//           }
//         );
//       });

//       // Case study cards
//       gsap.fromTo(
//         ".wk",
//         { opacity: 0, y: 60 },
//         {
//           opacity: 1, y: 0, duration: 0.95, stagger: 0.12, ease: "power3.out",
//           scrollTrigger: { trigger: "#work", start: "top 78%" },
//         }
//       );

//       // Process: horizontal pin — use scrub: true (no lag) + anticipatePin to prevent jump
//       const processTrack = document.querySelector<HTMLElement>(".process-track");
//       const processPin = document.querySelector<HTMLElement>(".process-pin");
//       if (processTrack && processPin) {
//         const getScrollDistance = () =>
//           processTrack.scrollWidth - window.innerWidth + 80;

//         gsap.to(processTrack, {
//           x: () => -getScrollDistance(),
//           ease: "none",
//           scrollTrigger: {
//             trigger: processPin,
//             start: "top top",
//             end: () => `+=${getScrollDistance()}`,
//             pin: true,
//             pinSpacing: true,
//             scrub: true,             // locked to scroll, no "catching up"
//             anticipatePin: 1,        // pre-pins to prevent visual jump
//             invalidateOnRefresh: true,
//           },
//         });
//       }

//       // Section headers
//       gsap.utils.toArray<HTMLElement>(".sh").forEach((el) => {
//         gsap.fromTo(
//           el,
//           { opacity: 0, y: 38 },
//           { opacity: 1, y: 0, duration: 0.95, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }
//         );
//       });

//       // Tech marquee animation handled via CSS keyframes — no JS needed here

//       // CTA
//       gsap.fromTo(
//         "#cta-inner",
//         { opacity: 0, y: 50 },
//         { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: "#cta-inner", start: "top 85%" } }
//       );

//       // Section tag fade-in
//       gsap.utils.toArray<HTMLElement>(".tag").forEach((el) => {
//         gsap.fromTo(
//           el,
//           { opacity: 0 },
//           { opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%" } }
//         );
//       });
//     });
//     return () => ctx.revert();
//   }, []);

//   // Refresh ScrollTrigger once fonts have loaded (they can shift layout heights,
//   // which otherwise causes pinned sections to use stale measurements → jump)
//   useEffect(() => {
//     if (typeof document === "undefined" || !(document as any).fonts?.ready) return;
//     (document as any).fonts.ready.then(() => {
//       ScrollTrigger.refresh();
//     });
//   }, []);

//   return (
//     <>
//       {/* ── CURSOR ── */}
//       <div
//         ref={cursorDot}
//         style={{
//           position: "fixed", top: 0, left: 0, width: 6, height: 6,
//           background: "#000", borderRadius: "50%", pointerEvents: "none",
//           zIndex: 9999, willChange: "transform",
//         }}
//       />
//       <div
//         ref={cursorRing}
//         style={{
//           position: "fixed", top: 0, left: 0, width: 32, height: 32,
//           border: "1px solid rgba(0,0,0,0.2)", borderRadius: "50%",
//           pointerEvents: "none", zIndex: 9998, willChange: "transform",
//           transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
//         }}
//       />

//       {/* ── GRAIN OVERLAY ── */}
//       <div
//         aria-hidden
//         style={{
//           position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9997,
//           backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
//           backgroundSize: "180px 180px",
//           opacity: 0.028,
//           mixBlendMode: "multiply",
//         }}
//       />

//       <div
//         style={{
//           background: "#fafaf9",
//           color: "#0a0a0a",
//           fontFamily: "'Inter', sans-serif",
//           overflowX: "hidden",
//           cursor: "none",
//         }}
//       >
//         {/* ── NAVBAR ── */}
//         <nav
//           id="nav"
//           style={{
//             position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
//             height: 64, display: "flex", alignItems: "center",
//             justifyContent: "space-between", padding: "0 40px",
//             borderBottom: "1px solid transparent", transition: "background 0.4s ease, border-color 0.4s ease",
//           }}
//         >
//           <a
//             href="/"
//             style={{
//               textDecoration: "none", color: "#0a0a0a",
//               display: "flex", alignItems: "center", gap: 10,
//             }}
//           >
//             <span
//               aria-hidden
//               style={{
//                 width: 20, height: 20, background: "#0a0a0a",
//                 display: "inline-block",
//                 maskImage: "radial-gradient(circle at 50% 50%, #000 42%, transparent 44%)",
//                 WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 42%, transparent 44%)",
//                 boxShadow: "inset 0 0 0 2px #0a0a0a",
//                 borderRadius: "50%",
//                 position: "relative",
//               }}
//             />
//             <span
//               style={{
//                 fontFamily: "'Space Grotesk', sans-serif",
//                 fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em",
//               }}
//             >
//               techbinaries<span style={{ color: "rgba(0,0,0,0.25)" }}>.</span>
//             </span>
//           </a>

//           <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="nav-links">
//             {[
//               { label: "Services", href: "#services" },
//               { label: "Work", href: "#work" },
//               { label: "Process", href: "#process" },
//               { label: "Studio", href: "#studio" },
//               { label: "Contact", href: "#contact" },
//             ].map((l) => (
//               <a
//                 key={l.label}
//                 href={l.href}
//                 className="nav-link"
//                 style={{
//                   color: "rgba(0,0,0,0.55)", textDecoration: "none",
//                   fontSize: 13, fontWeight: 500, padding: "8px 14px",
//                   borderRadius: 999, transition: "color 0.2s, background 0.2s",
//                 }}
//               >
//                 {l.label}
//               </a>
//             ))}
//           </div>

//           <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(0,0,0,0.5)" }} className="nav-clock">
//               <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", boxShadow: "0 0 0 3px rgba(22,163,74,0.15)" }} />
//               <span style={{ fontVariantNumeric: "tabular-nums" }}>{time || "—"}</span>
//               <span style={{ opacity: 0.45 }}>KHI</span>
//             </div>
//             <a
//               href="mailto:hello@techbinaries.com"
//               style={{
//                 display: "inline-flex", alignItems: "center", gap: 8,
//                 padding: "9px 18px", background: "#0a0a0a", color: "#fafaf9",
//                 borderRadius: 999, fontSize: 13, fontWeight: 500,
//                 textDecoration: "none", transition: "background 0.2s",
//               }}
//             >
//               Start a project
//               <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: "#fafaf9" }} />
//             </a>
//           </div>
//         </nav>

//         {/* ── HERO ── */}
//         <section
//           style={{
//             minHeight: "100vh", display: "flex", flexDirection: "column",
//             justifyContent: "center", padding: "120px 40px 60px",
//             position: "relative", overflow: "hidden",
//           }}
//         >
//           {/* Dot grid */}
//           <div
//             aria-hidden
//             style={{
//               position: "absolute", inset: 0,
//               backgroundImage: "radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px)",
//               backgroundSize: "32px 32px",
//               maskImage: "radial-gradient(ellipse 75% 65% at 50% 45%, black 0%, transparent 95%)",
//               WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 45%, black 0%, transparent 95%)",
//               pointerEvents: "none",
//             }}
//           />

//           {/* Large faint background glyph */}
//           <div
//             aria-hidden
//             style={{
//               position: "absolute", right: -80, bottom: -80, pointerEvents: "none",
//               fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
//               fontSize: "clamp(400px, 50vw, 720px)", color: "rgba(0,0,0,0.028)",
//               lineHeight: 0.8, letterSpacing: "-0.06em", userSelect: "none",
//             }}
//           >
//             tb
//           </div>

//           <div style={{ maxWidth: 1320, width: "100%", margin: "0 auto", position: "relative", zIndex: 1 }}>
//             {/* Eyebrow */}
//             <div className="hf" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40, opacity: 0 }}>
//               <span style={{ width: 28, height: 1, background: "rgba(0,0,0,0.25)", display: "inline-block", flexShrink: 0 }} />
//               <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.55)" }}>
//                 Software Engineering Studio
//               </span>
//             </div>

//             {/* Headline */}
//             <h1
//               style={{
//                 fontFamily: "'Space Grotesk', sans-serif",
//                 fontSize: "clamp(60px, 9.5vw, 156px)",
//                 fontWeight: 500, lineHeight: 0.92,
//                 letterSpacing: "-0.04em", margin: "0 0 56px",
//               }}
//             >
//               <div style={{ overflow: "hidden", paddingBottom: "0.05em" }}>
//                 <span className="hw" style={{ display: "inline-block" }}>We engineer</span>
//               </div>
//               <div style={{ overflow: "hidden", paddingBottom: "0.05em" }}>
//                 <span className="hw" style={{ display: "inline-block", fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.75)", marginRight: "0.2em" }}>
//                   durable
//                 </span>
//                 <span className="hw" style={{ display: "inline-block" }}>software</span>
//               </div>
//               <div style={{ overflow: "hidden" }}>
//                 <span className="hw" style={{ display: "inline-block" }}>for ambitious teams.</span>
//               </div>
//             </h1>

//             {/* Intro row */}
//             <div
//               className="hf"
//               style={{
//                 display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60,
//                 alignItems: "end", marginBottom: 64, opacity: 0,
//               }}
//             >
//               <p
//                 style={{
//                   fontSize: 17, color: "rgba(0,0,0,0.6)", maxWidth: 480,
//                   lineHeight: 1.65, margin: 0, fontWeight: 400,
//                 }}
//               >
//                 A senior team of engineers, designers, and strategists partnering with
//                 startups and scale-ups to design, build, and ship products that matter —
//                 from zero to production and long after.
//               </p>
//               <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }} className="hero-cta">
//                 <a
//                   href="mailto:hello@techbinaries.com"
//                   style={{
//                     display: "inline-flex", alignItems: "center", gap: 10,
//                     padding: "14px 26px", background: "#0a0a0a", color: "#fafaf9",
//                     textDecoration: "none", fontSize: 14, fontWeight: 500,
//                     borderRadius: 999, transition: "transform 0.2s",
//                   }}
//                 >
//                   Start a project
//                   <span aria-hidden style={{ display: "inline-block", transition: "transform 0.2s" }}>→</span>
//                 </a>
//                 <a
//                   href="#work"
//                   className="ghost-btn"
//                   style={{
//                     display: "inline-flex", alignItems: "center", gap: 10,
//                     padding: "14px 26px", border: "1px solid rgba(0,0,0,0.15)",
//                     color: "rgba(0,0,0,0.75)", textDecoration: "none",
//                     fontSize: 14, fontWeight: 500, borderRadius: 999,
//                     transition: "background 0.2s, border-color 0.2s",
//                     background: "rgba(255,255,255,0.5)",
//                   }}
//                 >
//                   View selected work
//                 </a>
//               </div>
//             </div>

//             {/* Stats row */}
//             <div
//               className="hf"
//               style={{
//                 display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, opacity: 0,
//                 borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: 28,
//               }}
//             >
//               {STATS.map((s, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     padding: "4px 0",
//                     borderRight: i < STATS.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
//                     paddingLeft: i === 0 ? 0 : 32,
//                   }}
//                 >
//                   <div
//                     className="stat-num"
//                     data-val={s.value}
//                     style={{
//                       fontFamily: "'Space Grotesk', sans-serif",
//                       fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 500,
//                       lineHeight: 1, letterSpacing: "-0.03em",
//                       fontVariantNumeric: "tabular-nums",
//                     }}
//                   >
//                     {s.value}
//                   </div>
//                   <div style={{ fontSize: 12, color: "rgba(0,0,0,0.5)", marginTop: 10, fontWeight: 500 }}>
//                     {s.label}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── TRUSTED BY ── */}
//         <section
//           style={{
//             padding: "36px 40px", borderTop: "1px solid rgba(0,0,0,0.06)",
//             borderBottom: "1px solid rgba(0,0,0,0.06)",
//           }}
//         >
//           <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
//             <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", flexShrink: 0 }}>
//               Trusted by
//             </span>
//             <div
//               style={{
//                 flex: 1, display: "flex", gap: 48, alignItems: "center",
//                 flexWrap: "wrap", rowGap: 16,
//               }}
//             >
//               {CLIENTS.map((c) => (
//                 <span
//                   key={c}
//                   style={{
//                     fontFamily: "'Space Grotesk', sans-serif",
//                     fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em",
//                     color: "rgba(0,0,0,0.35)", transition: "color 0.2s",
//                   }}
//                   className="client-logo"
//                 >
//                   {c}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── SERVICES (LIST STYLE) ── */}
//         <section id="services" style={{ padding: "160px 40px", position: "relative" }}>
//           <div style={{ maxWidth: 1320, margin: "0 auto" }}>
//             {/* Header row */}
//             <div
//               className="sh"
//               style={{
//                 display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80,
//                 alignItems: "start", marginBottom: 100, opacity: 0,
//               }}
//             >
//               <div>
//                 <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
//                   <span style={{ width: 6, height: 6, background: "#0a0a0a", borderRadius: "50%" }} />
//                   <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.55)" }}>
//                     Capabilities / 01
//                   </span>
//                 </div>
//                 <h2
//                   style={{
//                     fontFamily: "'Space Grotesk', sans-serif",
//                     fontSize: "clamp(42px, 5.5vw, 84px)", fontWeight: 500,
//                     letterSpacing: "-0.035em", lineHeight: 0.95, margin: 0,
//                   }}
//                 >
//                   What we<br />
//                   <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>
//                     do best.
//                   </span>
//                 </h2>
//               </div>
//               <div style={{ alignSelf: "end" }}>
//                 <p style={{ fontSize: 16, color: "rgba(0,0,0,0.6)", lineHeight: 1.7, margin: 0, maxWidth: 540 }}>
//                   We operate as an embedded extension of your team — senior engineers who
//                   care about the craft and the business outcome in equal measure.
//                 </p>
//               </div>
//             </div>

//             {/* Services list */}
//             <div style={{ borderTop: "1px solid rgba(0,0,0,0.12)" }}>
//               {SERVICES.map((s, i) => (
//                 <div
//                   key={i}
//                   className="svc-row"
//                   data-cursor
//                   style={{
//                     position: "relative", display: "grid",
//                     gridTemplateColumns: "80px 1fr 1.1fr 240px",
//                     gap: 40, padding: "40px 0", alignItems: "center",
//                     borderBottom: "1px solid rgba(0,0,0,0.12)",
//                     opacity: 0, cursor: "pointer",
//                     transition: "padding 0.35s ease",
//                   }}
//                 >
//                   {/* Number */}
//                   <span
//                     style={{
//                       fontFamily: "'Space Grotesk', sans-serif",
//                       fontSize: 13, fontWeight: 500, color: "rgba(0,0,0,0.35)",
//                       fontVariantNumeric: "tabular-nums",
//                     }}
//                   >
//                     {s.num}
//                   </span>
//                   {/* Title */}
//                   <h3
//                     className="svc-title"
//                     style={{
//                       fontFamily: "'Space Grotesk', sans-serif",
//                       fontSize: "clamp(24px, 2.6vw, 38px)", fontWeight: 500,
//                       letterSpacing: "-0.025em", lineHeight: 1.05, margin: 0,
//                       transition: "color 0.3s",
//                     }}
//                   >
//                     {s.title}
//                   </h3>
//                   {/* Description */}
//                   <p
//                     style={{
//                       fontSize: 14.5, color: "rgba(0,0,0,0.58)",
//                       lineHeight: 1.65, margin: 0,
//                     }}
//                   >
//                     {s.desc}
//                   </p>
//                   {/* Tags */}
//                   <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "flex-end" }}>
//                     {s.tags.map((t) => (
//                       <span
//                         key={t}
//                         style={{
//                           padding: "5px 10px", border: "1px solid rgba(0,0,0,0.14)",
//                           borderRadius: 999, fontSize: 11, fontWeight: 500,
//                           color: "rgba(0,0,0,0.55)",
//                           background: "rgba(255,255,255,0.6)",
//                           transition: "all 0.25s",
//                         }}
//                         className="svc-tag"
//                       >
//                         {t}
//                       </span>
//                     ))}
//                   </div>
//                   {/* Hover arrow */}
//                   <span
//                     className="svc-arrow"
//                     aria-hidden
//                     style={{
//                       position: "absolute", right: -4, top: "50%",
//                       transform: "translateY(-50%) translateX(-12px)",
//                       opacity: 0, transition: "opacity 0.3s, transform 0.3s",
//                       fontSize: 18, color: "rgba(0,0,0,0.4)",
//                     }}
//                   >
//                     ↗
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── WORK ── */}
//         <section id="work" style={{ padding: "160px 40px", background: "#f5f5f4", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
//           <div style={{ maxWidth: 1320, margin: "0 auto" }}>
//             <div
//               className="sh"
//               style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 100, opacity: 0, gap: 40, flexWrap: "wrap" }}
//             >
//               <div>
//                 <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
//                   <span style={{ width: 6, height: 6, background: "#0a0a0a", borderRadius: "50%" }} />
//                   <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.55)" }}>
//                     Case Studies / 02
//                   </span>
//                 </div>
//                 <h2
//                   style={{
//                     fontFamily: "'Space Grotesk', sans-serif",
//                     fontSize: "clamp(42px, 5.5vw, 84px)", fontWeight: 500,
//                     letterSpacing: "-0.035em", lineHeight: 0.95, margin: 0,
//                   }}
//                 >
//                   Selected<br />
//                   <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>work.</span>
//                 </h2>
//               </div>
//               <a
//                 href="#"
//                 className="link-underline"
//                 style={{
//                   fontSize: 14, color: "rgba(0,0,0,0.75)", textDecoration: "none",
//                   display: "inline-flex", alignItems: "center", gap: 8,
//                   borderBottom: "1px solid rgba(0,0,0,0.25)", paddingBottom: 4,
//                 }}
//               >
//                 View all projects
//                 <span aria-hidden>→</span>
//               </a>
//             </div>

//             <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
//               {CASE_STUDIES.map((cs, i) => (
//                 <article
//                   key={i}
//                   className="wk wk-card"
//                   data-cursor
//                   style={{
//                     display: "grid", gridTemplateColumns: "1fr 1fr",
//                     background: "#fafaf9", borderRadius: 24,
//                     padding: "56px 56px", opacity: 0, cursor: "pointer",
//                     border: "1px solid rgba(0,0,0,0.06)",
//                     transition: "transform 0.4s ease, box-shadow 0.4s ease",
//                     gap: 60,
//                   }}
//                 >
//                   {/* LEFT */}
//                   <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
//                     <div>
//                       <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36 }}>
//                         <span
//                           style={{
//                             fontSize: 11, color: "rgba(0,0,0,0.5)", fontWeight: 600,
//                             letterSpacing: "0.16em", textTransform: "uppercase",
//                             fontVariantNumeric: "tabular-nums",
//                           }}
//                         >
//                           № {cs.id}
//                         </span>
//                         <span style={{ width: 20, height: 1, background: "rgba(0,0,0,0.12)", display: "block" }} />
//                         <span style={{ fontSize: 11, color: "rgba(0,0,0,0.5)", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" }}>
//                           {cs.category}
//                         </span>
//                         <span style={{ fontSize: 11, color: "rgba(0,0,0,0.5)", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", marginLeft: "auto" }}>
//                           {cs.year}
//                         </span>
//                       </div>
//                       <h3
//                         style={{
//                           fontFamily: "'Space Grotesk', sans-serif",
//                           fontSize: "clamp(36px, 4.5vw, 64px)", fontWeight: 500,
//                           letterSpacing: "-0.035em", lineHeight: 0.95,
//                           margin: "0 0 28px",
//                         }}
//                       >
//                         {cs.name}
//                       </h3>
//                       <p style={{ fontSize: 15, color: "rgba(0,0,0,0.6)", lineHeight: 1.7, maxWidth: 420, margin: "0 0 32px" }}>
//                         {cs.desc}
//                       </p>
//                     </div>

//                     <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
//                       {cs.tags.map((t) => (
//                         <span
//                           key={t}
//                           style={{
//                             padding: "5px 11px", border: "1px solid rgba(0,0,0,0.12)",
//                             borderRadius: 999, fontSize: 11, fontWeight: 500,
//                             color: "rgba(0,0,0,0.55)",
//                           }}
//                         >
//                           {t}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   {/* RIGHT */}
//                   <div
//                     style={{
//                       position: "relative", borderRadius: 16, overflow: "hidden",
//                       background: "#0a0a0a", color: "#fafaf9",
//                       padding: "48px 44px", minHeight: 340,
//                       display: "flex", flexDirection: "column", justifyContent: "space-between",
//                     }}
//                   >
//                     {/* Grid overlay */}
//                     <div
//                       aria-hidden
//                       style={{
//                         position: "absolute", inset: 0,
//                         backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
//                         backgroundSize: "40px 40px",
//                         maskImage: "radial-gradient(ellipse at 80% 20%, black, transparent 75%)",
//                         WebkitMaskImage: "radial-gradient(ellipse at 80% 20%, black, transparent 75%)",
//                       }}
//                     />

//                     <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//                       <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
//                         Outcome
//                       </span>
//                       <span style={{ fontSize: 18, color: "rgba(255,255,255,0.6)" }}>↗</span>
//                     </div>

//                     <div style={{ position: "relative", zIndex: 1 }}>
//                       <div
//                         style={{
//                           fontFamily: "'Space Grotesk', sans-serif",
//                           fontSize: "clamp(72px, 10vw, 136px)", fontWeight: 500,
//                           lineHeight: 0.85, letterSpacing: "-0.04em",
//                           color: "#fafaf9", fontVariantNumeric: "tabular-nums",
//                         }}
//                       >
//                         {cs.metric}
//                       </div>
//                       <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", marginTop: 16, letterSpacing: "0.02em" }}>
//                         {cs.metricLabel}
//                       </div>
//                     </div>

//                     <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
//                       <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>View case study</span>
//                       <div style={{ display: "flex", gap: 4 }}>
//                         {[0, 1, 2].map((d) => (
//                           <span key={d} style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── PROCESS (HORIZONTAL PINNED SCROLL) ── */}
//         <section
//           id="process"
//           className="process-pin"
//           style={{
//             padding: 0, background: "#0a0a0a", color: "#fafaf9",
//             height: "100vh", overflow: "hidden", position: "relative",
//           }}
//         >
//           {/* Grid overlay */}
//           <div
//             aria-hidden
//             style={{
//               position: "absolute", inset: 0,
//               backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
//               backgroundSize: "60px 60px",
//               pointerEvents: "none",
//             }}
//           />
//           {/* Side info */}
//           <div
//             style={{
//               position: "absolute", top: 100, left: 40, right: 40,
//               display: "flex", justifyContent: "space-between", alignItems: "flex-start",
//               zIndex: 2,
//             }}
//           >
//             <div>
//               <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
//                 <span style={{ width: 6, height: 6, background: "#fafaf9", borderRadius: "50%" }} />
//                 <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
//                   How we work / 03
//                 </span>
//               </div>
//               <h2
//                 style={{
//                   fontFamily: "'Space Grotesk', sans-serif",
//                   fontSize: "clamp(38px, 5vw, 72px)", fontWeight: 500,
//                   letterSpacing: "-0.035em", lineHeight: 0.95, margin: 0,
//                 }}
//               >
//                 Our <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>process.</span>
//               </h2>
//             </div>
//             <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", maxWidth: 320, lineHeight: 1.65, margin: 0, textAlign: "right" }}>
//               Four phases. One team. A way of working refined across 150+ shipped products.
//             </p>
//           </div>

//           {/* Horizontal track */}
//           <div
//             style={{
//               height: "100%", display: "flex", alignItems: "center",
//               paddingTop: 40,
//             }}
//           >
//             <div
//               className="process-track"
//               style={{
//                 display: "flex", gap: 28, paddingLeft: 40, paddingRight: 140,
//                 willChange: "transform",
//               }}
//             >
//               {PROCESS.map((step, i) => (
//                 <div
//                   key={i}
//                   className="process-card"
//                   style={{
//                     width: 440, flexShrink: 0, padding: "44px 40px",
//                     border: "1px solid rgba(255,255,255,0.08)",
//                     borderRadius: 20, background: "rgba(255,255,255,0.02)",
//                     display: "flex", flexDirection: "column",
//                     height: 500, justifyContent: "space-between",
//                   }}
//                 >
//                   <div>
//                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
//                       <span
//                         style={{
//                           fontFamily: "'Space Grotesk', sans-serif",
//                           fontSize: 72, fontWeight: 500, color: "rgba(255,255,255,0.12)",
//                           lineHeight: 1, letterSpacing: "-0.04em",
//                           fontVariantNumeric: "tabular-nums",
//                         }}
//                       >
//                         {step.num}
//                       </span>
//                       <span
//                         style={{
//                           padding: "5px 12px", borderRadius: 999,
//                           border: "1px solid rgba(255,255,255,0.15)",
//                           fontSize: 11, fontWeight: 500,
//                           color: "rgba(255,255,255,0.65)",
//                           letterSpacing: "0.04em",
//                         }}
//                       >
//                         Phase 0{i + 1}
//                       </span>
//                     </div>
//                     <h3
//                       style={{
//                         fontFamily: "'Space Grotesk', sans-serif",
//                         fontSize: 40, fontWeight: 500, margin: "0 0 20px",
//                         letterSpacing: "-0.02em", lineHeight: 1,
//                       }}
//                     >
//                       {step.title}
//                     </h3>
//                     <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>
//                       {step.desc}
//                     </p>
//                   </div>

//                   <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24 }}>
//                     {step.points.map((p) => (
//                       <li
//                         key={p}
//                         style={{
//                           fontSize: 13, color: "rgba(255,255,255,0.7)",
//                           padding: "8px 0", display: "flex",
//                           alignItems: "center", gap: 12,
//                         }}
//                       >
//                         <span style={{ width: 14, height: 1, background: "rgba(255,255,255,0.2)" }} />
//                         {p}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}

//               {/* Trailing card */}
//               <div
//                 style={{
//                   width: 340, flexShrink: 0, padding: "44px 40px",
//                   display: "flex", flexDirection: "column", justifyContent: "center",
//                   height: 500,
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontFamily: "'Space Grotesk', sans-serif",
//                     fontSize: 32, fontWeight: 500, margin: "0 0 20px",
//                     letterSpacing: "-0.025em", lineHeight: 1.05,
//                   }}
//                 >
//                   Every project. <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>No exceptions.</span>
//                 </h3>
//                 <a
//                   href="mailto:hello@techbinaries.com"
//                   style={{
//                     display: "inline-flex", alignItems: "center", gap: 10,
//                     padding: "12px 22px", background: "#fafaf9", color: "#0a0a0a",
//                     borderRadius: 999, fontSize: 13, fontWeight: 500,
//                     textDecoration: "none", alignSelf: "flex-start", marginTop: 16,
//                   }}
//                 >
//                   Start yours →
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Scroll hint */}
//           <div
//             style={{
//               position: "absolute", bottom: 28, left: 40,
//               fontSize: 11, fontWeight: 600, letterSpacing: "0.18em",
//               textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
//               display: "flex", alignItems: "center", gap: 10,
//             }}
//           >
//             <span style={{ display: "inline-block", width: 28, height: 1, background: "rgba(255,255,255,0.25)" }} />
//             Scroll
//           </div>
//           <div
//             style={{
//               position: "absolute", bottom: 28, right: 40,
//               fontSize: 11, fontWeight: 600, letterSpacing: "0.18em",
//               textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
//               fontVariantNumeric: "tabular-nums",
//             }}
//           >
//             04 phases
//           </div>
//         </section>

//         {/* ── STUDIO / PHILOSOPHY ── */}
//         <section id="studio" style={{ padding: "160px 40px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
//           <div style={{ maxWidth: 1320, margin: "0 auto" }}>
//             <div
//               className="sh"
//               style={{ marginBottom: 80, opacity: 0, display: "flex", alignItems: "center", gap: 10 }}
//             >
//               <span style={{ width: 6, height: 6, background: "#0a0a0a", borderRadius: "50%" }} />
//               <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.55)" }}>
//                 Studio / 04
//               </span>
//             </div>

//             <div className="sh" style={{ opacity: 0 }}>
//               <p
//                 style={{
//                   fontFamily: "'Space Grotesk', sans-serif",
//                   fontSize: "clamp(28px, 3.4vw, 52px)", fontWeight: 400,
//                   lineHeight: 1.25, letterSpacing: "-0.02em", margin: 0,
//                   maxWidth: 1100,
//                 }}
//               >
//                 We believe the best software is built by small, senior teams who give a
//                 damn. No handoffs, no juniors at the helm, no theatre —{" "}
//                 <span style={{ fontStyle: "italic", color: "rgba(0,0,0,0.5)" }}>
//                   just people who care, shipping work they&apos;re proud of.
//                 </span>
//               </p>
//             </div>

//             {/* Principles grid */}
//             <div
//               style={{
//                 marginTop: 100, display: "grid",
//                 gridTemplateColumns: "repeat(3, 1fr)", gap: 0,
//                 borderTop: "1px solid rgba(0,0,0,0.1)",
//               }}
//               className="principles-grid"
//             >
//               {[
//                 { n: "I.", t: "Senior by default", d: "Every engineer you talk to has shipped products at scale. No layers, no account managers." },
//                 { n: "II.", t: "Ship weekly", d: "Real demos every week. You stay close to the work. We stay accountable." },
//                 { n: "III.", t: "Built to last", d: "Architecture decisions made for the next 5 years, not the next sprint." },
//               ].map((p, i) => (
//                 <div
//                   key={p.n}
//                   style={{
//                     padding: "40px 32px 40px 0",
//                     borderRight: i < 2 ? "1px solid rgba(0,0,0,0.08)" : "none",
//                     paddingLeft: i > 0 ? 32 : 0,
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontFamily: "'Space Grotesk', sans-serif",
//                       fontSize: 13, color: "rgba(0,0,0,0.35)",
//                       fontWeight: 500, marginBottom: 24,
//                       letterSpacing: "0.04em",
//                     }}
//                   >
//                     {p.n}
//                   </div>
//                   <h3
//                     style={{
//                       fontFamily: "'Space Grotesk', sans-serif",
//                       fontSize: 22, fontWeight: 500, margin: "0 0 14px",
//                       letterSpacing: "-0.02em",
//                     }}
//                   >
//                     {p.t}
//                   </h3>
//                   <p style={{ fontSize: 14.5, color: "rgba(0,0,0,0.58)", lineHeight: 1.65, margin: 0 }}>
//                     {p.d}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── TESTIMONIALS ── */}
//         <section style={{ padding: "160px 40px", background: "#f5f5f4", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
//           <div style={{ maxWidth: 1020, margin: "0 auto" }}>
//             <div className="sh" style={{ marginBottom: 72, opacity: 0, display: "flex", alignItems: "center", gap: 10 }}>
//               <span style={{ width: 6, height: 6, background: "#0a0a0a", borderRadius: "50%" }} />
//               <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.55)" }}>
//                 Voices / 05
//               </span>
//             </div>

//             <div style={{ position: "relative", minHeight: 340 }}>
//               {/* Giant quote mark */}
//               <div
//                 aria-hidden
//                 style={{
//                   position: "absolute", top: -60, left: -30,
//                   fontFamily: "'Space Grotesk', sans-serif",
//                   fontSize: 240, lineHeight: 1, color: "rgba(0,0,0,0.05)",
//                   fontWeight: 500, pointerEvents: "none",
//                 }}
//               >
//                 &ldquo;
//               </div>

//               {TESTIMONIALS.map((t, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     position: i === 0 ? "relative" : "absolute",
//                     top: 0, left: 0, right: 0,
//                     opacity: activeTestimonial === i ? 1 : 0,
//                     transform: `translateY(${activeTestimonial === i ? 0 : 12}px)`,
//                     transition: "opacity 0.6s ease, transform 0.6s ease",
//                     pointerEvents: activeTestimonial === i ? "auto" : "none",
//                   }}
//                 >
//                   <blockquote
//                     style={{
//                       fontFamily: "'Space Grotesk', sans-serif",
//                       fontSize: "clamp(22px, 2.6vw, 34px)", fontWeight: 400,
//                       lineHeight: 1.4, color: "rgba(0,0,0,0.82)",
//                       margin: "0 0 56px", letterSpacing: "-0.015em",
//                       position: "relative", zIndex: 1,
//                     }}
//                   >
//                     {t.quote}
//                   </blockquote>
//                   <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//                     <div
//                       style={{
//                         width: 44, height: 44, background: "#0a0a0a", color: "#fafaf9",
//                         borderRadius: "50%", display: "flex", alignItems: "center",
//                         justifyContent: "center", fontSize: 12, fontWeight: 500,
//                         letterSpacing: "0.04em", flexShrink: 0,
//                         fontFamily: "'Space Grotesk', sans-serif",
//                       }}
//                     >
//                       {t.initials}
//                     </div>
//                     <div>
//                       <div style={{ fontSize: 14.5, fontWeight: 500, letterSpacing: "-0.005em" }}>{t.name}</div>
//                       <div style={{ fontSize: 13, color: "rgba(0,0,0,0.5)", marginTop: 2 }}>{t.title}</div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 80, paddingTop: 28, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
//               <div style={{ display: "flex", gap: 10 }}>
//                 {TESTIMONIALS.map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setActiveTestimonial(i)}
//                     aria-label={`View testimonial ${i + 1}`}
//                     style={{
//                       width: activeTestimonial === i ? 28 : 10, height: 3,
//                       background: activeTestimonial === i ? "#0a0a0a" : "rgba(0,0,0,0.15)",
//                       border: "none", cursor: "pointer", padding: 0,
//                       transition: "all 0.35s ease", borderRadius: 2,
//                     }}
//                   />
//                 ))}
//               </div>
//               <div style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", fontVariantNumeric: "tabular-nums", letterSpacing: "0.04em" }}>
//                 {String(activeTestimonial + 1).padStart(2, "0")} <span style={{ opacity: 0.35 }}>/</span> {String(TESTIMONIALS.length).padStart(2, "0")}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ── TECH MARQUEE ── */}
//         <section style={{ padding: "90px 0", borderTop: "1px solid rgba(0,0,0,0.06)", overflow: "hidden" }}>
//           <div style={{ maxWidth: 1320, margin: "0 auto 56px", padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "end", gap: 40, flexWrap: "wrap" }}>
//             <div>
//               <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
//                 <span style={{ width: 6, height: 6, background: "#0a0a0a", borderRadius: "50%" }} />
//                 <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.55)" }}>
//                   Stack / 06
//                 </span>
//               </div>
//               <h2
//                 style={{
//                   fontFamily: "'Space Grotesk', sans-serif",
//                   fontSize: "clamp(32px, 3.8vw, 56px)", fontWeight: 500,
//                   letterSpacing: "-0.03em", lineHeight: 1, margin: 0,
//                 }}
//               >
//                 Tools we <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>trust.</span>
//               </h2>
//             </div>
//             <p style={{ fontSize: 14, color: "rgba(0,0,0,0.55)", maxWidth: 380, lineHeight: 1.65, margin: 0 }}>
//               Mature, battle-tested tooling — picked for your problem, not because it&apos;s new.
//             </p>
//           </div>

//           <div style={{ position: "relative" }}>
//             <div style={{ overflow: "hidden" }}>
//               <div className="marquee-track marquee-left" style={{ display: "flex", width: "max-content", gap: 0 }}>
//                 {[...TECH, ...TECH].map((t, i) => (
//                   <div
//                     key={i}
//                     style={{
//                       display: "flex", alignItems: "center", gap: 28,
//                       padding: "0 32px", flexShrink: 0,
//                     }}
//                   >
//                     <span
//                       style={{
//                         fontFamily: "'Space Grotesk', sans-serif",
//                         fontSize: "clamp(28px, 3.4vw, 48px)",
//                         fontWeight: 500, color: "#0a0a0a",
//                         letterSpacing: "-0.025em",
//                       }}
//                     >
//                       {t}
//                     </span>
//                     <span
//                       aria-hidden
//                       style={{
//                         width: 8, height: 8, background: "#0a0a0a",
//                         borderRadius: "50%", opacity: 0.2,
//                       }}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {/* Second row — inverse */}
//             <div style={{ overflow: "hidden", marginTop: 20 }}>
//               <div className="marquee-track marquee-right" style={{ display: "flex", width: "max-content", gap: 0 }}>
//                 {[...TECH.slice().reverse(), ...TECH.slice().reverse()].map((t, i) => (
//                   <div
//                     key={i}
//                     style={{
//                       display: "flex", alignItems: "center", gap: 28,
//                       padding: "0 32px", flexShrink: 0,
//                     }}
//                   >
//                     <span
//                       style={{
//                         fontFamily: "'Space Grotesk', sans-serif",
//                         fontSize: "clamp(28px, 3.4vw, 48px)",
//                         fontWeight: 400, fontStyle: "italic",
//                         color: "transparent",
//                         WebkitTextStroke: "1px rgba(0,0,0,0.2)",
//                         letterSpacing: "-0.025em",
//                       }}
//                     >
//                       {t}
//                     </span>
//                     <span
//                       aria-hidden
//                       style={{
//                         width: 8, height: 8,
//                         border: "1px solid rgba(0,0,0,0.2)",
//                         borderRadius: "50%",
//                       }}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ── CTA ── */}
//         <section id="contact" style={{ padding: "0 40px 80px", borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 80 }}>
//           <div
//             id="cta-inner"
//             style={{
//               borderRadius: 32, overflow: "hidden",
//               padding: "120px 72px", position: "relative",
//               background: "#0a0a0a", color: "#fafaf9",
//               opacity: 0, maxWidth: 1320, margin: "0 auto",
//             }}
//           >
//             {/* Grid */}
//             <div
//               aria-hidden
//               style={{
//                 position: "absolute", inset: 0,
//                 backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
//                 backgroundSize: "48px 48px",
//                 pointerEvents: "none",
//               }}
//             />
//             {/* Radial glow */}
//             <div
//               aria-hidden
//               style={{
//                 position: "absolute", top: "-20%", right: "-10%",
//                 width: 560, height: 560,
//                 background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%)",
//                 pointerEvents: "none",
//               }}
//             />
//             {/* Faint glyph */}
//             <div
//               aria-hidden
//               style={{
//                 position: "absolute", right: 40, bottom: -40,
//                 fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
//                 fontSize: 420, color: "rgba(255,255,255,0.025)",
//                 lineHeight: 0.8, letterSpacing: "-0.06em", userSelect: "none",
//                 pointerEvents: "none",
//               }}
//             >
//               tb
//             </div>

//             <div style={{ position: "relative", zIndex: 1, maxWidth: 820 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
//                 <span style={{ width: 6, height: 6, background: "#fafaf9", borderRadius: "50%" }} />
//                 <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
//                   Let&apos;s build / 07
//                 </span>
//               </div>
//               <h2
//                 style={{
//                   fontFamily: "'Space Grotesk', sans-serif",
//                   fontSize: "clamp(48px, 7vw, 108px)", fontWeight: 500,
//                   letterSpacing: "-0.04em", lineHeight: 0.92,
//                   margin: "0 0 36px",
//                 }}
//               >
//                 Have a product<br />
//                 in mind?{" "}
//                 <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>
//                   Let&apos;s talk.
//                 </span>
//               </h2>
//               <p style={{ fontSize: 16, color: "rgba(255,255,255,0.58)", maxWidth: 520, lineHeight: 1.65, margin: "0 0 48px" }}>
//                 Free 30-minute discovery call. You&apos;ll talk directly with an engineer
//                 and a strategist. No sales pitch, just a real conversation about your
//                 problem.
//               </p>
//               <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//                 <a
//                   href="mailto:hello@techbinaries.com"
//                   style={{
//                     display: "inline-flex", alignItems: "center", gap: 10,
//                     padding: "15px 28px", background: "#fafaf9", color: "#0a0a0a",
//                     textDecoration: "none", fontSize: 14, fontWeight: 500,
//                     borderRadius: 999, transition: "transform 0.2s",
//                   }}
//                 >
//                   Book a discovery call
//                   <span aria-hidden>→</span>
//                 </a>
//                 <a
//                   href="mailto:hello@techbinaries.com"
//                   style={{
//                     display: "inline-flex", alignItems: "center", gap: 10,
//                     padding: "15px 28px",
//                     border: "1px solid rgba(255,255,255,0.2)",
//                     color: "rgba(255,255,255,0.85)",
//                     textDecoration: "none", fontSize: 14, fontWeight: 500,
//                     borderRadius: 999, transition: "background 0.2s, border-color 0.2s",
//                   }}
//                   className="ghost-btn-dark"
//                 >
//                   hello@techbinaries.com
//                 </a>
//               </div>

//               {/* Small grid info */}
//               <div
//                 style={{
//                   marginTop: 80, paddingTop: 32,
//                   borderTop: "1px solid rgba(255,255,255,0.08)",
//                   display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32,
//                 }}
//               >
//                 {[
//                   { k: "Response time", v: "Within 24h" },
//                   { k: "Typical project", v: "8–16 weeks" },
//                   { k: "Based in", v: "Karachi, PK" },
//                 ].map((it) => (
//                   <div key={it.k}>
//                     <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
//                       {it.k}
//                     </div>
//                     <div style={{ fontSize: 17, color: "#fafaf9", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, letterSpacing: "-0.01em" }}>
//                       {it.v}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ── FOOTER ── */}
//         <footer style={{ padding: "60px 40px 40px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
//           <div style={{ maxWidth: 1320, margin: "0 auto" }}>
//             {/* Big wordmark */}
//             <div
//               style={{
//                 fontFamily: "'Space Grotesk', sans-serif",
//                 fontSize: "clamp(80px, 15vw, 240px)", fontWeight: 500,
//                 letterSpacing: "-0.05em", lineHeight: 0.85,
//                 marginBottom: 60, color: "#0a0a0a",
//                 display: "flex", alignItems: "baseline", justifyContent: "space-between",
//                 flexWrap: "wrap", gap: 20,
//               }}
//             >
//               <span>techbinaries</span>
//               <span style={{ fontSize: "0.15em", fontWeight: 500, color: "rgba(0,0,0,0.35)", letterSpacing: "0.02em" }}>
//                 ↗ hello@techbinaries.com
//               </span>
//             </div>

//             <div
//               style={{
//                 display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
//                 gap: 60, paddingTop: 40,
//                 borderTop: "1px solid rgba(0,0,0,0.08)",
//               }}
//               className="footer-grid"
//             >
//               <div>
//                 <p style={{ fontSize: 14, color: "rgba(0,0,0,0.6)", lineHeight: 1.65, margin: "0 0 16px", maxWidth: 340 }}>
//                   A software engineering studio building durable products for ambitious teams. Karachi · Remote · Global.
//                 </p>
//                 <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                   <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a", boxShadow: "0 0 0 3px rgba(22,163,74,0.15)" }} />
//                   <span style={{ fontSize: 12, color: "rgba(0,0,0,0.55)" }}>Accepting Q2 engagements</span>
//                 </div>
//               </div>

//               {[
//                 { h: "Studio", items: ["About", "Careers", "Journal", "Contact"] },
//                 { h: "Services", items: ["Engineering", "Design", "Strategy", "AI & Data"] },
//                 { h: "Connect", items: ["Twitter", "LinkedIn", "GitHub", "Dribbble"] },
//               ].map((col) => (
//                 <div key={col.h}>
//                   <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: 20 }}>
//                     {col.h}
//                   </div>
//                   <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
//                     {col.items.map((it) => (
//                       <li key={it}>
//                         <a
//                           href="#"
//                           className="footer-link"
//                           style={{ fontSize: 14, color: "rgba(0,0,0,0.7)", textDecoration: "none", transition: "color 0.2s" }}
//                         >
//                           {it}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>

//             <div
//               style={{
//                 marginTop: 56, paddingTop: 24,
//                 borderTop: "1px solid rgba(0,0,0,0.08)",
//                 display: "flex", justifyContent: "space-between",
//                 alignItems: "center", flexWrap: "wrap", gap: 12,
//               }}
//             >
//               <div style={{ fontSize: 12, color: "rgba(0,0,0,0.45)" }}>
//                 © 2026 TechBinaries. Built in-house.
//               </div>
//               <div style={{ display: "flex", gap: 20 }}>
//                 <a href="#" className="footer-link" style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", textDecoration: "none" }}>Privacy</a>
//                 <a href="#" className="footer-link" style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", textDecoration: "none" }}>Terms</a>
//                 <a href="#" className="footer-link" style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", textDecoration: "none" }}>Cookies</a>
//               </div>
//             </div>
//           </div>
//         </footer>
//       </div>

//       {/* ── GLOBAL STYLES ── */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//         html, body { cursor: none !important; background: #fafaf9; -webkit-font-smoothing: antialiased; }
//         ::selection { background: #0a0a0a; color: #fafaf9; }

//         /* Marquee — seamless because content is duplicated 2x, animate to -50% */
//         @keyframes marquee-left {
//           from { transform: translateX(0); }
//           to   { transform: translateX(-50%); }
//         }
//         @keyframes marquee-right {
//           from { transform: translateX(-50%); }
//           to   { transform: translateX(0); }
//         }
//         .marquee-left  { animation: marquee-left 55s linear infinite; will-change: transform; }
//         .marquee-right { animation: marquee-right 60s linear infinite; will-change: transform; }

//         /* Nav */
//         .nav-link:hover { color: #0a0a0a !important; background: rgba(0,0,0,0.04) !important; }

//         /* Services */
//         .svc-row:hover { padding-left: 24px !important; background: rgba(0,0,0,0.02); }
//         .svc-row:hover .svc-title { color: #0a0a0a; }
//         .svc-row:hover .svc-arrow { opacity: 1 !important; transform: translateY(-50%) translateX(0) !important; }
//         .svc-row:hover .svc-tag { border-color: rgba(0,0,0,0.3) !important; color: #0a0a0a !important; }

//         /* Work cards */
//         .wk-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 24px 60px -20px rgba(0,0,0,0.12);
//         }

//         /* Ghost buttons */
//         .ghost-btn:hover {
//           border-color: rgba(0,0,0,0.35) !important;
//           color: #0a0a0a !important;
//           background: rgba(255,255,255,0.9) !important;
//         }
//         .ghost-btn-dark:hover {
//           border-color: rgba(255,255,255,0.45) !important;
//           background: rgba(255,255,255,0.05) !important;
//         }

//         /* Footer / client logos */
//         .footer-link:hover { color: #0a0a0a !important; }
//         .client-logo:hover { color: #0a0a0a !important; }

//         /* Link underline */
//         .link-underline:hover { color: #0a0a0a !important; }

//         /* ── RESPONSIVE ── */
//         @media (max-width: 1100px) {
//           .principles-grid { grid-template-columns: 1fr !important; }
//           .principles-grid > div { border-right: none !important; border-bottom: 1px solid rgba(0,0,0,0.08); padding-left: 0 !important; padding-right: 0 !important; }
//           .principles-grid > div:last-child { border-bottom: none; }
//           .footer-grid { grid-template-columns: 1fr 1fr !important; }
//         }
//         @media (max-width: 900px) {
//           .nav-links { display: none !important; }
//           .nav-clock { display: none !important; }

//           /* Services become stacked */
//           .svc-row {
//             grid-template-columns: 1fr !important;
//             gap: 16px !important;
//             padding: 28px 0 !important;
//           }
//           .svc-row > div:last-of-type { justify-content: flex-start !important; }

//           /* Work cards stack */
//           .wk-card {
//             grid-template-columns: 1fr !important;
//             padding: 32px !important;
//             gap: 32px !important;
//           }
//         }
//         @media (max-width: 768px) {
//           html, body { cursor: auto !important; }
//           section, #nav, footer { padding-left: 20px !important; padding-right: 20px !important; }
//           #cta-inner { padding: 72px 32px !important; border-radius: 20px !important; }
//           .hero-cta { justify-content: flex-start !important; }

//           /* Stats: 2x2 */
//           .hf[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; row-gap: 24px; }
//           .hf[style*="repeat(4, 1fr)"] > div { border-right: none !important; padding-left: 0 !important; }

//           /* Services header stacks */
//           .sh[style*="1fr 1.4fr"] { grid-template-columns: 1fr !important; gap: 32px !important; }

//           .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }

//           /* Hide process horizontal on mobile — use stacked version */
//           .process-pin { height: auto !important; overflow: visible !important; }
//           .process-pin > div:last-of-type { height: auto !important; padding-top: 180px !important; padding-bottom: 60px !important; }
//           .process-track { flex-direction: column !important; padding: 0 20px !important; transform: none !important; gap: 16px !important; }
//           .process-card { width: 100% !important; height: auto !important; min-height: 380px; }
//           .process-pin > div[style*="absolute"][style*="bottom: 28px"] { display: none; }
//         }
//       `}</style>
//     </>
//   );
// }

//version 3

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

// ── DATA ──────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    num: "01",
    title: "Product Engineering",
    desc: "Full-stack product development from architecture to deployment. We ship robust, scalable applications that users love.",
    tags: ["React", "Node.js", "TypeScript", "AWS"],
  },
  {
    num: "02",
    title: "Mobile Development",
    desc: "Native and cross-platform mobile applications built for performance and delightful user experiences.",
    tags: ["React Native", "Swift", "Kotlin"],
  },
  {
    num: "03",
    title: "Cloud & DevOps",
    desc: "Infrastructure as code, CI/CD pipelines, and cloud architecture that scales automatically with your growth.",
    tags: ["Kubernetes", "Terraform", "GCP", "Docker"],
  },
  {
    num: "04",
    title: "AI & Data Engineering",
    desc: "Machine learning models, data pipelines, and AI-powered features that give your product a competitive edge.",
    tags: ["Python", "PyTorch", "LangChain"],
  },
  {
    num: "05",
    title: "UX/UI Design",
    desc: "Design systems, interaction design, and user research that transforms complex problems into elegant interfaces.",
    tags: ["Figma", "Framer", "Design Systems"],
  },
  {
    num: "06",
    title: "Tech Strategy & CTO",
    desc: "Fractional CTO services, architecture reviews, and technical roadmapping for startups and scale-ups.",
    tags: ["Architecture", "Roadmap", "Audits"],
  },
];

const CASE_STUDIES = [
  {
    id: "01",
    name: "FinEdge",
    category: "Fintech Platform",
    year: "2024",
    metric: "340%",
    metricLabel: "User activation",
    desc: "Rebuilt a legacy fintech platform into a modern, real-time trading dashboard serving institutional investors across 14 markets.",
    tags: ["Platform", "Real-time", "FinTech"],
  },
  {
    id: "02",
    name: "MedCore",
    category: "HealthTech",
    year: "2024",
    metric: "2.1M",
    metricLabel: "Patients served",
    desc: "Built a HIPAA-compliant patient management system that streamlined care coordination across a national hospital network.",
    tags: ["HIPAA", "HealthTech", "Scale"],
  },
  {
    id: "03",
    name: "ShipFast",
    category: "Logistics AI",
    year: "2023",
    metric: "60%",
    metricLabel: "Cost reduction",
    desc: "Developed an AI-powered route optimization engine that reduced operational costs and improved delivery SLAs.",
    tags: ["AI", "Logistics", "Optimization"],
  },
];

const STATS = [
  { value: "150+", label: "Products shipped" },
  { value: "98%", label: "Client retention" },
  { value: "12+", label: "Years building" },
  { value: "40+", label: "Engineers" },
];

const PROCESS = [
  {
    num: "01",
    title: "Discovery",
    desc: "Deep-dive into your business, users, and technical landscape to uncover what actually needs to be built.",
    points: ["Stakeholder interviews", "Technical audit", "Opportunity mapping"],
  },
  {
    num: "02",
    title: "Architecture",
    desc: "We design the technical blueprint — systems design, stack selection, and scalability planning before writing code.",
    points: ["Systems design", "Stack selection", "Scalability plan"],
  },
  {
    num: "03",
    title: "Build",
    desc: "Agile sprints with weekly demos. You stay close to the work. We ship fast without cutting corners.",
    points: ["Weekly demos", "CI/CD pipeline", "Continuous QA"],
  },
  {
    num: "04",
    title: "Launch & Scale",
    desc: "Deployment, monitoring, and post-launch support. We don't disappear after go-live.",
    points: ["Production launch", "Observability", "Ongoing support"],
  },
];

const TESTIMONIALS = [
  {
    quote:
      "TechBinaries didn't just build our product — they challenged our assumptions, improved our roadmap, and shipped faster than any team we've worked with. Exceptional craft.",
    name: "Sarah Chen",
    title: "CTO, FinEdge",
    initials: "SC",
  },
  {
    quote:
      "We went from idea to production in 11 weeks. The architecture they designed has scaled to 2M+ users without a single major incident. That's engineering excellence.",
    name: "Marcus Williams",
    title: "CEO, MedCore",
    initials: "MW",
  },
  {
    quote:
      "Their AI team understood our logistics domain immediately. The route optimization model they built saved us $4M in year one. ROI was clear from week two.",
    name: "Priya Nair",
    title: "VP Engineering, ShipFast",
    initials: "PN",
  },
];

const TECH = [
  "React", "TypeScript", "Node.js", "Python", "Go", "Rust",
  "AWS", "GCP", "Kubernetes", "PostgreSQL", "Redis", "GraphQL",
  "Next.js", "PyTorch", "Terraform", "Docker",
];

const CLIENTS = ["FinEdge", "MedCore", "ShipFast", "Atlas", "Northwind", "Orbital", "Veritas", "Helix"];

// Rotating verb in hero headline — swaps every few seconds
const HERO_VERBS = ["engineer", "ship", "craft", "architect", "scale"];

// "Currently building" ticker — rotates through real-ish in-flight work
const BUILDING_NOW = [
  { tag: "SHIPPING", label: "FinEdge · v2.4 · Monday release" },
  { tag: "DESIGNING", label: "MedCore · patient timeline view" },
  { tag: "SCALING",  label: "ShipFast · route engine, 10x throughput" },
  { tag: "AUDITING", label: "Northwind · infra review, 4-week engagement" },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [time, setTime] = useState("");

  // Hero-specific refs & state
  const heroRef = useRef<HTMLElement>(null);
  const heroParallaxLayerRef = useRef<HTMLDivElement>(null);
  const heroGlyphRef = useRef<HTMLDivElement>(null);
  const heroDotsRef = useRef<HTMLDivElement>(null);
  const heroTerminalRef = useRef<HTMLDivElement>(null);
  const [rotatingVerb, setRotatingVerb] = useState(0);

  // Rotating verb in headline ("engineer / ship / craft / scale / architect")
  useEffect(() => {
    const id = setInterval(() => {
      setRotatingVerb((v) => (v + 1) % HERO_VERBS.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  // Live clock (Karachi local feel — small studio signal)
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      setTime(`${hh}:${mm}`);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  // Smooth scroll (Lenis) — tighter settings so pinned sections don't desync
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  // Custom cursor
  useEffect(() => {
    const dot = cursorDot.current;
    const ring = cursorRing.current;
    if (!dot || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0, rafId = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
      rafId = requestAnimationFrame(animateRing);
    };
    animateRing();
    window.addEventListener("mousemove", onMove);

    const onEnter = () => {
      ring.style.width = "48px";
      ring.style.height = "48px";
      ring.style.borderColor = "rgba(0,0,0,0.6)";
    };
    const onLeave = () => {
      ring.style.width = "32px";
      ring.style.height = "32px";
      ring.style.borderColor = "rgba(0,0,0,0.2)";
    };
    const interactive = document.querySelectorAll("a, button, [data-cursor]");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const nav = document.getElementById("nav");
    if (!nav) return;
    const handler = () => {
      if (window.scrollY > 40) {
        nav.style.background = "rgba(255,255,255,0.78)";
        nav.style.backdropFilter = "blur(20px)";
        (nav.style as any).WebkitBackdropFilter = "blur(20px)";
        nav.style.borderBottomColor = "rgba(0,0,0,0.06)";
      } else {
        nav.style.background = "transparent";
        nav.style.backdropFilter = "none";
        (nav.style as any).WebkitBackdropFilter = "none";
        nav.style.borderBottomColor = "transparent";
      }
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Hero mouse-reactive parallax — uses gsap.quickTo so it composes with scroll scrub
  useEffect(() => {
    if (!heroRef.current) return;
    const hero = heroRef.current;
    const glyph = heroGlyphRef.current;
    const dots = heroDotsRef.current;
    const terminal = heroTerminalRef.current;

    // quickTo setters — GSAP keeps transforms unified via its plugin
    const glyphX = glyph ? gsap.quickTo(glyph, "x", { duration: 0.9, ease: "power3.out" }) : null;
    const glyphY = glyph ? gsap.quickTo(glyph, "y", { duration: 0.9, ease: "power3.out" }) : null;
    const dotsX = dots ? gsap.quickTo(dots, "x", { duration: 0.9, ease: "power3.out" }) : null;
    const dotsY = dots ? gsap.quickTo(dots, "y", { duration: 0.9, ease: "power3.out" }) : null;
    const termRY = terminal ? gsap.quickTo(terminal, "rotationY", { duration: 0.7, ease: "power3.out" }) : null;
    const termRX = terminal ? gsap.quickTo(terminal, "rotationX", { duration: 0.7, ease: "power3.out" }) : null;

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      if (e.clientY > rect.bottom || e.clientY < rect.top) return;
      const tx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ty = (e.clientY / window.innerHeight - 0.5) * 2;
      glyphX?.(tx * -28);
      glyphY?.(ty * -18);
      dotsX?.(tx * 10);
      dotsY?.(ty * 6);
      termRY?.(tx * -3);
      termRX?.(ty * 3);
    };

    // Set perspective on terminal container for 3D rotation to show
    if (terminal) gsap.set(terminal, { transformPerspective: 1400, transformStyle: "preserve-3d" });

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Hero magnetic buttons — pull cursor/button slightly toward each other
  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLElement>(".magnetic");
    const handlers: Array<[HTMLElement, (e: MouseEvent) => void, () => void]> = [];
    buttons.forEach((btn) => {
      const move = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const mx = e.clientX - (rect.left + rect.width / 2);
        const my = e.clientY - (rect.top + rect.height / 2);
        gsap.to(btn, { x: mx * 0.25, y: my * 0.3, duration: 0.4, ease: "power3.out" });
      };
      const leave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
      };
      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", leave);
      handlers.push([btn, move, leave]);
    });
    return () => {
      handlers.forEach(([btn, m, l]) => {
        btn.removeEventListener("mousemove", m);
        btn.removeEventListener("mouseleave", l);
      });
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ═════════════════════════════════════════════════════════════
      // HERO — choreographed intro timeline
      // ═════════════════════════════════════════════════════════════
      const heroTl = gsap.timeline({ delay: 0.1 });

      // 1. Top meta bar: line draws in + text fades
      heroTl.fromTo(
        ".hero-meta-line",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.9, ease: "power3.inOut" },
        0
      );
      heroTl.fromTo(
        ".hero-meta > *",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power2.out" },
        0.15
      );

      // 2. Eyebrow line + label
      heroTl.fromTo(
        ".hero-eyebrow-line",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.7, ease: "power3.inOut" },
        0.35
      );
      heroTl.fromTo(
        ".hero-eyebrow-text",
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
        0.5
      );

      // 3. Headline char-by-char reveal (custom SplitText-style)
      const headlineChars = gsap.utils.toArray<HTMLElement>(".hero-char");
      heroTl.fromTo(
        headlineChars,
        { yPercent: 110, rotateX: -35, opacity: 0 },
        {
          yPercent: 0, rotateX: 0, opacity: 1,
          duration: 0.9,
          stagger: { each: 0.018, from: "start" },
          ease: "power4.out",
        },
        0.55
      );

      // 4. Rotating verb mask (the swappable word)
      heroTl.fromTo(
        ".hero-verb-mask",
        { yPercent: 100 },
        { yPercent: 0, duration: 0.85, ease: "power4.out" },
        0.75
      );

      // 5. Intro paragraph + CTAs
      heroTl.fromTo(
        ".hero-intro-col",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        1.25
      );

      // 6. Terminal visualization — scale + fade + glow
      heroTl.fromTo(
        ".hero-terminal",
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out" },
        0.9
      );
      heroTl.fromTo(
        ".hero-terminal-line",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.12, ease: "power2.out" },
        1.2
      );

      // 7. Stats row with divider line drawing
      heroTl.fromTo(
        ".hero-stats-divider",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1, ease: "power3.inOut" },
        1.5
      );
      heroTl.fromTo(
        ".hero-stat-col",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power2.out" },
        1.6
      );

      // 8. Scroll hint bounces in last
      heroTl.fromTo(
        ".hero-scroll-hint",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        1.95
      );

      // ── Scroll-scrubbed exit: as user scrolls out, hero transforms ──
      if (heroRef.current) {
        gsap.to(".hero-content-wrap", {
          y: -80,
          opacity: 0.4,
          scale: 0.98,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        // Scroll hint fades fast
        gsap.to(".hero-scroll-hint", {
          opacity: 0,
          y: 20,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "15% top",
            scrub: true,
          },
        });
        // Dot grid parallax on scroll — outer wrapper, so mouse parallax stays on inner
        gsap.to(".hero-dots-scroll", {
          y: 120,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        // Background glyph parallax on scroll — outer wrapper
        gsap.to(".hero-glyph-scroll", {
          y: -180,
          x: 80,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // ═════════════════════════════════════════════════════════════

      // Count-up for stats
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const raw = el.dataset.val || "";
        const m = raw.match(/^([\d.]+)(.*)$/);
        if (!m) return;
        const target = parseFloat(m[1]);
        const suffix = m[2];
        const isInt = Number.isInteger(target);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = (isInt ? Math.round(obj.v).toString() : obj.v.toFixed(1)) + suffix;
          },
        });
      });

      // Services rows — reveal + animate underline
      gsap.utils.toArray<HTMLElement>(".svc-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: { trigger: row, start: "top 88%" },
          }
        );
      });

      // Case study cards
      gsap.fromTo(
        ".wk",
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.95, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: "#work", start: "top 78%" },
        }
      );

      // Process: horizontal pin — use scrub: true (no lag) + anticipatePin to prevent jump
      const processTrack = document.querySelector<HTMLElement>(".process-track");
      const processPin = document.querySelector<HTMLElement>(".process-pin");
      if (processTrack && processPin) {
        const getScrollDistance = () =>
          processTrack.scrollWidth - window.innerWidth + 80;

        gsap.to(processTrack, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: processPin,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            pinSpacing: true,
            scrub: true,             // locked to scroll, no "catching up"
            anticipatePin: 1,        // pre-pins to prevent visual jump
            invalidateOnRefresh: true,
          },
        });
      }

      // Section headers
      gsap.utils.toArray<HTMLElement>(".sh").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 38 },
          { opacity: 1, y: 0, duration: 0.95, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }
        );
      });

      // Tech marquee animation handled via CSS keyframes — no JS needed here

      // CTA
      gsap.fromTo(
        "#cta-inner",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: "#cta-inner", start: "top 85%" } }
      );

      // Section tag fade-in
      gsap.utils.toArray<HTMLElement>(".tag").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%" } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  // Refresh ScrollTrigger once fonts have loaded (they can shift layout heights,
  // which otherwise causes pinned sections to use stale measurements → jump)
  useEffect(() => {
    if (typeof document === "undefined" || !(document as any).fonts?.ready) return;
    (document as any).fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }, []);

  return (
    <>
      {/* ── CURSOR ── */}
      <div
        ref={cursorDot}
        style={{
          position: "fixed", top: 0, left: 0, width: 6, height: 6,
          background: "#000", borderRadius: "50%", pointerEvents: "none",
          zIndex: 9999, willChange: "transform",
        }}
      />
      <div
        ref={cursorRing}
        style={{
          position: "fixed", top: 0, left: 0, width: 32, height: 32,
          border: "1px solid rgba(0,0,0,0.2)", borderRadius: "50%",
          pointerEvents: "none", zIndex: 9998, willChange: "transform",
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
        }}
      />

      {/* ── GRAIN OVERLAY ── */}
      <div
        aria-hidden
        style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9997,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
          opacity: 0.028,
          mixBlendMode: "multiply",
        }}
      />

      <div
        style={{
          background: "#fafaf9",
          color: "#0a0a0a",
          fontFamily: "'Inter', sans-serif",
          overflowX: "hidden",
          cursor: "none",
        }}
      >
        {/* ── NAVBAR ── */}
        <nav
          id="nav"
          style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
            height: 64, display: "flex", alignItems: "center",
            justifyContent: "space-between", padding: "0 40px",
            borderBottom: "1px solid transparent", transition: "background 0.4s ease, border-color 0.4s ease",
          }}
        >
          <a
            href="/"
            style={{
              textDecoration: "none", color: "#0a0a0a",
              display: "flex", alignItems: "center", gap: 10,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 20, height: 20, background: "#0a0a0a",
                display: "inline-block",
                maskImage: "radial-gradient(circle at 50% 50%, #000 42%, transparent 44%)",
                WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 42%, transparent 44%)",
                boxShadow: "inset 0 0 0 2px #0a0a0a",
                borderRadius: "50%",
                position: "relative",
              }}
            />
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em",
              }}
            >
              techbinaries<span style={{ color: "rgba(0,0,0,0.25)" }}>.</span>
            </span>
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="nav-links">
            {[
              { label: "Services", href: "#services" },
              { label: "Work", href: "#work" },
              { label: "Process", href: "#process" },
              { label: "Studio", href: "#studio" },
              { label: "Contact", href: "#contact" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="nav-link"
                style={{
                  color: "rgba(0,0,0,0.55)", textDecoration: "none",
                  fontSize: 13, fontWeight: 500, padding: "8px 14px",
                  borderRadius: 999, transition: "color 0.2s, background 0.2s",
                }}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(0,0,0,0.5)" }} className="nav-clock">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", boxShadow: "0 0 0 3px rgba(22,163,74,0.15)" }} />
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{time || "—"}</span>
              <span style={{ opacity: 0.45 }}>KHI</span>
            </div>
            <a
              href="mailto:hello@techbinaries.com"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "9px 18px", background: "#0a0a0a", color: "#fafaf9",
                borderRadius: 999, fontSize: 13, fontWeight: 500,
                textDecoration: "none", transition: "background 0.2s",
              }}
            >
              Start a project
              <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: "#fafaf9" }} />
            </a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section
          ref={heroRef}
          style={{
            minHeight: "100vh", display: "flex", flexDirection: "column",
            justifyContent: "center", padding: "120px 40px 60px",
            position: "relative", overflow: "hidden",
          }}
        >
          {/* Dot grid (parallax) — outer for scroll, inner for mouse */}
          <div
            className="hero-dots-scroll"
            aria-hidden
            style={{
              position: "absolute", inset: 0,
              pointerEvents: "none", willChange: "transform",
            }}
          >
            <div
              ref={heroDotsRef}
              className="hero-dots"
              style={{
                position: "absolute", inset: "-40px",
                backgroundImage: "radial-gradient(rgba(0,0,0,0.09) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                maskImage: "radial-gradient(ellipse 75% 65% at 35% 45%, black 0%, transparent 95%)",
                WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 35% 45%, black 0%, transparent 95%)",
                willChange: "transform",
              }}
            />
          </div>

          {/* Large faint background glyph — outer for scroll, inner for mouse */}
          <div
            className="hero-glyph-scroll"
            aria-hidden
            style={{
              position: "absolute", right: -80, bottom: -80,
              pointerEvents: "none", willChange: "transform",
            }}
          >
            <div
              ref={heroGlyphRef}
              className="hero-glyph"
              style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
                fontSize: "clamp(400px, 50vw, 720px)", color: "rgba(0,0,0,0.035)",
                lineHeight: 0.8, letterSpacing: "-0.06em", userSelect: "none",
                willChange: "transform",
              }}
            >
              tb
            </div>
          </div>

          {/* Faint crosshair marks — decorative precision */}
          <div
            aria-hidden
            style={{
              position: "absolute", top: 140, left: 40, width: 10, height: 10,
              borderTop: "1px solid rgba(0,0,0,0.22)", borderLeft: "1px solid rgba(0,0,0,0.22)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute", top: 140, right: 40, width: 10, height: 10,
              borderTop: "1px solid rgba(0,0,0,0.22)", borderRight: "1px solid rgba(0,0,0,0.22)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute", bottom: 40, left: 40, width: 10, height: 10,
              borderBottom: "1px solid rgba(0,0,0,0.22)", borderLeft: "1px solid rgba(0,0,0,0.22)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute", bottom: 40, right: 40, width: 10, height: 10,
              borderBottom: "1px solid rgba(0,0,0,0.22)", borderRight: "1px solid rgba(0,0,0,0.22)",
              pointerEvents: "none",
            }}
          />

          <div
            className="hero-content-wrap"
            style={{
              maxWidth: 1320, width: "100%", margin: "0 auto",
              position: "relative", zIndex: 1, willChange: "transform, opacity",
            }}
          >
            {/* Meta bar (top) */}
            <div
              className="hero-meta"
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginBottom: 64, flexWrap: "wrap", gap: 16,
                paddingBottom: 20, position: "relative",
              }}
            >
              <div
                className="hero-meta-line"
                aria-hidden
                style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
                  background: "rgba(0,0,0,0.1)", transformOrigin: "left center",
                }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 14, opacity: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="pulse-green" style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a" }} />
                  <span style={{ fontSize: 12, color: "rgba(0,0,0,0.65)", fontWeight: 500 }}>
                    Accepting Q2 engagements
                  </span>
                </div>
                <span style={{ width: 1, height: 14, background: "rgba(0,0,0,0.15)" }} />
                <span style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", fontWeight: 500 }}>
                  Karachi · Remote · Global
                </span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", opacity: 0 }}>
                Est. 2012 <span style={{ opacity: 0.35, margin: "0 10px" }}>/</span> 150+ shipped
              </div>
            </div>

            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36 }}>
              <span
                className="hero-eyebrow-line"
                aria-hidden
                style={{
                  width: 40, height: 1, background: "rgba(0,0,0,0.3)",
                  display: "inline-block", flexShrink: 0,
                  transformOrigin: "left center",
                }}
              />
              <span
                className="hero-eyebrow-text"
                style={{
                  fontSize: 11, fontWeight: 600, letterSpacing: "0.2em",
                  textTransform: "uppercase", color: "rgba(0,0,0,0.55)",
                  opacity: 0,
                }}
              >
                Software Engineering Studio <span style={{ opacity: 0.4, margin: "0 8px" }}>·</span> Karachi
              </span>
            </div>

            {/* ── MAIN LAYOUT — headline + visualization ── */}
            <div
              className="hero-main-grid"
              style={{
                display: "grid", gridTemplateColumns: "1.55fr 1fr",
                gap: 48, alignItems: "start", marginBottom: 56,
              }}
            >
              {/* LEFT — headline + copy + CTAs */}
              <div>
                {/* Headline with char-by-char + rotating verb */}
                <h1
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(52px, 7.6vw, 128px)",
                    fontWeight: 500, lineHeight: 0.94,
                    letterSpacing: "-0.04em", margin: "0 0 48px",
                  }}
                >
                  {/* Line 1: "We [rotating verb]" */}
                  <div style={{ overflow: "hidden", paddingBottom: "0.06em", display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.25em" }}>
                    <span style={{ display: "inline-flex", overflow: "hidden" }}>
                      {"We".split("").map((c, i) => (
                        <span key={`we-${i}`} className="hero-char" style={{ display: "inline-block", willChange: "transform" }}>
                          {c === " " ? "\u00A0" : c}
                        </span>
                      ))}
                    </span>
                    {/* Rotating verb — fixed-width mask, italic, softer color */}
                    <span
                      aria-live="polite"
                      style={{
                        position: "relative", display: "inline-block",
                        overflow: "hidden", verticalAlign: "bottom",
                        minWidth: "5.5ch",
                      }}
                    >
                      <span className="hero-verb-mask" style={{ display: "inline-block", willChange: "transform" }}>
                        {HERO_VERBS.map((v, i) => (
                          <span
                            key={v}
                            style={{
                              display: "block",
                              fontStyle: "italic", fontWeight: 400,
                              color: "rgba(0,0,0,0.7)",
                              transform: `translateY(${(i - rotatingVerb) * 100}%)`,
                              transition: "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)",
                              position: i === 0 ? "relative" : "absolute",
                              top: 0, left: 0, width: "100%",
                            }}
                          >
                            {v}
                          </span>
                        ))}
                      </span>
                    </span>
                  </div>
                  {/* Line 2: "software" */}
                  <div style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
                    {"software".split("").map((c, i) => (
                      <span key={`s-${i}`} className="hero-char" style={{ display: "inline-block", willChange: "transform" }}>
                        {c === " " ? "\u00A0" : c}
                      </span>
                    ))}
                  </div>
                  {/* Line 3: "for ambitious teams." */}
                  <div style={{ overflow: "hidden" }}>
                    {"for ambitious teams.".split("").map((c, i) => (
                      <span
                        key={`a-${i}`}
                        className="hero-char"
                        style={{
                          display: "inline-block", willChange: "transform",
                          color: c === "." ? "rgba(0,0,0,0.3)" : "inherit",
                        }}
                      >
                        {c === " " ? "\u00A0" : c}
                      </span>
                    ))}
                  </div>
                </h1>

                <p
                  className="hero-intro-col"
                  style={{
                    fontSize: 17, color: "rgba(0,0,0,0.6)", maxWidth: 480,
                    lineHeight: 1.65, margin: "0 0 36px", fontWeight: 400,
                    opacity: 0,
                  }}
                >
                  A senior team of engineers, designers, and strategists partnering with
                  startups and scale-ups to design, build, and ship products that matter —
                  from zero to production and long after.
                </p>

                <div
                  className="hero-intro-col hero-cta"
                  style={{ display: "flex", gap: 12, opacity: 0, flexWrap: "wrap" }}
                >
                  <a
                    href="mailto:hello@techbinaries.com"
                    className="magnetic hero-cta-primary"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 10,
                      padding: "15px 28px", background: "#0a0a0a", color: "#fafaf9",
                      textDecoration: "none", fontSize: 14, fontWeight: 500,
                      borderRadius: 999, position: "relative", overflow: "hidden",
                      willChange: "transform",
                    }}
                  >
                    <span style={{ position: "relative", zIndex: 2 }}>Start a project</span>
                    <span aria-hidden style={{ position: "relative", zIndex: 2, display: "inline-block" }}>→</span>
                  </a>
                  <a
                    href="#work"
                    className="magnetic ghost-btn"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 10,
                      padding: "15px 28px", border: "1px solid rgba(0,0,0,0.18)",
                      color: "rgba(0,0,0,0.8)", textDecoration: "none",
                      fontSize: 14, fontWeight: 500, borderRadius: 999,
                      transition: "background 0.2s, border-color 0.2s",
                      background: "rgba(255,255,255,0.5)", willChange: "transform",
                    }}
                  >
                    View selected work
                  </a>
                </div>
              </div>

              {/* RIGHT — live visualization card */}
              <div
                ref={heroTerminalRef}
                className="hero-terminal"
                style={{
                  opacity: 0, willChange: "transform",
                  transformStyle: "preserve-3d",
                  position: "relative",
                }}
              >
                {/* Status chip above card */}
                <div
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    marginBottom: 14, padding: "0 4px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="pulse-green" style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a" }} />
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.55)" }}>
                      Live · {time || "--:--"} KHI
                    </span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", color: "rgba(0,0,0,0.35)", fontVariantNumeric: "tabular-nums" }}>
                    #tb-studio
                  </span>
                </div>

                {/* The card */}
                <div
                  style={{
                    background: "#0a0a0a", color: "#fafaf9", borderRadius: 16,
                    border: "1px solid rgba(0,0,0,0.85)",
                    padding: "20px 22px 22px",
                    boxShadow: "0 30px 70px -30px rgba(0,0,0,0.45), 0 8px 24px -10px rgba(0,0,0,0.2)",
                    position: "relative", overflow: "hidden",
                  }}
                >
                  {/* Window chrome */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.06em" }}>
                      studio.tsx
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <span style={{ width: 10, height: 1, background: "rgba(255,255,255,0.25)" }} />
                      <span style={{ width: 10, height: 1, background: "rgba(255,255,255,0.25)" }} />
                    </div>
                  </div>

                  {/* Faux code lines */}
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace",
                      fontSize: 12.5, lineHeight: 1.8,
                    }}
                  >
                    <div className="hero-terminal-line" style={{ opacity: 0, display: "flex", gap: 14 }}>
                      <span style={{ color: "rgba(255,255,255,0.25)", width: 14, textAlign: "right" }}>01</span>
                      <span><span style={{ color: "#ec4899" }}>export const</span> <span style={{ color: "#38bdf8" }}>studio</span> = {"{"}</span>
                    </div>
                    <div className="hero-terminal-line" style={{ opacity: 0, display: "flex", gap: 14 }}>
                      <span style={{ color: "rgba(255,255,255,0.25)", width: 14, textAlign: "right" }}>02</span>
                      <span>  <span style={{ color: "#a3e635" }}>team</span>: <span style={{ color: "#fbbf24" }}>40</span>,</span>
                    </div>
                    <div className="hero-terminal-line" style={{ opacity: 0, display: "flex", gap: 14 }}>
                      <span style={{ color: "rgba(255,255,255,0.25)", width: 14, textAlign: "right" }}>03</span>
                      <span>  <span style={{ color: "#a3e635" }}>shipped</span>: <span style={{ color: "#fbbf24" }}>150</span>,</span>
                    </div>
                    <div className="hero-terminal-line" style={{ opacity: 0, display: "flex", gap: 14 }}>
                      <span style={{ color: "rgba(255,255,255,0.25)", width: 14, textAlign: "right" }}>04</span>
                      <span>  <span style={{ color: "#a3e635" }}>stack</span>: [<span style={{ color: "#fde68a" }}>&apos;react&apos;</span>, <span style={{ color: "#fde68a" }}>&apos;go&apos;</span>, <span style={{ color: "#fde68a" }}>&apos;k8s&apos;</span>],</span>
                    </div>
                    <div className="hero-terminal-line" style={{ opacity: 0, display: "flex", gap: 14 }}>
                      <span style={{ color: "rgba(255,255,255,0.25)", width: 14, textAlign: "right" }}>05</span>
                      <span>  <span style={{ color: "#a3e635" }}>status</span>: <span style={{ color: "#fde68a" }}>&apos;accepting&apos;</span>,</span>
                    </div>
                    <div className="hero-terminal-line" style={{ opacity: 0, display: "flex", gap: 14 }}>
                      <span style={{ color: "rgba(255,255,255,0.25)", width: 14, textAlign: "right" }}>06</span>
                      <span>  <span style={{ color: "#a3e635" }}>ship</span>: <span style={{ color: "#ec4899" }}>async</span> () =&gt; <span style={{ color: "rgba(255,255,255,0.5)" }}>/* every week */</span></span>
                    </div>
                    <div className="hero-terminal-line" style={{ opacity: 0, display: "flex", gap: 14 }}>
                      <span style={{ color: "rgba(255,255,255,0.25)", width: 14, textAlign: "right" }}>07</span>
                      <span>{"}"}<span className="caret-blink" style={{ display: "inline-block", width: 8, height: 14, background: "#fafaf9", marginLeft: 6, verticalAlign: "middle" }} /></span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "18px -22px 14px" }} />

                  {/* "Currently building" ticker */}
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", marginBottom: 8, textTransform: "uppercase" }}>
                      Currently shipping
                    </div>
                    <div className="building-now" style={{ position: "relative", height: 22 }}>
                      {BUILDING_NOW.map((b, i) => (
                        <div
                          key={i}
                          style={{
                            position: "absolute", top: 0, left: 0, right: 0,
                            display: "flex", alignItems: "center", gap: 10,
                            opacity: 0,
                            animation: `building-rotate 12s infinite ${i * 3}s`,
                          }}
                        >
                          <span
                            style={{
                              padding: "2px 8px", borderRadius: 4,
                              background: "rgba(255,255,255,0.08)",
                              fontSize: 9, fontWeight: 600, letterSpacing: "0.14em",
                              color: "rgba(255,255,255,0.7)",
                              fontFamily: "'JetBrains Mono', monospace",
                            }}
                          >
                            {b.tag}
                          </span>
                          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.75)" }}>
                            {b.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom row — commits & deploy */}
                  <div
                    style={{
                      display: "grid", gridTemplateColumns: "1fr 1fr",
                      gap: 12, marginTop: 18,
                      paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>
                        Commits today
                      </div>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                        <span className="stat-num" data-val="247">247</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>
                        Deploys this week
                      </div>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                        <span className="stat-num" data-val="18">18</span>
                      </div>
                    </div>
                  </div>

                  {/* Subtle glow */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute", top: -80, right: -80, width: 280, height: 280,
                      background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ position: "relative", paddingTop: 28 }}>
              <div
                className="hero-stats-divider"
                aria-hidden
                style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 1,
                  background: "rgba(0,0,0,0.12)", transformOrigin: "left center",
                }}
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }} className="hero-stats-grid">
                {STATS.map((s, i) => (
                  <div
                    key={i}
                    className="hero-stat-col"
                    style={{
                      padding: "4px 0", opacity: 0,
                      borderRight: i < STATS.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                      paddingLeft: i === 0 ? 0 : 32,
                    }}
                  >
                    <div
                      className="stat-num"
                      data-val={s.value}
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 500,
                        lineHeight: 1, letterSpacing: "-0.03em",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {s.value}
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(0,0,0,0.5)", marginTop: 10, fontWeight: 500 }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll hint — fixed bottom-center */}
          <div
            className="hero-scroll-hint"
            style={{
              position: "absolute", bottom: 28, left: "50%",
              transform: "translateX(-50%)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)" }}>
              Scroll
            </span>
            <div
              style={{
                width: 20, height: 32, borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.2)",
                position: "relative", overflow: "hidden",
              }}
            >
              <span
                className="scroll-dot"
                style={{
                  position: "absolute", top: 6, left: "50%", marginLeft: -2,
                  width: 4, height: 4, borderRadius: "50%", background: "rgba(0,0,0,0.5)",
                }}
              />
            </div>
          </div>
        </section>

        {/* ── TRUSTED BY ── */}
        <section
          style={{
            padding: "36px 40px", borderTop: "1px solid rgba(0,0,0,0.06)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", flexShrink: 0 }}>
              Trusted by
            </span>
            <div
              style={{
                flex: 1, display: "flex", gap: 48, alignItems: "center",
                flexWrap: "wrap", rowGap: 16,
              }}
            >
              {CLIENTS.map((c) => (
                <span
                  key={c}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em",
                    color: "rgba(0,0,0,0.35)", transition: "color 0.2s",
                  }}
                  className="client-logo"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES (LIST STYLE) ── */}
        <section id="services" style={{ padding: "160px 40px", position: "relative" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            {/* Header row */}
            <div
              className="sh"
              style={{
                display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80,
                alignItems: "start", marginBottom: 100, opacity: 0,
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                  <span style={{ width: 6, height: 6, background: "#0a0a0a", borderRadius: "50%" }} />
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.55)" }}>
                    Capabilities / 01
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(42px, 5.5vw, 84px)", fontWeight: 500,
                    letterSpacing: "-0.035em", lineHeight: 0.95, margin: 0,
                  }}
                >
                  What we<br />
                  <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>
                    do best.
                  </span>
                </h2>
              </div>
              <div style={{ alignSelf: "end" }}>
                <p style={{ fontSize: 16, color: "rgba(0,0,0,0.6)", lineHeight: 1.7, margin: 0, maxWidth: 540 }}>
                  We operate as an embedded extension of your team — senior engineers who
                  care about the craft and the business outcome in equal measure.
                </p>
              </div>
            </div>

            {/* Services list */}
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.12)" }}>
              {SERVICES.map((s, i) => (
                <div
                  key={i}
                  className="svc-row"
                  data-cursor
                  style={{
                    position: "relative", display: "grid",
                    gridTemplateColumns: "80px 1fr 1.1fr 240px",
                    gap: 40, padding: "40px 0", alignItems: "center",
                    borderBottom: "1px solid rgba(0,0,0,0.12)",
                    opacity: 0, cursor: "pointer",
                    transition: "padding 0.35s ease",
                  }}
                >
                  {/* Number */}
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 13, fontWeight: 500, color: "rgba(0,0,0,0.35)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {s.num}
                  </span>
                  {/* Title */}
                  <h3
                    className="svc-title"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "clamp(24px, 2.6vw, 38px)", fontWeight: 500,
                      letterSpacing: "-0.025em", lineHeight: 1.05, margin: 0,
                      transition: "color 0.3s",
                    }}
                  >
                    {s.title}
                  </h3>
                  {/* Description */}
                  <p
                    style={{
                      fontSize: 14.5, color: "rgba(0,0,0,0.58)",
                      lineHeight: 1.65, margin: 0,
                    }}
                  >
                    {s.desc}
                  </p>
                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "flex-end" }}>
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          padding: "5px 10px", border: "1px solid rgba(0,0,0,0.14)",
                          borderRadius: 999, fontSize: 11, fontWeight: 500,
                          color: "rgba(0,0,0,0.55)",
                          background: "rgba(255,255,255,0.6)",
                          transition: "all 0.25s",
                        }}
                        className="svc-tag"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {/* Hover arrow */}
                  <span
                    className="svc-arrow"
                    aria-hidden
                    style={{
                      position: "absolute", right: -4, top: "50%",
                      transform: "translateY(-50%) translateX(-12px)",
                      opacity: 0, transition: "opacity 0.3s, transform 0.3s",
                      fontSize: 18, color: "rgba(0,0,0,0.4)",
                    }}
                  >
                    ↗
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WORK ── */}
        <section id="work" style={{ padding: "160px 40px", background: "#f5f5f4", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <div
              className="sh"
              style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 100, opacity: 0, gap: 40, flexWrap: "wrap" }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                  <span style={{ width: 6, height: 6, background: "#0a0a0a", borderRadius: "50%" }} />
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.55)" }}>
                    Case Studies / 02
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(42px, 5.5vw, 84px)", fontWeight: 500,
                    letterSpacing: "-0.035em", lineHeight: 0.95, margin: 0,
                  }}
                >
                  Selected<br />
                  <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>work.</span>
                </h2>
              </div>
              <a
                href="#"
                className="link-underline"
                style={{
                  fontSize: 14, color: "rgba(0,0,0,0.75)", textDecoration: "none",
                  display: "inline-flex", alignItems: "center", gap: 8,
                  borderBottom: "1px solid rgba(0,0,0,0.25)", paddingBottom: 4,
                }}
              >
                View all projects
                <span aria-hidden>→</span>
              </a>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {CASE_STUDIES.map((cs, i) => (
                <article
                  key={i}
                  className="wk wk-card"
                  data-cursor
                  style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    background: "#fafaf9", borderRadius: 24,
                    padding: "56px 56px", opacity: 0, cursor: "pointer",
                    border: "1px solid rgba(0,0,0,0.06)",
                    transition: "transform 0.4s ease, box-shadow 0.4s ease",
                    gap: 60,
                  }}
                >
                  {/* LEFT */}
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36 }}>
                        <span
                          style={{
                            fontSize: 11, color: "rgba(0,0,0,0.5)", fontWeight: 600,
                            letterSpacing: "0.16em", textTransform: "uppercase",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          № {cs.id}
                        </span>
                        <span style={{ width: 20, height: 1, background: "rgba(0,0,0,0.12)", display: "block" }} />
                        <span style={{ fontSize: 11, color: "rgba(0,0,0,0.5)", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                          {cs.category}
                        </span>
                        <span style={{ fontSize: 11, color: "rgba(0,0,0,0.5)", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", marginLeft: "auto" }}>
                          {cs.year}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: "clamp(36px, 4.5vw, 64px)", fontWeight: 500,
                          letterSpacing: "-0.035em", lineHeight: 0.95,
                          margin: "0 0 28px",
                        }}
                      >
                        {cs.name}
                      </h3>
                      <p style={{ fontSize: 15, color: "rgba(0,0,0,0.6)", lineHeight: 1.7, maxWidth: 420, margin: "0 0 32px" }}>
                        {cs.desc}
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {cs.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            padding: "5px 11px", border: "1px solid rgba(0,0,0,0.12)",
                            borderRadius: 999, fontSize: 11, fontWeight: 500,
                            color: "rgba(0,0,0,0.55)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div
                    style={{
                      position: "relative", borderRadius: 16, overflow: "hidden",
                      background: "#0a0a0a", color: "#fafaf9",
                      padding: "48px 44px", minHeight: 340,
                      display: "flex", flexDirection: "column", justifyContent: "space-between",
                    }}
                  >
                    {/* Grid overlay */}
                    <div
                      aria-hidden
                      style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                        maskImage: "radial-gradient(ellipse at 80% 20%, black, transparent 75%)",
                        WebkitMaskImage: "radial-gradient(ellipse at 80% 20%, black, transparent 75%)",
                      }}
                    />

                    <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
                        Outcome
                      </span>
                      <span style={{ fontSize: 18, color: "rgba(255,255,255,0.6)" }}>↗</span>
                    </div>

                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: "clamp(72px, 10vw, 136px)", fontWeight: 500,
                          lineHeight: 0.85, letterSpacing: "-0.04em",
                          color: "#fafaf9", fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {cs.metric}
                      </div>
                      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", marginTop: 16, letterSpacing: "0.02em" }}>
                        {cs.metricLabel}
                      </div>
                    </div>

                    <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>View case study</span>
                      <div style={{ display: "flex", gap: 4 }}>
                        {[0, 1, 2].map((d) => (
                          <span key={d} style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS (HORIZONTAL PINNED SCROLL) ── */}
        <section
          id="process"
          className="process-pin"
          style={{
            padding: 0, background: "#0a0a0a", color: "#fafaf9",
            height: "100vh", overflow: "hidden", position: "relative",
          }}
        >
          {/* Grid overlay */}
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0,
              backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              pointerEvents: "none",
            }}
          />
          {/* Side info */}
          <div
            style={{
              position: "absolute", top: 100, left: 40, right: 40,
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              zIndex: 2,
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
                <span style={{ width: 6, height: 6, background: "#fafaf9", borderRadius: "50%" }} />
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                  How we work / 03
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(38px, 5vw, 72px)", fontWeight: 500,
                  letterSpacing: "-0.035em", lineHeight: 0.95, margin: 0,
                }}
              >
                Our <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>process.</span>
              </h2>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", maxWidth: 320, lineHeight: 1.65, margin: 0, textAlign: "right" }}>
              Four phases. One team. A way of working refined across 150+ shipped products.
            </p>
          </div>

          {/* Horizontal track */}
          <div
            style={{
              height: "100%", display: "flex", alignItems: "center",
              paddingTop: 40,
            }}
          >
            <div
              className="process-track"
              style={{
                display: "flex", gap: 28, paddingLeft: 40, paddingRight: 140,
                willChange: "transform",
              }}
            >
              {PROCESS.map((step, i) => (
                <div
                  key={i}
                  className="process-card"
                  style={{
                    width: 440, flexShrink: 0, padding: "44px 40px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 20, background: "rgba(255,255,255,0.02)",
                    display: "flex", flexDirection: "column",
                    height: 500, justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
                      <span
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: 72, fontWeight: 500, color: "rgba(255,255,255,0.12)",
                          lineHeight: 1, letterSpacing: "-0.04em",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {step.num}
                      </span>
                      <span
                        style={{
                          padding: "5px 12px", borderRadius: 999,
                          border: "1px solid rgba(255,255,255,0.15)",
                          fontSize: 11, fontWeight: 500,
                          color: "rgba(255,255,255,0.65)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        Phase 0{i + 1}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 40, fontWeight: 500, margin: "0 0 20px",
                        letterSpacing: "-0.02em", lineHeight: 1,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>

                  <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24 }}>
                    {step.points.map((p) => (
                      <li
                        key={p}
                        style={{
                          fontSize: 13, color: "rgba(255,255,255,0.7)",
                          padding: "8px 0", display: "flex",
                          alignItems: "center", gap: 12,
                        }}
                      >
                        <span style={{ width: 14, height: 1, background: "rgba(255,255,255,0.2)" }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Trailing card */}
              <div
                style={{
                  width: 340, flexShrink: 0, padding: "44px 40px",
                  display: "flex", flexDirection: "column", justifyContent: "center",
                  height: 500,
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 32, fontWeight: 500, margin: "0 0 20px",
                    letterSpacing: "-0.025em", lineHeight: 1.05,
                  }}
                >
                  Every project. <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>No exceptions.</span>
                </h3>
                <a
                  href="mailto:hello@techbinaries.com"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "12px 22px", background: "#fafaf9", color: "#0a0a0a",
                    borderRadius: 999, fontSize: 13, fontWeight: 500,
                    textDecoration: "none", alignSelf: "flex-start", marginTop: 16,
                  }}
                >
                  Start yours →
                </a>
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div
            style={{
              position: "absolute", bottom: 28, left: 40,
              fontSize: 11, fontWeight: 600, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
              display: "flex", alignItems: "center", gap: 10,
            }}
          >
            <span style={{ display: "inline-block", width: 28, height: 1, background: "rgba(255,255,255,0.25)" }} />
            Scroll
          </div>
          <div
            style={{
              position: "absolute", bottom: 28, right: 40,
              fontSize: 11, fontWeight: 600, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            04 phases
          </div>
        </section>

        {/* ── STUDIO / PHILOSOPHY ── */}
        <section id="studio" style={{ padding: "160px 40px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <div
              className="sh"
              style={{ marginBottom: 80, opacity: 0, display: "flex", alignItems: "center", gap: 10 }}
            >
              <span style={{ width: 6, height: 6, background: "#0a0a0a", borderRadius: "50%" }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.55)" }}>
                Studio / 04
              </span>
            </div>

            <div className="sh" style={{ opacity: 0 }}>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(28px, 3.4vw, 52px)", fontWeight: 400,
                  lineHeight: 1.25, letterSpacing: "-0.02em", margin: 0,
                  maxWidth: 1100,
                }}
              >
                We believe the best software is built by small, senior teams who give a
                damn. No handoffs, no juniors at the helm, no theatre —{" "}
                <span style={{ fontStyle: "italic", color: "rgba(0,0,0,0.5)" }}>
                  just people who care, shipping work they&apos;re proud of.
                </span>
              </p>
            </div>

            {/* Principles grid */}
            <div
              style={{
                marginTop: 100, display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)", gap: 0,
                borderTop: "1px solid rgba(0,0,0,0.1)",
              }}
              className="principles-grid"
            >
              {[
                { n: "I.", t: "Senior by default", d: "Every engineer you talk to has shipped products at scale. No layers, no account managers." },
                { n: "II.", t: "Ship weekly", d: "Real demos every week. You stay close to the work. We stay accountable." },
                { n: "III.", t: "Built to last", d: "Architecture decisions made for the next 5 years, not the next sprint." },
              ].map((p, i) => (
                <div
                  key={p.n}
                  style={{
                    padding: "40px 32px 40px 0",
                    borderRight: i < 2 ? "1px solid rgba(0,0,0,0.08)" : "none",
                    paddingLeft: i > 0 ? 32 : 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 13, color: "rgba(0,0,0,0.35)",
                      fontWeight: 500, marginBottom: 24,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {p.n}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 22, fontWeight: 500, margin: "0 0 14px",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {p.t}
                  </h3>
                  <p style={{ fontSize: 14.5, color: "rgba(0,0,0,0.58)", lineHeight: 1.65, margin: 0 }}>
                    {p.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section style={{ padding: "160px 40px", background: "#f5f5f4", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: 1020, margin: "0 auto" }}>
            <div className="sh" style={{ marginBottom: 72, opacity: 0, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 6, height: 6, background: "#0a0a0a", borderRadius: "50%" }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.55)" }}>
                Voices / 05
              </span>
            </div>

            <div style={{ position: "relative", minHeight: 340 }}>
              {/* Giant quote mark */}
              <div
                aria-hidden
                style={{
                  position: "absolute", top: -60, left: -30,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 240, lineHeight: 1, color: "rgba(0,0,0,0.05)",
                  fontWeight: 500, pointerEvents: "none",
                }}
              >
                &ldquo;
              </div>

              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  style={{
                    position: i === 0 ? "relative" : "absolute",
                    top: 0, left: 0, right: 0,
                    opacity: activeTestimonial === i ? 1 : 0,
                    transform: `translateY(${activeTestimonial === i ? 0 : 12}px)`,
                    transition: "opacity 0.6s ease, transform 0.6s ease",
                    pointerEvents: activeTestimonial === i ? "auto" : "none",
                  }}
                >
                  <blockquote
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "clamp(22px, 2.6vw, 34px)", fontWeight: 400,
                      lineHeight: 1.4, color: "rgba(0,0,0,0.82)",
                      margin: "0 0 56px", letterSpacing: "-0.015em",
                      position: "relative", zIndex: 1,
                    }}
                  >
                    {t.quote}
                  </blockquote>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div
                      style={{
                        width: 44, height: 44, background: "#0a0a0a", color: "#fafaf9",
                        borderRadius: "50%", display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: 12, fontWeight: 500,
                        letterSpacing: "0.04em", flexShrink: 0,
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: 14.5, fontWeight: 500, letterSpacing: "-0.005em" }}>{t.name}</div>
                      <div style={{ fontSize: 13, color: "rgba(0,0,0,0.5)", marginTop: 2 }}>{t.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 80, paddingTop: 28, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
              <div style={{ display: "flex", gap: 10 }}>
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    aria-label={`View testimonial ${i + 1}`}
                    style={{
                      width: activeTestimonial === i ? 28 : 10, height: 3,
                      background: activeTestimonial === i ? "#0a0a0a" : "rgba(0,0,0,0.15)",
                      border: "none", cursor: "pointer", padding: 0,
                      transition: "all 0.35s ease", borderRadius: 2,
                    }}
                  />
                ))}
              </div>
              <div style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", fontVariantNumeric: "tabular-nums", letterSpacing: "0.04em" }}>
                {String(activeTestimonial + 1).padStart(2, "0")} <span style={{ opacity: 0.35 }}>/</span> {String(TESTIMONIALS.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </section>

        {/* ── TECH MARQUEE ── */}
        <section style={{ padding: "90px 0", borderTop: "1px solid rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto 56px", padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "end", gap: 40, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
                <span style={{ width: 6, height: 6, background: "#0a0a0a", borderRadius: "50%" }} />
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.55)" }}>
                  Stack / 06
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(32px, 3.8vw, 56px)", fontWeight: 500,
                  letterSpacing: "-0.03em", lineHeight: 1, margin: 0,
                }}
              >
                Tools we <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>trust.</span>
              </h2>
            </div>
            <p style={{ fontSize: 14, color: "rgba(0,0,0,0.55)", maxWidth: 380, lineHeight: 1.65, margin: 0 }}>
              Mature, battle-tested tooling — picked for your problem, not because it&apos;s new.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ overflow: "hidden" }}>
              <div className="marquee-track marquee-left" style={{ display: "flex", width: "max-content", gap: 0 }}>
                {[...TECH, ...TECH].map((t, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", alignItems: "center", gap: 28,
                      padding: "0 32px", flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "clamp(28px, 3.4vw, 48px)",
                        fontWeight: 500, color: "#0a0a0a",
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {t}
                    </span>
                    <span
                      aria-hidden
                      style={{
                        width: 8, height: 8, background: "#0a0a0a",
                        borderRadius: "50%", opacity: 0.2,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Second row — inverse */}
            <div style={{ overflow: "hidden", marginTop: 20 }}>
              <div className="marquee-track marquee-right" style={{ display: "flex", width: "max-content", gap: 0 }}>
                {[...TECH.slice().reverse(), ...TECH.slice().reverse()].map((t, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", alignItems: "center", gap: 28,
                      padding: "0 32px", flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "clamp(28px, 3.4vw, 48px)",
                        fontWeight: 400, fontStyle: "italic",
                        color: "transparent",
                        WebkitTextStroke: "1px rgba(0,0,0,0.2)",
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {t}
                    </span>
                    <span
                      aria-hidden
                      style={{
                        width: 8, height: 8,
                        border: "1px solid rgba(0,0,0,0.2)",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="contact" style={{ padding: "0 40px 80px", borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 80 }}>
          <div
            id="cta-inner"
            style={{
              borderRadius: 32, overflow: "hidden",
              padding: "120px 72px", position: "relative",
              background: "#0a0a0a", color: "#fafaf9",
              opacity: 0, maxWidth: 1320, margin: "0 auto",
            }}
          >
            {/* Grid */}
            <div
              aria-hidden
              style={{
                position: "absolute", inset: 0,
                backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                pointerEvents: "none",
              }}
            />
            {/* Radial glow */}
            <div
              aria-hidden
              style={{
                position: "absolute", top: "-20%", right: "-10%",
                width: 560, height: 560,
                background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%)",
                pointerEvents: "none",
              }}
            />
            {/* Faint glyph */}
            <div
              aria-hidden
              style={{
                position: "absolute", right: 40, bottom: -40,
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
                fontSize: 420, color: "rgba(255,255,255,0.025)",
                lineHeight: 0.8, letterSpacing: "-0.06em", userSelect: "none",
                pointerEvents: "none",
              }}
            >
              tb
            </div>

            <div style={{ position: "relative", zIndex: 1, maxWidth: 820 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                <span style={{ width: 6, height: 6, background: "#fafaf9", borderRadius: "50%" }} />
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                  Let&apos;s build / 07
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(48px, 7vw, 108px)", fontWeight: 500,
                  letterSpacing: "-0.04em", lineHeight: 0.92,
                  margin: "0 0 36px",
                }}
              >
                Have a product<br />
                in mind?{" "}
                <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>
                  Let&apos;s talk.
                </span>
              </h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.58)", maxWidth: 520, lineHeight: 1.65, margin: "0 0 48px" }}>
                Free 30-minute discovery call. You&apos;ll talk directly with an engineer
                and a strategist. No sales pitch, just a real conversation about your
                problem.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a
                  href="mailto:hello@techbinaries.com"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "15px 28px", background: "#fafaf9", color: "#0a0a0a",
                    textDecoration: "none", fontSize: 14, fontWeight: 500,
                    borderRadius: 999, transition: "transform 0.2s",
                  }}
                >
                  Book a discovery call
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="mailto:hello@techbinaries.com"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "15px 28px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.85)",
                    textDecoration: "none", fontSize: 14, fontWeight: 500,
                    borderRadius: 999, transition: "background 0.2s, border-color 0.2s",
                  }}
                  className="ghost-btn-dark"
                >
                  hello@techbinaries.com
                </a>
              </div>

              {/* Small grid info */}
              <div
                style={{
                  marginTop: 80, paddingTop: 32,
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32,
                }}
              >
                {[
                  { k: "Response time", v: "Within 24h" },
                  { k: "Typical project", v: "8–16 weeks" },
                  { k: "Based in", v: "Karachi, PK" },
                ].map((it) => (
                  <div key={it.k}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
                      {it.k}
                    </div>
                    <div style={{ fontSize: 17, color: "#fafaf9", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, letterSpacing: "-0.01em" }}>
                      {it.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ padding: "60px 40px 40px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            {/* Big wordmark */}
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(80px, 15vw, 240px)", fontWeight: 500,
                letterSpacing: "-0.05em", lineHeight: 0.85,
                marginBottom: 60, color: "#0a0a0a",
                display: "flex", alignItems: "baseline", justifyContent: "space-between",
                flexWrap: "wrap", gap: 20,
              }}
            >
              <span>techbinaries</span>
              <span style={{ fontSize: "0.15em", fontWeight: 500, color: "rgba(0,0,0,0.35)", letterSpacing: "0.02em" }}>
                ↗ hello@techbinaries.com
              </span>
            </div>

            <div
              style={{
                display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
                gap: 60, paddingTop: 40,
                borderTop: "1px solid rgba(0,0,0,0.08)",
              }}
              className="footer-grid"
            >
              <div>
                <p style={{ fontSize: 14, color: "rgba(0,0,0,0.6)", lineHeight: 1.65, margin: "0 0 16px", maxWidth: 340 }}>
                  A software engineering studio building durable products for ambitious teams. Karachi · Remote · Global.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a", boxShadow: "0 0 0 3px rgba(22,163,74,0.15)" }} />
                  <span style={{ fontSize: 12, color: "rgba(0,0,0,0.55)" }}>Accepting Q2 engagements</span>
                </div>
              </div>

              {[
                { h: "Studio", items: ["About", "Careers", "Journal", "Contact"] },
                { h: "Services", items: ["Engineering", "Design", "Strategy", "AI & Data"] },
                { h: "Connect", items: ["Twitter", "LinkedIn", "GitHub", "Dribbble"] },
              ].map((col) => (
                <div key={col.h}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: 20 }}>
                    {col.h}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    {col.items.map((it) => (
                      <li key={it}>
                        <a
                          href="#"
                          className="footer-link"
                          style={{ fontSize: 14, color: "rgba(0,0,0,0.7)", textDecoration: "none", transition: "color 0.2s" }}
                        >
                          {it}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 56, paddingTop: 24,
                borderTop: "1px solid rgba(0,0,0,0.08)",
                display: "flex", justifyContent: "space-between",
                alignItems: "center", flexWrap: "wrap", gap: 12,
              }}
            >
              <div style={{ fontSize: 12, color: "rgba(0,0,0,0.45)" }}>
                © 2026 TechBinaries. Built in-house.
              </div>
              <div style={{ display: "flex", gap: 20 }}>
                <a href="#" className="footer-link" style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", textDecoration: "none" }}>Privacy</a>
                <a href="#" className="footer-link" style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", textDecoration: "none" }}>Terms</a>
                <a href="#" className="footer-link" style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", textDecoration: "none" }}>Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { cursor: none !important; background: #fafaf9; -webkit-font-smoothing: antialiased; }
        ::selection { background: #0a0a0a; color: #fafaf9; }

        /* Marquee — seamless because content is duplicated 2x, animate to -50% */
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .marquee-left  { animation: marquee-left 55s linear infinite; will-change: transform; }
        .marquee-right { animation: marquee-right 60s linear infinite; will-change: transform; }

        /* ── HERO ANIMATIONS ── */
        /* Pulsing green status dot */
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(22,163,74,0.45); }
          70%  { box-shadow: 0 0 0 8px rgba(22,163,74,0); }
          100% { box-shadow: 0 0 0 0 rgba(22,163,74,0); }
        }
        .pulse-green { animation: pulse-ring 2s infinite; }

        /* Terminal caret blink */
        @keyframes caret-blink {
          0%, 50%   { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .caret-blink { animation: caret-blink 1.1s step-end infinite; }

        /* Scroll hint dot bouncing inside the mouse icon */
        @keyframes scroll-dot-bounce {
          0%   { transform: translateY(0); opacity: 0; }
          30%  { opacity: 1; }
          80%  { transform: translateY(14px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
        .scroll-dot { animation: scroll-dot-bounce 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite; }

        /* "Currently building" rotator — 4 items × 3s each = 12s cycle */
        @keyframes building-rotate {
          0%,  2%  { opacity: 0; transform: translateY(8px); }
          4%, 24%  { opacity: 1; transform: translateY(0); }
          26%, 100% { opacity: 0; transform: translateY(-8px); }
        }

        /* Hero CTA primary button — fill-on-hover effect */
        .hero-cta-primary::before {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(90deg, #262626, #0a0a0a);
          transform: translateX(-101%);
          transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
          z-index: 1;
        }
        .hero-cta-primary:hover::before { transform: translateX(0); }

        /* Preserve 3D on terminal for mouse tilt */
        .hero-terminal { transition: filter 0.4s; }
        .hero-terminal:hover { filter: drop-shadow(0 10px 30px rgba(0,0,0,0.15)); }


        /* Nav */
        .nav-link:hover { color: #0a0a0a !important; background: rgba(0,0,0,0.04) !important; }

        /* Services */
        .svc-row:hover { padding-left: 24px !important; background: rgba(0,0,0,0.02); }
        .svc-row:hover .svc-title { color: #0a0a0a; }
        .svc-row:hover .svc-arrow { opacity: 1 !important; transform: translateY(-50%) translateX(0) !important; }
        .svc-row:hover .svc-tag { border-color: rgba(0,0,0,0.3) !important; color: #0a0a0a !important; }

        /* Work cards */
        .wk-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 60px -20px rgba(0,0,0,0.12);
        }

        /* Ghost buttons */
        .ghost-btn:hover {
          border-color: rgba(0,0,0,0.35) !important;
          color: #0a0a0a !important;
          background: rgba(255,255,255,0.9) !important;
        }
        .ghost-btn-dark:hover {
          border-color: rgba(255,255,255,0.45) !important;
          background: rgba(255,255,255,0.05) !important;
        }

        /* Footer / client logos */
        .footer-link:hover { color: #0a0a0a !important; }
        .client-logo:hover { color: #0a0a0a !important; }

        /* Link underline */
        .link-underline:hover { color: #0a0a0a !important; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .principles-grid { grid-template-columns: 1fr !important; }
          .principles-grid > div { border-right: none !important; border-bottom: 1px solid rgba(0,0,0,0.08); padding-left: 0 !important; padding-right: 0 !important; }
          .principles-grid > div:last-child { border-bottom: none; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-main-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
        }
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .nav-clock { display: none !important; }

          /* Services become stacked */
          .svc-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 28px 0 !important;
          }
          .svc-row > div:last-of-type { justify-content: flex-start !important; }

          /* Work cards stack */
          .wk-card {
            grid-template-columns: 1fr !important;
            padding: 32px !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 768px) {
          html, body { cursor: auto !important; }
          section, #nav, footer { padding-left: 20px !important; padding-right: 20px !important; }
          #cta-inner { padding: 72px 32px !important; border-radius: 20px !important; }
          .hero-cta { justify-content: flex-start !important; }

          /* Hero stats: 2x2 */
          .hero-stats-grid { grid-template-columns: repeat(2, 1fr) !important; row-gap: 24px; }
          .hero-stats-grid > div { border-right: none !important; padding-left: 0 !important; }

          /* Any other 4-col legacy stats rows */
          .hf[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; row-gap: 24px; }
          .hf[style*="repeat(4, 1fr)"] > div { border-right: none !important; padding-left: 0 !important; }

          /* Services header stacks */
          .sh[style*="1fr 1.4fr"] { grid-template-columns: 1fr !important; gap: 32px !important; }

          .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }

          /* Hide process horizontal on mobile — use stacked version */
          .process-pin { height: auto !important; overflow: visible !important; }
          .process-pin > div:last-of-type { height: auto !important; padding-top: 180px !important; padding-bottom: 60px !important; }
          .process-track { flex-direction: column !important; padding: 0 20px !important; transform: none !important; gap: 16px !important; }
          .process-card { width: 100% !important; height: auto !important; min-height: 380px; }
          .process-pin > div[style*="absolute"][style*="bottom: 28px"] { display: none; }
        }
      `}</style>
    </>
  );
}