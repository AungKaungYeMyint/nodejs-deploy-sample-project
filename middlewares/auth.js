const jwt = require('jsonwebtoken');
const key = require('../utilities/key');

module.exports = (req,res,next) =>{
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    jwt.verify(token,key,(err,payload) => {
        if(err){
            res.status(400).send("Token Invalid");
        }else{
            next();
        }
    })
}