import { Router } from "express";
import { donationPayment, donationRequest, getAllDonationRequest } from "../controllers/donationController";

const donationRoute = Router()

donationRoute.post('/request',donationRequest)
donationRoute.get('/',getAllDonationRequest)
donationRoute.post('/payment',donationPayment)
export default donationRoute