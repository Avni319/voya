import {
  MapPinned,
  Camera,
  BookOpen,
  Wallet,
  Sparkles,
  Globe,
} from "lucide-react";

function Features() {
  const features = [
    {
      icon: <MapPinned size={32} />,
      title: "Interactive Maps",
      desc: "Visualize every destination you've visited.",
    },
    {
      icon: <Camera size={32} />,
      title: "Photo Memories",
      desc: "Store and organize travel photos beautifully.",
    },
    {
      icon: <BookOpen size={32} />,
      title: "Travel Journals",
      desc: "Write stories and document your adventures.",
    },
    {
      icon: <Wallet size={32} />,
      title: "Expense Tracking",
      desc: "Track spending across all your trips.",
    },
    {
      icon: <Sparkles size={32} />,
      title: "AI Trip Summary",
      desc: "Generate smart travel summaries instantly.",
    },
    {
      icon: <Globe size={32} />,
      title: "Travel Analytics",
      desc: "View insights from your travel history.",
    },
  ];

  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-4">
          Everything You Need
        </h2>

        <p className="text-zinc-400 text-center mb-16">
          Designed for modern travelers.
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-teal-400 transition-all duration-300"
            >
              <div className="text-teal-400 mb-5">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-zinc-400">
                {feature.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;