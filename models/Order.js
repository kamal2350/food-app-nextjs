import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    customer:{
        required:true,
        type:String,
        maxlength:60,
    },
    address:{
        required:true,
        type:String,
        maxlength:200,
    },
    total:{
        required:Number,
        type:String,
        
    },
    status:{
        type:Number,
        default:0,
        // required:true,
    },
    method:{
        type:Number,
        required:true
    }
   
})
export default mongoose.models.Order ||mongoose.model('Order',OrderSchema);