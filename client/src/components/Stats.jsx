function Stats() {
  const stats = [
    { number: "10K+", label: "Travel Stories" },
    { number: "120+", label: "Countries" },
    { number: "50K+", label: "Photos Shared" },
    { number: "25K+", label: "Travelers" },
  ];

  return (
    <section className="py-24">
        <h2 className="text-5xl font-bold text-center mb-4">
  Trusted By Travelers Worldwide
</h2>

<p className="text-zinc-400 text-center mb-12">
  Join thousands documenting their adventures.
</p>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">

        {stats.map((item) => (
          <div
            key={item.label}
            className="text-center border border-zinc-800 rounded-2xl p-8"
          >
            <h2 className="text-4xl font-bold text-teal-400">
              {item.number}
            </h2>

            <p className="text-zinc-400 mt-2">
              {item.label}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}

export default Stats;