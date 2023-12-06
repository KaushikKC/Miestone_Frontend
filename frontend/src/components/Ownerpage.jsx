import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { useAppContext } from "../utils/AppContext";
import axios from "axios";

function Ownerpage() {
  const [OwnerName, setOwnerName] = useState("");
  const [Restaurant, setRestaurant] = useState("");
  const [address, setaddress] = useState("");
  const [MileStone, setMileStone] = useState("");
  const [desc, setdesc] = useState("");
  const [gst, setgst] = useState("");
  const { connectWallet, appState, disconnectWallet } = useAppContext();
  const setData = () => {
    updatedData = {
      name: OwnerName,
      restaurantName: Restaurant,
      address: address,
      mileStone: MileStone,
      desc: desc,
      gst: gst,
    };
  };

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
        <label class="font-bold">Owner name:</label>
        <input
          type="text"
          placeholder="Enter owner name"
          onChange={(e) => {
            setOwnerName(e.target.value);
          }}
        />
      </div>
      <div class="flex flex-col h-10 p-5 m-3">
        <label class="font-bold">Restaurant name:</label>
        <input
          type="text"
          placeholder="Enter the restaurant name"
          onChange={(e) => {
            setRestaurant(e.target.value);
          }}
        />
      </div>
      <div class="flex flex-col h-10 p-5 m-3">
        <label class="font-bold">Restaurant address:</label>
        <input
          type="text"
          placeholder="Enter the address"
          onChange={(e) => {
            setaddress(e.target.value);
          }}
        />
      </div>
      <div class="flex flex-col h-10 p-5 m-3">
        <label class="font-bold">Milestone:</label>
        <input
          type="number"
          placeholder="Count to claim rewards"
          onChange={(e) => {
            setMileStone(e.target.value);
          }}
        />
      </div>
      <div class="flex flex-col h-10 p-5 m-3">
        <label class="font-bold">Description:</label>
        <input
          type="text"
          placeholder="Description of restaurant"
          onChange={(e) => {
            setdesc(e.target.value);
          }}
        />
      </div>
      <div class="flex flex-col h-10 p-5 m-3">
        <label class="font-bold">GST id:</label>
        <input
          type="text"
          placeholder="Enter GST id of restaurant"
          onChange={(e) => {
            setgst(e.target.value);
          }}
        />
      </div>
      <div class="flex flex-col h-10 p-5 m-3">
        <button
          class="px-6 py-3 bg-blue-300 rounded-lg text-white font-bold"
          onClick={() =>
            updateProfileData(appState.address.address, {
              name: OwnerName,
              type: "Owner",
              restaurantName: [Restaurant],
              address: address,
              mileStone: MileStone,
              desc: desc,
              gst: gst,
            })
          }
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Ownerpage;
