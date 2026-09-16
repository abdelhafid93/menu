"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const hiddenRoutes = ["/order", "/checkout", "/admin", "/studio"];

  if (!mounted) return null;
  if (hiddenRoutes.includes(pathname)) return null;

  // الإعدادات البرمجية
  const phoneNumber = "212600000000"; // ضع رقم الهاتف هنا
  const whatsappMessage = "Bonjour Bella Vista, je souhaite réserver une table.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        
        {/* ## زر الواتساب فقط */}
        <motion.a
          key="whatsapp-btn"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group relative"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"></span>
          <FaWhatsapp size={28} className="relative z-10" />
          
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 ease-in-out whitespace-nowrap font-medium relative z-10 text-sm">
             Contactez-nous
          </span>
        </motion.a>

      </div>
    </AnimatePresence>
  );
}