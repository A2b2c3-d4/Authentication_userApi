const mongoose = require('mongoose');
const connectDB = async() =>{
    try{
       await mongoose.connect(process.env.MONGO_URI,
        {useNewUrlparser:true, useUnifiedTopology:true});
        console.log('Connected to MongoDB server');
    }
    catch(error){
        console.error('MongoDB Connection Failed');
    }
}

module.exports = connectDB;