import { useState } from "react";

function AddExpenseModal({
  isOpen,
  onClose,
  onCreate,
}) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Food",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate({
      ...formData,
      amount: Number(formData.amount),
    });

    setFormData({
      title: "",
      amount: "",
      category: "Food",
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
      justify-center
      items-center
      z-50
      "
    >
      <div
        className="
        w-full
        max-w-xl
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
            <h2 className="text-4xl font-black">
              Add Expense
            </h2>

            <p className="text-zinc-400 mt-2">
              Track every rupee spent during your trip.
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
            placeholder="Dinner at Marina Bay"
            value={formData.title}
            onChange={handleChange}
            required
            className="
            w-full
            p-4
            rounded-2xl
            bg-zinc-800
            border
            border-zinc-700
            focus:border-teal-500
            outline-none
            "
          />

          <input
            type="number"
            name="amount"
            placeholder="450"
            value={formData.amount}
            onChange={handleChange}
            required
            className="
            w-full
            p-4
            rounded-2xl
            bg-zinc-800
            border
            border-zinc-700
            focus:border-teal-500
            outline-none
            "
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="
            w-full
            p-4
            rounded-2xl
            bg-zinc-800
            border
            border-zinc-700
            focus:border-teal-500
            outline-none
            "
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Hotel</option>
            <option>Shopping</option>
            <option>Activities</option>
            <option>Other</option>
          </select>

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
              Save Expense
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

export default AddExpenseModal;