import { Router } from "express";
import { addToInventory, createInventory, getBloodBankData, getInventory, removeFromInventory } from "../controllers/inventoryController";

const inventoryRoute = Router()

inventoryRoute.post('/:id',createInventory)
inventoryRoute.get('/:id',getInventory)
inventoryRoute.post('/addToInventory/:id',addToInventory)
inventoryRoute.post('/removeFromInventory/:id',removeFromInventory)
inventoryRoute.get('/data/:id',getBloodBankData)
export default inventoryRoute