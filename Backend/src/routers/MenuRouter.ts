import express from 'express';
import { AddItem, DeleteItem, GetItems, UpdateItem } from '../controllers/MenuController';

export const MenuRouter = express.Router();


MenuRouter.post('/addItem',AddItem);
MenuRouter.put('/updateItem',UpdateItem);
MenuRouter.delete('/deleteItem/:id',DeleteItem);
MenuRouter.get('/get',GetItems);
