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
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide">
          🍽️ Foodie
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-orange-500 transition"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/212600000000"
          target="_blank"
          className="hidden md:flex bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full font-medium transition"
        >
          Reserve Now
        </a>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col p-6 gap-5">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-gray-700"
              >
                {link.name}
              </a>
            ))}

            <a
              href="https://wa.me/212600000000"
              target="_blank"
              className="bg-green-500 text-white text-center py-3 rounded-full"
            >
              Reserve Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}