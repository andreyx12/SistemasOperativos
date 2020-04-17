

const express = require('express')
const router = new express.Router()
const Product = require('../models/product')
const Comment = require('../models/comment')
const multer = require('multer');
var fs = require('fs');
var timeutils = require('../utils/timeutils');
const path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/uploads/images')
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, file.fieldname + '-' + Date.now() + "." + extension)
    }
})

var upload = multer({ storage: storage })

/* Endpoints */
router.get('/main', async (req, res) => {

    try {
        await Product.find({
            "expirationDate": {
                "$gte": timeutils.convertLocalDateToUTCDate(new Date())
            }
        })
        .lean()
        .then(model => {
            res.render('modules/home/index',{
                datasource: model
            });
        })
    } catch (e) {
        res.status(500).send()
    }
});

/* Endpoints */
router.get('/product', async (req, res) => {

    try {
        var totalProducts;
        await Product.count({}, function( err, count){
            totalProducts = count;
        })

        await Product.find({
            "expirationDate": {
                "$gte": timeutils.convertLocalDateToUTCDate(new Date())
            }
        })
        .lean()
        .then(model => {
            res.send({
                productList : model,
                productCount: totalProducts
            });
        })
    } catch (e) {
        res.status(500).send()
    }
});

router.post('/product/create', upload.single('imageFile'), async (req, res) => {

    console.log(req.body)
    const product = new Product({
        name: req.body.name, 
        description: req.body.description,
        expirationDate: new Date(req.body.expirationDate),
        status: true,
        imagePath: req.file.filename,
        views: 0,
        amount: parseFloat(req.body.amount)
    })
    product.save(function (err) {
        if (err) {
            console.log(err)
            /*  Se elimina imagen de bd */
            // fs.unlinkSync(req.file.filePath);
            res.render('modules/home/create',{
                errorMessage: err.message
            });
        } else {

            var io = req.app.get('socketio')
            io.broadcast.emit("connectedUsers", product);

            res.render('modules/home/create', {
                product: product.toJSON()
            });
        }
    })
});

router.post('/product/create/comment', async (req, res) => {

    const comment = new Comment({
        username: "user",
        comment: req.body.comment,
        createdDate: new Date(),
        productId: req.body.id
    })
    comment.save(function (err) {
        if (err) {
            console.log(err)
        } else {
            res.send({
                comment : comment.toJSON()
            });
        }
    })
});

router.get("/product/:id/comments", async (req, res) => {
    Comment.find({productId: req.params.id}, function(err, comments) {
        if (err) {
             console.log(err)
        } else {
            res.send(comments)
        }
    });
});

router.put('/product/update', async (req, res) => {

    Product.findOneAndUpdate({_id: req.body.id},{$inc : {'views' : 1}}, { new: true },function (err, response) {
        if (err) {
            console.log(err)
        } else {
            res.send({
                updatedDocument : response,
            });
        }
    })
});

router.get('/product/edit', (req, res) => {
    res.render('socket');
})

router.get('/product/delete', (req, res) => {
    res.render('modules/home/create',{
        valueMessage: 'home'
    });
})

router.get('/product/create1', (req, res) => {
    res.render('home');
})

module.exports = router