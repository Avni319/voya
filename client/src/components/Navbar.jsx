import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-zinc-800">

      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

       <div className="flex items-center gap-2">

  <span className="text-teal-400 text-2xl">
    ✈
  </span>

  <h1 className="text-2xl font-bold">
    VOYA
  </h1>

</div>

        <div className="flex gap-6">

          <Link
            to="/login"
            className="bg-teal-500 px-4 py-2 rounded-lg"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-teal-500 px-4 py-2 rounded-lg"
          >
            Signup
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;