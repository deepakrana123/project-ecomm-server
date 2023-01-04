import RAZORPAY from  'razorpay';
import express from "express";
import dotenv  from "dotenv";
import cors from "cors"
import  productRoute from "./paymentRoutes.js";
const app = express();
const d = dotenv.config()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

dotenv.config();


app.use("/api/v1", productRoute)

app.get('/get/apiKey', ( req  , res )=>{
    res.status(200).json({
        success: true ,
        key: process.env.RAZORPAY_API_ID
    });
});

app.listen( process.env.PORT, ()=>{
    console.log(`server is running http://localhost:${process.env.PORT}`)
});