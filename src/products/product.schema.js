import mongoose from "mongoose";

// ********** only those properties can be save in mongodb which are defined in Schema *************
const productSchema = new mongoose.Schema({
    id: { type: Number, required: true,},
    name: { type: String, required: true,},
    type: { type: String, },
    price: {
        size: {
            small: { type: Number, required: true },
            medium: { type: Number, required: true },
            large: { type: Number, required: true }
        }
        // size: { type: String, required: true },
        // amount: { type: Number, required: true }
    },
    // rating: { type: Number, required: true,},
    // stock: { type: Number, required: true,},
    // brand: { type: String, required: true,},
    image: { type: String, },
    // mfgDate: { type: Date, required: true,},
}, { versionKey: false });

export const productModel = mongoose.model('products', productSchema);