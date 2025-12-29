const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(401).json({message: "Missing or invalid Authorization header"});
    }

    const token = authHeader.split(" ")[1];
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded; // {id,role}
        next();

    }catch(error){
        return res.status(401).json({message: "Token is invalid or expired"})
    }
}