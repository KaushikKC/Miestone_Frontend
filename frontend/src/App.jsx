import { Profiler, useState } from "react";
import { Button, ButtonGroupProvider } from "@nextui-org/react";

import "./App.css";
import { AppContextProvider } from "./utils/AppContext";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import PrivateRouteGuard from "./utils/PrivateRouteGuard";

import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/profile";
import CreateProfile from "./pages/CreateProfile";

function App() {
  const location = useLocation();

  return (
    <AppContextProvider>
      <Routes location={location} key={location.pathname}>
        {/* <Route path="/" element={<Navigate to="/dashboard/my-farm" />} /> */}
        <Route path="/" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard"
          element={
              <Dashboard />
          }
        />
        <Route path="/createprofile"
          element={
              <CreateProfile />
          }
          
        />
      </Routes>
    </AppContextProvider>
  );
}

export default App;
