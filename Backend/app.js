import express from "express";
import mongoose from "mongoose";
import path from "path";
import Users from "./models/user.js"
import { fileURLToPath } from "url";

const app=express();
const MONGO_URL="mongodb://127.0.0.1:27017";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../Frontend")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

main().then(()=>{
    console.log("Connected to DB");
}).catch((err) =>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL,{
        dbName:"To-Do-List"
    }).then( ()=> {
        console.log("Connected to database");
    }).catch(err => {
        console.log(`Some err occured ${err}`);
    });
}

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "../Frontend", "index.html"));
});
app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname, "../Frontend", "login.html"));
});
app.post("/login",async (req,res,next)=>{
    let {email,password}=req.body;
    // console.log(req.body);
    const findUser=await Users.findOne({email,password});
    if(findUser){
       return res.status(200).json({
        success:true,
        message:"Login successfully",
        redirect:`http://localhost:9000/home/${findUser._id}`
       });
    }else{
        return res.status(400).json({
            success:false,
            message:"You have not registered yet."
        });
    }  
});

app.get("/register",(req,res)=>{
    res.sendFile(path.join(__dirname, "../Frontend", "register.html"));
});
app.post("/register",async (req,res,next)=>{
    let {username,email,password}=req.body;
    // console.log(username,email,password);
   if(!username || !email || !password){
   return next(res.status(400).json({
        success:false,
        message:"Please fill the required details"
    }));
   }
   const isUser=await Users.findOne({email});
   if(isUser){
    return  next(res.status(400).json({
        success:false,
        message:"User already exist"
    }));
   }
   const user=await Users.create({username,email,password});
   res.json({
    success: true,
    message: "User registered successfully",
    redirect: "http://localhost:9000/login"
});
});

app.get("/home/:id",async (req,res)=>{
    res.sendFile(path.join(__dirname, "../Frontend", "home.html"));
});
app.get("/home/user/:id", async (req, res) => {
    try {
      const user = await Users.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  app.post("/home/users/:id", async (req, res) => {
    const { task } = req.body;
    const { id } = req.params;
    const user=await Users.findByIdAndUpdate(id, {
      $push: { tasks: task }
    });
    res.json({ success: true, message: "Task added!",user});
  });

app.get("/tasks/:id/:edit",async (req,res)=>{
let {id,editIdx}=req.params;
try{
    const user=await Users.findById(id);
    console.log(user);
    if(user){
        return res.json({ success: true, message: "Task added!",user});
    }
}catch(err){
    return res.status(404).json({ success: false, message: "User not found" });
}

});
app.post("/tasks/:id/:edit",async (req,res)=>{
    let {id,editIdx}=req.params;
    try{
        const user=await Users.findByIdAndUpdate(id,{tasks:task});
        console.log(user);
        if(user){
            return res.json({ success: true, message: "Task added!",user});
        }
    }catch(err){
        return res.status(404).json({ success: false, message: "User not found" });
    }
    
    });
app.listen(9000,()=>{
    console.log("Server is running");
});

