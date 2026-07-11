import { client } from "@/sanity/lib/client";
import HeroSection from "../_components/(headers)/HeroSection";


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

async function page() {
    const data = await getData();
  return (
    <div>
          {/* تأكد من تمرير data={data} هنا */}
      <HeroSection data={data} />
    </div>
  )
}

export default page