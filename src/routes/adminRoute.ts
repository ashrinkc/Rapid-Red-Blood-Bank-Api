import { Router } from "express";
import { adminLogin, adminRegister } from "../controllers/adminController";

const adminRoute = Router()

adminRoute.post('/login',adminLogin)
adminRoute.post('/register',adminRegister)

export default adminRoute