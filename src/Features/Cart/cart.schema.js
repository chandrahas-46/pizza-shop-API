import mongoose, { Schema } from "mongoose";

export const cartSchema = new Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    size: { 
        type: String, 
        required: true,
        enum: ['small', 'medium', 'large' ],
        default: 'small'
    },
    quantity: {type: Number, default: 1},
    cartDate: { type: Date, default: Date.now }
}, { versionKey: false });

export const cartModel = mongoose.model('Cart', cartSchema);