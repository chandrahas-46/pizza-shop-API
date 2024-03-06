import { productModel } from "./product.schema.js";
// import { userModel } from "../Users/user.schema.js";

// let id = 101;
export default class ProductController {
    async addProduct(req, res) {
        // const userID = req.userID;
        // console.log("Product_USER: ", userID);
        try{
            const { name, type, price, tags, image } = req.body;
            if(!name || !price) {
                res.status(400).send({
                    success: false,
                    message: 'Fill all the required fields'
                });
            }
            let product = await productModel.create({ name, type, price, tags, image: image });
            // id++;
            res.status(201).send({
                success: true,
                message: 'Product created successfully',
                Product: product 
            });
            // let user = await userModel.findById(userID);
            // if(user.type == "Seller") {
            //     const { name, type, price, tags, image } = req.body;
            //     let product = await productModel.create({ name, type, price, tags, image: image });
            //     // id++;
            //     res.status(201).send({
            //         success: true,
            //         message: 'Product created successfully',
            //         Product: product 
            //     });
            // }
            // else {
            //     res.status(400).send({ 
            //         success: false, 
            //         message: "Login with *Seller* account, Pizza can not be created by everyone!!"
            //     });
            // }
        }
        catch(err){
            console.log("Error while creating pizza:", err);
            return res.status(500).send({
                success: false,
                message: "Error while creating pizza"
            });
        }
    }

    async getAllProducts(req, res) {
        try{
            let products = await productModel.find();
            // console.log("getAllProducts: ", products);
            if (products) {
                res.status(200).send({
                    success: true,
                    message: "Here, You can find all your Products!",
                    products: products,
                });
            } 
            else {
                return res.status(400).send({ success: false, message: "Not Found any product, You can add new Product!!"});
            }
        }
        catch(err){
            console.log('Error while Fetching all pizza:', err);
            return res.status(500).send({
                success: false,
                message: 'Error while Fetching all pizza'
            });
        }
    }

    async getOneProducts(req, res) {
        try{
            const productId = req.params._id;
            // console.log("****",typeof(productId));   //string
            let product = await productModel.findById(productId);
            if (product) {
                return res.status(200).send({
                    success: true,
                    message: "Here, You can find your Product by ID!",
                    product: product,
                });
            } 
            else {
                return res.status(400).send({ success: false, message: "Product not found, Please search other product!!"});
            }
        }
        catch(err){
            console.log('Error while Get pizza by ID:', err);
            return res.status(500).send({
                success: false,
                message: 'Error while Get pizza by ID'
            });
        }
    }

    async updateProduct(req, res) {
        try{
            const productId = req.params._id;
            const filter = { _id: productId };
            const update = req.body;
            let product = await productModel.findByIdAndUpdate(filter, update);
            return res.status(200).send({ success: true, message: "Product Updated successfully", Product: product });
        }
        catch(err){
            console.log('Error while updating pizza:', err);
            return res.status(500).send({
                success: false,
                message: 'Error while updating pizza'
            });
        }
    }

    async deleteProduct(req, res) {
        try{
            const productId = req.params._id;
            const product = await productModel.findByIdAndDelete(productId);
            return res.status(200).send({ success: true, message: "Product Deleted successfully" });
        }
        catch(err){
            console.log('Error while deleting pizza:', err);
            return res.status(500).send({
                success: false,
                message: 'Error while deletong pizza'
            });
        }
    }

}