import axios from "axios";
import React from "react";

const fetchProfileData = async (walletAddress) => {
  try {
    const response = await axios.get(
      `http://your-backend-url/profile/${walletAddress}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

const profile = () => {
  const profileDetails = {
    name: "John Doe",
    type: "Customer", // or 'Owner'
    loyaltyPoints: 120,
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
      <div className="border border-gray-200 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Profile Details</h2>
        <div className="mb-2">
          <span className="font-semibold">Name:</span> {profileDetails.name}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Type:</span> {profileDetails.type}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Loyalty Points:</span>{" "}
          {profileDetails.loyaltyPoints}
        </div>
      </div>
    </div>
  );
};

export default profile;
