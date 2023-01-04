import express from "express";
import {checkout, paymentVerification} from "./paymentController.js"
const router = express.Router();


router.route("/checkout").post(checkout)
router.route("/paymentverfication").post(paymentVerification)

export default router;