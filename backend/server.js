import express from "express"
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js"
import cors from "cors"

import competenceRoutes from './routes/competence.routes.js';


dotenv.config()



const app = express();

const PORT = process.env.PORT 
app.use(express.json());

app.use(cors({
    orgine : "http://localhost:3002/"

}))


app.use('/api', competenceRoutes);



app.listen(PORT , ()=>{
    console.log(`server is running in PORT ${PORT}`)
    connectDB();
})