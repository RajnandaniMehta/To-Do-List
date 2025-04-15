import mongoose from "mongoose";
const user=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tasks:[String]
});

const Users=mongoose.model("User",user);
export default Users;