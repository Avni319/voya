import { useState } from "react";
import { X, Upload } from "lucide-react";

function UploadPhotoModal({
  isOpen,
  onClose,
  onUpload,
}) {
  const [formData, setFormData] = useState({
    image: null,
    caption: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please select an image first! 📸");
      return;
    }
    const data = new FormData();
    data.append("caption", formData.caption);
    data.append("image", formData.image);
    onUpload(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#0e0e22]/90 border border-white/10 shadow-2xl shadow-purple-950/25 rounded-3xl p-6 sm:p-8 w-full max-w-lg animate-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent flex items-center gap-2">
              <Upload size={24} className="text-fuchsia-400" />
              Upload Snapshot 📸
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              Add photos to your escape logs.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 hover:bg-white/5 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-2 border-dashed border-white/10 hover:border-fuchsia-500/30 rounded-2xl p-6 text-center cursor-pointer transition-all">
            <input
              type="file"
              accept="image/*"
              required
              id="file-upload"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: e.target.files[0],
                })
              }
              className="hidden"
            />
            <label htmlFor="file-upload" className="cursor-pointer block">
              <Upload size={32} className="mx-auto text-zinc-500 mb-2 group-hover:text-fuchsia-400 transition" />
              <span className="text-sm font-semibold text-zinc-300 block">
                {formData.image ? formData.image.name : "Select Image from Device"}
              </span>
              <span className="text-xs text-zinc-500 mt-1 block">Supports JPG, PNG, WEBP</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Caption</label>
            <input
              type="text"
              placeholder="e.g. Sunset view from Shibuya"
              value={formData.caption}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  caption: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl bg-[#03020a]/60 border border-white/5 text-white outline-none focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 transition-all font-medium"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 text-white font-bold py-4 rounded-xl shadow-md shadow-fuchsia-500/10 hover:scale-[1.01] transition-all cursor-pointer text-center"
            >
              Upload Photo
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

export default UploadPhotoModal;