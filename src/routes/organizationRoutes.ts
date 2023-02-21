import { Router } from "express";
import { deleteOrganization, getAllOrganization, getPatientOrganization, organizationLogin, organizationRegister, updateOrganization } from "../controllers/organizationController";

const organizationRoute = Router()

organizationRoute.post('/registerOrganization',organizationRegister)
organizationRoute.post('/loginOrganization',organizationLogin)
organizationRoute.get('/getAllOrganization/:id',getAllOrganization)
organizationRoute.get('/getAllOrganization',getPatientOrganization)
organizationRoute.delete('/:id',deleteOrganization)
organizationRoute.put('/:id',updateOrganization)
export default organizationRoute