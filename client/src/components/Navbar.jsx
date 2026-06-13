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
      ? "text-fuchsia-400 font-semibold drop-shadow-[0_0_8px_rgba(232,121,249,0.3)]" 
      : "text-zinc-400 hover:text-fuchsia-400 transition-all duration-300";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand/Logo */}
        <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2 group">
          <span className="text-fuchsia-400 text-2xl group-hover:rotate-12 transition-transform duration-300">
            <Plane size={24} className="fill-fuchsia-400/20" />
          </span>
          <span className="text-xl font-black tracking-wider bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.2)]">
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
                className="flex items-center gap-2 bg-[#0e0e1e]/60 hover:bg-rose-500/20 hover:text-rose-400 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium border border-white/5 hover:border-rose-500/20 cursor-pointer"
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
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 px-5 py-2 rounded-xl font-medium shadow-lg shadow-fuchsia-500/20 transition-all duration-300"
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
        <div className="md:hidden bg-[#070612]/95 border-b border-white/5 px-6 py-6 absolute top-[65px] left-0 w-full flex flex-col gap-5 shadow-2xl backdrop-blur-lg animate-in fade-in slide-in-from-top-5 duration-200">
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
                className="flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 py-3 rounded-xl transition-all text-base font-semibold border border-rose-500/20 cursor-pointer"
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
                className="text-center text-lg py-2 text-zinc-400 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 py-3 rounded-xl font-medium shadow-lg shadow-fuchsia-500/20 text-center text-base"
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