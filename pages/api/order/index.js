import dbConnect from '../../../utils/mongoDb';
import Order from '../../../models/Order';

export default async function handler (req, res) {

    const {method} = req  

    dbConnect();

    if (method === "GET") {
      try{
        const order = await Order.find();
        res.status(200).json(order)
      }catch(err){
        res.status(500).json(err)
      }
    }

    if (method === "POST") {
        try{
            const order = await Order.create(req.body);
            res.status(201).json(order)
        }catch(err){
            res.status(500).json(err)
        }
    }

}

