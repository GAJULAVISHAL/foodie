import express from 'express';
import { GetOrders, PlaceOrder } from '../controllers/OrderController';

export const OrderRouter = express.Router();

OrderRouter.post('/placeOrder', PlaceOrder);
OrderRouter.get('/getOrders/:mobileNumber',GetOrders)