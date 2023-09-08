import express from 'express'
import mongoose, { mongo } from 'mongoose'
import cors from 'cors'
import useRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import bodyParser from 'body-parser'
import answerRoutes from "./routes/Answers.js";
import dotenv from "dotenv";
dotenv.config();

const app= express();
app.use(express.json( {limit:"30mb", extended:"true"}))
app.use(express.urlencoded({ limit:"30mb", extended:"true"}))
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());






app.get('/',(req,res)=>{
  res.send("this is an stackoverflow clone")
})
app.use("/user",useRoutes)
app.use("/questions",questionRoutes)
app.use("/answer", answerRoutes);


const PORT= 5000

const CONNECTION_URL="mongodb+srv://khushiagarwal270203:admin123@cluster0.zi1j8g1.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => app.listen(PORT,()=>{console.log(`server running on ${ PORT}`)}))
.catch((err)=> console.log(err.message))