import mongoose, { Schema } from "mongoose";

export const orderSchema = new Schema({
    shippingAddress: { type: String, required: true },
    // city: { type: String, required: true },
    // zip: { type: String, required: true },
    // country: { type: String, required: true },
    phone: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ['Progress', 'Shipped', 'Delivered', 'Canceled'],
        default: 'Progress'
    },
    totalPrice: { type: Number },
    payment_mode: { type: String, default: 'Cash' },
    
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    orderItems : [{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Order_items',
        // required: true,
    }],
    orderDate: { type: Date, default: Date.now }
}, { versionKey: false });

export const orderModel = mongoose.model('Order', orderSchema);