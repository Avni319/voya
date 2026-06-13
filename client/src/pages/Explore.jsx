import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicTrips } from "../services/tripService";
import { Search, Globe, ArrowLeft, Eye } from "lucide-react";

function Explore() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");
  
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getPublicTrips();
        setTrips(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrips();
  }, []);

  const filteredTrips = trips.filter(
    (trip) =>
      trip.title.toLowerCase().includes(search.toLowerCase()) ||
      trip.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#03020a] text-[#f3f4f6] relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-violet-600/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-fuchsia-600/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-28 pb-12">
        
        {/* Navigation */}
        <button
          onClick={() => navigate(isLoggedIn ? "/dashboard" : "/")}
          className="flex items-center gap-2 text-zinc-400 hover:text-fuchsia-400 mb-8 group transition-colors duration-200 cursor-pointer font-medium text-sm"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to {isLoggedIn ? "Dashboard" : "Home"}
        </button>

        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Globe
              size={60}
              className="text-fuchsia-400 drop-shadow-[0_0_15px_rgba(232,121,249,0.35)]"
            />
          </div>

          <h1 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Explore Adventures
          </h1>

          <p className="text-zinc-400 text-lg sm:text-xl font-medium">
            Discover travel stories shared by explorers around the world.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-12">
          <Search className="absolute left-4 top-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search escape stories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0e0e1e]/60 rounded-2xl py-4 pl-12 pr-4 border border-white/5 focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 outline-none transition-all duration-300 text-white placeholder-zinc-500 font-medium"
          />
        </div>

        {/* Grid Feed */}
        {filteredTrips.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-500 font-semibold text-lg">No adventures match your search. 🔍</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrips.map((trip) => (
              <div
                key={trip._id}
                className="group bg-[#0e0e1e]/40 backdrop-blur-lg border border-white/5 rounded-3xl overflow-hidden hover:border-fuchsia-500/20 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(168,85,247,0.08)] transition-all duration-300 flex flex-col"
              >
                <img
                  src={
                    trip.coverImage ||
                    `https://picsum.photos/600/400?random=${trip._id}`
                  }
                  alt=""
                  className="w-full h-56 object-cover group-hover:scale-103 transition-transform duration-500"
                />

                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-fuchsia-400 transition-colors duration-300 line-clamp-1">
                    {trip.title}
                  </h2>

                  <p className="text-zinc-400 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
                    {trip.description}
                  </p>

                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                    <span className="text-fuchsia-400 font-black uppercase text-xs tracking-wider">
                      Public
                    </span>

                    <button
                      onClick={() => navigate(`/explore/${trip._id}`)}
                      className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-fuchsia-500/10 cursor-pointer transition-all duration-300"
                    >
                      <Eye size={14} />
                      View Story
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Explore;