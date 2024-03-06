import mongoose from "mongoose";

// ********** only those properties can be save in mongodb which are defined in Schema *************
const commonTags = ["pizza"];
const productSchema = new mongoose.Schema({
    // id: { type: Number, required: true,},
    name: { type: String, required: true,},
    type: {
         type: String, 
        //  enum: ['Veg', 'Non-Veg'],
    },
    price: {
        size: {
            small: { type: Number, required: true },
            medium: { type: Number, required: true },
            large: { type: Number, required: true }
        }
        // size: { type: String, required: true },
        // amount: { type: Number, required: true }
    },
    tags: { 
        type: [ String ], 
        set: function(tags) {
            // Combine default tags with new ones provided
            const combinedTags = [...new Set([...commonTags, ...tags])];
            return combinedTags;
        }
    },
    // rating: { type: Number, required: true,},
    // stock: { type: Number, required: true,},
    // brand: { type: String, required: true,},
    image: { type: String, default: "https://cdn.dummyjson.com/recipe-images/1.webp" },
    // mfgDate: { type: Date, required: true,},
    dateCreated: { type: Date, default: Date.now }
}, { versionKey: false });

export const productModel = mongoose.model('Product', productSchema);