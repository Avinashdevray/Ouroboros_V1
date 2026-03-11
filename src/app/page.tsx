"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Shield01Icon as Shield,
  FlashIcon as Zap,
  ViewIcon as Eye,
  LockIcon as Lock,
  PackageIcon as Package,
  UserIcon as User,
  UserMultipleIcon as Users,
  ArrowRight01Icon as ArrowRight,
  Tick01Icon as Check,
  Download01Icon as Download,
  CodeIcon as Code,
  CloudIcon as Cloud,
  Activity01Icon as Activity,
  Key01Icon as Key,
  ArrowRight01Icon as ChevronRight,
  Menu01Icon as Menu,
  Cancel01Icon as XIcon,
  Sun01Icon as Sun,
  Moon02Icon as Moon,
} from "@hugeicons/core-free-icons";
import dynamic from "next/dynamic";
import { useTheme } from "../components/ThemeProvider";

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
  const { theme } = useTheme();
  const ringColor = theme === "light" ? "rgba(30,27,75,0.1)" : "rgba(16,185,129,0.1)";
  const dotBg = theme === "light" ? "bg-[#1E1B4B]" : "bg-emerald-400";
  const dotShadow = theme === "light" ? "shadow-[0_0_20px_rgba(30,27,75,0.3)]" : "shadow-[0_0_20px_rgba(16,185,129,0.6)]";
  const labelBg = theme === "light" ? "bg-[#1E1B4B]/10 text-[#1E1B4B] border-[#1E1B4B]/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      {/* Outer dashed ring */}
      <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="90" fill="none" stroke={ringColor} strokeWidth="1" strokeDasharray="8 6" />
      </svg>
      {/* Main ring */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" style={{ animation: "spin-slow 12s linear infinite reverse" }}>
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme === "light" ? "#047857" : "#10B981"} stopOpacity="1" />
            <stop offset="50%" stopColor={theme === "light" ? "#047857" : "#059669"} stopOpacity="0.8" />
            <stop offset="100%" stopColor={theme === "light" ? "#047857" : "#10B981"} stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="70" fill="none" stroke="url(#ringGrad)" strokeWidth="6" strokeLinecap="round" strokeDasharray="280 160" />
      </svg>
      {/* Center dot */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 ${dotBg} rounded-full ${dotShadow}`} />
      {/* Floating labels */}
      <motion.div
        className={`absolute -top-2 right-0 px-3 py-1 rounded-full text-xs font-mono ${labelBg} border`}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        fixing...
      </motion.div>
      <motion.div
        className={`absolute bottom-4 -left-4 px-3 py-1 rounded-full text-xs font-mono ${labelBg} border`}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        validating
      </motion.div>
      <motion.div
        className={`absolute top-1/2 -right-8 px-3 py-1 rounded-full text-xs font-mono ${labelBg} border`}
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
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-4" : "py-8"}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`relative flex items-center justify-between p-2 rounded-[1.35rem] border transition-all duration-500 ${scrolled
          ? theme === "light"
            ? "bg-white/80 backdrop-blur-xl border-gray-200 shadow-xl shadow-gray-200/50"
            : "bg-[#0a0e17]/80 backdrop-blur-xl border-emerald-500/20 shadow-xl shadow-[#0a0e17]/50"
          : theme === "light"
            ? "bg-white/40 backdrop-blur-md border-transparent shadow-none"
            : "bg-transparent border-transparent backdrop-blur-none shadow-none"
          }`}>

          {/* Logo */}
          <a href="#" className="flex items-center group">
            <img
              src={theme === "light" ? "/logo.png" : "/ouro-logo-dark-theme.png"}
              alt="Ouroboros Logo"
              className={`h-10 w-auto object-contain transition-all ${theme === "light"
                ? "group-hover:drop-shadow-[0_0_8px_rgba(30,27,75,0.3)]"
                : "brightness-110 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.1)]"
                }`}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <a href="#how-it-works" className={`px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all flex items-center h-10 ${theme === "light" ? "text-gray-600 hover:bg-gray-100/80 hover:text-[#1E1B4B]" : "text-gray-300 hover:bg-white/5 hover:text-white"}`}>
              How it Works
            </a>
            <a href="#sdk" className={`px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all flex items-center h-10 ${theme === "light" ? "text-gray-600 hover:bg-gray-100/80 hover:text-[#1E1B4B]" : "text-gray-300 hover:bg-white/5 hover:text-white"}`}>
              SDK
            </a>
            <a href="#contact" className={`px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all flex items-center h-10 ${theme === "light" ? "text-gray-600 hover:bg-gray-100/80 hover:text-[#1E1B4B]" : "text-gray-300 hover:bg-white/5 hover:text-white"}`}>
              Contact
            </a>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4 px-2">
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${theme === "light" ? "text-gray-600 hover:text-[#1E1B4B] hover:bg-gray-100/80" : "text-gray-400 hover:text-emerald-400 hover:bg-white/5"}`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <HugeiconsIcon icon={Moon} className="w-5 h-5" /> : <HugeiconsIcon icon={Sun} className="w-5 h-5" />}
            </button>
            <a href="#contact" className={`text-[11px] font-black uppercase tracking-widest px-8 h-12 rounded-2xl flex items-center gap-3 transition-all shadow-xl active:scale-[0.98] ${theme === "light" ? "bg-[#1E1B4B] text-white hover:opacity-90 shadow-[#1E1B4B]/20" : "bg-emerald-500 text-white hover:bg-emerald-400 shadow-emerald-500/20"}`}>
              Get Started
              <HugeiconsIcon icon={ArrowRight} className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-3 pr-2">
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${theme === "light" ? "text-gray-600 bg-gray-100/50" : "text-gray-400 bg-white/5"}`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <HugeiconsIcon icon={Moon} className="w-5 h-5" /> : <HugeiconsIcon icon={Sun} className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${theme === "light" ? "bg-gray-100/80 text-[#1E1B4B]" : "bg-white/5 text-white"}`}
            >
              {menuOpen ? <HugeiconsIcon icon={XIcon} className="w-6 h-6" /> : <HugeiconsIcon icon={Menu} className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden max-w-7xl mx-auto px-6 mt-4"
          >
            <div className={`rounded-[2.5rem] p-8 space-y-8 shadow-2xl overflow-hidden border ${theme === "light" ? "bg-white border-gray-200" : "bg-[#0a0e17] border-emerald-500/20"}`}>
              <div className="flex flex-col gap-2">
                <a href="#how-it-works" className={`text-lg font-black tracking-tight py-2 ${theme === "light" ? "text-[#1E1B4B]" : "text-white"}`} onClick={() => setMenuOpen(false)}>How it Works</a>
                <a href="#sdk" className={`text-lg font-black tracking-tight py-2 ${theme === "light" ? "text-[#1E1B4B]" : "text-white"}`} onClick={() => setMenuOpen(false)}>SDK</a>
                <a href="#contact" className={`text-lg font-black tracking-tight py-2 ${theme === "light" ? "text-[#1E1B4B]" : "text-white"}`} onClick={() => setMenuOpen(false)}>Contact</a>
              </div>
              <div className={`pt-8 border-t flex flex-col gap-4 ${theme === "light" ? "border-gray-200" : "border-emerald-500/20"}`}>
                <a
                  href="#contact"
                  className={`w-full h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${theme === "light" ? "bg-[#1E1B4B] text-white" : "bg-emerald-500 text-white"}`}
                  onClick={() => setMenuOpen(false)}
                >
                  Get Started
                  <HugeiconsIcon icon={ArrowRight} className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ───────────── EARLY ACCESS FORM ───────────── */
function EarlyAccessForm() {
  const { theme } = useTheme();
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

  const inputClass = `w-full px-4 py-3 rounded-xl text-sm transition-colors duration-300`
    + ` bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--input-text)] placeholder-[var(--input-placeholder)]`;

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-2xl p-8 md:p-10 text-center"
      >
        <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${theme === "light" ? "bg-[#047857]/10" : "bg-emerald-500/20"}`}>
          <HugeiconsIcon icon={Check} className={`w-8 h-8 ${theme === "light" ? "text-[#047857]" : "text-emerald-400"}`} />
        </div>
        <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--heading)" }}>You&apos;re in!</h3>
        <p style={{ color: "var(--body-text)" }} className="mb-6">{message}</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm hover:underline"
          style={{ color: "var(--accent-text)" }}
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
          <label className="block text-sm font-semibold mb-2" style={{ color: "var(--body-text)" }}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: "var(--body-text)" }}>Work Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: "var(--body-text)" }}>Company / Role</label>
        <input
          type="text"
          name="companyRole"
          value={formData.companyRole}
          onChange={handleChange}
          placeholder="Acme Corp / Head of Security"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: "var(--body-text)" }}>Architecture</label>
        <input
          type="text"
          name="architecture"
          value={formData.architecture}
          onChange={handleChange}
          placeholder="AWS, K8s, Node.js, Python, PostgreSQL..."
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: "var(--body-text)" }}>Biggest security pain in production</label>
        <textarea
          rows={4}
          name="painPoint"
          value={formData.painPoint}
          onChange={handleChange}
          placeholder="Tell us about your production security challenges..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm text-center">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-4 rounded-xl font-bold text-base transition-all pulse-glow disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }}
        data-magnetic
      >
        {status === "submitting" ? "Submitting..." : "Apply for Free Production Early Access"}
      </button>

      <p className="text-center text-sm" style={{ color: "var(--body-text-light)" }}>
        Just exploring? Email <a href="mailto:ouroboros1679@gmail.com" className="hover:underline" style={{ color: "var(--accent-text)" }}>ouroboros1679@gmail.com</a> with &quot;Production&quot; in the subject.
      </p>
    </form>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */
export default function HomePage() {
  const { theme } = useTheme();

  const heading = "var(--heading)";
  const body = "var(--body-text)";
  const accentText = "var(--accent-text)";
  const bodyLight = "var(--body-text-light)";

  return (
    <>
      <SmoothCursor color={theme === "light" ? "#1E1B4B" : "#10B981"} glowEffect showTrail trailLength={3} />
      <Navbar />

      {/* ───── HERO ───── */}
      <section className="relative min-h-screen flex items-center overflow-hidden grid-pattern">
        {/* ASCII Wave Background */}
        <div className="absolute inset-0 opacity-[0.30] pointer-events-none">
          <AsciiWave color={theme === "light" ? "#1E1B4B" : "#10B981"} speed={0.6} />
        </div>
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: theme === "light"
              ? "linear-gradient(to bottom, transparent, rgba(250,250,250,0.2), #FAFAFA)"
              : "linear-gradient(to bottom, transparent, rgba(10,14,23,0.2), #0a0e17)",
          }}
        />
        {/* Decorative dots */}
        <div className="absolute top-20 right-10 w-32 h-32 dot-grid opacity-40 hidden lg:block" />
        <div className="absolute bottom-40 left-10 w-24 h-24 dot-grid opacity-30 hidden lg:block" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left content */}
            <div className="flex-1 max-w-2xl">


              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
                className="text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6"
              >
                <span style={{ color: heading }}>Stop guessing </span>
                <br />
                <span className="glow-text" style={{ color: accentText }}>if you're secure</span>
                <br />
                <span style={{ color: heading }}>Ouroboros proves it.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: body }}
              >
                Detect, exploit, fix, re-attack, and audit vulnerabilities <br></br> an autonomous security loop running entirely locally.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold transition-all pulse-glow"
                  style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }}
                  data-magnetic
                >
                  Join Early Access Free
                  <HugeiconsIcon icon={ArrowRight} className="w-4 h-4" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold transition-all"
                  style={{
                    border: `1px solid var(--btn-outline-border)`,
                    color: "var(--btn-outline-text)",
                  }}
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
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: accentText }}>Platform Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: heading }}>One brain over your<br /><span style={{ color: accentText }}>entire surface</span></h2>
            <p className="max-w-2xl mx-auto text-lg" style={{ color: body }}>Beyond repos. Beyond alerts. Beyond snapshots. Ouroboros watches everything that matters.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: "Runtime Discovery", desc: "Map your entire attack surface: repos, pipelines, clouds, runtimes, and dependencies." },
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
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 backdrop-blur-md border ${theme === "light"
                  ? "bg-white/60 border-[#1E1B4B]/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] group-hover:bg-white/80"
                  : "bg-white/5 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] group-hover:bg-white/10"
                  }`}>
                  <HugeiconsIcon icon={item.icon} className="w-6 h-6" style={{ color: accentText }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: heading }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: body }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ───── PROBLEM SECTION ───── */}
      <AnimatedSection className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to right, var(--section-gradient-from), transparent)` }} />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="text-xs font-semibold tracking-widest uppercase mb-6 block" style={{ color: accentText }}>The Problem</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-12 leading-tight" style={{ color: heading }}>
            The real breach starts where your<br /><span style={{ color: accentText }}>scanners stop.</span>
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
                className={`text-lg leading-relaxed pl-6 border-l-2 ${theme === "light" ? "border-[#1E1B4B]/20" : "border-emerald-500/30"
                  }`}
                style={{ color: body }}
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
            className="mt-12 text-xl font-semibold"
            style={{ color: heading }}
          >
            Ouroboros is built for the messy, always-changing reality of live systems. <span style={{ color: accentText }}>Not the idealized state in your repo.</span>
          </motion.p>
        </div>
      </AnimatedSection>

      {/* ───── HOW IT WORKS ───── */}
      <section id="how-it-works" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: accentText }}>How It Works</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: heading }}>See the whole kill chain,<br /><span style={{ color: accentText }}>break it automatically.</span></h2>
          </AnimatedSection>

          <div className="relative">
            {/* Vertical line connector */}
            <div className={`hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 ${theme === "light"
              ? "bg-gradient-to-b from-[#1E1B4B]/30 via-[#1E1B4B]/15 to-transparent"
              : "bg-gradient-to-b from-emerald-500/40 via-emerald-500/20 to-transparent"
              }`} />

            <div className="flex flex-col gap-16 lg:gap-20">
              {[
                {
                  step: "01",
                  title: "Discover your living attack surface",
                  desc: "Continuously ingests from Git, CI/CD, cloud providers, K8s, service meshes, WAFs, and identity systems. Builds a live graph of assets, services, users, and their relationships.",

                },
                {
                  step: "02",
                  title: "Think like an attacker, at scale",
                  desc: "The RED side runs continuous, autonomous campaigns: chaining misconfigurations, vulnerable code, exposed services, and supply chain issues into real attack paths.",

                },
                {
                  step: "03",
                  title: "Generate fixes, not wishlists",
                  desc: "The BLUE side designs changes across layers: code patches, infra-as-code diffs, policy updates, and network rules. Fix plans align with how your org ships.",
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
                  desc: "A full paper trail: what the path was, how it worked, what changed, who approved, when deployed, how it behaved in prod, mapped to your compliance controls.",
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
                      <span className={`text-3xl font-black ${theme === "light" ? "text-gray-700" : "text-gray-500"}`}>{item.step}</span>

                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ color: heading }}>{item.title}</h3>
                    <p className="leading-relaxed" style={{ color: body }}>{item.desc}</p>
                  </div>

                  {/* Center node (desktop) */}
                  <div className={`hidden lg:flex w-5 h-5 rounded-full flex-shrink-0 ${theme === "light"
                    ? "bg-[#1E1B4B] shadow-[0_0_20px_rgba(30,27,75,0.3)]"
                    : "bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                    }`} />

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
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: accentText }}>Coverage</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: heading }}>What Ouroboros <span style={{ color: accentText }}>watches over</span></h2>
          </div>

          {/* Horizontal scroll cards */}
          <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-6 snap-x snap-mandatory -mx-6 px-6">
            {[
              { icon: Code, title: "Code & Pipelines", desc: "Repos, branches, PRs, build artifacts, release trains.", color: theme === "light" ? "from-[#1E1B4B]/10 to-[#047857]/5" : "from-emerald-500/20 to-green-500/10" },
              { icon: Cloud, title: "Cloud & Infra", desc: "AWS/Azure/GCP, Kubernetes, serverless, gateways, VPNs.", color: theme === "light" ? "from-[#047857]/10 to-[#1E1B4B]/5" : "from-cyan-500/20 to-emerald-500/10" },
              { icon: Activity, title: "Runtime Behavior", desc: "Live traffic, anomalous requests, process behavior, east-west movement.", color: theme === "light" ? "from-[#1E1B4B]/10 to-[#047857]/5" : "from-emerald-500/20 to-teal-500/10" },
              { icon: Package, title: "Dependencies & Supply Chain", desc: "Packages, images, registries, maintainer changes, malicious updates.", color: theme === "light" ? "from-[#047857]/10 to-[#1E1B4B]/5" : "from-green-500/20 to-emerald-500/10" },
              { icon: Key, title: "Identity & Access", desc: "IAM roles, SSO, secrets, keys, privileged paths.", color: theme === "light" ? "from-[#1E1B4B]/10 to-[#047857]/5" : "from-teal-500/20 to-emerald-500/10" },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-shrink-0 w-72 snap-center glass-card rounded-2xl p-7 hover:scale-[1.03] transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 relative overflow-hidden backdrop-blur-md border ${theme === "light"
                  ? "bg-white/60 border-[#1E1B4B]/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
                  : "bg-white/5 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
                  }`}>
                  <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${card.color}`} />
                  <HugeiconsIcon icon={card.icon} className="w-7 h-7 relative z-10" style={{ color: accentText }} />
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: heading }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: body }}>{card.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-2xl font-bold mb-3" style={{ color: heading }}>If an attacker can pivot through it,</p>
            <p className="text-2xl font-bold" style={{ color: accentText }}>Ouroboros treats it as part of the game board.</p>
          </div>

          {/* Qualification bullets */}
          <div className="mt-14 max-w-2xl mx-auto">
            <p className="text-lg font-semibold mb-6 text-center" style={{ color: heading }}>If this sounds like you, Ouroboros is your ally.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Multi-service cloud systems",
                "Production-only vulnerabilities",
                "Security teams drowning in alerts",
                "Autonomous defense without black-box risk",
              ].map((item, i) => (
                <div key={i} className={`flex items-start gap-3 p-4 rounded-xl ${theme === "light"
                  ? "bg-[#1E1B4B]/5 border border-[#1E1B4B]/10"
                  : "bg-emerald-500/5 border border-emerald-500/10"
                  }`}>
                  <HugeiconsIcon icon={Check} className={`w-5 h-5 mt-0.5 flex-shrink-0 ${theme === "light" ? "text-[#047857]" : "text-emerald-400"}`} />
                  <span className="text-sm" style={{ color: theme === "light" ? "var(--foreground)" : "#d1d5db" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ───── SDK DOWNLOAD ───── */}
      <section id="sdk" className="py-28 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, var(--section-gradient-from), transparent)" }} />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: accentText }}>Developer SDK</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: heading }}>Get started in <span style={{ color: accentText }}>seconds</span></h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: body }}>Install the Ouroboros SDK and integrate autonomous security into your pipeline in three quick steps.</p>
          </AnimatedSection>

          {/* Step 1 */}
          <AnimatedSection delay={0.1} className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md border ${theme === "light"
                ? "bg-white/60 border-[#1E1B4B]/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
                : "bg-white/5 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
                }`}>
                <span className="text-lg font-extrabold" style={{ color: accentText }}>1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: heading }}>Install from source</h3>
                <p className="text-sm" style={{ color: bodyLight }}>Build and install the SDK wheel</p>
              </div>
            </div>
            <div className="w-full max-w-3xl">
              <TerminalCard command={`pip install poetry && poetry install && poetry build\npip install dist/ouroboros_sdk-1.0.0-py3-none-any.whl`} />
            </div>
          </AnimatedSection>

          {/* Step 2 */}
          <AnimatedSection delay={0.2} className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md border ${theme === "light"
                ? "bg-white/60 border-[#1E1B4B]/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
                : "bg-white/5 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
                }`}>
                <span className="text-lg font-extrabold" style={{ color: accentText }}>2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: heading }}>Configure your GitHub token</h3>
                <p className="text-sm" style={{ color: bodyLight }}>Copy the example config and add your token on line 8</p>
              </div>
            </div>
            <div className="w-full max-w-3xl">
              <TerminalCard command={`cp config.example.yaml config.yaml\nnano config.yaml          # paste token on line 8`} />
            </div>
          </AnimatedSection>

          {/* Step 3 */}
          <AnimatedSection delay={0.3} className="mb-14">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md border ${theme === "light"
                ? "bg-white/60 border-[#1E1B4B]/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
                : "bg-white/5 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
                }`}>
                <span className="text-lg font-extrabold" style={{ color: accentText }}>3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: heading }}>Scan any repo</h3>
                <p className="text-sm" style={{ color: bodyLight }}>Point Ouroboros at your repository and let it work</p>
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
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold transition-all glow-emerald-strong"
                style={{ background: "var(--btn-primary-bg)", color: "var(--btn-primary-text)" }}
                data-magnetic
              >
                <HugeiconsIcon icon={Download} className="w-5 h-5" />
                Download SDK
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-semibold transition-all"
                style={{
                  border: `1px solid var(--btn-outline-border)`,
                  color: "var(--btn-outline-text)",
                }}
              >
                View Documentation
                <HugeiconsIcon icon={ChevronRight} className="w-4 h-4" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>


      {/* ───── EARLY ACCESS FORM ───── */}
      <section id="contact" className="py-28 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, var(--section-gradient-from), transparent)" }} />
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase mb-4 block" style={{ color: accentText }}>Early Access</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: heading }}>Help shape <span style={{ color: accentText }}>autonomous defense</span></h2>
            <p className="text-lg" style={{ color: body }}>We&apos;re working with forward-leaning teams to bring production-aware, autonomous defense into live environments.</p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <EarlyAccessForm />
          </AnimatedSection>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="py-16" style={{ borderTop: `1px solid ${theme === "light" ? "rgba(30,27,75,0.08)" : "rgba(16,185,129,0.1)"}` }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: body }}>
              Security used to be a snapshot layered on top of your systems.
              <br />
              <span className="font-semibold" style={{ color: heading }}>Ouroboros turns it into a living, learning part of them.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8" style={{ borderTop: `1px solid ${theme === "light" ? "#e5e7eb" : "#1f2937"}` }}>
            <div className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${theme === "light" ? "border-[#1E1B4B]/30" : "border-emerald-400/50"
                }`}>
                <HugeiconsIcon icon={Shield} className="w-3.5 h-3.5" style={{ color: accentText }} />
              </div>
              <span className="text-sm" style={{ color: bodyLight }}>© 2026 Ouroboros. Building autonomous security that respects the merge button.</span>
            </div>

            <div className="flex items-center gap-6">
              {["Security", "Privacy", "Responsible AI", "Contact"].map((link) => (
                <a key={link} href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: bodyLight }}>{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
