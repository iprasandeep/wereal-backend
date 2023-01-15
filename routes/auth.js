const router = require('express').Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')

router.post('/register',  async (req, res)=>{
   try{
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    // create new user
    const nweUser = new User({

        username: req.body.username,
        email:req.body.email,
        password: hashedPassword,
    }); 
    // save user and return response
    const user = await nweUser.save();
    res.status(200).json(user)
    }
     catch(error){console.log(error); 
    }
})

// login 
router.post('/login',  async (req, res)=>{
    try{
    const user = await User.findOne({email:req.body.email});
    ! user && res.status(404).send('user not found');
   
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json('Wrong Password!');
        
    res.status(200).json(user);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
})
module.exports = router; 
