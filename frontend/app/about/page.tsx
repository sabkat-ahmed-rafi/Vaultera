"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar/Navbar";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0c0f] text-white">
      <Navbar />
      <section className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 pt-40 pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-center mb-10 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
        >
          About Vaultera
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed"
        >
          Vaultera is a next-generation password manager built on true
          end-to-end encryption powered by <strong>Cryptonism</strong>.  
          It’s designed to give you full control of your digital identity —
          without compromising privacy or usability.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-16 mt-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold text-blue-300">
              Our Mission
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We believe privacy is a right, not a feature. Vaultera exists to
              empower individuals to protect their personal data with tools that
              are open, transparent, and easy to use — built with a
              zero-knowledge foundation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold text-cyan-300">
              How It Works
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Every password, note, or secret you store is encrypted locally
              using your own master key before syncing to our servers.  
              That means no one — not even us — can read your data.  
              Vaultera uses Cryptonism’s proven cryptographic core to make this
              possible.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
