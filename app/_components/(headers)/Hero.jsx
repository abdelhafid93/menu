"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

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

      {/* Overlay - dégradé au lieu d'un noir plat, plus cinématique */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">

        {/* Badge de confiance - crédibilité immédiate */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 mt-6 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
        >
          <div className="flex gap-0.5 ">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-sm font-medium ">4.9/5 · +15 ans d'expérience</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl font-bold leading-tight md:text-7xl"
        >
          Savourez une cuisine
          <br />
          <span className="text-amber-400">
            authentique et raffinée
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 md:text-xl"
        >
          Des ingrédients frais, des recettes préparées avec passion et une
          ambiance chaleureuse pour partager des moments inoubliables.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Link
            href="#menu"
            className="rounded-full bg-amber-500 px-8 py-4 font-semibold transition hover:bg-amber-600 hover:scale-105"
          >
            Voir le menu
          </Link>

          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-black hover:scale-105"
          >
            Réserver sur WhatsApp
          </a>
        </motion.div>

        {/* Indicateur de scroll - encourage à explorer plus bas */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-16 flex justify-center"
        >
          <div className="h-10 w-6 rounded-full border-2 border-white/50 flex items-start justify-center p-1">
            <div className="h-2 w-1 rounded-full bg-white/70" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}