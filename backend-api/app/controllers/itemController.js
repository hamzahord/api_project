
const db = require("../models");

const Item = db.item;

const Op = db.Sequelize.Op;




// Create and Save a new Item

exports.create = (req, res) => {

    // Validate request

    if (!req.body.name) {

        res.status(400).send({

            message: "Content can not be empty!"

        });

        return;

    }

    // Create an Item

    const item = {

        name: req.body.name,

        price: req.body.price,

        account: req.body.account,

        rating: req.body.rating,

        description : req.body.description

    };

    // Save Item in the database

    Item.create(item)

        .then(data => {

            res.send(data);

        })

        .catch(err => {

            res.status(500).send({

                message:

                    err.message || "Some error occurred while creating the Item."

            });

        });

}

// Retrieve all Items from the database.

exports.findAll = (req, res) => {

    const name = req.query.name;

    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;



    Item.findAll({ where: condition })

        .then(data => {

            res.send(data);

        })

        .catch(err => {

            res.status(500).send({

                message:

                    err.message || "Some error occurred while retrieving tutorials."

            });

        });

};




exports.findOne = (req, res) => {

    if (!req.body.id) {

        res.status(400).send({

            message: "you must give the item's name"

        });

        return;

    }

    Item.findOne({

        where: {

            id: req.body.id

        }

    }).then(item => {

        if (!item) {

            return res.status(404).send({ message: "Item Not found." });

        }

        res.status(200).send({

            id: item.id,

            name: item.name,

            price: item.price,

            account: item.account,

            rating: item.rating,

            description : item.description

        })

    });

}





