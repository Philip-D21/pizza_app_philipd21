const orderModel = require("../model/orderModel");

const createOrder = async (req, res) => {
    const body = req.body;
try{
    const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price
        return prev
    }, 0);

    const order = await orderModel.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })
    
    return res.json({ status: true, order })
}catch(err){
    console.log(err)
}
}
const getSingleOrder = async (req, res) => {
    const { orderId } = req.params;
try{
    const order = await orderModel.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
} catch(err){
    console.log(err)
}
}
const getOrders =  async (req, res) => {
    try{
    const orders = await orderModel.find()

    return res.json({ status: true, orders })
} catch(err){
    console.log(err)
}

}

const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;

    const order = await orderModel.findById(id)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    if (state < order.state) {
        return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
    }

    order.state = state;

    await order.save()

    return res.json({ status: true, order })
}

const deleteOrder = async (req, res) => {
    try{
    const { id } = req.params;

    const order = await orderModel.deleteOne({ _id: id})

   res.json({ status: true, order })
} catch(er){
    console.log(err)
}
}


module.exports = {
    createOrder,
    getSingleOrder,
    getOrders,
    updateOrder,
    deleteOrder,
}