const User = require('../models/User');

async function updateMyProfile(req, res) {
  try {
    const { username, fullName,avatar } = req.body; 

    const user = await User.findById(req.user.id);

    user.username = username;
    user.fullName = fullName;
    user.avatar = avatar;

    await user.save(); 

    return res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
async function getMyProfile(req,res){
    const user = await User.findById(req.user.id);
    return res.status(200).json({ user });
}

module.exports = {
    updateMyProfile,
    getMyProfile,
}