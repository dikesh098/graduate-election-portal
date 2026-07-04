"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle, ClipboardCheck, FileText, HelpCircle,
  Newspaper, Users, Bot, Phone, ArrowRight, ShieldCheck,
} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import Reveal from "@/components/Reveal";
import GradientBlobs from "@/components/GradientBlobs";
import CountUp from "@/components/CountUp";

const FEATURES = [
  { icon: CheckCircle, title: "Eligibility Checker", description: "Find out in seconds if you qualify to vote." },
  { icon: ClipboardCheck, title: "Step-by-Step Guide", description: "A clear path from start to finish." },
  { icon: FileText, title: "Document Checklist", description: "Know exactly what to prepare." },
  { icon: HelpCircle, title: "FAQs & Help Center", description: "Answers to the most common questions." },
  { icon: Newspaper, title: "News & Announcements", description: "Stay updated on deadlines and events." },
  { icon: Users, title: "Volunteer With Us", description: "Help fellow graduates register." },
  { icon: Bot, title: "AI Chat Assistant", description: "Instant answers, any time." },
  { icon: Phone, title: "Contact Office", description: "Reach the constituency office directly." },
];

const STATS = [
  { value: 24600, suffix: "+", label: "Graduates Registered" },
  { value: 6, suffix: "", label: "Districts Covered" },
  { value: 180, suffix: "+", label: "Active Volunteers" },
  { value: 98, suffix: "%", label: "Verification Rate" },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section
        className="dot-grid relative px-5 py-24 text-center text-white"
        style={{ backgroundColor: "#081D42" }}
      >
        <GradientBlobs variant="dark" />

        <div className="relative mx-auto max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light"
          >
            Nagpur Graduates&apos; Constituency · Maharashtra Legislative Council
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-head text-4xl font-bold leading-tight md:text-6xl"
          >
            Why Your <span className="text-gradient-gold">Vote</span> Matters
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-blue-100"
          >
            Register for the Graduate Constituency electoral roll, track your application, and stay
            connected with the office — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/register"
              className="btn-shine group flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-navy-deep shadow-lg shadow-gold/30 transition hover:scale-[1.03]"
            >
              Register Now
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/elections"
              className="rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Election Information
            </Link>
          </motion.div>
        </div>

        {/* Floating badge */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative mx-auto mt-14 flex max-w-md items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-left backdrop-blur"
        >
          <ShieldCheck className="text-gold-light" size={22} />
          <p className="text-xs text-blue-100">
            Secure, verified, and built for transparency — every step of your registration is tracked.
          </p>
        </motion.div>
      </section>

      {/* STATS STRIP */}
      <section className="relative bg-navy-deep px-5 py-10 text-white">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <div className="font-head text-3xl font-bold text-gold-light md:text-4xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-1 text-xs text-blue-200">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Platform Capabilities</p>
          <h2 className="mt-2 font-head text-3xl font-bold text-navy">Everything You Need, In One Portal</h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <FeatureCard {...f} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* MLC TEASER */}
      <section className="relative overflow-hidden bg-slate-50 px-5 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[220px_1fr]">
          <Reveal>
            <div className="relative mx-auto h-52 w-52 md:h-56 md:w-56">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold to-navy opacity-70 blur-md" />
              <Image
                src="/images/mlc-portrait.jpg"
                alt="Shri Abhijit Govindrao Wanjari"
                fill
                className="relative rounded-full border-4 border-white object-cover shadow-xl"
              />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Leadership</p>
            <h2 className="mt-2 font-head text-2xl font-bold text-navy md:text-3xl">
              Shri Abhijit Govindrao Wanjari
            </h2>
            <p className="mt-1 text-sm font-medium text-navy-light">
              Member, Maharashtra Legislative Council — Nagpur Graduates&apos; Constituency
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Committed to empowering graduates through education, innovation, transparency and
              digital public services — building a stronger, more connected constituency for every
              graduate voter in the Nagpur region.
            </p>
            <Link
              href="/about"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-navy-light"
            >
              Read full profile <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
