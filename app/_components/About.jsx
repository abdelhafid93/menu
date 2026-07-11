import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-[#0F0F0F] text-white py-24"
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Images */}
        <div className="relative">
          <div className="relative h-[500px] rounded-3xl overflow-hidden">
            <Image
              src="/about-2.jpg"
              alt="Restaurant"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-10 -right-10 hidden md:block w-64 h-80 rounded-3xl overflow-hidden border-8 border-[#0F0F0F]">
            <Image
              src="/about-1.jpg"
              alt="Chef"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div>

          <span className="text-amber-500 uppercase tracking-[5px] text-sm">
            À Propos
          </span>

          <h2 className="mt-4 text-5xl font-bold leading-tight">
            Une expérience gastronomique
            <br />
            inoubliable.
          </h2>

          <p className="mt-8 text-gray-400 leading-8 text-lg">
            Depuis plusieurs années, notre restaurant accueille ses clients
            dans une ambiance chaleureuse avec une cuisine préparée à partir
            d'ingrédients frais et de qualité. Chaque plat est imaginé pour
            offrir une expérience unique.
          </p>

          <div className="grid grid-cols-3 gap-8 mt-12">

            <div>
              <h3 className="text-4xl font-bold text-amber-500">
                15+
              </h3>

              <p className="text-gray-400 mt-2">
                Années d'expérience
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-amber-500">
                50+
              </h3>

              <p className="text-gray-400 mt-2">
                Plats raffinés
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-amber-500">
                4.9★
              </h3>

              <p className="text-gray-400 mt-2">
                Note des clients
              </p>
            </div>

          </div>

          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex mt-12 rounded-full bg-amber-500 px-8 py-4 font-semibold text-black transition hover:bg-amber-400"
          >
            Réserver une table
          </a>

        </div>

      </div>
    </section>
  );
}