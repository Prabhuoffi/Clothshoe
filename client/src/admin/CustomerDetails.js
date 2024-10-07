// CustomerDetails.js
import React, { useState, useEffect } from 'react';
import { FiPrinter } from 'react-icons/fi';
import { getOrders } from '../api/api';

const CustomerDetails = () => {
  const [orders, setOrders] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handlePrintOrder = (orderId) => {
    // Find the order details
    const orderToPrint = orders.find(order => order._id === orderId);
  
    // Prepare the content to be printed
    const contentToPrint = `
      <h1>Order Details</h1>
      <p><strong>ID:</strong> ${orderToPrint._id}</p>
      <p><strong>First Name:</strong> ${orderToPrint.firstName}</p>
      <p><strong>Last Name:</strong> ${orderToPrint.lastName}</p>
      <p><strong>Email:</strong> ${orderToPrint.email}</p>
      <p><strong>PhoneNumber:</strong> ${orderToPrint.phone}</p>
      <p><strong>Address:</strong> ${orderToPrint.address}</p>
      <p><strong>City:</strong> ${orderToPrint.city}</p>
      <p><strong>Country:</strong> ${orderToPrint.country}</p>
      <p><strong>Zip Code:</strong> ${orderToPrint.zipCode}</p>
      <p><strong>Total Amount:</strong> ${orderToPrint.totalAmount}</p>
      <p><strong>Items:</strong> ${orderToPrint.quantity}</p>
      <p><strong>Payment Status:</strong> <span class='text-green-500 font-bold'>Payment Successful</span></p>
    `;
  
    // Open a new window with the content to be printed
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Order</title>
          <style>
            /* Add your custom CSS styles here */
          </style>
        </head>
        <body>${contentToPrint}</body>
      </html>
    `);
    printWindow.document.close();
  
    // Print the content
    printWindow.print();
  };
  

  const filteredOrders = orders.filter((order) =>
    Object.values(order).some((value) =>
      value && value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Orders</h1>
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchInputChange}
        placeholder="Search orders"
        className="w-full mb-6 p-2 rounded border border-gray-300"
      />
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse shadow-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-purple-600 text-white border">ID</th>
              <th className="px-4 py-2 bg-purple-600 text-white border">First Name</th>
              <th className="px-4 py-2 bg-purple-600 text-white border">Last Name</th>
              <th className="px-4 py-2 bg-purple-600 text-white border">Email</th>
              <th className="px-4 py-2 bg-purple-600 text-white border">Phone Number</th>
              <th className="px-4 py-2 bg-purple-600 text-white border">Address</th>
              <th className="px-4 py-2 bg-purple-600 text-white border">City</th>
              <th className="px-4 py-2 bg-purple-600 text-white border">Country</th>
              <th className="px-4 py-2 bg-purple-600 text-white border">Zip Code</th>
              <th className="px-4 py-2 bg-purple-600 text-white border">Total Amount</th>
              <th className="px-4 py-2 bg-purple-600 text-white border">Items</th>
              <th className="px-4 py-2 bg-purple-600 text-white border">Payment Status</th>
              <th className="px-4 py-2 bg-purple-600 text-white border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-100 transition-colors">
                  <td className="border px-4 py-2">{order._id}</td>
                  <td className="border px-4 py-2">{order.firstName}</td>
                  <td className="border px-4 py-2">{order.lastName}</td>
                  <td className="border px-4 py-2">{order.email}</td>
                  <td className="border px-4 py-2">{order.phone}</td>
                  <td className="border px-4 py-2">{order.address}</td>
                  <td className="border px-4 py-2">{order.city}</td>
                  <td className="border px-4 py-2">{order.country}</td>
                  <td className="border px-4 py-2">{order.zipCode}</td>
                  <td className="border px-4 py-2">{order.totalAmount}</td>
                  <td className="border px-4 py-2">{order.quantity}</td>
                  <td className="border px-4 py-2"><span className='text-green-500 font-bold'>Payment Successful</span></td>
                  <td className="border px-4 py-2">
                    <button onClick={() => handlePrintOrder(order._id)}>
                      <FiPrinter size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="text-center py-4">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerDetails;
