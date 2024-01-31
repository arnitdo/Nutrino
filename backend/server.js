import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import auth from "./routes/auth.js"

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

connectDB()

app.use('/api/auth', auth);
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})


