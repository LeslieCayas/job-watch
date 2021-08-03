const express = require('express')
const bcryptjs = require('bcryptjs')
const router = express.Router()
const User = require('../models/user')

// Login
router.post('/', (req, res) => {

   User.findByEmail(req.body.email)
       .then(user => {
        // console.log(user.id)
           if (user && bcryptjs.compareSync(req.body.password, user.password_digest)) {
               req.session.userId = user.id;
               res.json(req.session);
           } else {
               // Error, user not found or wrong password
               res.status(422).json({error: "Incorrect username or password"});
            
           }
       })
});

router.get('/', (req, res) => {
    console.log(req.session)
   User.findByName(req.session.userId)
    .then(user => {
        // req.session.userId = user.id;
        // console.log(user)
        res.json({ userName: user.name })
    })
    // console.log(req.body.name)
});

// Logout
router.delete('/', (req, res) => {
   req.session.destroy(); // Remove/reset the session
   res.json({});
})

module.exports = router;