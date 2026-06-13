import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import mountain from "../assets/images/mountain.jpg";
import beach from "../assets/images/beach.jpg";
import city from "../assets/images/city.jpg";
import plane from "../assets/images/plane.jpg";

function Hero() {
   const navigate = useNavigate();
  return (
    <section className="min-h-screen flex items-center px-10">

      <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-teal-400 mb-4">
            Capture • Explore • Remember
          </p>

          <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
            Every Journey
            <br />
            Has A Story.
          </h1>

          <p className="text-zinc-400 text-lg mt-6 max-w-lg">
            Turn your adventures into beautiful memories,
            interactive travel journals, and unforgettable stories.
          </p>

          <div className="flex gap-4 mt-8">

            <button
  onClick={() => {

    const token =
      localStorage.getItem("token");

    if (token) {

      navigate("/dashboard");

    } else {

      navigate("/login");

    }

  }}
  className="
  bg-teal-500
  px-6
  py-3
  rounded-xl
  font-medium
  hover:scale-105
  transition
  "
>
  Start Exploring
</button>



          </div>
        </motion.div>

        {/* RIGHT IMAGE COLLAGE */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-2 gap-4"
        >
          <img
            src={mountain}
            className="rounded-3xl h-64 w-full object-cover"
          />

          <img
            src={beach}
            className="rounded-3xl h-80 w-full object-cover"
          />

          <img
            src={city}
            className="rounded-3xl h-80 w-full object-cover"
          />

          <img
            src={plane}
            className="rounded-3xl h-64 w-full object-cover"
          />
        </motion.div>

      </div>
      <div className="absolute w-96 h-96 bg-teal-500/20 blur-[150px] rounded-full top-20 left-20" />
    </section>
  );
}

export default Hero;