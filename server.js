const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const connectDB = require('./config/db');  
const authRoutes = require('./routes/authroutes'); 

connectDB(); 

app.use(cors());
app.use(express.json());


app.use('/', authRoutes);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));