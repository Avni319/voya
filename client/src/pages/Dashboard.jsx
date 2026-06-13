import { useEffect, useState } from "react";
import CreateTripModal from "../components/CreateTripModal";
import { createTrip, getMyTrips, deleteTrip } from "../services/tripService";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getDashboardStats } from "../services/dashboardService.js";
import TravelMap from "../components/TravelMap";
import { getCoordinates } from "../services/locationService";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [trips, setTrips] = useState([]);
  const [locations, setLocations] =
  useState([]);
  const [stats, setStats] = useState({
  trips: 0,
  photos: 0,
  journals: 0,
  totalExpenses: 0,
});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchTrips = async () => {
  try {

    const data =
      await getMyTrips();

    setTrips(data);

    const coords =
      await Promise.all(

        data.map(
          async (trip) => {

            if (!trip.location)
              return null;

            return await getCoordinates(
              trip.location
            );

          }
        )
      );

    setLocations(
      coords.filter(Boolean)
    );

  } catch (error) {

    console.log(error);

  }
};
  const fetchStats = async () => {
  try {
    const data = await getDashboardStats();

    console.log("Dashboard Stats:", data);

    setStats(data);

  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchTrips();
    fetchStats();
  }, []);

  const handleCreateTrip = async (tripData) => {
    try {
      await createTrip(tripData);

      await fetchTrips();
      await fetchStats();

      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteTrip = async (tripId) => {
  try {
    console.log("Deleting:", tripId);

    await deleteTrip(tripId);

    await fetchTrips();
    await fetchStats();

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

  <div className="absolute top-20 left-20 w-72 h-72 bg-teal-500/20 blur-[150px] rounded-full" />

  <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500/10 blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Header */}
         <div className="flex justify-between items-center mb-6">

  <div>
    <h1 className="text-5xl font-bold mb-2">
      Welcome Back, {user?.name} 👋
    </h1>

    <p className="text-zinc-400 text-lg">
      Track every destination and relive every memory.
    </p>
  </div>

  <button
    onClick={() => {

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/";

    }}
    className="
    bg-red-500
    hover:bg-red-600
    px-5
    py-3
    rounded-xl
    font-medium
    "
  >
    Logout
  </button>

</div>
        

        

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mt-10">

          <div
  className="
  bg-zinc-900/60
  backdrop-blur-xl
  border
  border-zinc-800
  rounded-3xl
  p-6
  hover:border-teal-500
  hover:-translate-y-1
  transition-all
  duration-300
  "
>
            <p className="text-zinc-400">Trips</p>
            <h2 className="text-4xl font-bold text-teal-400">
              {stats.trips}
            </h2>
          </div>

          <div
  className="
  bg-zinc-900/60
  backdrop-blur-xl
  border
  border-zinc-800
  rounded-3xl
  p-6
  hover:border-teal-500
  hover:-translate-y-1
  transition-all
  duration-300
  "
>
           <p className="text-zinc-400">Journal Entries</p>
<h2 className="text-4xl font-bold text-teal-400">
  {stats.journals}
</h2>
          </div>

          <div
  className="
  bg-zinc-900/60
  backdrop-blur-xl
  border
  border-zinc-800
  rounded-3xl
  p-6
  hover:border-teal-500
  hover:-translate-y-1
  transition-all
  duration-300
  "
>
            <p className="text-zinc-400">Photos</p>
            <h2 className="text-4xl font-bold text-teal-400">
              {stats.photos}
            </h2>
          </div>
          <div
  className="
  bg-zinc-900/60
  backdrop-blur-xl
  border
  border-zinc-800
  rounded-3xl
  p-6
  hover:border-teal-500
  hover:-translate-y-1
  transition-all
  duration-300
  "
>
  <p className="text-zinc-400">
    Expenses
  </p>

  <h2 className="text-4xl font-bold text-teal-400">
    ₹{stats.totalExpenses}
  </h2>
</div>

        </div>
        <div
  className="
  mt-8
  bg-zinc-900/60
  backdrop-blur-xl
  border
  border-zinc-800
  rounded-3xl
  p-5
  "
>
  <h2
    className="
    text-xl
    font-bold
    mb-4
    "
  >
    Travel Map
  </h2>

  {locations.length === 0 ? (

    <p className="text-zinc-400">
      Add trips with locations to see them on the map.
    </p>

  ) : (

    <TravelMap
      locations={locations}
    />

  )}
</div>

        {/* Create Trip Button */}

       <div className="mt-10 flex gap-4">

          <button
            onClick={() => setIsModalOpen(true)}
           className="
group
flex
items-center
gap-2
bg-gradient-to-r
from-teal-500
to-cyan-500
hover:scale-105
transition-all
duration-300
px-6
py-3
rounded-2xl
font-semibold
shadow-lg
shadow-teal-500/20
"
          >
            <Plus size={20} />
            New Trip
          </button>
          <button
  onClick={() =>
    navigate("/analytics")
  }
  className="
  px-6
  py-3
  rounded-2xl
  bg-zinc-800
  hover:bg-zinc-700
  transition
  "
>
  Analytics
</button>
<button
  onClick={() =>
    navigate("/explore")
  }
  className="
  bg-zinc-800
  px-6
  py-3
  rounded-2xl
  "
>
  Explore
</button>

        </div>

        {/* Trips */}

        <div className="mt-14">

          <h2 className="text-3xl font-bold mb-8">
            Your Journeys
          </h2>

          {trips.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">

              <h3 className="text-2xl font-semibold mb-3">
                No Trips Yet
              </h3>

              <p className="text-zinc-400">
                Create your first adventure and start building memories.
              </p>

            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {trips.map((trip) => (
                <div
                  key={trip._id}
                  className="
                  bg-zinc-900/80
                  backdrop-blur-lg
                  border
                  border-zinc-800
                  rounded-3xl
                  overflow-hidden
                  hover:border-teal-500
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  "
                >

                  {/* Cover */}

       <div className="relative h-56 overflow-hidden">

  <img
    src={`https://picsum.photos/600/400?random=${trip._id}`}
    alt={trip.title}
    className="
    w-full
    h-full
    object-cover
    group-hover:scale-110
    transition-transform
    duration-700
    "
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

  <div className="absolute bottom-4 left-4">
    <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-sm">
      ✈️ Adventure
    </span>
  </div>

</div>

                  <div className="p-6">

                    <h3 className="text-2xl font-bold mb-2 group-hover:text-teal-400 transition">
                      {trip.title}
                    </h3>
                    <div className="flex items-center gap-2 text-zinc-500 text-sm mb-4">
  📅 {trip.startDate?.slice(0, 10)} → {trip.endDate?.slice(0, 10)}
</div>

                    <p className="text-zinc-400 mb-4">
                      {trip.description}
                    </p>

                    <div className="flex justify-between items-center">

                      <span className="text-teal-400 capitalize">
                        {trip.visibility}
                      </span>

                     <div className="flex gap-2">

 <button
  onClick={() => navigate(`/trips/${trip._id}`)}
  className="
  bg-teal-500
  hover:bg-teal-600
  px-4
  py-2
  rounded-xl
  text-sm
  "
>
  View
</button>

  <button
    onClick={() => handleDeleteTrip(trip._id)}
    className="
    bg-red-500
    hover:bg-red-600
    px-4
    py-2
    rounded-xl
    text-sm
    "
  >
    Delete
  </button>

</div>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

      {/* Modal */}

      <CreateTripModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTrip}
      />

    </div>
  );

}



export default Dashboard;