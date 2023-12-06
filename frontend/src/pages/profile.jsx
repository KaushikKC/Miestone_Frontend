import {
  Provider,
  Account,
  Contract,
  json,
  stark,
  uint256,
  shortString,
  RpcProvider,
  constants,
  CallData,
} from "starknet";

import React from "react";
import { useAppContext } from "../utils/AppContext";

const profile = () => {
  const { connectWallet, appState, disconnectWallet, getTokenData } =
    useAppContext();
  const profileDetails = {
    name: "John Doe",
    type: "Customer", // or 'Owner'
    loyaltyPoints: 120,
  };

  const mint = async () => {
    try {
      const tokenID = await getTokenData();
      const provider = new RpcProvider({
        sequencer: { network: constants.NetworkName.SN_GOERLI },
      });
      const testAddress =
        "0x01cf338b0ac1874f1050bd737898986b32c32fd7a9125885a321c458a4965019";
      const testAbi = await provider.getClassAt(testAddress);
      const newContract = new Contract(
        testAbi.abi,
        testAddress,
        appState.address
      );
      console.log("mycontract", newContract, appState);
      const response = await newContract.mint(
        appState.address.address,
        tokenID + 3
      );
      console.log(">> response 0", response);
      await provider.waitForTransaction(response.transaction_hash);
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4 flex justify-center">
        Profile Page
      </h1>
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
        <div class="w-[200px] flex flex-col h-10 p-5 m-3">
          <button
            onClick={() => mint()}
            class="px-6 py-3 bg-blue-300 rounded-lg text-white font-bold"
          >
            Mint
          </button>
        </div>
      </div>
    </div>
  );
};

export default profile;
