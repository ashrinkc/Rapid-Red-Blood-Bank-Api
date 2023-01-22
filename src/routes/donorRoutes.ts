import { Router } from "express";
import { donorLogin, donorRegister, getAllDonor } from "../controllers/donorController";

const donorRoute = Router()

donorRoute.post('/registerDonor',donorRegister)
donorRoute.post('/loginDonor',donorLogin)
donorRoute.get('/getAllDonor',getAllDonor)
export default donorRoute