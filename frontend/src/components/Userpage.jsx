import React, { useState } from "react";
import { useAppContext } from "../utils/AppContext";
import axios from "axios";

function Userpage() {
  const [name, setname] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const { connectWallet, appState, disconnectWallet } = useAppContext();

  const updateProfileData = async (walletAddress, updatedData) => {
    try {
      const response1 = await axios.get(
        `http://localhost:3090/user/${walletAddress}`
      );
      console.log(response1.data);
      const response = await axios.put(
        `http://localhost:3090/profile/${walletAddress}`,
        updatedData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  };

  return (
    <div class="flex flex-col h-[370px] items-center justify-center">
      <div class="flex flex-col h-10 bg-gray-10 p-5 m-3 ">
        <label class="font-bold">User name:</label>
        <input
          type="text"
          placeholder="Enter your username"
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
      </div>
      <div class="flex flex-col h-10 bg-gray-10 p-5 m-3 ">
        <label class="font-bold">Mobile Number:</label>
        <input
          type="text"
          placeholder="Enter the mobile number"
          onChange={(e) => {
            setmobile(e.target.value);
          }}
        />
      </div>
      <div class="flex flex-col h-10 bg-gray-10 p-5 m-3 ">
        <label class="font-bold">Email id:</label>
        <input
          type="email"
          placeholder="Enter your mail id"
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
      </div>
      <div class="flex flex-col h-10 p-5 m-3">
        <button
          class="px-6 py-3 bg-blue-300 rounded-lg text-white font-bold"
          onClick={() => {
            updateProfileData(appState.address.address, {
              name: name,
              mobile: mobile,
              email: email,
              type: "User",
            });
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Userpage;
