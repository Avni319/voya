import { useState } from "react";
import { X } from "lucide-react";

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
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex justify-center items-center z-50 p-4">
      <div className="w-full max-w-xl bg-[#0e0e22]/90 border border-white/10 shadow-2xl shadow-purple-950/25 rounded-[32px] p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
              Track Expense 💸
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              Log your spending to keep the budget on point.
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
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Item Name</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Dinner at Shibuya"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-[#03020a]/60 border border-white/5 text-white outline-none focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Amount (₹)</label>
            <input
              type="number"
              name="amount"
              placeholder="e.g. 1200"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-[#03020a]/60 border border-white/5 text-white outline-none focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-[#03020a]/60 border border-white/5 text-zinc-300 outline-none focus:border-fuchsia-500/40 focus:ring-1 focus:ring-fuchsia-500/20 transition-all font-medium"
            >
              <option>Food</option>
              <option>Transport</option>
              <option>Hotel</option>
              <option>Shopping</option>
              <option>Activities</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 text-white font-bold py-4 rounded-xl shadow-md shadow-fuchsia-500/10 hover:scale-[1.01] transition-all cursor-pointer text-center"
            >
              Save Expense
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

export default AddExpenseModal;