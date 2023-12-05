// import React from 'react'
// import { useEffect } from "react";
// import { Button } from "@nextui-org/react";
// import { useAppContext } from "../utils/AppContext";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// function Profile() {

//     return (
//       <div >
//         <div className="flex flex-col">

//           <div className="bg-gray-200 w-100 h-[550px] rounded-lg flex flex-col justify-center items-center">

//               <h2 className="text-xl font-semibold">John Doe5</h2>
//               <p className="text-gray-600 mt-2 ">Email: john.doe@example.com</p>
//               <p className="text-gray-600">Number: +123 456 7890</p>

//           </div>

//         </div>
//       </div>
//     );
//   };

//   export default Profile;

import React from "react";

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
