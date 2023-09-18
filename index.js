import express from 'express'
import mongoose, { mongo } from 'mongoose'
import cors from 'cors'
import useRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import bodyParser from 'body-parser'                         
import answerRoutes from "./routes/Answers.js";
import dotenv from "dotenv";
import plans from "./models/plan.js";
import Questions from './models/Questions.js';
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
app.patch("/planupdate",async(req, res) => {
  const plan = req.body;
  const userId = req.userId;
  const email = req.body.email;

      
 
  



 const postQuestion = new plans({ ...plan, userId });
  try {
    const existinguser = await plans.findOne({ email });
    if (existinguser) {
      plans.deleteOne({ email : email });
      res.status(200).json("Deleted successfully");
    }
    else{
    await postQuestion.save();
    res.status(200).json("Posted a question successfully");
    }
  } catch (error) {
    console.log(error);
    res.status(409).json("Couldn't post a new question");
  }












  console.log(req.body.plan);
console.log(req.body);
           const updatedocu= (id)=>{




/* users.findByIdAndUpdate(id, { plan: plan.plan },
            function (err, docs) {
if (err){
console.log(err)
}
else{
console.log("Updated User : ", docs);
}
});

   /*    const result=await users.updateOne({id : id},{
        $set:{
          plan : req.body.plan
        }
       });
       console.log(result);*/
           }

           updatedocu(userId);
})

app.post('/getplan',async(req, res) =>{

//  const plan = req.body;
  const userId = req.body.userId;
  const email = req.body.email;
  const name = req.body.name;
  const existinguser = await plans.findOne({email});
  
  

  //console.log(req.body)

  const countsquestions = await Questions.find({userPosted : name});

   const val = countsquestions;


  res.status(200).json({ plan: existinguser , counts : countsquestions , id:userId});




})




const PORT= 5000

const CONNECTION_URL="mongodb+srv://khushiagarwal270203:admin123@cluster0.zi1j8g1.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => app.listen(PORT,()=>{console.log(`server running on ${ PORT}`)}))
.catch((err)=> console.log(err.message))
