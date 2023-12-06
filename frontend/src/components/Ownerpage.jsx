import { Button } from "@nextui-org/react";
import React from "react";

function Ownerpage() {
  return (
    <div class="flex flex-col h-[370px] items-center justify-center">
      <div class="flex flex-col h-10 bg-gray-10 p-5 m-3 ">
        <label class="font-bold">Owner name:</label>
        <input type="text" placeholder="Enter owner name" />
      </div>
      <div class="flex flex-col h-10 p-5 m-3">
        <label class="font-bold">Restaurant name:</label>
        <input type="text" placeholder="Enter the restaurant name" />
      </div>
      <div class="flex flex-col h-10 p-5 m-3">
        <label class="font-bold">Restaurant address:</label>
        <input type="text" placeholder="Enter the address" />
      </div>
      <div class="flex flex-col h-10 p-5 m-3">
        <label class="font-bold">Milestone:</label>
        <input type="number" placeholder="Count to claim rewards" />
      </div>
      <div class="flex flex-col h-10 p-5 m-3">
        <label class="font-bold">Description:</label>
        <input type="text" placeholder="Description of restaurant" />
      </div>
      <div class="flex flex-col h-10 p-5 m-3">
        <label class="font-bold">GST id:</label>
        <input type="text" placeholder="Enter GST id of restaurant" />
      </div>
      <div class="flex flex-col h-10 p-5 m-3">
        <button class="px-6 py-3 bg-blue-300 rounded-lg text-white font-bold">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Ownerpage;
