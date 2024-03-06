import mongoose from "mongoose";

// ********** only those properties can be save in mongodb which are defined in Schema *************
const userSchema = new mongoose.Schema({
    // id: { type: Number, required: true,},
    name: { type: String, required: true,},
    email: {type: String, unique: true, required: true,},
    password: { type: String },
    type: {type: String, enum: ['Customer', 'Seller'], default: 'Customer'},
    dateCreated: { type: Date, default: Date.now }
}, { versionKey: false });

export const userModel = mongoose.model('User', userSchema);
