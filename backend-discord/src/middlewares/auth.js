const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const {InternalServerError, JWTError} = require("../utils/Errors");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) return next(new JWTError());
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        if (userId) {
            let result = await User.exists({_id: userId})
            if (result) req.auth = {userId: userId};
            else return next(new JWTError());
        } else return next(new JWTError());
        next();
    } catch (error) {
        return next(new InternalServerError());
    }
}

module.exports = auth;
