import mongoose from "mongoose";

const url = process.env.DB_URL;
// export const connectToDB = async()=>{
// 	try{
// 		await mongoose.connect(url);
// 		console.log("Mongodb connected using mongoose successfully!")
// 	}
// 	catch(err){
// 		console.log("Error while connecting to db");
// 		console.log(err);
// 	}
// }


export const connectToDB = async()=>{
	try{
		await mongoose.connect(url, {
			useNewUrlParser: true,
      		useUnifiedTopology: true
		});
		console.log("Mongodb connected using mongoose successfully!")
	}
	catch(err){
		console.log("Error while connecting to db");
		console.log(err);
	}
}