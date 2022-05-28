const mongoose=require('mongoose');
const schema=mongoose.Schema;
const user=new schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const User=mongoose.model('User',user);
module.exports=User;