import Image from "next/image";

const events = [
  {
    title: "Soirée Live Music",
    image: "/live.jpg",
  },
  {
    title: "Happy Hour",
    image: "/happy.jpg",
  },
  {
    title: "Family Dinner",
    image: "/family.jpg",
  },
  {
    title: "Chef's Special",
    image: "/chef.jpg",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="bg-[#111111] py-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="uppercase tracking-[5px] text-amber-500 text-sm">
            Galerie
          </span>

          <h2 className="mt-4 text-5xl font-bold text-white">
            Événements & Ambiance
          </h2>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            Découvrez nos soirées à thème, concerts live et les meilleurs
            moments passés avec nos clients.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {events.map((event) => (
            <div
              key={event.title}
              className="group overflow-hidden rounded-3xl relative h-[420px]"
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-2xl font-bold">
                  {event.title}
                </h3>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}