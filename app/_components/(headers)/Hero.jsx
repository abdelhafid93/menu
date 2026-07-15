"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen mt-17 flex items-center justify-center bg-cover bg-center  "
      style={{
        backgroundImage: "url('/hero.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
     

        <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
          Savourez une cuisine
          <br />
          <span className="text-amber-400">authentique et raffinée</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 md:text-xl">
          Des ingrédients frais, des recettes préparées avec passion et une
          ambiance chaleureuse pour partager des moments inoubliables.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="#menu"
            className="rounded-full bg-amber-500 px-8 py-4 font-semibold transition hover:bg-amber-600"
          >
            Voir le menu
          </Link>

          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-black"
          >
            Réserver sur WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}