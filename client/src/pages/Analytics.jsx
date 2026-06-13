import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useState } from "react";

import {
  getAnalytics,
} from "../services/analyticsService";

function Analytics() {

  const [data, setData] =
    useState(null);

  useEffect(() => {

    const fetchData =
      async () => {

        const res =
          await getAnalytics();

        setData(res);
      };

    fetchData();

  }, []);

  if (!data)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        Travel Analytics
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-zinc-900 rounded-3xl p-6">
          <p>Total Trips</p>
          <h2 className="text-4xl font-bold text-teal-400">
            {data.totalTrips}
          </h2>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6">
          <p>Total Photos</p>
          <h2 className="text-4xl font-bold text-teal-400">
            {data.totalPhotos}
          </h2>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6">
          <p>Journal Entries</p>
          <h2 className="text-4xl font-bold text-teal-400">
            {data.totalJournals}
          </h2>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6">
          <p>Total Expenses</p>
          <h2 className="text-4xl font-bold text-teal-400">
            ₹{data.totalExpenses}
          </h2>
        </div>

      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 mb-10">

        <h2 className="text-2xl font-bold mb-6">
          Expenses By Trip
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart
            data={
              data.expenseByTrip
            }
          >
            <XAxis
              dataKey="name"
            />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="expenses"
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

      <div className="bg-zinc-900 rounded-3xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          Photos By Trip
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart
            data={
              data.photosByTrip
            }
          >
            <XAxis
              dataKey="name"
            />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="photos"
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Analytics;