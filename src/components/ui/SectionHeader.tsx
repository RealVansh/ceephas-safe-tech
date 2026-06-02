"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

type Props = {
  label: string;
  title: string;
  subtitle?: string;
  center?: boolean;
};

export default function SectionHeader({
  label,
  title,
  subtitle,
  center = true,
}: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className={`mb-16 ${center ? "text-center" : ""}`}
    >
      <motion.div
        variants={fadeUp}
        className={`flex items-center gap-4 mb-4 ${center ? "justify-center" : ""}`}
      >
        <div className="w-8 h-[2px] bg-accent" />
        <span className="text-accent font-semibold text-xs tracking-widest uppercase">
          {label}
        </span>
        {center && <div className="w-8 h-[2px] bg-accent" />}
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="font-display text-5xl md:text-6xl text-text-primary mb-6"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="text-text-secondary max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
