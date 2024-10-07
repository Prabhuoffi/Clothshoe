import React, { useState} from 'react';

function ShoeForm({ currentShoe, onSave }) {
  const [shoe, setShoe] = useState({
    name: '',
    cost: '',
    image: '',
    rating: 0,
    offer: '',
    freeDelivery: false,
    bankOffer: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShoe({
      ...shoe,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(shoe);
    setShoe({
      name: '',
      cost: '',
      image: '',
      rating: 0,
      offer: '',
      freeDelivery: false,
      bankOffer: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="name" placeholder="Name" value={shoe.name} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
      <input type="text" name="cost" placeholder="Cost" value={shoe.cost} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
      <input type="text" name="image" placeholder="Image URL" value={shoe.image} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
      <input type="number" name="rating" placeholder="Rating" value={shoe.rating} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
      <input type="text" name="offer" placeholder="Offer" value={shoe.offer} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
      <label className="flex items-center">
        <input type="checkbox" name="freeDelivery" checked={shoe.freeDelivery} onChange={handleChange} className="mr-2" />
        Free Delivery
      </label>
      <input type="text" name="bankOffer" placeholder="Bank Offer" value={shoe.bankOffer} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md" />
      <button type="submit" className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md">Save Shoe</button>
    </form>
  );
}

export default ShoeForm;
