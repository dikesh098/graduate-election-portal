"use client";

import { motion } from "framer-motion";

export default function GradientBlobs({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const gold = "rgba(201,162,39,0.35)";
  const blue = variant === "dark" ? "rgba(62,111,176,0.45)" : "rgba(30,77,140,0.12)";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl"
        style={{ background: blue }}
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 top-10 h-72 w-72 rounded-full blur-3xl"
        style={{ background: gold }}
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-6rem] left-1/3 h-64 w-64 rounded-full blur-3xl"
        style={{ background: blue }}
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
