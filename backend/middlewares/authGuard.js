const user = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req,res,next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    //check if header has a token
    if(!token) return res.status(401).json({errs: ["Acesso negado!"]})

    //check if token is valid
    try {
        const verified = jwt.verify(token, jwtSecret);

        req.user = await User.findById(verified.id).select("-password");
        next();
    } catch (err) {
        res.status(401).json({errs: ["Token inválido!"]});
    }
};

module.exports = {authGuard};