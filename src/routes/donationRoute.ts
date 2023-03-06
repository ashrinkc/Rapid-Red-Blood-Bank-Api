import { Router } from "express";
import { donationPayment, donationRequest, getAllDonationRequest, getDonationById } from "../controllers/donationController";

const donationRoute = Router()

donationRoute.post('/request',donationRequest)
donationRoute.get('/',getAllDonationRequest)
donationRoute.post('/payment',donationPayment)
donationRoute.get('/:id',getDonationById)
export default donationRoute