
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const authController = {
    registerUser: async (req, res) => {
        // console.log(req.body);
            const existingUser = await User.findOne({username: req.body.username});
            if (existingUser) 
                return res.status(400).send("Username already exists");
            else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                const newUser = new User({
                    username: req.body.username,
                    password: hashedPassword,
                    fullName: req.body.fullName,
                    avatar: req.body.avatar,
                });
                const user = await newUser.save();
                res.status(200).json(user);
            }
       
    },
    loginUser: async (req, res) => {
        
            const user = await User.findOne({username: req.body.username});
            
            if (!user) 
                res.status(400).send('Wrong username or password');
            else {
                const valid = await bcrypt.compare(req.body.password, user.password);
                if(!valid)
                    res.status(400).send('Wrong username or password');
                else {
                    const accessToken = jwt.sign(
                        {
                            id: user._id,
                            username: user.username,
                            roles : user.roles,
                        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'}
                    );
                    res.status(200).json({user, accessToken});
                }
            }
           return
        },
}
module.exports = authController;