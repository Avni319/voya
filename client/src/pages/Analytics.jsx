import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BarChart2 } from "lucide-react";
import { getAnalytics } from "../services/analyticsService";

function Analytics() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAnalytics();
      setData(res);
    };
    fetchData();
  }, []);

  if (!data)
    return (
      <div className="min-h-screen bg-[#03020a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-fuchsia-500 mx-auto mb-4"></div>
          <p className="text-zinc-400 font-semibold">Loading stats...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#03020a] text-[#f3f4f6] pt-28 pb-10 px-4 sm:px-10 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-violet-600/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-fuchsia-600/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-zinc-400 hover:text-fuchsia-400 mb-6 group transition-colors duration-200 cursor-pointer font-medium text-sm"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        <div className="flex items-center gap-3 mb-10">
          <BarChart2 size={32} className="text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.3)]" />
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Travel Stats
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <div className="bg-[#0e0e1e]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hover:border-violet-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all duration-300">
            <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-1">Total Trips</p>
            <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {data.totalTrips}
            </h2>
          </div>

          <div className="bg-[#0e0e1e]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hover:border-violet-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all duration-300">
            <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-1">Total Photos</p>
            <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {data.totalPhotos}
            </h2>
          </div>

          <div className="bg-[#0e0e1e]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hover:border-violet-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all duration-300">
            <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-1">Logs</p>
            <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {data.totalJournals}
            </h2>
          </div>

          <div className="bg-[#0e0e1e]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hover:border-violet-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all duration-300">
            <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-1">Expenses</p>
            <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              ₹{data.totalExpenses}
            </h2>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#0e0e1e]/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-8">
            <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent uppercase tracking-wider">
              Expenses By Escape 💸
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.expenseByTrip}>
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#090914",
                    borderColor: "rgba(255,255,255,0.08)",
                    borderRadius: "16px",
                    color: "#f3f4f6",
                  }}
                />
                <Bar dataKey="expenses" fill="#d946ef" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#0e0e1e]/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-8">
            <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent uppercase tracking-wider">
              Snapshots Captured 📸
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.photosByTrip}>
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#090914",
                    borderColor: "rgba(255,255,255,0.08)",
                    borderRadius: "16px",
                    color: "#f3f4f6",
                  }}
                />
                <Bar dataKey="photos" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;