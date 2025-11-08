"use client";
import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const steps = [
    {
      title: "1. Create Your Master Password",
      desc: "Your master password stays local. It never touches our servers.",
    },
    {
      title: "2. Cryptonism Encrypts Everything",
      desc: "Before syncing, Cryptonism locks every byte using advanced crypto algorithms.",
    },
    {
      title: "3. Vaultera Syncs Encrypted Data",
      desc: "Only encrypted data is stored in the cloud — unreadable by anyone else.",
    },
  ];

  return (
    <section id={'howitworks'} className="py-28 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#101020] to-[#0a0a0f]">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center text-4xl font-bold mb-20"
      >
        How Vaultera Works
      </motion.h2>

      <div className="relative max-w-5xl mx-auto">
        <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-blue-500/30 to-cyan-400/30" />
        <div className="space-y-20">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`relative flex flex-col items-center md:items-${
                i % 2 === 0 ? "start" : "end"
              } text-center md:text-left`}
            >
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-lg max-w-md">
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-400">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
