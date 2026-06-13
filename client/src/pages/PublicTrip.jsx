import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTripById } from "../services/tripService";
import { getTripPhotos } from "../services/photoService";
import { getTripJournalEntries } from "../services/journalService";
import { getTripExpenses } from "../services/expenseService";
import { 
  ArrowLeft, 
  Calendar, 
  Globe, 
  BookOpen, 
  Image as ImageIcon, 
  CreditCard, 
  DollarSign 
} from "lucide-react";

function PublicTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [journals, setJournals] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripData = await getTripById(id);
        const photoData = await getTripPhotos(id);
        const journalData = await getTripJournalEntries(id);
        const expenseData = await getTripExpenses(id);

        setTrip(tripData);
        setPhotos(photoData);
        setJournals(journalData);
        setExpenses(expenseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  if (!trip) {
    return (
      <div className="min-h-screen bg-[#03020a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-fuchsia-500 mx-auto mb-4"></div>
          <p className="text-zinc-400 font-semibold">Gathering trip logs...</p>
        </div>
      </div>
    );
  }

  const totalExpenses = expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (
    <div className="min-h-screen bg-[#03020a] text-[#f3f4f6] pb-16 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-violet-600/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-fuchsia-600/5 blur-[120px] rounded-full -z-10" />

      {/* Hero Banner */}
      <div className="relative h-[450px]">
        <img
          src={`https://picsum.photos/1200/500?random=${trip._id}`}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03020a] via-black/40 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 -mt-24 relative z-10">
        
        {/* Back Navigation */}
        <button
          onClick={() => navigate("/explore")}
          className="inline-flex items-center gap-2 bg-[#03020a]/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-zinc-300 hover:text-fuchsia-400 mb-6 group transition-all duration-200 cursor-pointer font-semibold text-sm"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Explore
        </button>

        {/* Escape Header */}
        <div className="bg-[#0e0e1e]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl">
          <h1 className="text-3xl sm:text-6xl font-black mb-4 tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            {trip.title}
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg mb-6 leading-relaxed">
            {trip.description}
          </p>

          <div className="flex flex-wrap gap-4 text-sm font-semibold text-zinc-300 border-t border-white/5 pt-5">
            <span className="flex items-center gap-1.5 bg-[#03020a]/50 px-3 py-1.5 rounded-xl border border-white/5">
              <Calendar size={14} className="text-fuchsia-400" />
              <span>{trip.startDate?.slice(0, 10)}</span> ➜ <span>{trip.endDate?.slice(0, 10)}</span>
            </span>

            <span className="flex items-center gap-1.5 bg-[#03020a]/50 px-3 py-1.5 rounded-xl border border-white/5 uppercase tracking-wider text-xs">
              <Globe size={14} className="text-fuchsia-400" />
              {trip.visibility}
            </span>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#0e0e1e]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 hover:border-violet-500/10 transition">
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Photos</p>
            <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">{photos.length}</h2>
          </div>

          <div className="bg-[#0e0e1e]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 hover:border-violet-500/10 transition">
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Logs</p>
            <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">{journals.length}</h2>
          </div>

          <div className="bg-[#0e0e1e]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 hover:border-violet-500/10 transition">
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Expenses</p>
            <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">₹{totalExpenses.toFixed(0)}</h2>
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-[#0e0e1e]/30 backdrop-blur-xl border border-white/5 rounded-3xl p-5 sm:p-8 mt-8">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white mb-6 flex items-center gap-2">
            <ImageIcon size={20} className="text-fuchsia-400" />
            Gallery Snapshots
          </h2>

          {photos.length === 0 ? (
            <p className="text-zinc-500 text-sm py-4">No photos shared in this escape.</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div key={photo._id} className="bg-[#090914]/80 border border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/20 transition-all duration-300">
                  <img src={photo.imageUrl} alt="" className="w-full h-52 object-cover" />
                  <div className="p-4 bg-[#090914]/90">
                    <p className="text-zinc-300 text-sm leading-snug">{photo.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Travel Journal */}
        <div className="bg-[#0e0e1e]/30 backdrop-blur-xl border border-white/5 rounded-3xl p-5 sm:p-8 mt-8">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white mb-6 flex items-center gap-2">
            <BookOpen size={20} className="text-fuchsia-400" />
            Escape Logs
          </h2>

          {journals.length === 0 ? (
            <p className="text-zinc-500 text-sm py-4">No journal entries shared.</p>
          ) : (
            <div className="space-y-4">
              {journals.map((journal) => (
                <div key={journal._id} className="bg-[#090914]/80 border border-white/5 rounded-2xl p-5">
                  <h3 className="text-lg font-bold text-white mb-3">{journal.title}</h3>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{journal.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Expenses */}
        <div className="bg-[#0e0e1e]/30 backdrop-blur-xl border border-white/5 rounded-3xl p-5 sm:p-8 mt-8">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white mb-6 flex items-center gap-2">
            <CreditCard size={20} className="text-fuchsia-400" />
            Expenses Shared
          </h2>

          {expenses.length === 0 ? (
            <p className="text-zinc-500 text-sm py-4">No expense details shared.</p>
          ) : (
            <div className="space-y-3">
              {expenses.map((expense) => (
                <div key={expense._id} className="bg-[#090914]/80 border border-white/5 rounded-2xl p-4 sm:p-5 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white text-base">{expense.title}</h3>
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mt-0.5">{expense.category}</p>
                  </div>
                  <span className="text-fuchsia-400 font-extrabold flex items-center gap-0.5">
                    <DollarSign size={14} />
                    {expense.amount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default PublicTrip;