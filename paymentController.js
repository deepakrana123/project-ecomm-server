import Razorpay from  'razorpay';
import crypto from 'crypto';
import dotenv  from "dotenv";

dotenv.config()

console.log(process.env.RAZORPAY_API_ID , process.env.PORT)
var instance = new Razorpay({ key_id: process.env.RAZORPAY_API_ID, key_secret: process.env.RAZORPAY_API_SECRET_KEY })

  export const checkout = async (req, res )=>{
    const amount= Number(req.body.totalPrice*100);
    var options = {
        amount: amount,  // amount in the smallest currency unit
        currency: "INR",
      };
    const order= await  instance.orders.create(options);
      res.status(201).json({success: true , order });

  };

    export const paymentVerification = async (req, res) => {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
    
      const body = razorpay_order_id + "|" + razorpay_payment_id;
    
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_API_SECRET_KEY)
        .update(body.toString())
        .digest("hex");
    
      const isAuthentic = expectedSignature === razorpay_signature;
    
      if (isAuthentic) {
        // Database comes here
    
        // await Payment.create({
        //   razorpay_order_id,
        //   razorpay_payment_id,
        //   razorpay_signature,
        // });
    
        res.redirect(
          `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
        );
      } else {
        res.status(400).json({
          success: false,
        });
      }
     res.status(200).json({success: true})
  };