import { productModel } from "./product.schema.js";
import { pizzasData } from "../Assets/data.js";

export default class ProductExternalDataController {
    // Fetch data from the external API and Save top 10 items to MongoDB
    async fetchAndSaveToMongoDB(req, res) {
        try {
            const data = pizzasData;
            // await fetch('https://dummyjson.com/products')
            // .then((response) => response.json())
            // .then((data) => {
            //     return data.products;
            // })
            // .catch((err) => {
            //     console.log("Error fetching data: ", err);
            // })
            // const data = response.data;
            const top10 = data.slice(0, 3); // Assuming data is an array

            // Save each item to MongoDB
            const requiredData = [];
            for (const item of top10) {
                const { id, name, type, price, img } = item;
                const tempData = await productModel.create({
                    id,
                    name,
                    type,
                    price,
                    image: img,
                });
                requiredData.push(tempData);
            }

            return res.status(200).send({ message: "Pizzas saved successfully", Product: requiredData });
            // console.log('Top 10 items saved to MongoDB');
        } 
        catch(err) {
            // console.log("Error saving to MongoDB: ", err);
            return res.status(500).send("Something went wrong to fetching data from external");
        }
    }
    // Trigger the data fetching and saving
    // fetchAndSaveToMongoDB();
}