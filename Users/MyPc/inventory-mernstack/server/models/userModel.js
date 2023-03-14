const mongoose=require("mongoose");
const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    state:{
        type:String,
    },
   country:{
type:String,
    }
  
},
{
    timestamps:true
}
);
module.exports=mongoose.model("users",UserSchema)