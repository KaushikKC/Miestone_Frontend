import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "500px",
    maxHeight: "80%",
    overflow: "auto",
    padding: "20px",
  },
};

Modal.setAppElement("#root"); // Set the root element for accessibility

const RestaurantCard = ({
  imageUrl,
  name,
  averageRating,
  location,
  description,
  images,
  reviews,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        className="bg-white rounded-lg shadow-lg p-4 mb-4"
        onClick={openModal}
      >
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-40 object-cover rounded-md mb-4 cursor-pointer"
        />
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 mr-1">&#9733;</span>
          <span>{averageRating}</span>
        </div>
        <p className="text-gray-600">{location}</p>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Restaurant Modal"
      >
        <h2>{name}</h2>
        <p>Description: {description}</p>
        <h3>Images:</h3>
        <div className="flex flex-wrap">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              className="w-32 h-32 object-cover mr-2 mb-2"
            />
          ))}
        </div>
        <h3>Reviews:</h3>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>{review}</li>
          ))}
        </ul>
        <p>Average Rating: {averageRating}</p>
        <button
          onClick={closeModal}
          className="bg-red-500 text-white mt-6 py-2 px-4 rounded-md"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default RestaurantCard;
