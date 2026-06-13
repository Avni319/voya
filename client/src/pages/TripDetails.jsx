import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTripById } from "../services/tripService";
import {
  createJournalEntry,
  getTripJournalEntries,
  deleteJournalEntry,
} from "../services/journalService";

import AddJournalModal from "../components/AddJournalModal";
import UploadPhotoModal from "../components/UploadPhotoModal";
import AddExpenseModal from "../components/AddExpenseModal";
import { 
    createExpense,
    getTripExpenses,
    deleteExpense,
 } from "../services/expenseService";

import {
  uploadPhoto,
  getTripPhotos,
  deletePhoto,
} from "../services/photoService";
import {
  generateSummary,
} from "../services/aiService";
import { 
  ArrowLeft, 
  Calendar, 
  Globe, 
  Sparkles, 
  BookOpen, 
  Image as ImageIcon, 
  CreditCard, 
  Trash2, 
  Plus, 
  DollarSign,
  MapPin
} from "lucide-react";

function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [entries, setEntries] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  const handleCreateEntry = async (entryData) => {
    try {
      await createJournalEntry({
        ...entryData,
        tripId: id,
      });
      await fetchJournalEntries();
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteEntry = async (entryId) => {
    if (!window.confirm("Delete this journal entry? 📝")) return;
    try {
      await deleteJournalEntry(entryId);
      await fetchJournalEntries();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadPhoto = async (photoData) => {
    try {
      photoData.append("tripId", id);
      await uploadPhoto(photoData);
      await fetchPhotos();
      setIsPhotoModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    if (!window.confirm("Delete this photo? 📸")) return;
    try {
      await deletePhoto(photoId);
      await fetchPhotos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateExpense = async (expenseData) => {
    try {
      await createExpense({
        ...expenseData,
        tripId: id,
      });
      await fetchExpenses();
      setIsExpenseModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    if (!window.confirm("Delete this expense item? 💸")) return;
    try {
      await deleteExpense(expenseId);
      await fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGenerateSummary = async () => {
    try {
      console.log("Button clicked");
      setLoadingSummary(true);
      const data = await generateSummary(id);
      console.log("AI Response:", data);
      setSummary(data.summary);
    } catch (error) {
      console.log("AI ERROR:", error);
    } finally {
      setLoadingSummary(false);
    }
  };

  const fetchJournalEntries = async () => {
    try {
      const data = await getTripJournalEntries(id);
      setEntries(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPhotos = async () => {
    try {
      const data = await getTripPhotos(id);
      setPhotos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const data = await getTripExpenses(id);
      setExpenses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const data = await getTripById(id);
        setTrip(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrip();
    fetchJournalEntries();
    fetchPhotos();
    fetchExpenses();
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

  return (
    <div className="min-h-screen bg-[#03020a] text-[#f3f4f6] pb-16 relative overflow-hidden">
      
      {/* Cover Hero Banner */}
      <div className="h-[450px] relative">
        <img
          src={`https://picsum.photos/1200/600?random=${trip._id}`}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03020a] via-[#03020a]/40 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 -mt-24 relative z-10">
        
        {/* Back Navigation */}
        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 bg-[#03020a]/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-zinc-300 hover:text-fuchsia-400 mb-6 group transition-all duration-200 cursor-pointer font-semibold text-sm"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
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
              <span>{trip.startDate?.slice(0,10)}</span> ➜ <span>{trip.endDate?.slice(0,10)}</span>
            </span>

            <span className="flex items-center gap-1.5 bg-[#03020a]/50 px-3 py-1.5 rounded-xl border border-white/5 uppercase tracking-wider text-xs">
              <Globe size={14} className="text-fuchsia-400" />
              {trip.visibility}
            </span>
            
            {trip.location && (
              <span className="flex items-center gap-1.5 bg-[#03020a]/50 px-3 py-1.5 rounded-xl border border-white/5">
                <MapPin size={14} className="text-fuchsia-400" />
                {trip.location}
              </span>
            )}
          </div>
        </div>

        {/* AI Story Generator */}
        <div className="bg-[#0e0e1e]/20 border border-violet-500/10 rounded-3xl p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-fuchsia-400" />
              Generate AI Escape Story
            </h3>
            <p className="text-zinc-400 text-sm mt-1">
              Let AI weave your photos, journals, and logs into a gorgeous travel narrative.
            </p>
          </div>
          <button
            onClick={handleGenerateSummary}
            disabled={loadingSummary}
            className="w-full md:w-auto bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 hover:from-violet-500 hover:to-pink-400 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-fuchsia-500/20 hover:scale-103 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
          >
            <Sparkles size={16} />
            {loadingSummary ? "Weaving Story..." : "AI Story Vibe"}
          </button>
        </div>

        {summary && (
          <div className="bg-[#0e0e1e]/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 mb-8 border border-fuchsia-500/20 shadow-[0_0_30px_rgba(168,85,247,0.05)]">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent flex items-center gap-2">
              <Sparkles size={20} className="text-fuchsia-400" />
              AI Travel Narrative
            </h2>
            <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap text-sm sm:text-base font-medium">
              {summary}
            </p>
          </div>
        )}

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#0e0e1e]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 hover:border-violet-500/10 transition">
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Photos</p>
            <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">{photos.length}</h2>
          </div>

          <div className="bg-[#0e0e1e]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 hover:border-violet-500/10 transition">
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Logs</p>
            <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">{entries.length}</h2>
          </div>

          <div className="bg-[#0e0e1e]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 hover:border-violet-500/10 transition">
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Expenses</p>
            <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">₹{totalExpenses.toFixed(0)}</h2>
          </div>
        </div>

        {/* Travel Journal */}
        <div className="bg-[#0e0e1e]/30 backdrop-blur-xl border border-white/5 rounded-3xl p-5 sm:p-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white flex items-center gap-2">
              <BookOpen size={20} className="text-fuchsia-400" />
              Escape Log
            </h2>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-fuchsia-500/10 cursor-pointer"
            >
              <Plus size={14} />
              Add Entry
            </button>
          </div>

          {entries.length === 0 ? (
            <p className="text-zinc-500 text-sm py-4">No escape logs captured yet. Tap "Add Entry" to write one!</p>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <div key={entry._id} className="bg-[#090914]/80 border border-white/5 rounded-2xl p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{entry.title}</h3>
                      {entry.location && (
                        <p className="text-fuchsia-400 text-xs font-semibold flex items-center gap-1">
                          <MapPin size={12} /> {entry.location}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteEntry(entry._id)}
                      className="text-zinc-500 hover:text-rose-400 transition cursor-pointer p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{entry.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Photo Gallery */}
        <div className="bg-[#0e0e1e]/30 backdrop-blur-xl border border-white/5 rounded-3xl p-5 sm:p-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white flex items-center gap-2">
              <ImageIcon size={20} className="text-fuchsia-400" />
              Gallery
            </h2>
            <button
              onClick={() => setIsPhotoModalOpen(true)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-fuchsia-500/10 cursor-pointer"
            >
              <Plus size={14} />
              Upload Photo
            </button>
          </div>

          {photos.length === 0 ? (
            <p className="text-zinc-500 text-sm py-4">No snapshots uploaded yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div key={photo._id} className="group bg-[#090914]/80 border border-white/5 rounded-2xl overflow-hidden hover:border-violet-500/20 transition-all duration-300 relative">
                  <img src={photo.imageUrl} alt="" className="w-full h-48 object-cover" />
                  <div className="p-4 flex justify-between items-start gap-2 bg-[#090914]/90">
                    <p className="text-zinc-300 text-sm leading-snug">{photo.caption}</p>
                    <button
                      onClick={() => handleDeletePhoto(photo._id)}
                      className="text-zinc-500 hover:text-rose-400 transition cursor-pointer p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Expenses */}
        <div className="bg-[#0e0e1e]/30 backdrop-blur-xl border border-white/5 rounded-3xl p-5 sm:p-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white flex items-center gap-2">
              <CreditCard size={20} className="text-fuchsia-400" />
              Expense Tracker
            </h2>
            <button
              onClick={() => setIsExpenseModalOpen(true)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-fuchsia-500/10 cursor-pointer"
            >
              <Plus size={14} />
              Add Expense
            </button>
          </div>

          {expenses.length === 0 ? (
            <p className="text-zinc-500 text-sm py-4">No expense items added yet.</p>
          ) : (
            <div className="space-y-3">
              {expenses.map((expense) => (
                <div key={expense._id} className="bg-[#090914]/80 border border-white/5 rounded-2xl p-4 sm:p-5 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white text-base">{expense.title}</h3>
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mt-0.5">{expense.category}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-fuchsia-400 font-extrabold flex items-center gap-0.5">
                      <DollarSign size={14} />
                      {expense.amount}
                    </span>
                    <button
                      onClick={() => handleDeleteExpense(expense._id)}
                      className="text-zinc-500 hover:text-rose-400 transition cursor-pointer p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <AddJournalModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCreate={handleCreateEntry}
      />
      <UploadPhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onUpload={handleUploadPhoto}
      />
      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onCreate={handleCreateExpense}
      />
    </div>
  );
}

export default TripDetails;