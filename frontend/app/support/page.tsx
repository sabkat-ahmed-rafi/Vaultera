"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#0a0c0f] text-white">
      <Navbar />
      <section className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24 pt-40 pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-center mb-10 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
        >
          Support
        </motion.h1>

        <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto">
          Need help with Vaultera? We’re here for you.  
          Browse common questions or reach out directly to our team.
        </p>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg"
          >
            <h2 className="text-2xl font-semibold mb-3 text-blue-300">
              🔐 Account & Security
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Forgot your master password? Unfortunately, due to Vaultera’s
              zero-knowledge design, we can’t reset it for you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg"
          >
            <h2 className="text-2xl font-semibold mb-3 text-cyan-300">
              📦 Sync & Storage
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Your data automatically syncs securely between devices using your
              unique encryption key. Ensure you’re signed in on all devices with
              the same account.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg"
          >
            <h2 className="text-2xl font-semibold mb-3 text-blue-300">
              💬 Contact Support
            </h2>
            <p className="text-gray-400 mb-6">
              Still stuck? We’d love to help you personally.
            </p>
            <Link
              href="mailto:sabkatahmedrafi@gmail.com"
              className="inline-block bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-3 rounded-xl font-medium"
            >
              Email Us
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
