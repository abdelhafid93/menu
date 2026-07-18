"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Menu", href: "#menu" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#111111]/90 backdrop-blur-xl border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-wide text-white"
          >
            <span className="text-amber-400">Bella</span>🍽️Vista
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-amber-400 transition duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* WhatsApp */}
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center rounded-full bg-amber-500 px-6 py-3 font-semibold text-black hover:bg-amber-400 transition"
          >
            Réserver
          </a>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-white"
          >
            <Menu size={30} />
          </button>

        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-500 ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-screen w-[300px] bg-[#111111] border-l border-amber-500/20 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        {/* Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-amber-500/20">

          <h2 className="text-xl font-bold text-white">
            <span className="text-amber-400">🍽️</span> 
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={30} />
          </button>

        </div>

        {/* Links */}
        <nav className="flex flex-col px-6 py-8">

          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-4 text-lg text-gray-300 border-b border-white/5 hover:text-amber-400 transition"
            >
              {link.name}
            </a>
          ))}

          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 rounded-full bg-amber-500 py-4 text-center font-semibold text-black hover:bg-amber-400 transition"
          >
            Réserver une table
          </a>

        </nav>

      </aside>
    </>
  );
}