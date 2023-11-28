const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes');
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json()); 

app.use("/api/auth",userRoutes)
const connectToMongo = async () => {
    try {
      const connection = mongoose.connection;
      connection.once('open', () => {
          console.log("MongoDB database connection established successfully");
      } ) 
      console.log("Connected to MongoDB.");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
    }
  };
connectToMongo(); 

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server Started on Port,${process.env.PORT}`)
})
 