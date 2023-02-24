import { Router } from "express";
import { deleteDonor, donorLogin, donorRegister, getAllDonor, patientDonor, updateDonor } from "../controllers/donorController";

const donorRoute = Router()

donorRoute.post('/registerDonor',donorRegister)
donorRoute.post('/loginDonor',donorLogin)
donorRoute.get('/getAllDonor',getAllDonor)
donorRoute.get('/getPatientDonor/:id',patientDonor)
donorRoute.delete('/:id',deleteDonor)
donorRoute.put('/:id',updateDonor)
export default donorRoute