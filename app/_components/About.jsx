import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-[#0F0F0F] py-20 md:py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Images */}
          <div className="relative mx-auto w-full max-w-lg">

            <div className="relative h-[350px] sm:h-[450px] lg:h-[520px] overflow-hidden rounded-3xl">
              <Image
                src="/about-2.jpg"
                alt="Restaurant"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>

            <div className="absolute -bottom-6 right-0 hidden sm:block w-40 h-52 md:w-52 md:h-64 lg:w-60 lg:h-72 overflow-hidden rounded-3xl border-8 border-[#0F0F0F]">
              <Image
                src="/about-1.jpg"
                alt="Chef"
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>

          </div>

          {/* Content */}
          <div className="text-center lg:text-left">

            <span className="text-xs uppercase tracking-[6px] text-amber-500">
              À PROPOS
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Une expérience gastronomique
              <br className="hidden sm:block" />
              inoubliable.
            </h2>

            <p className="mt-6 text-base leading-8 text-gray-400 sm:text-lg">
              Depuis plusieurs années, notre restaurant accueille ses clients
              dans une ambiance chaleureuse avec une cuisine préparée à partir
              d'ingrédients frais et de qualité. Chaque plat est imaginé pour
              offrir une expérience unique.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">

              <div>
                <h3 className="text-4xl font-bold text-amber-500">
                  15+
                </h3>
                <p className="mt-2 text-gray-400">
                  Années d'expérience
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-amber-500">
                  50+
                </h3>
                <p className="mt-2 text-gray-400">
                  Plats raffinés
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-amber-500">
                  4.9★
                </h3>
                <p className="mt-2 text-gray-400">
                  Note des clients
                </p>
              </div>

            </div>

            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-amber-500 px-8 py-4 font-semibold text-black transition hover:bg-amber-400"
            >
              Réserver une table
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}