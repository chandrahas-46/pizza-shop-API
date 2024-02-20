import { productModel } from "./product.schema.js";

let id = 101;
export default class ProductController {
    async addProduct(req, res) {
        try{
            const { name, type, price, img } = req.body;
            let product = await productModel.create({id, name, type, price, image: img});
            id++;
            return res.status(201).send({ message: "Product Created successfully", Product: product });
        }
        catch(err) {
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }

    async getAllProducts(req, res) {
        try{
            let products = await productModel.find();
            // console.log("getAllProducts: ", products);
            if (products) {
                return res.status(200).send({
                  message: "Here, You can find all your Products!",
                  products: products,
                });
            } 
            else {
                return res.status(400).send({ message: "Not Found any product, You can add new Survey!!"});
            }
        }
        catch(err) {
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }

    async getOneProducts(req, res) {
        try{
            const productId = req.params._id;
            let product = await productModel.findById(productId);
            if (product) {
                return res.status(200).send({
                  message: "Here, You can find your Products!",
                  product: product,
                });
            } 
            else {
                return res.status(400).send({ message: "Product not found, Please search other product!!"});
            }
        }
        catch(err) {
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }

    async updateProduct(req, res) {
        try{
            const productId = req.params._id;
            const filter = { _id: productId };
            const update = req.body;
            let product = await productModel.findByIdAndUpdate(filter, update);
            return res.status(201).send({ message: "Product Updated successfully", Product: product });
        }
        catch(err) {
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }

    async deleteProduct(req, res) {
        try{
            const productId = req.params._id;
            let product = await productModel.findByIdAndDelete(productId);
            return res.status(201).send({ message: "Product Deleted successfully", Product: product });
        }
        catch(err) {
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }

}