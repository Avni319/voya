import { useState } from "react";
import { X } from "lucide-react";

function AddJournalModal({
  isOpen,
  onClose,
  onCreate,
}) {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    setFormData({
      title: "",
      location: "",
      content: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl bg-[#0e0e22]/90 border border-white/10 shadow-2xl shadow-purple-950/25 rounded-[32px] p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
              Log Today's Vibe 📝
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              Capture your travel memories before they fade.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 hover:bg-white/5 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Day 1 in Tokyo"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-4 bg-[#03020a]/60 rounded-xl outline-none border border-white/5 focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 text-white transition font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Location</label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Shibuya Crossing"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-4 bg-[#03020a]/60 rounded-xl outline-none border border-white/5 focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 text-white transition font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Log Details</label>
            <textarea
              name="content"
              placeholder="What happened today? Write your heart out..."
              value={formData.content}
              onChange={handleChange}
              rows="6"
              required
              className="w-full p-4 bg-[#03020a]/60 rounded-xl outline-none border border-white/5 focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 text-white transition font-medium resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 text-white font-bold py-4 rounded-xl shadow-md shadow-fuchsia-500/10 hover:scale-[1.01] transition-all cursor-pointer text-center"
            >
              Save Entry
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-4 rounded-xl bg-[#03020a]/40 hover:bg-[#03020a]/80 text-zinc-400 hover:text-white border border-white/5 transition cursor-pointer text-center font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default AddJournalModal;