function CTA() {
  return (
    <section className="py-32 text-center relative overflow-hidden">

  <div className="absolute inset-0 flex justify-center">
    <div className="h-96 w-96 bg-teal-500/10 blur-[150px] rounded-full" />
  </div>

  <div className="relative z-10">

    <h2 className="text-6xl font-bold mb-6">
      Ready To Capture
      <br />
      Your Next Adventure?
    </h2>

    <p className="text-zinc-400 mb-8">
      Start documenting your travels today.
    </p>

    <button className="bg-teal-500 px-8 py-4 rounded-xl hover:scale-105 transition">
      Get Started
    </button>

  </div>

</section>
  );
}

export default CTA;