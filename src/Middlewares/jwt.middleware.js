import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
    // 1. Read the token
    // console.log(req.headers);
    const token = req.headers['authorization'];
    // console.log(token);

    // 2. If no token, return the error.
    if(!token){
        return res.status(401).send('Unauthorized');
    }

    // 3. check if token is valid
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log("jwt payload: ",payload);
        req.userID = payload.userID    // Used it in {cartItems.controller.js} $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        // req.msg = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    } catch(err){
        // 4. return error
        console.log("JWT ERROR: ",err);
        return res.status(401).send('Unauthorized')
    }

    // 5. call next middleware
    next();
}

export default jwtAuth;


// Middleware to authenticate JWT token
// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
    
//     if (token == null) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
    
//     jwt.verify(token, JWT_SECRET, (err, user) => {
//         if (err) {
//             return res.status(403).json({ message: 'Forbidden' });
//         }
//         req.user = user;
//         next();
//     });
// }