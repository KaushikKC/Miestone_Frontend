import React from "react";

function Userpage() {
  return (
    <div class="flex flex-col h-[370px] items-center justify-center">
      <div class="flex flex-col h-10 bg-gray-10 p-5 m-3 ">
        <label class="font-bold">User name:</label>
        <input type="text" placeholder="Enter your username" />
      </div>
      <div class="flex flex-col h-10 bg-gray-10 p-5 m-3 ">
        <label class="font-bold">Mobile Number:</label>
        <input type="text" placeholder="Enter the mobile number" />
      </div>
      <div class="flex flex-col h-10 bg-gray-10 p-5 m-3 ">
        <label class="font-bold">Email id:</label>
        <input type="email" placeholder="Enter your mail id" />
      </div>
      <div class="flex flex-col h-10 p-5 m-3">
        <button class="px-6 py-3 bg-blue-300 rounded-lg text-white font-bold">
          Submit
        </button>
      </div>
    </div>
  );
}

export default Userpage;
