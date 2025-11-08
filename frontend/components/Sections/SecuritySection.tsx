"use client";
import { motion } from "framer-motion";

export default function SecuritySection() {
  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#0a0a0f] to-[#111122] text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-6"
      >
        End-to-End Encryption, Perfected.
      </motion.h2>

      <p className="text-gray-400 max-w-3xl mx-auto mb-12">
        Vaultera uses <span className="text-cyan-400 font-semibold">Cryptonism</span> to encrypt your
        vault before it ever leaves your device. AES-256, Argon2, and WebCrypto ensure your secrets
        remain truly yours.
      </p>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
        {["AES-256", "Argon2 Hashing", "Zero-Knowledge Proof", "Mnemonic Recovery"].map(
          (tech, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-400/5 border border-blue-500/20"
            >
              <h3 className="text-lg font-semibold text-cyan-300">{tech}</h3>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
}
