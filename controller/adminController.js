const User = require('../models/User');
const bcrypt = require('bcrypt');

async function getAllUsers(req,res){
    try{
        const users = await User.find({});
        return res.status(200).json({ users });
    }catch(err){
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
async function getUserById(req,res){
    try{
        const user = await User.findById(req.params.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user });

    }catch(err){
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
async function updateUserById(req,res){
    try{
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const existsUserName = await User.findOne({username: req.body.username});
        if (existsUserName && existsUserName._id != req.params.userId) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        user.username = req.body.username;
        user.fullName = req.body.fullName;
        user.avatar = req.body.avatar;
        await user.save();
        return res.status(200).json({message:'User updated successfully', user });
    }
    catch(err){
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
async function deleteUserById(req,res){
    try{
        const user = await User.findOne({ _id: req.params.userId })
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await User.findByIdAndDelete(req.params.userId);
        return res.status(200).json({ message: 'User deleted successfully' });
    }
    catch(err){
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
async function createUser(req,res){
    try{
        const existsUserName = await User.findOne({username: req.body.username});
        if (existsUserName && existsUserName._id != req.params.userId) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            fullName: req.body.fullName,
            avatar: req.body.avatar,
        });
        await user.save();
        return res.status(200).json({ message: 'User created successfully', user });
    }
    catch(err){
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
module.exports = {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    createUser,
}