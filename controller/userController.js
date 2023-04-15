const User = require('../models/User');

const multer = require('multer');
const firebase = require('firebase/app');
const {getStorage,ref,uploadBytes,getDownloadURL} = require('firebase/storage');

const firebaseConfig = {
  apiKey: "AIzaSyDSBd-PaLolmYTNFhUb97NsE8WNLbiOFGw",
  authDomain: "authentication-5a654.firebaseapp.com",
  projectId: "authentication-5a654",
  storageBucket: "authentication-5a654.appspot.com",
  messagingSenderId: "786184628149",
  appId: "1:786184628149:web:8723985fb92879e23c5bfc"
};
firebase.initializeApp(firebaseConfig);

const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

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

const uploadAvatar = (req, res) => {
  
  upload.single('avatar')(req, res, async (err) => {
    const storeRef = ref(storage, `avatars/${req.file.originalname}`);
    await uploadBytes(storeRef, req.file.buffer).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
    const url = await getDownloadURL(storeRef);
    res.status(200).json({ avatar: url });
  });
};

module.exports = {
    updateMyProfile,
    getMyProfile,
    uploadAvatar
}