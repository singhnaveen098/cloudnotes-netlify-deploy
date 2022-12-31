const express = require('express')
const router = express.Router()
const User = require('../models/User')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const JWT_secret = 'iama#co@lboy'

//Route 1:
//create a user using post/api/auth/createuser. no login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false
    //return bad request for validation error 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        //check if user with same email exists or not
        if (user) {
            return res.status(400).json({ success, errors: 'A user with same email exists so please choose another one' });
        }
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_secret);
        success=true
        res.json({ success, authtoken: authtoken })
        //catch the error
    } catch (error) {
        console.error(error.message)
        res.status(500).send('INTERNAL SERVER ERROR')
    }
})


//Route 2:
//authenticate a user using post/api/auth/login. no login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    //return bad request for validation error 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body
    try {
        //finding user with given email
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({success, error: 'Please try to login with correct credentials' })
        }
        //comparing password
        const passcomp = await bcrypt.compare(password, user.password)
        if (!passcomp) {
            return res.status(400).json({success, error: 'Please try to login with correct credentials' })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_secret);
        success = true
        res.json({success, authtoken: authtoken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('INTERNAL SERVER ERROR')
    }
})

//Route 3:
//Get the details of logged in users using post/api/auth/getuser.login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userid = req.user.id
        const user = await User.findById(userid).select("-password")
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('INTERNAL SERVER ERROR')
    }
})

//Route 4:
//Delete user using delete/api/auth/deleteuser.login required
router.delete('/deleteuser', fetchuser, async (req, res) => {
    try {
        const userid = req.user.id
        const user = await User.findByIdAndDelete(userid)
        res.json({status:"User has been deleted", user: user})
    } catch (error) {
        console.error(error.message)
        res.status(500).send('INTERNAL SERVER ERROR')
    }
})

module.exports = router
