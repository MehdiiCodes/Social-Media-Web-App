const express = require('express');
const Model = require('../models/PostModel');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');
require('dotenv').config();

const router = express.Router();

router.post('/add', (req, res) => {

    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            if(err?.code === 11000) {
                res.status(500).json({ message: 'Email already registered' });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
});

// getall
router.get('/getall', (req, res) => {

    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });

});

router.get('/getpost',verifyToken, (req, res) => {
    const{_id}=req.post;
    Model.find()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err);
            if(err==11000){
                res.status(500).json(err)
            
            }
        });
})

// : denotes url parameter
router.get('/getbycity/:city', (req, res) => {
    Model.find({ city: req.params.city })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
})

// getbyid
router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
});

// Update a post
router.put('/update/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: 'Post not found' });
  
      post.caption = req.body.caption;
      post.community = req.body.community;
  
      const updatedPost = await post.save();
      res.json(updatedPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Like a post
router.post('/like/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: 'Post not found' });
  
      post.likes += 1;
      const updatedPost = await post.save();
      res.json(updatedPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Share a post
  router.post('/share/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: 'Post not found' });
  
      post.shares += 1;
      const updatedPost = await post.save();
      res.json(updatedPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// delete 
router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
    .then((result) => {
        if (result) {
            // email and password matched
            // generate token

            const {_id, email, password} = result;
            const payload = { _id, email, password }

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '6h'},
                (err, token) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ err });
                    } else {
                        res.status(200).json({ token });
                    }
                }
            )

        } else {
            res.status(401).json({message: 'Invalid email or password'});
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;