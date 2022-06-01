import dbConnect from "../../../lib/mongo";
import Product from "../../../models/Product";

export default async function handler (req,res){
    dbConnect();
    const {method, query:{id}}= req;
    switch (method) {
        case 'GET':
            try {
                const product = await Product.findById(id);
                res.status(200).json(product);    
            } catch (error) {
                res.status(403).json("not found");
            }
            
            break;
        case 'DELETE':
            try{
                 await Product.findOneAndDelete(id);
                res.status(200).json("deleted successfully");
            }catch(err)
            {
                res.status(500).json("not deleted");
            }


            break;
    
        default:
            break;
    }
}