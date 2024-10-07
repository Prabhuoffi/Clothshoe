const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const ConnectDB = require('./config/db');
const UserRoutes = require('./router/userRoutes');
const shoeRoutes = require('./router/shoesRoutes');
const orderRoutes = require('./router/orderRoutes');
const paymentRoutes = require('./router/paymentRoutes');
const isAuth = require("./middleware/auth")



dotenv.config();

ConnectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(isAuth);
app.use('/api/user', UserRoutes);
app.use('/api/shoes', shoeRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/payments', paymentRoutes);



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
