import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import mountain from "../assets/images/mountain.jpg";
import beach from "../assets/images/beach.jpg";
import city from "../assets/images/city.jpg";
import plane from "../assets/images/plane.jpg";

function Hero() {
   const navigate = useNavigate();
  return (
    <section className="min-h-screen flex items-center px-6 sm:px-12 relative overflow-hidden pt-20">
      
      {/* Dynamic Background Glows */}
      <div className="absolute w-[450px] h-[450px] bg-violet-600/10 blur-[130px] rounded-full top-10 left-10 -z-10 animate-pulse duration-4000" />
      <div className="absolute w-[350px] h-[350px] bg-fuchsia-600/10 blur-[120px] rounded-full bottom-20 right-20 -z-10 animate-pulse duration-3000" />

      <div className="grid lg:grid-cols-2 gap-16 items-center w-full max-w-7xl mx-auto">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-fuchsia-400 font-semibold uppercase tracking-widest text-sm mb-4 drop-shadow-[0_0_8px_rgba(232,121,249,0.2)]">
            Capture • Explore • Remember
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Every Journey
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.25)]">Has A Story.</span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg mt-6 max-w-lg leading-relaxed">
            Turn your adventures into beautiful memories, interactive travel journals, and unforgettable stories. Log your escapes, track details, and share the vibe.
          </p>

          <div className="flex gap-4 mt-10">
            <button
              onClick={() => {
                const token = localStorage.getItem("token");
                if (token) {
                  navigate("/dashboard");
                } else {
                  navigate("/login");
                }
              }}
              className="bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Start Exploring ✈️
            </button>
          </div>
        </motion.div>

        {/* RIGHT IMAGE COLLAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-2 gap-4 relative"
        >
          {/* Subtle glow behind the collage */}
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/5 to-fuchsia-600/5 blur-2xl -z-10 rounded-3xl" />
          
          <img
            src={mountain}
            alt="Mountains"
            className="rounded-3xl h-56 sm:h-64 w-full object-cover border border-white/5 hover:border-violet-500/20 hover:scale-[1.02] transition-all duration-500 shadow-xl"
          />

          <img
            src={beach}
            alt="Beach"
            className="rounded-3xl h-72 sm:h-80 w-full object-cover border border-white/5 hover:border-fuchsia-500/20 hover:scale-[1.02] transition-all duration-500 shadow-xl"
          />

          <img
            src={city}
            alt="City"
            className="rounded-3xl h-72 sm:h-80 w-full object-cover border border-white/5 hover:border-fuchsia-500/20 hover:scale-[1.02] transition-all duration-500 shadow-xl"
          />

          <img
            src={plane}
            alt="Plane"
            className="rounded-3xl h-56 sm:h-64 w-full object-cover border border-white/5 hover:border-violet-500/20 hover:scale-[1.02] transition-all duration-500 shadow-xl"
          />
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;