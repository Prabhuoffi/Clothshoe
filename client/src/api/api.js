// api.js
import axios from 'axios';

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Function to get all shoes
export const getShoes = () => api.get('/shoes');

// Function to add a new shoe
export const addShoe = (shoe) => api.post('/shoes', shoe);

// Function to update an existing shoe
export const updateShoe = (id, shoe) => api.put(`/shoes/${id}`, shoe);

// Function to delete a shoe by ID
export const deleteShoe = (id) => api.delete(`/shoes/${id}`);

// Function to get all orders
export const getOrders = () => api.get('/order');

// Function to log in a user
export const loginUser = (email, password) => api.post('/user/login', { email, password });


// api.js
export const paymentDetails = (paymentData) => api.post('/payments/payment-details', paymentData);


export const orderDetails = (orderData) => api.post('/order/create', orderData);


export default api;
