const jwt = require('jsonwebtoken')
require("dotenv").config();
const directoryModel = require("../api/directory/directory.service")

const auth = async (req, res, next) =>{
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(!token){
            return res.status(401).json({
                succeeded: false,
                error: 'no token available'
            });
        }
        req.user = await directoryModel.getUsers(jwt.verify(token, process.env.SECRET_TOKEN).userId);

        
        next();
    } catch (error) {
        res.status(401).json({
            succeeded: false,
            error: "not authorized"
        })
    }

}

module.exports = auth

