import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Ownerpage from "../components/Ownerpage";
import Userpage from "../components/Userpage";

function CreateProfile() {
  const [checkUser, setCheckUser] = useState();

  return (
    <div class="flex flex-col h-400 items-center justify-center">
      <div class="font-bold font text-[50px] py-4">
        <h1>Create Profile</h1>
      </div>
      {checkUser == undefined && (
        <div class="flex flex-col">
          <Button
            class="font text-[25px] w-[200px] font-semibold bg-gray-300 py-5 px-10 rounded-xl my-3"
            onPress={() => setCheckUser("Owner")}
          >
            Owner
          </Button>
          <Button
            class="font text-[25px] w-[200px] font-semibold bg-gray-300 py-5 px-10 rounded-xl my-3"
            onPress={() => setCheckUser("User")}
          >
            User
          </Button>
        </div>
      )}

      {checkUser == "Owner" && (
        <>
          <Ownerpage />
        </>
      )}
      {checkUser == "User" && (
        <>
          <Userpage />
        </>
      )}
    </div>
  );
}

export default CreateProfile;
