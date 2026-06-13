import { useState } from "react";

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
    <div
      className="
      fixed
      inset-0
      bg-black/80
      backdrop-blur-md
      flex
      items-center
      justify-center
      z-50
      "
    >
      <div
        className="
        w-full
        max-w-2xl
        bg-zinc-900
        border
        border-zinc-800
        rounded-[32px]
        p-8
        shadow-2xl
        "
      >
        <div className="flex justify-between items-center mb-8">

          <div>
            <h2 className="text-4xl font-black text-white">
              New Journal Entry
            </h2>

            <p className="text-zinc-400 mt-2">
              Capture today's adventure.
            </p>
          </div>

          <button
            onClick={onClose}
            className="
            text-zinc-400
            hover:text-white
            text-2xl
            "
          >
            ✕
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="title"
            placeholder="Day 1 in Singapore"
            value={formData.title}
            onChange={handleChange}
            required
            className="
            w-full
            p-4
            bg-zinc-800
            rounded-2xl
            outline-none
            border
            border-zinc-700
            focus:border-teal-500
            "
          />

          <input
            type="text"
            name="location"
            placeholder="Marina Bay Sands"
            value={formData.location}
            onChange={handleChange}
            required
            className="
            w-full
            p-4
            bg-zinc-800
            rounded-2xl
            outline-none
            border
            border-zinc-700
            focus:border-teal-500
            "
          />

          <textarea
            name="content"
            placeholder="Write about your journey..."
            value={formData.content}
            onChange={handleChange}
            rows="7"
            required
            className="
            w-full
            p-4
            bg-zinc-800
            rounded-2xl
            outline-none
            border
            border-zinc-700
            focus:border-teal-500
            resize-none
            "
          />

          <div className="flex gap-4 pt-2">

            <button
              type="submit"
              className="
              flex-1
              bg-gradient-to-r
              from-teal-500
              to-cyan-500
              py-4
              rounded-2xl
              font-semibold
              hover:scale-[1.02]
              transition-all
              "
            >
              Save Entry
            </button>

            <button
              type="button"
              onClick={onClose}
              className="
              px-8
              py-4
              rounded-2xl
              bg-zinc-800
              hover:bg-zinc-700
              transition
              "
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