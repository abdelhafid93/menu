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
      {/* Navbar Container */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#111111]/90 backdrop-blur-xl border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-xl sm:text-2xl font-bold tracking-wide text-white select-none whitespace-nowrap"
          >
            <span className="text-amber-400">Bella</span>🍽️Vista
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm xl:text-base font-medium text-gray-300 hover:text-amber-400 transition duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-amber-400 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* WhatsApp CTA Button */}
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-black hover:bg-amber-400 transition duration-300 active:scale-95 shadow-md shadow-amber-500/10"
          >
            Réserver
          </a>

          {/* Mobile/Tablet Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 text-white hover:text-amber-400 transition-colors duration-200 rounded-lg focus:outline-none"
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>

        </div>
      </header>

      {/* Overlay Background */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-all duration-500 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar Menu */}
      <aside
        className={`fixed top-0 right-0 h-screen w-full max-w-[320px] bg-[#111111] border-l border-amber-500/20 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-amber-500/20">
          <span className="text-xl font-bold text-white">
            <span className="text-amber-400">Bella</span>🍽️Vista
          </span>
          <button
            onClick={() => setOpen(false)}
            className="p-2 text-gray-400 hover:text-white transition duration-200 rounded-lg"
            aria-label="Close Menu"
          >
            <X size={28} />
          </button>
        </div>

        {/* Sidebar Links & CTA */}
        <nav className="flex flex-col px-6 py-6 h-[calc(100vh-80px)] justify-between overflow-y-auto">
          <div className="flex flex-col">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-4 text-base font-medium text-gray-300 border-b border-white/5 hover:text-amber-400 hover:pl-2 transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pb-6">
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-amber-500 py-3.5 text-center font-semibold text-black hover:bg-amber-400 transition duration-300 active:scale-95 shadow-lg shadow-amber-500/10"
            >
              Réserver une table
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
}