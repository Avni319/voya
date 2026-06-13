import { Camera, MapPin, BookOpen, Sparkles } from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      icon: <MapPin size={32} />,
      title: "Create a Trip",
      desc: "Start a new journey and add destinations.",
    },
    {
      icon: <Camera size={32} />,
      title: "Upload Memories",
      desc: "Save photos from your adventures.",
    },
    {
      icon: <BookOpen size={32} />,
      title: "Write Stories",
      desc: "Document experiences and moments.",
    },
    {
      icon: <Sparkles size={32} />,
      title: "Relive Forever",
      desc: "View your travel timeline anytime.",
    },
  ];

  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-4">
          How VOYA Works
        </h2>

        <p className="text-zinc-400 text-center mb-16">
          Create. Capture. Remember.
        </p>

        <div className="grid md:grid-cols-4 gap-6">

          {steps.map((step) => (
            <div
              key={step.title}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-teal-400 transition"
            >
              <div className="text-teal-400 mb-4">
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold mb-2">
                {step.title}
              </h3>

              <p className="text-zinc-400">
                {step.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;