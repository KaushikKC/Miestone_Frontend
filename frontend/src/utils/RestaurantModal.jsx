import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { Contract } from "starknet";

import contractAbi from "../../../smart-contracts/nft.json";
const contractAddress =
  "0x5302e3d1d237dd13dbca7bd0e6448c5248dae4382010b39b21fc32efc51e07a";

const RestaurantModal = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState({ reviewText: "", rating: "" });
  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "400px",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      backgroundColor: "#fff",
    },
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const setLoyalty = async () => {
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
        const response = await newContract.set_loyalty(
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
    setLoyalty();
    console.log("Submitted Review:", reviewData);
    setIsModalOpen(false);
  };
  const restaurants = [
    {
      id: 1,
      name: "Restaurant A",
      imageUrl: "https://via.placeholder.com/300",
      averageRating: 4.5,
      location: "Location A",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      images: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        // ... more image URLs
      ],
      reviews: ["Great food!", "Amazing service!"],
    },
    {
      id: 2,
      name: "Restaurant B",
      imageUrl: "https://via.placeholder.com/300",
      averageRating: 4.0,
      location: "Location B",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      images: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        // ... more image URLs
      ],
      reviews: ["Good ambiance.", "Could improve the menu variety."],
    },
  ];

  const restaurant = restaurants.find((r) => r.id === parseInt(id, 10));

  if (!restaurant) {
    return <div className="text-center mt-8">Restaurant not found!</div>;
  }

  const {
    imageUrl,
    name,
    averageRating,
    location,
    description,
    images,
    reviews,
  } = restaurant;

  return (
    <div className="container mx-auto mt-8 p-4">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <p className="text-gray-600 mb-4">{location}</p>
      <p className="mb-4">{description}</p>
      <div className="flex items-center mb-4">
        <span className="text-yellow-500 mr-1">&#9733;</span>
        <span>{averageRating}</span>
      </div>

      <h3 className="text-lg font-semibold mb-2">Images:</h3>
      <div className="flex flex-wrap mb-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index}`}
            className="w-32 h-32 object-cover mr-2 mb-2 rounded-md"
          />
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-2">Reviews:</h3>
      <ul className="list-disc pl-4">
        {reviews.map((review, index) => (
          <li key={index} className="mb-2">
            {review}
          </li>
        ))}
      </ul>
      <h3 className="text-lg font-semibold mb-2">
        Wanna claim loyalty points? Scan the QR in the bill.
      </h3>

      {/* Review button */}
      <button
        onClick={toggleModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Review us
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Review Modal"
        style={modalStyle}
      >
        <div style={{ marginBottom: "1rem" }}>
          <h2 className="text-2xl font-bold">Write a Review</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              GST NO:
            </label>
            <textarea
              name="reviewText"
              value={reviewData.reviewText}
              onChange={handleInputChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter the GST no"
              required
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price Paid:
            </label>
            <input
              type="number"
              name="rating"
              value={reviewData.rating}
              onChange={handleInputChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter your rating (1-5)"
              min="1"
              max="5"
              required
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Rating:
            </label>
            <input
              type="number"
              name="rating"
              value={reviewData.rating}
              onChange={handleInputChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter your rating (1-5)"
              min="1"
              max="5"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Submit Review
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default RestaurantModal;
