import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getTripById } from "../services/tripService";
import { getTripPhotos } from "../services/photoService";
import { getTripJournalEntries } from "../services/journalService";
import { getTripExpenses } from "../services/expenseService";

function PublicTrip() {

  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [journals, setJournals] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const tripData =
          await getTripById(id);

        const photoData =
          await getTripPhotos(id);

        const journalData =
          await getTripJournalEntries(id);

        const expenseData =
          await getTripExpenses(id);

        setTrip(tripData);
        setPhotos(photoData);
        setJournals(journalData);
        setExpenses(expenseData);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, [id]);

  if (!trip) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const totalExpenses =
    expenses.reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero */}

      <div className="relative h-[450px]">

        <img
          src={`https://picsum.photos/1200/500?random=${trip._id}`}
          alt=""
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute bottom-10 left-10">

          <h1 className="text-6xl font-bold mb-4">
            {trip.title}
          </h1>

          <p className="text-xl text-zinc-300">
            {trip.description}
          </p>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-zinc-900 p-6 rounded-3xl">
            <p className="text-zinc-400">
              Photos
            </p>

            <h2 className="text-4xl font-bold text-teal-400">
              {photos.length}
            </h2>
          </div>

          <div className="bg-zinc-900 p-6 rounded-3xl">
            <p className="text-zinc-400">
              Journal Entries
            </p>

            <h2 className="text-4xl font-bold text-teal-400">
              {journals.length}
            </h2>
          </div>

          <div className="bg-zinc-900 p-6 rounded-3xl">
            <p className="text-zinc-400">
              Expenses
            </p>

            <h2 className="text-4xl font-bold text-teal-400">
              ₹{totalExpenses}
            </h2>
          </div>

        </div>

        {/* Photos */}

        <h2 className="text-4xl font-bold mb-6">
          Photos
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-16">

          {photos.map((photo) => (

            <div
              key={photo._id}
              className="bg-zinc-900 rounded-3xl overflow-hidden"
            >

              <img
                src={photo.imageUrl}
                alt=""
                className="w-full h-64 object-cover"
              />

              <div className="p-4">
                {photo.caption}
              </div>

            </div>

          ))}

        </div>

        {/* Journals */}

        <h2 className="text-4xl font-bold mb-6">
          Travel Journal
        </h2>

        <div className="space-y-6 mb-16">

          {journals.map((journal) => (

            <div
              key={journal._id}
              className="
              bg-zinc-900
              rounded-3xl
              p-6
              "
            >

              <h3 className="text-2xl font-bold mb-3">
                {journal.title}
              </h3>

              <p className="text-zinc-300">
                {journal.content}
              </p>

            </div>

          ))}

        </div>

        {/* Expenses */}

        <h2 className="text-4xl font-bold mb-6">
          Expenses
        </h2>

        <div className="space-y-4">

          {expenses.map((expense) => (

            <div
              key={expense._id}
              className="
              bg-zinc-900
              rounded-2xl
              p-5
              flex
              justify-between
              "
            >

              <div>
                <h3 className="font-semibold">
                  {expense.title}
                </h3>

                <p className="text-zinc-400">
                  {expense.category}
                </p>
              </div>

              <span className="text-teal-400 font-bold">
                ₹{expense.amount}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default PublicTrip;