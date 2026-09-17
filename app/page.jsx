import Navbar from "./_components/(headers)/Navbar";
import Hero from "./_components/(headers)/Hero";
import AboutSection from "./_components/About";
import Gallery from "./_components/Gallery";

import { client } from "@/sanity/lib/client";
import HeroSection from "./_components/(headers)/HeroSection";
import Footer from "./_components/Footer";
import WhatsAppButton from "./_components/Whats";

// ▼▼▼ زيد هاد السطر هنا (فوق الكومبوننت مباشرة) ▼▼▼
export const dynamic = "force-dynamic";
export const revalidate = 0;
// ▲▲▲ هادو الجوج سطرين كيجبرو الصفحة تجيب بيانات جديدة فكل زيارة ▲▲▲

const getData = async () => {
  const query = `*[_type == "menuHome"]| order(order asc){
  _id,
  name,
  "imageUrl": image.asset->url,
  order,
  "slug": slug.current
}`;
  const data = await client.fetch(query);
  return data;
};

export default async function Home() {
  const data = await getData();

  return (
    <main>
      <WhatsAppButton />
      <Navbar />
      <Hero />
      <HeroSection data={data} />
      <AboutSection />
      <Gallery />
      <Footer />
    </main>
  );
}