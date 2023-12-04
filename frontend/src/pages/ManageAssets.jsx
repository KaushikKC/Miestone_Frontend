import { Button } from "@nextui-org/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import NewAssetModal from "../components/NewAssetModal";

function ManageAssets(props) {
  const navigate = useNavigate();
  const { isOpen, onOpenChange, onOpen } = useDisclosure(false);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      {/* modals */}
      <NewAssetModal isOpen={isOpen} onOpenChange={onOpenChange} />
      {/* credits container */}
      <div className="w-full py-2">
        <p className="text-2xl font-bold text-center">Manage Assets</p>
        <div className="flex flex-row items-center justify-center w-full pt-4 gap-x-8">
          <Button onPress={onOpen}>Add a new Asset</Button>
          <Button
            onClick={() => {
              navigate("/marketplace");
            }}
          >
            Go to Marketplace
          </Button>
        </div>
        <div className="divider"></div>
        <div className="flex flex-col items-center justify-center w-full my-16 gap-y-4">
          <p className="">You do not own any assets</p>
        </div>
      </div>
    </div>
  );
}

export default ManageAssets;
