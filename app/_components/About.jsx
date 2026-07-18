import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-[#0F0F0F] py-16 sm:py-20 lg:py-24 text-white overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:gap-14 lg:grid-cols-2">
          
          {/* Images Section */}
          <div className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none px-2 sm:px-0">
            {/* Main Image */}
            <div className="relative h-[280px] sm:h-[400px] md:h-[450px] lg:h-[540px] w-full overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/about-2.jpg"
                alt="Restaurant"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                className="object-cover"
              />
            </div>

            {/* Secondary Image - Optimized positioning for tablet and desktop */}
            <div className="absolute -bottom-6 -right-2 hidden sm:block md:bottom-5 md:right-5 w-36 h-48 sm:w-40 sm:h-52 lg:w-56 lg:h-68 overflow-hidden rounded-3xl border-4 sm:border-8 border-[#0F0F0F] shadow-2xl">
              <Image
                src="/about-1.jpg"
                alt="Chef"
                fill
                sizes="(max-width: 1024px) 200px, 300px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="text-center lg:text-left mt-6 lg:mt-0">
            <span className="text-xs font-semibold uppercase tracking-[6px] text-amber-500 block mb-3">
              À PROPOS
            </span>

            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Une expérience gastronomique
              <br className="hidden sm:block" /> inoubliable.
            </h2>

            <p className="mx-auto lg:mx-0 mt-6 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-gray-400">
              Depuis plusieurs années, notre restaurant accueille ses clients
              dans une ambiance chaleureuse où chaque plat est préparé avec des
              ingrédients frais et soigneusement sélectionnés. Notre passion est
              de vous offer une expérience culinaire raffinée et mémorable.
            </p>

            {/* Stats Grid - Fully responsive grid from mobile to desktop */}
            <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-500">
                  15+
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-400 text-center lg:text-left">
                  Années d'expérience
                </p>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-500">
                  50+
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-400 text-center lg:text-left">
                  Plats raffinés
                </p>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-500">
                  4.9★
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-400 text-center lg:text-left">
                  Note des clients
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-10">
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-amber-500 px-8 py-4 text-sm sm:text-base font-semibold text-black transition-all duration-300 hover:bg-amber-400 hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/10"
              >
                Réserver une table
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}