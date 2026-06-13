import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut, Plane } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = !!token && !!user;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsOpen(false);
    navigate("/");
  };

  const activeClass = (path) => 
    location.pathname === path 
      ? "text-teal-400 font-semibold" 
      : "text-zinc-300 hover:text-teal-400 transition-colors";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/60 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand/Logo */}
        <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2 group">
          <span className="text-teal-400 text-2xl group-hover:rotate-12 transition-transform duration-300">
            <Plane size={24} className="fill-teal-400/20" />
          </span>
          <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            VOYA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className={activeClass("/dashboard")}>
                Dashboard
              </Link>
              <Link to="/explore" className={activeClass("/explore")}>
                Explore
              </Link>
              <Link to="/analytics" className={activeClass("/analytics")}>
                Analytics
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-zinc-800 hover:bg-red-500/20 hover:text-red-400 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium border border-zinc-700 hover:border-red-500/30 cursor-pointer"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/explore" className={activeClass("/explore")}>
                Explore
              </Link>
              <Link
                to="/login"
                className="text-zinc-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:opacity-90 px-5 py-2 rounded-xl font-medium shadow-md shadow-teal-500/10 transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-zinc-400 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer/Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950/95 border-b border-zinc-800 px-6 py-6 absolute top-[65px] left-0 w-full flex flex-col gap-5 shadow-2xl backdrop-blur-lg animate-in fade-in slide-in-from-top-5 duration-200">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className={`text-lg py-2 ${activeClass("/dashboard")}`}
              >
                Dashboard
              </Link>
              <Link
                to="/explore"
                onClick={() => setIsOpen(false)}
                className={`text-lg py-2 ${activeClass("/explore")}`}
              >
                Explore
              </Link>
              <Link
                to="/analytics"
                onClick={() => setIsOpen(false)}
                className={`text-lg py-2 ${activeClass("/analytics")}`}
              >
                Analytics
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-3 rounded-xl transition-all text-base font-semibold border border-red-500/20 cursor-pointer"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/explore"
                onClick={() => setIsOpen(false)}
                className={`text-lg py-2 ${activeClass("/explore")}`}
              >
                Explore
              </Link>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-center text-lg py-2 text-zinc-300 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:opacity-90 py-3 rounded-xl font-medium shadow-md shadow-teal-500/10 text-center text-base"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;