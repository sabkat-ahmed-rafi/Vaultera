"use client";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      title: "Seamless Vault Sync",
      desc: "Your encrypted vault syncs securely across all devices without ever sharing your key.",
      icon: "💫",
    },
    {
      title: "Zero-Knowledge Privacy",
      desc: "Even we can’t access your passwords. Your master key never leaves your device.",
      icon: "🧠",
    },
    {
      title: "End-to-End Encryption",
      desc: "Your data is encrypted locally using Cryptonism before it ever leaves your device — total privacy by design.",
      icon: "🔐",
    },
    {
      title: "Beautiful Interface",
      desc: "An elegant, distraction-free dashboard to keep your digital life organized and protected.",
      icon: "🎨",
    },
  ];

  return (
    <section id="features" className="py-28 px-6 md:px-12 lg:px-24 relative">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center text-4xl font-bold mb-16"
      >
        Modern Security. Minimal Design.
      </motion.h2>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-blue-500/20 transition"
          >
            <div className="text-5xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-400">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
