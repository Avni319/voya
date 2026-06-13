import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

function TripDetails() {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [entries, setEntries] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

const [isPhotoModalOpen, setIsPhotoModalOpen] =
  useState(false);
  const [expenses, setExpenses] = useState([]);

const [isExpenseModalOpen, setIsExpenseModalOpen] =
  useState(false);
  const [summary, setSummary] =
  useState("");

const [loadingSummary,
  setLoadingSummary] =
  useState(false);
    const handleCreateEntry = async (
  entryData
) => {
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
const handleDeleteEntry = async (
  entryId
) => {
  try {

    await deleteJournalEntry(entryId);

    await fetchJournalEntries();

  } catch (error) {
    console.log(error);
  }
};
const handleUploadPhoto = async (
  photoData
) => {
  try {

    photoData.append(
      "tripId",
      id
    );

    await uploadPhoto(
      photoData
    );

    await fetchPhotos();

    setIsPhotoModalOpen(false);

  } catch (error) {
    console.log(error);
  }
};
const handleDeletePhoto = async (
  photoId
) => {
  try {

    await deletePhoto(photoId);

    await fetchPhotos();

  } catch (error) {
    console.log(error);
  }
};
const handleCreateExpense = async (
  expenseData
) => {
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

const handleDeleteExpense = async (
  expenseId
) => {
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

    const data =
      await generateSummary(id);

    console.log(
      "AI Response:",
      data
    );

    setSummary(
      data.summary
    );

  } catch (error) {

    console.log(
      "AI ERROR:",
      error
    );

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
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      <div className="h-[400px] relative">

        <img
          src={`https://picsum.photos/1200/600?random=${trip._id}`}
          alt=""
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

      </div>

      <div className="max-w-5xl mx-auto px-8 py-10">

        <h1 className="text-6xl font-bold mb-4">
          {trip.title}
        </h1>

        <p className="text-zinc-400 text-lg mb-6">
          {trip.description}
        </p>

      <div className="flex flex-wrap gap-6 mb-6">

  <span>
    📅 {trip.startDate?.slice(0,10)}
  </span>

  <span>
    🌍 {trip.visibility}
  </span>

</div>

<button
  onClick={handleGenerateSummary}
  disabled={loadingSummary}
  className="
  bg-gradient-to-r
  from-purple-500
  via-pink-500
  to-cyan-500
  px-6
  py-3
  rounded-2xl
  font-semibold
  hover:scale-105
  transition-all
  duration-300
  mb-10
  "
>
  {loadingSummary
    ? "Generating..."
    : "✨ Generate AI Story"}
</button>
{summary && (

  <div
    className="
    bg-zinc-900
    rounded-3xl
    p-8
    mb-10
    border
    border-zinc-800
    "
  >

    <h2
      className="
      text-3xl
      font-bold
      mb-6
      "
    >
      ✨ AI Travel Story
    </h2>

    <p
      className="
      text-zinc-300
      leading-8
      whitespace-pre-wrap
      "
    >
      {summary}
    </p>

  </div>

)}
<div className="bg-zinc-900 rounded-3xl p-8 mt-10">

  <div className="flex justify-between items-center mb-6">

    <h2 className="text-3xl font-bold">
      Travel Journal
    </h2>

    <button
      onClick={() =>
        setIsAddModalOpen(true)
      }
      className="
      bg-gradient-to-r
      from-teal-500
      to-cyan-500
      px-5
      py-2
      rounded-xl
      "
    >
      Add Entry
    </button>

  </div>

  {entries.length === 0 ? (

    <p className="text-zinc-400">
      No journal entries yet.
    </p>

  ) : (

    <div className="space-y-5">

      {entries.map((entry) => (

        <div
          key={entry._id}
          className="
          bg-zinc-800
          rounded-2xl
          p-5
          "
        >

          <div className="flex justify-between">

            <div>

              <h3 className="text-xl font-bold">
                {entry.title}
              </h3>

              <p className="text-teal-400">
                📍 {entry.location}
              </p>

            </div>

            <button
              onClick={() =>
                handleDeleteEntry(
                  entry._id
                )
              }
              className="
              text-red-400
              hover:text-red-300
              "
            >
              Delete
            </button>

          </div>

          <p className="mt-4 text-zinc-300">
            {entry.content}
          </p>

        </div>

      ))}

    </div>

  )}

</div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
  <div className="bg-zinc-900 rounded-3xl p-6">
    <p className="text-zinc-400">Photos</p>
    <h2 className="text-4xl font-bold text-teal-400">{photos.length}</h2>
  </div>

  <div className="bg-zinc-900 rounded-3xl p-6">
    <p className="text-zinc-400">Journal Entries</p>
    <h2 className="text-4xl font-bold text-teal-400">{entries.length}</h2>
  </div>

  <div className="bg-zinc-900 rounded-3xl p-6">
    <p className="text-zinc-400">Expenses</p>
    <h2 className="text-4xl font-bold text-teal-400">₹{totalExpenses.toFixed(2)}</h2>
  </div>
</div>

<div className="bg-zinc-900 rounded-3xl p-8 mt-10">

  <div className="flex justify-between items-center mb-6">

    <h2 className="text-3xl font-bold">
      Photo Gallery
    </h2>

    <button
      onClick={() =>
        setIsPhotoModalOpen(true)
      }
      className="
      bg-gradient-to-r
      from-teal-500
      to-cyan-500
      px-5
      py-2
      rounded-xl
      "
    >
      Upload Photo
    </button>

  </div>

  {photos.length === 0 ? (

    <p className="text-zinc-400">
      No photos uploaded yet.
    </p>

  ) : (

    <div className="grid md:grid-cols-3 gap-4">

      {photos.map((photo) => (

        <div
          key={photo._id}
          className="
          bg-zinc-800
          rounded-2xl
          overflow-hidden
          "
        >

          <img
            src={photo.imageUrl}
            alt=""
            className="
            w-full
            h-48
            object-cover
            "
          />

          <div className="p-4">

            <p className="text-zinc-300">
              {photo.caption}
            </p>

            <button
              onClick={() =>
                handleDeletePhoto(
                  photo._id
                )
              }
              className="
              text-red-400
              mt-3
              "
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>

  )}

</div>


<div className="bg-zinc-900 rounded-3xl p-8 mt-10">

  <div className="flex justify-between items-center mb-6">

    <h2 className="text-3xl font-bold">
      Expenses
    </h2>

    <button
      onClick={() =>
        setIsExpenseModalOpen(true)
      }
      className="
      bg-gradient-to-r
      from-teal-500
      to-cyan-500
      px-5
      py-2
      rounded-xl
      "
    >
      Add Expense
    </button>

  </div>

  {expenses.length === 0 ? (

    <p className="text-zinc-400">
      No expenses added yet.
    </p>

  ) : (

    <div className="space-y-4">

      {expenses.map((expense) => (

        <div
          key={expense._id}
          className="
          bg-zinc-800
          rounded-2xl
          p-5
          flex
          justify-between
          items-center
          "
        >

          <div>

            <h3 className="font-bold text-lg">
              {expense.title}
            </h3>

            <p className="text-zinc-400">
              {expense.category}
            </p>

          </div>

          <div className="flex items-center gap-4">

            <span className="text-teal-400 font-bold">
              ₹{expense.amount}
            </span>

            <button
              onClick={() =>
                handleDeleteExpense(
                  expense._id
                )
              }
              className="text-red-400"
            >
              Delete
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
  onClose={() =>
    setIsAddModalOpen(false)
  }
  onCreate={handleCreateEntry}
/>
<UploadPhotoModal
  isOpen={isPhotoModalOpen}
  onClose={() =>
    setIsPhotoModalOpen(false)
  }
  onUpload={handleUploadPhoto}
/>
<AddExpenseModal
  isOpen={isExpenseModalOpen}
  onClose={() =>
    setIsExpenseModalOpen(false)
  }
  onCreate={handleCreateExpense}
/>

    </div>
  );
}

export default TripDetails;