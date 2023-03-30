import { Router } from "express";
import {
  adminLogin,
  adminRegister,
  updateAdmin,
} from "../controllers/adminController";

const adminRoute = Router();

adminRoute.post("/login", adminLogin);
adminRoute.post("/register", adminRegister);
adminRoute.put("/:id", updateAdmin);
export default adminRoute;
