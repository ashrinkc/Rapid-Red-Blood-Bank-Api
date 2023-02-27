import { Router } from "express";
import { addToInventory, createInventory, getInventory } from "../controllers/inventoryController";

const inventoryRoute = Router()

inventoryRoute.post('/:id',createInventory)
inventoryRoute.get('/:id',getInventory)
inventoryRoute.post('/addToInventory/:id',addToInventory)
export default inventoryRoute