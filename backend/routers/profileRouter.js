const express = require('express');
const Model=require('../model/profilemodel')
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');
require('dotenv').config();

const router=express.Router();

router.post('/add', (req, res) => {

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err);

            res.status(500).json(err)
        });






})
router.get('/getall', (req, res) => {

    Model.find()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
})
router.get('getbyid', (req, res) => {
    Model.findById()
    .then((result) => {
       res.status(200).json(result) 
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err)
        
    });
  
})
router.get('/update', (req, res) => {
    Model.findByIdAndUpdate()
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err);
        
        res.status(500).json(err)
    });  
})
router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err)
    });
});

module.exports = router