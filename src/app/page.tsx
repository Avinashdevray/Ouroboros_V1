"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Shield,
  Zap,
  Eye,
  Lock,
  Package,
  Users,
  ArrowRight,
  Check,
  Download,
  Code,
  Cloud,
  Activity,
  Key,
  ChevronRight,
  Menu,
  XIcon,
} from "lucide-react";
import dynamic from "next/dynamic";

const SmoothCursor = dynamic(() => import("../components/SmoothCursor"), { ssr: false });
const AsciiWave = dynamic(() => import("../components/AsciiWave"), { ssr: false });
const TerminalCard = dynamic(() => import("../components/TerminalCard"), { ssr: false });

/* ───────────── ANIMATED SECTION WRAPPER ───────────── */
function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ───────────── OUROBOROS RING SVG ───────────── */
function OuroborosRing() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      {/* Outer dashed ring */}
      <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="1" strokeDasharray="8 6" />
      </svg>
      {/* Main ring */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" style={{ animation: "spin-slow 12s linear infinite reverse" }}>
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="1" />
            <stop offset="50%" stopColor="#059669" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="70" fill="none" stroke="url(#ringGrad)" strokeWidth="6" strokeLinecap="round" strokeDasharray="280 160" />
      </svg>
      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.6)]" />
      {/* Floating labels */}
      <motion.div
        className="absolute -top-2 right-0 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        fixing...
      </motion.div>
      <motion.div
        className="absolute bottom-4 -left-4 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        validating
      </motion.div>
      <motion.div
        className="absolute top-1/2 -right-8 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        scanning
      </motion.div>
    </div>
  );
}

