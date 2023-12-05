import React, { useState } from "react";

const PlaceSelector = () => {
  const [selectedPlace, setSelectedPlace] = useState("");

  // Function to handle place selection
  const handlePlaceChange = (e) => {
    const place = e.target.value;
    setSelectedPlace(place);
    // Perform actions with selected place if needed
    console.log("Selected Place:", place);
  };

  // Sample list of places
  const places = ["Place 1", "Place 2", "Place 3", "Place 4"];

  return (
    <div className="flex flex-col gap-5">
      <div>
        {" "}
        <h2 className="text-lg font-bold">Your Current Location</h2>
        <h5>Banglore</h5>
      </div>

      <h2 className="text-lg font-bold">Select a Place</h2>
      <div className="mt-2 flex flex-col gap-4">
        {places.map((place, index) => (
          <label key={index} className="inline-flex items-center">
            <input
              type="radio"
              value={place}
              checked={selectedPlace === place}
              onChange={handlePlaceChange}
              className="form-radio h-5 w-5 text-indigo-600"
            />
            <span className="ml-2">{place}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PlaceSelector;
