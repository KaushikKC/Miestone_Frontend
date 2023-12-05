import React from 'react'
import { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { useAppContext } from "../utils/AppContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Profile() {
 
    return (
      <div >
        <div className="flex flex-col">
         
          <div className="bg-gray-200 w-100 h-[550px] rounded-lg flex flex-col justify-center items-center">
          
            
              <h2 className="text-xl font-semibold">John Doe5</h2>
              <p className="text-gray-600 mt-2 ">Email: john.doe@example.com</p>
              <p className="text-gray-600">Number: +123 456 7890</p>
           
        
          </div>
       
        </div>
      </div>
    );
  };
  
  export default Profile;