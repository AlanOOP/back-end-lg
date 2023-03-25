import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
// import CreateAllFolder from './config/uploadFolder.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';

import usuarioRoutes from './routes/usuarioRoutes.js';
import authRouter from './routes/authRoutes.js';
import categoryRouter from './routes/categoriaRoutes.js';
import productRouter from './routes/productRoutes.js';
import orderRouter from './routes/ordersRoutes.js';
import customizeRouter from './routes/customizeRoutes.js';

import brainTreeRouter from './routes/braintreeRoute.js';

//Crear un Folder 

// CreateAllFolder();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
dotenv.config();
app.use(cors());

conectarDB();

//Routing
app.use("/api", authRouter);
app.use('/api/usuarios', usuarioRoutes);
app.use("/api/category", categoryRouter);
app.use("/api", brainTreeRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/customize", customizeRouter);





app.get('/', (req, res) => {
    res.json({msg : "hola"})
});

const PORT = process.env.PORT || 4000;


app.listen( PORT , () =>{
    console.log(`Servidor Corriendo en el puerto ${PORT}`);
})