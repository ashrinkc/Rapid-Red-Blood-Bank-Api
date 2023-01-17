import { Router } from "express";
import { donorLogin, donorRegister } from "../controllers/donorController";

const donorRoute = Router()

donorRoute.post('/registerDonor',donorRegister)
donorRoute.post('/loginDonor',donorLogin)
export default donorRoute