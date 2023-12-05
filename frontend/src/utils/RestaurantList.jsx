import React from "react";
import RestaurantCard from "./RestaurantCard"; // assuming the file location of the RestaurantCard component

const RestaurantList = () => {
  // Sample restaurant data
  const restaurants = [
    {
      id: 1,
      name: "Restaurant A",
      imageUrl: "https://via.placeholder.com/300",
      averageRating: 4.5,
      location: "123 Main St, City",
    },
    {
      id: 2,
      name: "Restaurant B",
      imageUrl: "https://via.placeholder.com/300",
      averageRating: 4.0,
      location: "456 Broadway, Town",
    },
    // ... other restaurants
  ];

  return (
    <div>
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          id={restaurant.id}
          imageUrl={restaurant.imageUrl}
          name={restaurant.name}
          averageRating={restaurant.averageRating}
          location={restaurant.location}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
