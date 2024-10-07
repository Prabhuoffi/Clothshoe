import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Assuming your CartContext is in the 'context' folder
import { orderDetails } from '../api/api';

const OrderDetailsPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Destructuring item from location state
  const { item } = location.state;

  const { updateQuantity, cartItems } = useCart();

  // Parse item cost and offer as numbers, using 0 as the default for offer if not defined
  const itemCost = parseFloat(item.cost) || 0;
  const itemOffer = parseFloat(item.offer) || 0;

  // Calculate total amount
  const totalItemCost = itemCost * quantity;
  const totalAmount = totalItemCost - (totalItemCost * itemOffer / 100);

  // Find the item in the cart and set the initial quantity from the cart
  useEffect(() => {
    const cartItem = cartItems.find((cartItem) => cartItem._id === item._id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItems, item._id]);

  // Handle quantity change
  const handleQuantityChange = (newQuantity) => {
    const validQuantity = Math.max(parseInt(newQuantity, 10) || 1, 1);
    setQuantity(validQuantity);
    updateQuantity(item._id, validQuantity);
  };

  const handleCustomerDetailsSubmit = async () => {
    setLoading(true);
    setError(null);
  
    // Basic validation
    if (!firstName || !lastName || !phone || !email || !address || !city || !country || !zipCode) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }
  
    try {
      const { data } = await orderDetails({
        firstName,
        lastName,
        phone,
        email,
        address,
        city,
        country,
        zipCode,
        totalAmount: totalAmount.toFixed(2), // Send total amount as a string with 2 decimal places
        quantity,
        items: item._id,
      });
  
      navigate('/payment-method', { state: { order: data } });
    } catch (error) {
      setError('An error occurred while submitting your details. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 text-center">Order Details</h1>
      <div className="flex flex-col items-center lg:flex-row lg:space-x-8 lg:justify-center">
        <div className="max-w-md lg:w-1/2 bg-white p-8 border border-gray-300 rounded-lg shadow-md mb-8 lg:mb-0">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Product Details</h2>
          <div className="mb-4">
            <p className="text-2xl font-bold text-black mb-2">{item.name}</p>
            <img src={item.image} alt={item.name} className="w-full h-auto mb-4" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)} // Handle quantity change
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              min="1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Item ID</label>
            <p className="text-purple-700">{item._id}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Bank Offer</label>
            <p className="text-blue-700 font-bold">{itemOffer ? `${itemOffer}%` : 'N/A'}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Total Amount</label>
            <p className="text-purple-700 font-bold">RS: {totalAmount.toFixed(2)}</p>
          </div>
        </div>

        <div className="max-w-md lg:w-1/2 bg-white p-8 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Customer Details</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="John"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Doe"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="123 Main St"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Anytown"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="91+1234567890"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="test12@gmail.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="USA"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Zip Code</label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="12345"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)} // Ensure quantity is a valid number and at least 1
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              min="1"
            />
          </div>
          {error && <div className="mb-4 text-red-600">{error}</div>}
          <button
            onClick={handleCustomerDetailsSubmit}
            className={`w-full bg-purple-500 text-white py-2 px-4 rounded-md font-semibold shadow-md hover:bg-purple-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Details'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;