/* ───────────── NAVBAR ───────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0e17]/90 backdrop-blur-xl border-b border-emerald-500/10" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full border-2 border-emerald-400 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all">
            <Shield className="w-4.5 h-4.5 text-emerald-400" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Ouroboros</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">How it Works</a>

          <a href="#sdk" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">SDK</a>
          <a href="#contact" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">Contact</a>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition-all pulse-glow"
          >
            Join
          </a>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-400 hover:text-white">
          {menuOpen ? <XIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0a0e17]/95 backdrop-blur-xl border-b border-emerald-500/10 px-6 pb-6"
        >
          <div className="flex flex-col gap-4">
            <a href="#how-it-works" className="text-sm text-gray-400 hover:text-emerald-400 py-2" onClick={() => setMenuOpen(false)}>How it Works</a>

            <a href="#sdk" className="text-sm text-gray-400 hover:text-emerald-400 py-2" onClick={() => setMenuOpen(false)}>SDK</a>
            <a href="#contact" className="text-sm text-gray-400 hover:text-emerald-400 py-2" onClick={() => setMenuOpen(false)}>Contact</a>
            <a href="#contact" className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-500 text-black text-center" onClick={() => setMenuOpen(false)}>Sign Up</a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

/* ───────────── EARLY ACCESS FORM ───────────── */
function EarlyAccessForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyRole: "",
    architecture: "",
    painPoint: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Application submitted successfully!");
        setFormData({ name: "", email: "", companyRole: "", architecture: "", painPoint: "" });
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-2xl p-8 md:p-10 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <Check className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">You&apos;re in!</h3>
        <p className="text-gray-400 mb-6">{message}</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm text-emerald-400 hover:underline"
        >
          Submit another application
        </button>
      </motion.div>
    );
  }

  return (
    <form className="glass-card rounded-2xl p-8 md:p-10 space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            required
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-600 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Work Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            required
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-600 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">Company / Role</label>
        <input
          type="text"
          name="companyRole"
          value={formData.companyRole}
          onChange={handleChange}
          placeholder="Acme Corp / Head of Security"
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-600 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">Architecture</label>
        <input
          type="text"
          name="architecture"
          value={formData.architecture}
          onChange={handleChange}
          placeholder="AWS, K8s, Node.js, Python, PostgreSQL..."
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-600 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">Biggest security pain in production</label>
        <textarea
          rows={4}
          name="painPoint"
          value={formData.painPoint}
          onChange={handleChange}
          placeholder="Tell us about your production security challenges..."
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 text-white placeholder-gray-600 text-sm resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm text-center">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-4 rounded-xl bg-emerald-500 text-black font-bold text-base hover:bg-emerald-400 transition-all pulse-glow disabled:opacity-50 disabled:cursor-not-allowed"
        data-magnetic
      >
        {status === "submitting" ? "Submitting..." : "Apply for Free Production Early Access"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Just exploring? Email <a href="mailto:ouroboros1679@gmail.com" className="text-emerald-400 hover:underline">ouroboros1679@gmail.com</a> with &quot;Production&quot; in the subject.
      </p>
    </form>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <SmoothCursor color="#10B981" glowEffect showTrail trailLength={3} />
      <Navbar />

      {/* ───── HERO ───── */}
      <section className="relative min-h-screen flex items-center overflow-hidden grid-pattern">
        {/* ASCII Wave Background */}
        <div className="absolute inset-0 opacity-[0.30] pointer-events-none">
          <AsciiWave color="#10B981" speed={0.6} />
        </div>
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0e17]/20 to-[#0a0e17] pointer-events-none" />
        {/* Decorative dots */}
        <div className="absolute top-20 right-10 w-32 h-32 dot-grid opacity-40 hidden lg:block" />
        <div className="absolute bottom-40 left-10 w-24 h-24 dot-grid opacity-30 hidden lg:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left content */}
            <div className="flex-1 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">System Online V1.0</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
                className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
              >
                <span className="text-white">Autonomous</span>
                <br />
                <span className="text-emerald-400 glow-text">Repository</span>
                <br />
                <span className="text-white">Security</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="text-lg text-gray-400 leading-relaxed mb-10 max-w-xl"
              >
                Ouroboros continuously finds vulnerabilities across your full stack,
                generates fixes, re-attacks the patched code, then delivers PRs you can trust.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold bg-emerald-500 text-black hover:bg-emerald-400 transition-all pulse-glow"
                  data-magnetic
                >
                  Join Early Access — Free
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold border border-gray-700 text-gray-300 hover:border-emerald-500/50 hover:text-emerald-400 transition-all"
                >
                  See How It Works
                </a>
              </motion.div>
            </div>

            {/* Right ring graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="flex-shrink-0"
            >
              <OuroborosRing />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── PLATFORM OVERVIEW ───── */}
      <AnimatedSection className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-emerald-400 tracking-widest uppercase mb-4 block">Platform Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">One brain over your<br /><span className="text-emerald-400">entire surface</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Beyond repos. Beyond alerts. Beyond snapshots. Ouroboros watches everything that matters.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: "Runtime Discovery", desc: "Map your entire attack surface — repos, pipelines, clouds, runtimes, and dependencies." },
              { icon: Activity, title: "Continuous Monitoring", desc: "Runs 24/7 in lock-step with your real production traffic and deployments." },
              { icon: Zap, title: "Offensive Testing", desc: "Autonomous RED campaigns chain misconfigurations and vulnerabilities into real attack paths." },
              { icon: Lock, title: "Data Classification", desc: "Identify and classify sensitive data stores, secrets, and privileged access paths." },
              { icon: Shield, title: "Threat Detection", desc: "Detect anomalous requests, process behavior, and east-west lateral movement." },
              { icon: Package, title: "Supply Chain Security", desc: "Monitor packages, images, registries, and sudden maintainer or dependency changes." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card rounded-2xl p-7 transition-all duration-300 group hover:scale-[1.02]"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-5 group-hover:bg-emerald-500/20 transition-colors">
                  <item.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ───── PROBLEM SECTION ───── */}
      <AnimatedSection className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="text-xs font-semibold text-emerald-400 tracking-widest uppercase mb-6 block">The Problem</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 leading-tight">
            The real breach starts where your<br /><span className="text-emerald-400">scanners stop.</span>
          </h2>

          <div className="space-y-8">
            {[
              "CI checks pass, pentests end, and then… you ship three hotfixes and a new feature on Friday. Who scanned that state of production?",
              "SAST/DAST/IaC tools watch code and configs, but attackers chain misconfigurations, runtime behavior, and forgotten services.",
              "Security teams drown in \"high\" findings, while the one attack path from the internet to your crown-jewel database remains open.",
              "When incidents hit, you're diffing configs in the dark, guessing which \"fix\" actually closed the door.",
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="text-lg text-gray-400 leading-relaxed pl-6 border-l-2 border-emerald-500/30"
              >
                {text}
              </motion.p>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-12 text-xl text-white font-semibold"
          >
            Ouroboros is built for the messy, always-changing reality of live systems — <span className="text-emerald-400">not the idealized state in your repo.</span>
          </motion.p>
        </div>
      </AnimatedSection>

      {/* ───── HOW IT WORKS ───── */}
      <section id="how-it-works" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <span className="text-xs font-semibold text-emerald-400 tracking-widest uppercase mb-4 block">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">See the whole kill chain,<br /><span className="text-emerald-400">break it automatically.</span></h2>
          </AnimatedSection>

          <div className="relative">
            {/* Vertical line connector */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-emerald-500/20 to-transparent -translate-x-1/2" />

            <div className="flex flex-col gap-16 lg:gap-20">
              {[
                {
                  step: "01",
                  title: "Discover your living attack surface",
                  desc: "Continuously ingests from Git, CI/CD, cloud providers, K8s, service meshes, WAFs, and identity systems. Builds a live graph of assets, services, users, and their relationships.",
                  icon: Eye,
                },
                {
                  step: "02",
                  title: "Think like an attacker, at scale",
                  desc: "The RED side runs continuous, autonomous campaigns: chaining misconfigurations, vulnerable code, exposed services, and supply chain issues into real attack paths.",
                  icon: Zap,
                },
                {
                  step: "03",
                  title: "Generate fixes, not wishlists",
                  desc: "The BLUE side designs changes across layers — code patches, infra-as-code diffs, policy updates, and network rules. Fix plans align with how your org ships.",
                  icon: Code,
                },
                {
                  step: "04",
                  title: "Test in twins, then in the wild",
                  desc: "Every fix is exercised in a digital twin environment, then rolled out with canaries and feature flags. Ouroboros watches real metrics and rolls back if anything smells wrong.",
                  icon: Shield,
                },
                {
                  step: "05",
                  title: "Re-attack and close the loop",
                  desc: "After deployment, RED re-runs the full attack path against production. Only then is a risk marked as \"resolved\" and the exposure graph updated.",
                  icon: Activity,
                },
                {
                  step: "06",
                  title: "Explain it so humans can sleep",
                  desc: "A full paper trail: what the path was, how it worked, what changed, who approved, when deployed, how it behaved in prod — mapped to your compliance controls.",
                  icon: Users,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className="flex-1 max-w-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-black text-emerald-400/30">{item.step}</span>
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-emerald-400" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Center node (desktop) */}
                  <div className="hidden lg:flex w-5 h-5 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)] flex-shrink-0" />

                  <div className="flex-1 max-w-lg" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── WHAT OUROBOROS WATCHES ───── */}
      <AnimatedSection className="py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-emerald-400 tracking-widest uppercase mb-4 block">Coverage</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What Ouroboros <span className="text-emerald-400">watches over</span></h2>
          </div>

          {/* Horizontal scroll cards */}
          <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-6 snap-x snap-mandatory -mx-6 px-6">
            {[
              { icon: Code, title: "Code & Pipelines", desc: "Repos, branches, PRs, build artifacts, release trains.", color: "from-emerald-500/20 to-green-500/10" },
              { icon: Cloud, title: "Cloud & Infra", desc: "AWS/Azure/GCP, Kubernetes, serverless, gateways, VPNs.", color: "from-cyan-500/20 to-emerald-500/10" },
              { icon: Activity, title: "Runtime Behavior", desc: "Live traffic, anomalous requests, process behavior, east-west movement.", color: "from-emerald-500/20 to-teal-500/10" },
              { icon: Package, title: "Dependencies & Supply Chain", desc: "Packages, images, registries, maintainer changes, malicious updates.", color: "from-green-500/20 to-emerald-500/10" },
              { icon: Key, title: "Identity & Access", desc: "IAM roles, SSO, secrets, keys, privileged paths.", color: "from-teal-500/20 to-emerald-500/10" },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-shrink-0 w-72 snap-center glass-card rounded-2xl p-7 hover:scale-[1.03] transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-5`}>
                  <card.icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-2xl font-bold text-white mb-3">If an attacker can pivot through it,</p>
            <p className="text-2xl font-bold text-emerald-400">Ouroboros treats it as part of the game board.</p>
          </div>

          {/* Qualification bullets */}
          <div className="mt-14 max-w-2xl mx-auto">
            <p className="text-lg text-gray-300 font-semibold mb-6 text-center">If this sounds like you, Ouroboros is your ally.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Multi-service cloud systems",
                "Production-only vulnerabilities",
                "Security teams drowning in alerts",
                "Autonomous defense without black-box risk",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ───── SDK DOWNLOAD ───── */}
      <section id="sdk" className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-14">
            <span className="text-xs font-semibold text-emerald-400 tracking-widest uppercase mb-4 block">Developer SDK</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get started in <span className="text-emerald-400">seconds</span></h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Install the Ouroboros SDK and integrate autonomous security into your pipeline in three quick steps.</p>
          </AnimatedSection>

          {/* Step 1 — Install */}
          <AnimatedSection delay={0.1} className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                <span className="text-lg font-extrabold text-emerald-400">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Install from source</h3>
                <p className="text-sm text-gray-500">Build and install the SDK wheel</p>
              </div>
            </div>
            <div className="w-full max-w-3xl">
              <TerminalCard command="pip install poetry && poetry install && poetry build
pip install dist/ouroboros_sdk-1.0.0-py3-none-any.whl" />
            </div>
          </AnimatedSection>

          {/* Step 2 — Configure */}
          <AnimatedSection delay={0.2} className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                <span className="text-lg font-extrabold text-emerald-400">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Configure your GitHub token</h3>
                <p className="text-sm text-gray-500">Copy the example config and add your token on line 8</p>
              </div>
            </div>
            <div className="w-full max-w-3xl">
              <TerminalCard command="cp config.example.yaml config.yaml
nano config.yaml          # paste token on line 8" />
            </div>
          </AnimatedSection>

          {/* Step 3 — Scan */}
          <AnimatedSection delay={0.3} className="mb-14">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                <span className="text-lg font-extrabold text-emerald-400">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Scan any repo</h3>
                <p className="text-sm text-gray-500">Point Ouroboros at your repository and let it work</p>
              </div>
            </div>
            <div className="w-full max-w-3xl">
              <TerminalCard command="ouroboros scan --repo https://github.com/your-org/your-app" />
            </div>
          </AnimatedSection>

          {/* CTA Buttons */}
          <AnimatedSection delay={0.4} className="flex flex-col items-center">
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold bg-emerald-500 text-black hover:bg-emerald-400 transition-all glow-emerald-strong"
                data-magnetic
              >
                <Download className="w-5 h-5" />
                Download SDK
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-semibold border border-gray-700 text-gray-300 hover:border-emerald-500/50 hover:text-emerald-400 transition-all"
              >
                View Documentation
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>


      {/* ───── EARLY ACCESS FORM ───── */}
      <section id="contact" className="py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-12">
            <span className="text-xs font-semibold text-emerald-400 tracking-widest uppercase mb-4 block">Early Access</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Help shape <span className="text-emerald-400">autonomous defense</span></h2>
            <p className="text-gray-400 text-lg">We&apos;re working with forward-leaning teams to bring production-aware, autonomous defense into live environments.</p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <EarlyAccessForm />
          </AnimatedSection>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="border-t border-emerald-500/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Security used to be a snapshot layered on top of your systems.
              <br />
              <span className="text-white font-semibold">Ouroboros turns it into a living, learning part of them.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-800">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full border-2 border-emerald-400/50 flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="text-sm text-gray-500">© 2026 Ouroboros — building autonomous security that respects the merge button.</span>
            </div>

            <div className="flex items-center gap-6">
              {["Security", "Privacy", "Responsible AI", "Contact"].map((link) => (
                <a key={link} href="#" className="text-sm text-gray-500 hover:text-emerald-400 transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
