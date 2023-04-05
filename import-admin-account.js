const fs = require('fs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const dotenv = require('dotenv');
const {roles} = require('./config/role.enum');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
 }).then(()=>
 {console.log('DB Connection Successful!');

  // Đọc thông tin tài khoản admin từ file admin-account.json
  const adminAccounts = JSON.parse(fs.readFileSync('admin-account.json', 'utf8'));
  // Thêm tài khoản admin vào database nếu tài khoản đó chưa tồn tại trong database
  adminAccounts.forEach(adminAccount => {
        let user = User.findOne({ username: adminAccount.username })
        const salt = bcrypt.genSaltSync(10);
        adminAccount.password = bcrypt.hashSync(adminAccount.password, salt);
        let newAdmin = new User({
          username: adminAccount.username,
          password: adminAccount.password,
          fullName: adminAccount.fullName,
          roles: roles.ADMIN,
        });
        user = newAdmin.save();
    });
  }).catch((err) => {
  console.error(`Lỗi kết nối tới database: ${err}`);
});