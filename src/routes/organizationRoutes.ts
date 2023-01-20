import { Router } from "express";
import { getAllOrganization, organizationLogin, organizationRegister } from "../controllers/organizationController";

const organizationRoute = Router()

organizationRoute.post('/registerOrganization',organizationRegister)
organizationRoute.post('/loginOrganization',organizationLogin)
organizationRoute.get('/getAllOrganization/:id',getAllOrganization)
export default organizationRoute