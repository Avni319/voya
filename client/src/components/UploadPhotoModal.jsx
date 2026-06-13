import { useState } from "react";

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

  const data = new FormData();

  data.append(
    "caption",
    formData.caption
  );

  data.append(
    "image",
    formData.image
  );

  onUpload(data);
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-zinc-900 p-8 rounded-3xl w-[500px]">

        <h2 className="text-3xl font-bold mb-6">
          Upload Photo
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setFormData({
      ...formData,
      image: e.target.files[0],
    })
  }
/>

          <input
            type="text"
            placeholder="Caption"
            value={formData.caption}
            onChange={(e) =>
              setFormData({
                ...formData,
                caption: e.target.value,
              })
            }
            className="w-full p-3 bg-zinc-800 rounded-xl"
          />

          <div className="flex gap-4">

            <button
              type="submit"
              className="bg-teal-500 px-6 py-3 rounded-xl"
            >
              Upload
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-zinc-700 px-6 py-3 rounded-xl"
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