const mongoose=require('mongoose');

const schema=mongoose.Schema;

const promoSchema=new schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true
    },
    label:{
        type:String,
        default:""
    },
    featured:{
        type:Boolean,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const promotions=mongoose.model('promotion',promoSchema);
module.exports=promotions;