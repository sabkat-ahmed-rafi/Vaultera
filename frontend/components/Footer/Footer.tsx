export default function Footer() {
  return (
    <footer className="py-10 text-center border-t border-white/10 text-gray-400">
      <p>© {new Date().getFullYear()} Vaultera — All rights reserved.</p>
      <p className="mt-2 text-sm">
        End-to-end encryption powered by{" "}
        <a href="https://cryptonism.vercel.app" target="_blank" className="underline font-semibold">Cryptonism</a>.
      </p>
      <p className="mt-2 text-sm">
        Crafted with 🤍 by{" "}
        <a href="https://github.com/sabkat-ahmed-rafi" target="_blank" className="underline">
          Rafi
        </a>
      </p>
    </footer>
  );
}
