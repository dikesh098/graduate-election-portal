"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap } from "lucide-react";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/elections", label: "Elections" },
  { href: "/register", label: "Register" },
  { href: "/track", label: "Track Application" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 text-white transition-all ${
        scrolled ? "bg-navy-deep/90 shadow-lg backdrop-blur-md" : "bg-navy"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2 font-head text-lg font-bold tracking-wide">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light text-navy-deep">
            <GraduationCap size={16} />
          </span>
          Graduate Election Portal
        </Link>

        <nav className="hidden gap-6 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm text-blue-100 transition hover:text-gold-light after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-gold-light after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-1 overflow-hidden border-t border-white/10 bg-navy-deep px-5 md:hidden"
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-sm text-blue-100"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
