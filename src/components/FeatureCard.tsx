"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 20px 40px -12px rgba(11,42,94,0.18)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
    >
      <motion.div
        whileHover={{ rotate: 6, scale: 1.08 }}
        className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-light text-white shadow-md shadow-navy/20"
      >
        <Icon size={18} />
      </motion.div>
      <h3 className="font-head text-base font-semibold text-navy">{title}</h3>
      {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
    </motion.div>
  );
}
