'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// const route
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

connectDB()
app.use(cors());
app.use(express.json());    
app.use(express.urlencoded({ extended: true }));

// api routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

