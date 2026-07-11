import Image from "next/image";
import Link from "next/link";

function HeroSection({ data }) {
  return (
    <section className="bg-[#0F0F0F] py-24" id="menu">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-amber-500 uppercase tracking-[6px] text-sm font-medium">
            Notre Menu
          </span>

          <h2 className="mt-4 text-4xl md:text-6xl font-bold text-white">
            Découvrez Nos Catégories
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-gray-400 text-lg leading-8">
            Explorez notre sélection de plats préparés avec des ingrédients
            frais et une passion pour la gastronomie.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data?.map((item, index) => (
            <Link href={`/${item.slug}`} key={item._id}>
              <div className="group overflow-hidden rounded-3xl bg-[#171717] border border-amber-500/20 transition-all duration-500 hover:border-amber-400 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(245,158,11,.15)]">

                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={item.imageUrl || "/placeholder.jpg"}
                    alt={item.name}
                    fill
                    priority={index < 4}
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">

                  <span className="text-xs uppercase tracking-[4px] text-amber-500">
                    Catégorie
                  </span>

                  <h3 className="mt-2 text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>

                  <p className="mt-3 text-gray-400 text-sm leading-6">
                    Découvrez une sélection de plats préparés avec des
                    ingrédients frais et une présentation raffinée.
                  </p>

                  <div className="mt-6 flex items-center justify-between">

                    <span className="text-amber-400 font-medium group-hover:translate-x-1 transition-transform">
                      Découvrir →
                    </span>

                    <div className="w-10 h-10 rounded-full border border-amber-500/30 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition">
                      →
                    </div>

                  </div>

                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HeroSection;