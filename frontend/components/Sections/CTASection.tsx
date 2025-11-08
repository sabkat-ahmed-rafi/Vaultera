"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-28 px-6 md:px-12 lg:px-24 text-center">
      {/* gradient and glow effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700/30 via-cyan-500/20 to-blue-900/30 blur-3xl opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,255,0.1),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
          Privacy isn’t a feature. It’s your right.
        </h2>
        <p className="text-gray-300 text-lg mb-10 leading-relaxed">
          Vaultera gives you the power to protect what matters most — your identity, your credentials,
          and your peace of mind. Experience a password manager built for people who care about privacy.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/about"
            className="px-8 py-4 text-lg font-semibold rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-cyan-400/30 transition-all"
          >
            Learn More About Vaultera
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
