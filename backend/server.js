import express from "express";
import connectDB from './configurations/db.js'
import cookieParser from 'cookie-parser';
import userRouters from './routes/userRoutes.js'
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.get('/', (req, res) => {
    res.send("API is Running")
});

app.use(express.json());
app.use(express.urlencoded( { extended: true} ));

app.use(cookieParser());

app.use('/users', userRouters);

app.listen(port, () => console.log(`server running on port ${port}`));