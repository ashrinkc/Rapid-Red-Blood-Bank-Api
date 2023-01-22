import { Router } from "express";
import { getAllOrganization, getPatientOrganization, organizationLogin, organizationRegister } from "../controllers/organizationController";

const organizationRoute = Router()

organizationRoute.post('/registerOrganization',organizationRegister)
organizationRoute.post('/loginOrganization',organizationLogin)
organizationRoute.get('/getAllOrganization/:id',getAllOrganization)
organizationRoute.get('/getAllOrganization',getPatientOrganization)
export default organizationRoute