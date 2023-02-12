import { Router } from "express";
import { donationRequest } from "../controllers/donationController";

const donationnRoute = Router()

donationnRoute.post('/request',donationRequest)

export default donationnRoute