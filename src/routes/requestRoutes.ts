import { Router } from "express";
import { bloodRequests, getDonationRequests } from "../controllers/requestController";

const requestRoute = Router()

requestRoute.post('/addRequest/:id',bloodRequests)
requestRoute.get('/getRequest/:id',getDonationRequests)

export default requestRoute