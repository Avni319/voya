import { useState } from "react";
import { X } from "lucide-react";

function CreateTripModal({
  isOpen,
  onClose,
  onCreate,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    visibility: "private",
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
      description: "",
      location: "",
      startDate: "",
      endDate: "",
      visibility: "private",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#0e0e22]/90 border border-white/10 shadow-2xl shadow-purple-950/25 rounded-3xl p-6 sm:p-8 w-full max-w-xl animate-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
            Log New Escape 🗺️
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 hover:bg-white/5 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Trip Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Summer in Ibiza"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-[#03020a]/60 border border-white/5 text-white outline-none focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Description</label>
            <textarea
              name="description"
              placeholder="What's the vibe of this escape?"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-4 rounded-xl bg-[#03020a]/60 border border-white/5 text-white outline-none focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 transition-all font-medium resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Location</label>
            <input
              type="text"
              placeholder="e.g. Ibiza, Spain"
              value={formData.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl bg-[#03020a]/60 border border-white/5 text-white outline-none focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 transition-all font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-[#03020a]/60 border border-white/5 text-zinc-300 outline-none focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-[#03020a]/60 border border-white/5 text-zinc-300 outline-none focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Visibility</label>
            <select
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-[#03020a]/60 border border-white/5 text-zinc-300 outline-none focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 transition-all font-medium"
            >
              <option value="private">🔒 Private (Only me)</option>
              <option value="public">🌍 Public (Shared with world)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 py-4 rounded-xl font-bold transition-all shadow-md shadow-fuchsia-500/20 hover:scale-102 cursor-pointer text-white mt-4"
          >
            Create Escape 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTripModal;