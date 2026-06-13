function JourneyShowcase() {
  const places = [
    {
      city: "Delhi",
      country: "India",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5",
    },
    {
      city: "Hanoi",
      country: "Vietnam",
      image:
        "https://images.unsplash.com/photo-1555921015-5532091f6026",
    },
    {
      city: "Tokyo",
      country: "Japan",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
    },
  ];

  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-5xl font-bold text-center mb-4">
          Follow Your Journey
        </h2>

        <p className="text-zinc-400 text-center mb-16">
          Track every destination and relive every moment.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {places.map((place) => (
            <div
              key={place.city}
              className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800"
            >
              <img
                src={place.image}
                alt={place.city}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-semibold">
                  {place.city}
                </h3>

                <p className="text-zinc-400">
                  {place.country}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default JourneyShowcase;