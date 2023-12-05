import React from "react";
import { Link } from "react-router-dom";
const RestaurantCard = ({ id, imageUrl, name, averageRating, location }) => {
  return (
    <Link to={`/details/${id}`}>
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 mr-1">&#9733;</span>
          <span>{averageRating}</span>
        </div>
        <p className="text-gray-600">{location}</p>
      </div>
    </Link>
  );
};

export default RestaurantCard;
