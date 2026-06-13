import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  getPublicTrips,
} from "../services/tripService";

import {
  Search,
  Globe,
} from "lucide-react";

function Explore() {
   
    const navigate = useNavigate();
  const [trips, setTrips] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

  useEffect(() => {

    const fetchTrips =
      async () => {

        try {

          const data =
            await getPublicTrips();

          setTrips(data);

        } catch (error) {

          console.log(error);

        }
      };

    fetchTrips();

  }, []);

  const filteredTrips =
    trips.filter(
      (trip) =>
        trip.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        trip.description
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div
      className="
      min-h-screen
      bg-black
      text-white
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-4 sm:px-8
        pt-28 pb-12
        "
      >

        <div
          className="
          text-center
          mb-12
          "
        >

          <div
            className="
            flex
            justify-center
            mb-4
            "
          >
            <Globe
              size={60}
              className="
              text-teal-400
              "
            />
          </div>

          <h1
            className="
            text-4xl sm:text-6xl
            font-bold
            mb-4
            "
          >
            Explore Adventures
          </h1>

          <p
            className="
            text-zinc-400
            text-lg sm:text-xl
            "
          >
            Discover travel
            stories shared
            by travelers
            around the world.
          </p>

        </div>

        <div
          className="
          relative
          max-w-xl
          mx-auto
          mb-12
          "
        >

          <Search
            className="
            absolute
            left-4
            top-4
            text-zinc-500
            "
          />

          <input
            type="text"
            placeholder="
            Search trips...
            "
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
            w-full
            bg-zinc-900
            rounded-2xl
            py-4
            pl-12
            pr-4
            border
            border-zinc-800
            "
          />

        </div>

        <div
          className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
          "
        >

          {filteredTrips.map(
            (trip) => (

            <div
              key={trip._id}
              className="
              bg-zinc-900
              rounded-3xl
              overflow-hidden
              border
              border-zinc-800
              hover:border-teal-500
              hover:-translate-y-2
              transition-all
              duration-300
              "
            >

              <img
                src={
                  trip.coverImage ||
                  `https://picsum.photos/600/400?random=${trip._id}`
                }
                alt=""
                className="
                w-full
                h-60
                object-cover
                "
              />

              <div
                className="
                p-6
                "
              >

                <h2
                  className="
                  text-2xl
                  font-bold
                  mb-3
                  "
                >
                  {trip.title}
                </h2>

                <p
                  className="
                  text-zinc-400
                  mb-4
                  "
                >
                  {trip.description}
                </p>

                <div
                  className="
                  flex
                  justify-between
                  items-center
                  "
                >

                  <span
                    className="
                    text-teal-400
                    "
                  >
                    Public
                  </span>

                 <button
  onClick={() =>
    navigate(`/explore/${trip._id}`)
  }
  className="
  bg-teal-500
  hover:bg-teal-600
  px-4
  py-2
  rounded-xl
  "
>
  View Story
</button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Explore;