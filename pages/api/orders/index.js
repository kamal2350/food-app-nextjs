import axios from 'axios';
import dbConnect from '../../../lib/mongo';
import Order from '../../../models/Order';

const handler = async(req,res)=>{
const {method} = req;
await dbConnect()
switch (method) {
    case 'GET':
        try {
          const orders = await Order.find();
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json(error);
        }

        break;
    case 'POST':
        try {
            const order = await Order.create(req.body);
            console.log(order);
            res.status(201).json(order);
        } catch (error) {
        
            res.status(500).json(error);
        }

        break;
    
    default:
        break;
}


}
export default handler;