import { Switch } from "@mui/material";
import dbConnect from "../../../lib/mongo";
import Order from '../../../models/Order';
const handler = async(req,res)=>{
    const {method,query:{id}}=req;
    dbConnect();
  
    switch (method) {
        case 'GET':
            try {
                const order = await Order.findById(id);
                res.status(200).json(order);
            } catch (error) {
                res.status(500).json(error);
            }
     
            break;
        case 'PUT':
                try {
                    const order= await Order.findByIdAndUpdate(id,req.body,{
                        new:true,
                    }); 
                    res.status(200).json(order);
                } catch (error) {
                    res.status(500).json(err);
                }
        break;
         
        case 'DELETE':
            try {
                await Order.findByIdAndDelete(id);
                res.status(200).json('deleted succesfully');
                
            } catch (error) {
                res.status(500).json(error);
            }
     
        default:
            break;
    }
            
                
        
}
export default handler;