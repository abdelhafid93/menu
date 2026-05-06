import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";

function HeroSection({ data }) {
  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar/>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 pt-5 md:pt-28">
        {data?.map((item, index) => (
          <Link href={`/${item.slug}`} key={item?._id}>
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl border border-yellow-700 shadow-lg">
              {/* عرض الصورة مع تحسينات الأداء */}
              <div className="h-48 w-full relative ">
                <Image
                  src={item?.imageUrl || "/placeholder.jpg"}
                  alt={item?.name || "food item"}
                  fill
                  // التحسين 1: إعطاء أولوية تحميل لأول 4 صور (LCP Optimization)
                  priority={index < 4}
                  // التحسين 2: تحميل أحجام صور تناسب شاشة الموبايل والكمبيوتر (Image Resizing)
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* طبقة تظليل فوق الصورة لكي يظهر النص بوضوح */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                <h3 className="text-white font-bold text-xl uppercase tracking-wider text-center px-2">
                  {item?.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;