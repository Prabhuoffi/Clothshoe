import React, { useState, useEffect } from 'react';
import { getShoes } from '../api/api';
import { FaShoppingCart, FaCreditCard, FaTimes } from 'react-icons/fa';
import { useCart } from '../screen/CartContext'; // Importing custom hook for cart management
import { useNavigate } from 'react-router-dom'; // Importing hook for navigation
import { ToastContainer, toast } from 'react-toastify'; // Importing Toast components
import 'react-toastify/dist/ReactToastify.css'; // Importing Toast CSS

function OurCollection() {
  // State variables
  const [shoes, setShoes] = useState([]); // State for storing shoes data
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [sortOption, setSortOption] = useState('default'); // State for sort option
  const [selectedShoe, setSelectedShoe] = useState(null); // State for selected shoe
  const { addToCart } = useCart(); // Accessing cart management functions through custom hook
  const navigate = useNavigate(); // Accessing navigation function through hook
  const [isShoeModalOpen, setIsShoeModalOpen] = useState(false); // State for shoe modal visibility
  const [isSeeMoreModalOpen, setIsSeeMoreModalOpen] = useState(false);

  // Fetch shoes data on component mount
  useEffect(() => {
    fetchShoes();
  }, []);

  // Function to fetch shoes data
  const fetchShoes = async () => {
    try {
      const response = await getShoes(); // Adjust your endpoint accordingly
      setShoes(response.data); // Updating state with fetched shoes data
    } catch (error) {
      console.error('Error fetching shoes:', error); // Handling errors if any
    }
  };

  // Open shoe modal
  const openShoeModal = (shoe) => {
    setSelectedShoe(shoe); // Setting selected shoe in state
    setIsShoeModalOpen(true); // Setting modal visibility to true
  };

  // Open "See More Collection" modal
  const openSeeMoreModal = () => {
    setIsSeeMoreModalOpen(true); // Setting modal visibility to true
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Updating search term in state
  };

  // Handle sort option change
  const handleSort = (e) => {
    setSortOption(e.target.value); // Updating sort option in state
  };

  // Filter and sort shoes based on search term and sort option
  const filteredShoes = shoes
    .filter((shoe) => shoe.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'priceLowToHigh') {
        return parseInt(a.cost.substring(1)) - parseInt(b.cost.substring(1));
      }
      if (sortOption === 'priceHighToLow') {
        return parseInt(b.cost.substring(1)) - parseInt(a.cost.substring(1));
      }
      return 0;
    });

  // Navigate to payment method page
  const handleBuyNowClick = () => {
    navigate('/add-card'); // Using hook to navigate to payment method page
  };

  // Close shoe modal
  const handleCloseShoeModal = () => {
    setIsShoeModalOpen(false); // Setting shoe modal visibility to false
    setSelectedShoe(null); // Resetting selected shoe
  };

  // Close "See More Collection" modal
  const handleCloseSeeMoreModal = () => {
    setIsSeeMoreModalOpen(false); // Setting "See More" modal visibility to false
  };

  // Add to cart with toast notification
  const handleAddToCart = (shoe) => {
    addToCart(shoe); // Add the shoe to the cart
    toast.success(`${shoe.name} added to cart!`); // Show success toast notification
  };

  return (
    <section className="container mx-auto py-12 px-4">
      {/* Toast Container */}
      <ToastContainer />

      {/* Title */}
      <h1 className="text-3xl lg:text-4xl font-bold text-purple-700 mb-8 text-center">
        Our Collection
      </h1>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search shoes..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4 md:mb-0 md:mr-4"
        />

        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={handleSort}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="default">Sort By</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </div>

      {/* Display Shoes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredShoes.map((shoe) => (
          <div
            key={shoe._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative group"
            style={{ height: '600px' }}
          >
            {/* Shoe Image */}
            <div className="relative flex justify-center items-center h-64 bg-gray-50 cursor-pointer" onClick={() => openShoeModal(shoe)}>
              <img
                src={shoe.image}
                alt={shoe.name}
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
            </div>

            {/* Shoe Details */}
            <div className="p-6 text-center flex flex-col justify-between h-36">
              <div>
                {/* Shoe Name */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {shoe.name}
                </h2>
                {/* Shoe Price */}
                <p className="text-lg text-gray-600 mb-2">Price: ₹{shoe.cost}</p>
                {/* Shoe Rating */}
                <p className="text-yellow-500 mb-2">
                  Rating: {'★'.repeat(Math.floor(shoe.rating)) + (shoe.rating % 1 !== 0 ? '★' : '')}
                  {'☆'.repeat(5 - Math.ceil(shoe.rating))}
                </p>
                {/* Shoe Offer */}
                <p className="text-green-500 mb-2">Offer: {shoe.offer}</p>
                {/* Free Delivery */}
                <p className="text-gray-600 mb-2">{shoe.freeDelivery ? 'Free Delivery Available' : 'No Free Delivery'}</p>
                {/* Bank Offer */}
                <p className="text-blue-500 mb-4">Bank Offer: {shoe.bankOffer}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                {/* Add to Cart Button */}
                <button
                  className="flex items-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 px-4 rounded-full font-semibold shadow-md  hover:from-purple-600 hover:to-indigo-600 transition duration-300 ease-in-out"
                  onClick={() => handleAddToCart(shoe)}
                >
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </button>

                {/* Buy Now Button */}
                <button
                  className="flex items-center bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 px-4 rounded-full font-semibold shadow-md hover:from-green-600 hover:to-teal-600 transition duration-300 ease-in-out"
                  onClick={handleBuyNowClick}
                >
                  <FaCreditCard className="mr-2" /> Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* See More Collection Button */}
      <div className="text-center mt-12">
        <button
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 px-8 rounded-full font-semibold shadow-md hover:from-purple-600 hover:to-indigo-600 transition duration-300 ease-in-out"
          onClick={openSeeMoreModal}
        >
          See More Collection
        </button>
      </div>

      {/* Shoe Modal */}
      {selectedShoe && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-10 w-96 relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 bg-red-500 text-white p-2 focus:outline-none"
              onClick={handleCloseShoeModal}
            >
              <FaTimes />
            </button>

            {/* Shoe Details */}
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {selectedShoe.name}
            </h2>
            <img
              src={selectedShoe.image}
              alt={selectedShoe.name}
              className="w-full h-64 object-contain mb-4"
            />
            <p className="text-lg text-gray-600 mb-4">{selectedShoe.cost}</p>
            <p className="text-yellow-500 mb-2">
              {"★".repeat(Math.floor(selectedShoe.rating)) + (selectedShoe.rating % 1 !== 0 ? "★" : "")}
              {"☆".repeat(5 - Math.ceil(selectedShoe.rating))}
            </p>
            <p className="text-green-500 mb-2">{selectedShoe.offer}</p>
            <p className="text-gray-600 mb-2">{selectedShoe.freeDelivery ? "Free Delivery" : ""}</p>
            <p className="text-blue-500 mb-4">{selectedShoe.bankOffer}</p>

            {/* Close Button */}
            <button
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 px-4 rounded-full font-semibold shadow-md hover:from-purple-600 hover:to-indigo-600 transition duration-300 ease-in-out"
              onClick={handleCloseShoeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* See More Collection Modal */}
      {isSeeMoreModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-2xl relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 bg-red-500 text-white p-2 focus:outline-none"
              onClick={handleCloseSeeMoreModal}
            >
              <FaTimes />
            </button>

            {/* Modal Content */}
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              More Collection Coming Soon!
            </h2>
            <p className="text-lg text-gray-600 mb-4 text-center">
              We are constantly updating our collection. Stay tuned for more amazing shoes!
            </p>

            {/* Close Button */}
            <button
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 px-4 rounded-full font-semibold shadow-md hover:from-purple-600 hover:to-indigo-600 transition duration-300 ease-in-out mx-auto block"
              onClick={handleCloseSeeMoreModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default OurCollection;
