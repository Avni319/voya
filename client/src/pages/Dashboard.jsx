import { useEffect, useState } from "react";
import CreateTripModal from "../components/CreateTripModal";
import { createTrip, getMyTrips, deleteTrip } from "../services/tripService";
import { Plus, BarChart2, Compass, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getDashboardStats } from "../services/dashboardService.js";
import TravelMap from "../components/TravelMap";
import { getCoordinates } from "../services/locationService";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [trips, setTrips] = useState([]);
  const [locations, setLocations] = useState([]);
  const [stats, setStats] = useState({
    trips: 0,
    photos: 0,
    journals: 0,
    totalExpenses: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchTrips = async () => {
    try {
      const data = await getMyTrips();
      setTrips(data);

      const coords = await Promise.all(
        data.map(async (trip) => {
          if (!trip.location) return null;
          return await getCoordinates(trip.location);
        })
      );
      setLocations(coords.filter(Boolean));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      console.log("Dashboard Stats:", data);
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrips();
    fetchStats();
  }, []);

  const handleCreateTrip = async (tripData) => {
    try {
      await createTrip(tripData);
      await fetchTrips();
      await fetchStats();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTrip = async (tripId) => {
    if (!window.confirm("Are you sure you want to delete this escape? 😢")) return;
    try {
      console.log("Deleting:", tripId);
      await deleteTrip(tripId);
      await fetchTrips();
      await fetchStats();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#03020a] text-[#f3f4f6] relative overflow-hidden">
      
      {/* Background Gradient Auroras */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-violet-600/10 blur-[130px] rounded-full -z-10" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-fuchsia-600/10 blur-[130px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-28 pb-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black mb-2 tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Hey {user?.name}, welcome back 👋
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg font-medium">
              Your escapes, logs, and memories, all in one space.
            </p>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
            className="bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 text-rose-400 hover:text-white px-5 py-3 rounded-2xl font-bold transition-all duration-300 w-full md:w-auto cursor-pointer"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-10">
          <div className="bg-[#0e0e1e]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hover:border-violet-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:-translate-y-1 transition-all duration-300">
            <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-1">Trips</p>
            <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.15)]">
              {stats.trips}
            </h2>
          </div>

          <div className="bg-[#0e0e1e]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hover:border-violet-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:-translate-y-1 transition-all duration-300">
            <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-1">Logs</p>
            <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.15)]">
              {stats.journals}
            </h2>
          </div>

          <div className="bg-[#0e0e1e]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hover:border-violet-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:-translate-y-1 transition-all duration-300">
            <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-1">Photos</p>
            <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.15)]">
              {stats.photos}
            </h2>
          </div>

          <div className="bg-[#0e0e1e]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hover:border-violet-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:-translate-y-1 transition-all duration-300">
            <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-1">Expenses</p>
            <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.15)]">
              ₹{stats.totalExpenses}
            </h2>
          </div>
        </div>

        {/* Travel Map */}
        <div className="mt-8 bg-[#0e0e1e]/30 backdrop-blur-xl border border-white/5 rounded-3xl p-5 sm:p-6 shadow-xl shadow-purple-950/5">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent uppercase tracking-wider">
            Adventure Radar 📍
          </h2>
          {locations.length === 0 ? (
            <p className="text-zinc-400 text-sm">
              Add trips with locations to see them on the map.
            </p>
          ) : (
            <div className="rounded-2xl overflow-hidden border border-white/5">
              <TravelMap locations={locations} />
            </div>
          )}
        </div>

        {/* Actions Button Row */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 hover:scale-102 transition-all duration-300 w-full sm:w-auto cursor-pointer"
          >
            <Plus size={20} />
            New Trip
          </button>
          
          <button
            onClick={() => navigate("/analytics")}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#0e0e1e]/60 hover:bg-violet-600/10 border border-white/5 hover:border-violet-500/20 font-semibold text-zinc-300 hover:text-white transition w-full sm:w-auto cursor-pointer"
          >
            <BarChart2 size={18} className="text-fuchsia-400" />
            Analytics
          </button>
          
          <button
            onClick={() => navigate("/explore")}
            className="flex items-center justify-center gap-2 bg-[#0e0e1e]/60 hover:bg-violet-600/10 border border-white/5 hover:border-violet-500/20 font-semibold text-zinc-300 hover:text-white px-6 py-3 rounded-2xl w-full sm:w-auto cursor-pointer"
          >
            <Compass size={18} className="text-fuchsia-400" />
            Explore Feed
          </button>
        </div>

        {/* Journeys List */}
        <div className="mt-14">
          <h2 className="text-2xl sm:text-3xl font-black mb-8 tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent uppercase tracking-wider">
            My Escapes 🌌
          </h2>

          {trips.length === 0 ? (
            <div className="bg-[#0e0e1e]/30 border border-white/5 rounded-3xl p-12 text-center backdrop-blur-md">
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                No Escapes Logged Yet
              </h3>
              <p className="text-zinc-500 max-w-sm mx-auto text-sm sm:text-base">
                Tap "New Trip" to log your first adventure and start saving those memories.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <div
                  key={trip._id}
                  className="group bg-[#0e0e1e]/40 backdrop-blur-lg border border-white/5 rounded-3xl overflow-hidden hover:border-fuchsia-500/20 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(168,85,247,0.08)] transition-all duration-300 flex flex-col"
                >
                  
                  {/* Cover */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={`https://picsum.photos/600/400?random=${trip._id}`}
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e1e] via-[#0e0e1e]/20 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-[#03020a]/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-semibold text-fuchsia-300 uppercase tracking-wider">
                        ✈️ Escape
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-fuchsia-400 transition-colors duration-300 line-clamp-1">
                      {trip.title}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-semibold mb-4">
                      📅 <span>{trip.startDate?.slice(0, 10)}</span> ➜ <span>{trip.endDate?.slice(0, 10)}</span>
                    </div>

                    <p className="text-zinc-400 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
                      {trip.description}
                    </p>

                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                      <span className="text-fuchsia-400/90 text-xs font-black uppercase tracking-widest">
                        {trip.visibility}
                      </span>

                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/trips/${trip._id}`)}
                          className="flex items-center gap-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-md shadow-fuchsia-500/10 cursor-pointer"
                        >
                          <Eye size={12} />
                          View
                        </button>

                        <button
                          onClick={() => handleDeleteTrip(trip._id)}
                          className="flex items-center gap-1 bg-[#1a0f18]/80 hover:bg-rose-600 border border-rose-500/10 hover:border-rose-600/30 text-rose-400 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer"
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Modal */}
      <CreateTripModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTrip}
      />
    </div>
  );
}

export default Dashboard;