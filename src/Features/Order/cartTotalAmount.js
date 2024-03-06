import mongoose from "mongoose";
import { cartModel } from "../Cart/cart.schema.js";
// import { productModel } from "../Products/product.schema.js";

export async function getUserCartItems(userID, session) {
    try {
        // 1. Get cart items for the current user and populate with product information.
        const userCartItems = await cartModel.aggregate([
            {
                $match: { userID: new mongoose.Types.ObjectId(userID) }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productID",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            {
                $unwind: "$productInfo"
            },
            {
                $addFields: {
                    totalAmount: {
                        $switch: {
                            branches: [
                                {
                                    case: { $eq: ["$size", "small"] },
                                    then: { $multiply: ["$productInfo.price.size.small", "$quantity"] }
                                },
                                {
                                    case: { $eq: ["$size", "medium"] },
                                    then: { $multiply: ["$productInfo.price.size.medium", "$quantity"] }
                                },
                                {
                                    case: { $eq: ["$size", "large"] },
                                    then: { $multiply: ["$productInfo.price.size.large", "$quantity"] }
                                }
                            ],
                            default: 0 // Default value if size is not small, medium, or large
                        }
                    }
                }
            },
            // {
            //     $addFields: {
            //         totalAmount: {
            //             // $multiply: ["$productInfo.price.size.small", "$quantity"]
            //             $multiply: [
            //                 `$productInfo.price.size.${'$size'}`, // Dynamically access the size value
            //                 "$quantity"
            //             ]
            //         }
            //     }
            // },
            {
                $project: {
                    _id: 0,
                    productID: 1,
                    "productInfo.name": 1,
                    "productInfo.price": 1,
                    size: 1,
                    quantity: 1,
                    totalAmount: 1
                }
            }
        ]).session(session);

        return userCartItems;
    } 
    catch (error) {
        console.error('Error in getUserCartItems', error);
        throw new Error('Error in getUserCartItems');
    }
}
        
// ******************** [ 2nd Method ] ********************

// export async function getUserCartItems(userID, session) {
//     try {
//         // 1. Get cart items for the current user and populate with product information.
//         const userCartData = await cartModel
//             .find({ userID: userID })
//             .populate('productID')
//             .exec();

//         // 2. Calculate totalAmount for each cart item.
//         const userCartItems = userCartData.map(cartItem => {
//             // Retrieve product details
//             const { price } = cartItem.productID;
//             const { size, quantity } = cartItem;

//             // Calculate total amount based on price and quantity
//             let totalAmount = 0;
//             switch (size) {
//                 case 'small':
//                     totalAmount = price.size.small * quantity;
//                     break;
//                 case 'medium':
//                     totalAmount = price.size.medium * quantity;
//                     break;
//                 case 'large':
//                     totalAmount = price.size.large * quantity;
//                     break;
//                 default:
//                     totalAmount = 0;
//             }

//             // Add totalAmount to cartItem
//             // cartItem.totalAmount = totalAmount;
//             return {
//                 ...cartItem.toObject(),
//                 totalAmount: totalAmount
//             };
//         }).session(session);

//         return userCartItems;
//     } 
//     catch (error) {
//         console.error('Error in getUserCartItems', error);
//         throw new Error('Error in getUserCartItems');
//     }
// }
