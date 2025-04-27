const express = require('express');
const Model = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
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
                res.status(500).json({ message: 'Internal Server ' });
            }
        });
});

router.get("/all", async (req, res) => {
    try {
        const users = await User.find({}, 
            { name: 1, email: 1, isActive: 1, isLocked: 1, lockReason: 1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Activate User
router.put('/activate/:id', async (req, res) => {
    const { isActive } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { isActive: !isActive });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User activated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Deactivate User
  router.post('/deactivate', async (req, res) => {
    const { userId, reason } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(userId, { isActive: false, deactivationReason: reason });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deactivated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
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

// update
router.put('/update/:id', (req, res) => {

    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
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
              // login success - generate token

              const { _id, name, email } = result;
              const payload = { _id, name, email };

              jwt.sign(
                  payload,
                  process.env.JWT_SECRET,
                  { expiresIn: '1d' },
                  (err, token) => {
                      if (err) {
                          console.log(err);
                          res.status(500).json(err);
                      } else {
                          res.status(200).json({ token });
                      }
                  }
              )

          } else {
              //  login failed
              res.status(401).json({ message: 'Invalid credentials' });
          }

      }).catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });

})

module.exports = router;