import Navbar from "./_components/(headers)/Navbar";
import Hero from "./_components/(headers)/Hero";
import AboutSection from "./_components/About";
import Gallery from "./_components/Gallery";


import { client } from "@/sanity/lib/client";
import HeroSection from "./_components/(headers)/HeroSection";
import Footer from "./_components/Footer";


const getData = async () => {
  // أزلنا [0] لكي نحصل على كل الأصناف ونستطيع عمل map
const query = `*[_type == "menuHome"]| order(order asc){
  _id,
  name,
  "imageUrl": image.asset->url,
  order,
  "slug": slug.current // أضفنا هذا السطر لجلب الرابط
}`;
  const data = await client.fetch(query);
  return data;
};


export default async function Home() {
      const data = await getData();
  
  return (
    <main >
        <Navbar/>
        <Hero/>
      <HeroSection data={data} />
        <AboutSection/>
        <Gallery/>
        <Footer/>
    
    </main>
  );
}