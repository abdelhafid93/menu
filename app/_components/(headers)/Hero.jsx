"use client"
import Image from "next/image";
import Link from "next/link";
import {  motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative mt-17 min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <Image
        src="/hero.jpg"
        alt="Restaurant"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">

        <motion.h1
        initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
        className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
          Savourez une cuisine
          <br />
          <span className="text-amber-400">
            authentique et raffinée
          </span>
        </motion.h1>

        <motion.p
        initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
        className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 md:text-xl">
          Des ingrédients frais, des recettes préparées avec passion et une
          ambiance chaleureuse pour partager des moments inoubliables.
        </motion.p>

        <motion.div
        initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 , delay:0.3 }}
        className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
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
        </motion.div>

      </div>
    </section>
  );
}