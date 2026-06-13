import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoute from "../components/PublicRoute";
import Navbar from "../components/Navbar";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import TripDetails from "../pages/TripDetails";
import Analytics from "../pages/Analytics";
import Explore from "../pages/Explore";
import PublicTrip from "../pages/PublicTrip";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
  path="/login"
  element={
    <PublicRoute>
      <Login />
    </PublicRoute>
  }
/>
        <Route
  path="/signup"
  element={
    <PublicRoute>
      <Signup />
    </PublicRoute>
  }
/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trips/:id" element={<TripDetails />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:id" element={<PublicTrip />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;