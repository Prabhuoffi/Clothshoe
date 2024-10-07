import React, { useState } from 'react';
import { updateShoe } from '../api/api'; // Adjust the import path as needed

function ShoeList({ shoes, onEdit, onDelete }) {
  const [editingShoeId, setEditingShoeId] = useState(null);
  const [currentShoeData, setCurrentShoeData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentShoeData({
      ...currentShoeData,
      [name]: value,
    });
  };

  const handleEditClick = (shoe) => {
    setEditingShoeId(shoe._id);
    setCurrentShoeData(shoe);
  };

  const handleSaveClick = async () => {
    try {
      // Make API call to update the shoe in the database
      const updatedShoe = await updateShoe(editingShoeId, currentShoeData);
      onEdit(updatedShoe);
      setEditingShoeId(null);
    } catch (error) {
      console.error("Failed to update the shoe", error);

    }
  };

  const handleCancelClick = () => {
    setEditingShoeId(null);
  };

  if (shoes.length === 0) {
    return <p>No shoes available.</p>;
  }

  return (
    <ul className="space-y-4">
      {shoes.map((shoe) => (
        <li
          key={shoe._id}
          className="p-4 bg-white rounded-md shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
        >
          {editingShoeId === shoe._id ? (
            <div className="flex-1">
              <input
                type="text"
                name="name"
                value={currentShoeData.name}
                onChange={handleInputChange}
                className="border border-gray-300 p-1 rounded-md mb-2"
                placeholder="Shoe Name"
              />
              <input
                type="text"
                name="cost"
                value={currentShoeData.cost}
                onChange={handleInputChange}
                className="border border-gray-300 p-1 rounded-md mb-2"
                placeholder="Cost"
              />
              <input
                type="text"
                name="image"
                value={currentShoeData.image}
                onChange={handleInputChange}
                className="border border-gray-300 p-1 rounded-md mb-2"
                placeholder="Image URL"
              />
              <input
                type="text"
                name="offer"
                value={currentShoeData.offer}
                onChange={handleInputChange}
                className="border border-gray-300 p-1 rounded-md mb-2"
                placeholder="Offer"
              />
              <input
                type="text"
                name="rating"
                value={currentShoeData.rating}
                onChange={handleInputChange}
                className="border border-gray-300 p-1 rounded-md mb-2"
                placeholder="Rating"
              />
              <input
                type="text"
                name="freeDelivery"
                value={currentShoeData.freeDelivery ? 'Yes' : 'No'}
                onChange={handleInputChange}
                className="border border-gray-300 p-1 rounded-md mb-2"
                placeholder="Free Delivery"
              />
              <input
                type="text"
                name="bankOffer"
                value={currentShoeData.bankOffer}
                onChange={handleInputChange}
                className="border border-gray-300 p-1 rounded-md mb-2"
                placeholder="Bank Offer"
              />
              <div className="flex mt-4 space-x-2">
                <button
                  onClick={handleSaveClick}
                  className="py-1 px-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelClick}
                  className="py-1 px-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1">
              <h3 className="text-lg font-bold">{shoe.name}</h3>
              <p className="text-gray-700">{`Cost: ${shoe.cost}`}</p>
              <img
                src={shoe.image}
                alt={shoe.name}
                className="w-20 h-20 object-cover mt-2"
              />
              <p className="text-green-500 mt-2">{shoe.offer}</p>
              <p className="text-yellow-500">{`Rating: ${shoe.rating}`}</p>
              <p className="text-gray-500">
                {shoe.freeDelivery ? "Free Delivery" : ""}
              </p>
              <p className="text-blue-500">{shoe.bankOffer}</p>
            </div>
          )}
          <div className="flex mt-4 md:mt-0 space-x-2">
            <button
              onClick={() => handleEditClick(shoe)}
              className="py-1 px-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(shoe._id)}
              className="py-1 px-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ShoeList;
