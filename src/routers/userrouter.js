

const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const multer = require('multer');


/* Endpoints */
router.get('/s', (req, res) => {
    // const user = new User({username: 'andrey', password: 'test'})
    // user.save(function (err) {
    //     console.log(err);
    // })
    res.render('modules/home/index',{
        valueMessage: 'index',
        datasource: [
            {
                idData: "data1",
                name: "Producto 1",
                description: "Detalle 1",
                expirationDate: '2020/02/27 09:30:10'
            },
            {
                idData: "data2",
                name: "Producto 2",
                description: "Detalle 2",
                expirationDate: '2020/02/28 17:10:10'
            },
            {
                idData: "data3",
                name: "Producto 3",
                description: "Detalle 3",
                expirationDate: '2020/02/29 05:10:10'
            }
          ]
    });
})

router.get('/socket', (req, res) => {
    res.render('socket');
})

router.get('/home', (req, res) => {
    res.render('modules/home/create',{
        valueMessage: 'home'
    });
})

router.get('/test', (req, res) => {
    res.render('home');
})

router.get('/getServerTimeZone', (req, res) => {
    res.status(200).send(new Date().toString());
})

// router.get('*', function(req, res){
//     res.render('404', {
//         errorCode: 404,
//         message: 'Page not found',
//     });
// });

// router.get('/tasks', async (req, res) => {
//     try {
//         const tasks = await Task.find({})
//         res.send(tasks)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

module.exports = router