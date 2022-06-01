import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String,
        maxlength:60,
    },
    description:{
        required:true,
        type:String,
        maxlength:200,
    },
    image:{
        required:true,
        type:String,
        
    },
    price:{
        type:[Number],
        required:true,
    },
    extraOption:{
        type:[
            {
                text:{type:String, required:true},
                price:{type:Number, required:true},
            }
        ]
    },
   
},
    {timestamps:true}
);
export default mongoose.models.Product ||mongoose.model('Product',ProductSchema);