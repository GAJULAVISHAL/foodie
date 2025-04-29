import express from 'express';
import cors from 'cors';
import { MenuRouter } from './routers/MenuRouter';
import { OrderRouter } from './routers/OrderRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/menu', MenuRouter);
app.use('/api/v1/order', OrderRouter);

app.listen(process.env.PORT || 4010, () => {
    console.log('Server is running on port 3000');
});
