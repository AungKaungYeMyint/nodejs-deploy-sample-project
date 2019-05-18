const express = require('express');

const route = express.Router();

const sql = require('../utilities/mysql');

const fruitModel = require('../models/fruits');

const Joi = require('@hapi/joi');

route.get('/', (req, res) => {
    sql.query("Select * from fruits", (err, data) => {
        if (err) {
            console.log(err);
            res.send("Error");
        }
        else {
            console.log(data);
            res.render('fruit/index', { data: data });
        }
    });

});

route.post('/', (req, res) => {
    console.log(req.body);
    const name = req.body.fruit;
    const stock = req.body.stock;
    const newFruit = {
        name,
        stock
    }
    sql.query(
        "insert into fruits set ?",
        newFruit,
        (err, data) => {
            if (err) {
                console.log(err);
                res.send("There is an error");
            }
            else {
                console.log(data);
                res.redirect('/fruits');
            }
        })
})

route.get('/:id/delete', (req, res) => {

    fruitModel.getFruitById(req.params.id)
        .then(data => {
            console.log(data);
            res.render('fruit/delete', { data: data });
        })
        .catch(err => {
            console.log(err);
            res.send("Unexcepted error occured");
        });
})

route.post('/:id/delete', (req, res) => {
    fruitModel.deleteById(req.params.id)
        .then(data => {
            console.log("Delete result", data);
            res.redirect('/fruits');
        })
        .catch(error => {
            console.log(error);
            res.send("Unexcepted error occured");
        })

});

route.get('/:id/update', (req, res) => {
    fruitModel.getFruitById(req.params.id)
        .then(data => {
            res.render('fruit/update', { data: data });
        })
        .catch(err => {
            console.log(err);
            res.send("Unexcepted error occured");
        })
})


route.post('/:id/update', (req, res) => {

    const schema = Joi.object().keys({
        fruit: Joi.string().required(),
        stock: Joi.number().required()
    })

    Joi.validate(req.body, schema, (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error");
        }
        else {
            fruitModel.updateById(req.params.id, {
                name: req.body.fruit,
                stock: req.body.stock
            })
                .then(data => {
                    console.log(data);
                    res.redirect("/fruits");
                })
                .catch(err => {
                    console.log(err);
                    res.send("Unexcepted error occured");
                })
        }
    })

})

module.exports = route;