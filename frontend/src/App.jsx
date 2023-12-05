import { Profiler, useState } from "react";
import { Button, ButtonGroupProvider } from "@nextui-org/react";

import "./App.css";
import { AppContextProvider } from "./utils/AppContext";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import PrivateRouteGuard from "./utils/PrivateRouteGuard";

import Homepage from "./pages/Homepage";
import Home from "./pages/Home";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/profile";
import CreateProfile from "./pages/CreateProfile";

import RestaurantModal from "./utils/RestaurantModal";

function App() {
  const location = useLocation();

  return (
    <AppContextProvider>
      <Routes location={location} key={location.pathname}>
        {/* <Route path="/" element={<Navigate to="/dashboard/my-farm" />} /> */}
        <Route path="/" element={<Home />} />

        <Route path="/profile" element={<Profile />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRouteGuard>
              <Dashboard />
            </PrivateRouteGuard>
          }
        />
        <Route
          path="/createprofile"
          element={
            <PrivateRouteGuard>
              <CreateProfile />
            </PrivateRouteGuard>
          }
        />
        <Route path="/details/:id" element={<RestaurantModal />} />
      </Routes>
    </AppContextProvider>
  );
}

export default App;
