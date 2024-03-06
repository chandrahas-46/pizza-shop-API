// Import libraries
import './env.js';
import server from './server.js';
import { connectToDB } from './src/Config/mongooseConfig.js';

const PORT = process.env.PORT || 3000;
// 5. server listening
server.listen(PORT, (err) => {
    if(err) console.log("server error on port 3000");
    console.log(`Server is running at ${PORT}`);
    connectToDB();
})