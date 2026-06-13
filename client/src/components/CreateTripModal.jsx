import { useState } from "react";

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
    <div
      className="
      fixed
      inset-0
      bg-black/70
      backdrop-blur-sm
      flex
      items-center
      justify-center
      z-50
      "
    >
      <div
        className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-3xl
        p-8
        w-full
        max-w-xl
        "
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            Create New Trip
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
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
            placeholder="Trip Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="
            w-full
            p-4
            rounded-xl
            bg-zinc-800
            outline-none
            "
          />

          <textarea
            name="description"
            placeholder="Trip Description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="
            w-full
            p-4
            rounded-xl
            bg-zinc-800
            outline-none
            "
          />
          <input
  type="text"
  placeholder="Location (e.g. Delhi, Goa, Mumbai)"
  value={formData.location}
  onChange={(e) =>
    setFormData({
      ...formData,
      location: e.target.value,
    })
  }
  className="
  w-full
  p-3
  bg-zinc-800
  rounded-xl
  "
/>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="
              p-4
              rounded-xl
              bg-zinc-800
              "
            />

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="
              p-4
              rounded-xl
              bg-zinc-800
              "
            />
          </div>

          <select
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            className="
            w-full
            p-4
            rounded-xl
            bg-zinc-800
            "
          >
            <option value="private">
              Private
            </option>

            <option value="public">
              Public
            </option>
          </select>

          <button
            type="submit"
            className="
            w-full
            bg-teal-500
            hover:bg-teal-600
            py-4
            rounded-xl
            font-semibold
            transition
            "
          >
            Create Trip
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTripModal;