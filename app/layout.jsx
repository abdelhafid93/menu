import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatBot from "./_components/ChatBoot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // أضفنا هذا لضمان سرعة تحميل الخط
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "DÉLICE MENU | Votre Expérience Gastronomique Digitale",
  description: "Découvrez notre menu digital interactif. Savourez les meilleurs plats et cocktails de DÉLICE MENU directement sur votre smartphone.",
  icons: {
    icon: "/icon.webp", // تأكد من وجود الملف في مجلد public
    apple: "/icon.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    // أضفنا suppressHydrationWarning لتجنب أخطاء التباين بين السيرفر والمتصفح
    <html lang="en" suppressHydrationWarning
    className="scroll-smooth" >
      
      <body
       
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 `}
      >
        
        <ChatBot/>
        {children}
      </body>
    </html>
  );
}