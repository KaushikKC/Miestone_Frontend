import React, { useState } from "react";

const FilterSelector = () => {
  const [selectedFilter, setSelectedFilter] = useState("");

  // Function to handle filter selection
  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setSelectedFilter(filter);
    // Perform actions with selected filter if needed
    console.log("Selected Filter:", filter);
  };

  // Sample list of filter options
  const filters = ["Sort by rating", "Near by ", "Filter 3", "Filter 4"];

  return (
    <div>
      <h2 className="text-lg font-bold">Filters</h2>
      <div className="mt-2 flex flex-col gap-4">
        {/* Map through filters to create radio buttons */}
        {filters.map((filter, index) => (
          <label key={index} className="inline-flex items-center">
            <input
              type="radio"
              value={filter}
              checked={selectedFilter === filter}
              onChange={handleFilterChange}
              className="form-radio h-5 w-5 text-indigo-600"
            />
            <span className="ml-2">{filter}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSelector;
