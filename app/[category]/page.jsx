import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import { notFound } from "next/navigation";
import HokAddCart from "./_components/HokAddCart";
import { FaShoppingBag } from "react-icons/fa";
import CartLength from "./_components/CartLength";


// جلب البيانات من Sanity
const getData = async (categoryName) => {
  const query = `*[_type == "article" && (categoryes->name == $slug || categoryes->slug.current == $slug)]{
        _id,
        name,
        price,
        description,
        "imageUrl": image.asset->url
    }`;
  const data = await client.fetch(query, { slug: categoryName });
  return data;
};

async function PageHome({ params }) {
  // 1. انتظار الـ params (مهم في Next.js 15)
  const { category } = await params;
  
  // 2. جلب البيانات
  const data = await getData(category);

  // 3. التحقق من وجود البيانات أو التصنيف
  if (!data || data.length === 0) {
    notFound(); // سيظهر صفحة 404 التي أنشأناها
  }

  const bgImage = `/bg-${category}.jpg`;

  return (
    <section
      className="relative w-full min-h-screen  bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url('${bgImage}'), url('/default-bg.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px]"></div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="flex justify-between  ">
        {/* return Home  */}
        <Link href={"/#menu"} className="inline-flex items-center gap-1 border-b border-white/20 hover:border-yellow-500 transition-colors mb-6 group">
          <LuArrowLeft className="text-white group-hover:text-yellow-500 transition-colors" />
          <span className="font-bold text-sm text-white group-hover:text-yellow-500 transition-colors pr-2">
            Retour
          </span>
        </Link>
       {/* ## icon shop */}
<div className="relative inline-flex  items-center justify-center">
    {/* <FaShoppingBag className="text-red-600 text-2xl md:text-3xl" /> */}
    {/* <CartLength  />  */}
</div>
      </div>
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-black text-yellow-500 uppercase tracking-widest border-b-2 border-yellow-500 w-fit mx-auto pb-3 mb-2">
            {category}
          </h1>
          <p className="text-gray-400 tracking-[0.3em] text-[11px] uppercase">
            Menu Selection
          </p>
        </div>

        {/* شبكة الأطباق */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4">
          {data.map((item, index) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b border-white/10 pb-4 group hover:bg-white/5 transition-all px-3 rounded-lg"
            >
              <div className="flex  items-center gap-4">
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                  <Image
                    src={item?.imageUrl || "/placeholder.jpg"}
                    alt={item?.name}
                    fill
                    priority={index < 6} 
                    sizes="(max-width: 768px) 64px, 80px"
                    className="rounded-full object-cover border-2 border-yellow-600/20 group-hover:border-yellow-500 transition-all duration-300 shadow-xl"
                  />
                  {/* ## icon add */}
                  {/* <HokAddCart item={item}/> */}
                </div>

                <div>
                  <h2 className="text-me md:text-xl font-bold text-white group-hover:text-yellow-500 transition-colors duration-300 leading-tight">
                    {item?.name}
                  </h2>
              
                </div>
              </div>

              <div className="text-right">
                <span className="text-lg md:text-2xl font-black text-yellow-500 flex items-baseline gap-1">
                  {item?.price}
                  <span className="text-xs font-normal text-gray-300 uppercase">
                    DH
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PageHome;