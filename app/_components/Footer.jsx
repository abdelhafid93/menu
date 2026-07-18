import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0B] border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Restaurant */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Bella
              <span className="text-amber-500">Vista</span>
            </h2>

            <p className="mt-5 text-gray-400 leading-7">
              Une cuisine raffinée préparée avec des ingrédients frais,
              dans une ambiance élégante et chaleureuse.
            </p>

            <div className="flex gap-4 mt-8">

              <a
                href="#"
                className="w-11 h-11 rounded-full border border-amber-500/30 flex items-center justify-center text-white hover:bg-amber-500 hover:text-black transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full border border-amber-500/30 flex items-center justify-center text-white hover:bg-amber-500 hover:text-black transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://wa.me/212600000000"
                target="_blank"
                className="w-11 h-11 rounded-full border border-amber-500/30 flex items-center justify-center text-white hover:bg-amber-500 hover:text-black transition"
              >
                <FaWhatsapp />
              </a>

            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">
              Navigation
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li>
                <Link href="/">Accueil</Link>
              </li>

              <li>
                <a href="#about">À propos</a>
              </li>

              <li>
                <a href="#menu">Menu</a>
              </li>

              <li>
                <a href="#gallery">Galerie</a>
              </li>

              <li>
                <a href="#contact">Contact</a>
              </li>

            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">
              Horaires
            </h3>

            <div className="space-y-4 text-gray-400">

              <div className="flex items-center gap-3">
                <FaClock className="text-amber-500" />
                <span>Lun - Jeu : 12h00 - 22h00</span>
              </div>

              <div className="flex items-center gap-3">
                <FaClock className="text-amber-500" />
                <span>Ven - Dim : 12h00 - 23h30</span>
              </div>

            </div>
          </div>

          {/* Contact */}
          <div id="contact">
            <h3 className="text-xl font-semibold text-white mb-6">
              Contact
            </h3>

            <div className="space-y-5 text-gray-400">

              <div className="flex gap-3">
                <FaMapMarkerAlt className="text-amber-500 mt-1" />
                <span>Tanger, Maroc</span>
              </div>

              <div className="flex gap-3">
                <FaPhoneAlt className="text-amber-500 mt-1" />
                <span>+212 6 12 34 56 78</span>
              </div>

              <a
                href="https://wa.me/212600000000"
                target="_blank"
                className="inline-flex mt-3 rounded-full bg-amber-500 px-6 py-3 font-semibold text-black hover:bg-amber-400 transition"
              >
                Réserver sur WhatsApp
              </a>

            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">

          <p>
            © {new Date().getFullYear()} Bella Vista. Tous droits réservés.
          </p>

        </div>

      </div>
    </footer>
  );
}