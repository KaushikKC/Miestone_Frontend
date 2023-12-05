import React from "react";
import FilterSelector from "../utils/FilterSelector";
import PlaceSelector from "../utils/PlaceSelector";
import RestaurantList from "../utils/RestaurantList";

const Home = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-200 p-4">
        <PlaceSelector />
      </div>
      <div className="w-3/5 bg-gray-300 p-4">
        <h2 className="text-lg font-bold">Restaurants List</h2>
        <RestaurantList />
      </div>
      <div className="w-1/5 bg-gray-200 p-4">
        <FilterSelector />
      </div>
    </div>
  );
};

export default Home;
