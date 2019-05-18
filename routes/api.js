const express = require('express');

const route = express.Router();
const jwt = require('jsonwebtoken');
const key = require('../utilities/key');
const departmentsRoute = require('./apiRoute/department');
const UserModel = require('../models/user');

route.use('/departments',departmentsRoute);

route.post('/signin',(req,res) => {
    console.log(req.body);
    const user = new UserModel();
    const currentUser = user.signIn(req.body.username,req.body.password);
    console.log(currentUser);
    if(currentUser){
        const token = jwt.sign({data:currentUser},key);
        res.status(200).send(token);
    }
    res.status(403).send("Access Denied");
    res.send("Login");
})

module.exports = route;

