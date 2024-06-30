import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler} from './middleware/errorMiddleware.js';
const port = process.env.PORT || 5000;
connectDB();
const app = express();


//Body parser middleware  (This middleware order of placement in code is important if something is above it that route will not be able to parse body)
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
//Custom Middlewares
//app.use(notFound);



//Routing Endpoints
app.use('/api/products/',productRoutes);
app.use('/api/users/',userRoutes);
app.use('/api/orders/',orderRoutes);

app.get('/api/config/paypal',(req,res)=>{
    res.send({clientId: process.env.PAYPAL_CLIENT_ID})
})

app.use(errorHandler);

app.listen(port, (req,res)=>{
    console.log(`Server is running on Port: ${port}`);
});