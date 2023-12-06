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

import React, { useEffect } from "react";
import { useAppContext } from "../utils/AppContext";

const profile = () => {
  const { appState, getTokenData, putTokenData } = useAppContext();
  const profileDetails = {
    name: "John Doe",
    type: "Customer", // or 'Owner'
    loyaltyPoints: 120,
  };

  useEffect(() => {
    const getLoyalty = async () => {
      try {
        const provider = new RpcProvider({
          sequencer: { network: constants.NetworkName.SN_GOERLI },
        });
        const testAddress =
          "0x543a9944c1f169f4fa16f918c555fe23977add9b226340823b66835b5a27e2e";
        const testAbi = await provider.getClassAt(testAddress);
        const newContract = new Contract(
          testAbi.abi,
          testAddress,
          appState.address
        );
        console.log("mycontract", newContract, appState);
        const response = await newContract.get_loyalty(
          appState.address.address,
          reviewData.rating / 10
        );
        console.log(">> response 0", response);
        await provider.waitForTransaction(response.transaction_hash);
        return true;
      } catch (error) {
        console.log("error", error);
        return false;
      }
    };
    getLoyalty();
      }, []);

  const mint = async () => {
    try {
      const tokenID = await getTokenData();
      console.log(tokenID)
      console.log(appState)
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
      );
      console.log(">> response 0", response);
      await provider.waitForTransaction(response.transaction_hash);
      await putTokenData(appState.currentSupply + 1)
      await removeLoyalty()
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  const removeLoyalty = async () => {
    try {
      const provider = new RpcProvider({
        sequencer: { network: constants.NetworkName.SN_GOERLI },
      });
      const testAddress =
        "0x543a9944c1f169f4fa16f918c555fe23977add9b226340823b66835b5a27e2e";
      const testAbi = await provider.getClassAt(testAddress);
      const newContract = new Contract(
        testAbi.abi,
        testAddress,
        appState.address
      );
      console.log("mycontract", newContract, appState);
      const response = await newContract.remove_loyalty(
        appState.address.address,
        1000
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
      <h1 className="text-3xl font-bold mb-4 flex justify-center">Profile Page</h1>
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
        <div>
          <h1>Current Supply {appState.currentSupply}</h1>
        </div>
        <div class="w-[200px] flex flex-col h-10 p-5 m-3">
        <button onClick={() => mint()} class="px-6 py-3 bg-blue-300 rounded-lg text-white font-bold">
          Mint
        </button>
        </div>
      </div>
    </div>
  );
};

export default profile;
