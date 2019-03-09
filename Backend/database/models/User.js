/*
File này chứa user model
 */
const {mongoose} = require('../database')
const bcrypt = require('bcrypt')
const {sendEmail} = require('../../helpers/utility')
const jwt = require('jsonwebtoken')//Mã hoá 1 jsonObject thành token(string)
const secretString = "secret string"//tự cho 1 string tuỳ ý
const {Schema} = mongoose
const ACTION_BLOCK_USER = "ACTION_BLOCK_USER" //Khoá tài khoản
const ACTION_DELETE_USER = "ACTION_DELETE_USER"//Xoá tài khoản
//const {deleteBlogPostsByAuthor} = require('./BlogPost')

const UserSchema = new Schema({
    name: {type: String, default: 'unknown', unique: true},
    email: {type: String, match:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, unique: true},
    password: {type: String, required: true},
    phone: {type: Number, default:""},
    active: {type: Number, default: 0},
    permission :{type: Number, default: 0},
    isBanned: {type:Number, default: 0},
    blogPosts :[{type:mongoose.Schema.Types.ObjectId,ref:'BlogPost'}]
})
//Chuyển từ Schema sang Model
const User = mongoose.model('User', UserSchema)
const insertUser = async (name, email, password) => {
    try {
        //Mã hoá password trước khi lưu vào DB
        const encryptedPassword = await bcrypt.hash(password, 10)//saltRounds = 10
        const newUser = new User()
        newUser.name = name
        newUser.email = email
        newUser.password = encryptedPassword
        await newUser.save()
        await sendEmail(email, encryptedPassword)
    } catch(error) {
        //Tự tuỳ chỉnh lại Error
        if (error.code === 11000) {
            throw "Tên hoặc email đã tồn tại"
        }
        //throw error
    }
}
const activateUser = async (email, secretKey) => {
    try {
        let foundUser = await User.findOne({email, password: secretKey})
            .exec()
        if (!foundUser) {
            throw "Không tìm thấy User để kích hoạt"
        }
        if(foundUser.isBanned === 1) {
            throw "User đã bị khoá tài khoản, do vi phạm điều khoản"
        }
        if (foundUser.active === 0) {
            foundUser.active = 1
            await foundUser.save()
        } else {
            throw "User đã kích hoạt"//foundUser.active = 1
        }
    } catch(error) {
        throw error
    }
}
const loginUser = async (email, password) =>{
    try {
        let foundUser = await User.findOne({email: email.trim()})
            .exec()
        if (!foundUser)
        {
            throw 'User không tồn tại'
        }
        if(foundUser.isBanned === 1) {
            throw "User đã bị khoá tài khoản, do vi phạm điều khoản"
        }
        if (foundUser.active === 0){
            throw 'User chưa kích hoạt bạn phải mở email để kích hoạt'
        }
        let encryptePassword = foundUser.password
        let checkPassword = await bcrypt.compare(password, encryptePassword)
        if (checkPassword == true){
            let jsonObject = {
                id:foundUser._id
            }
            let tokenKey = await jwt.sign(jsonObject,
                secretString, {
                    expiresIn: 86400 // Expire trong 24 giờ
                })
            let userObject = await foundUser.toObject()
            userObject.tokenKey = tokenKey
            return userObject
        }else {
            throw "Tên user hoặc mật khẩu sai"
        }

    }catch (error) {
        throw error
    }
}
const verifyJWT = async (tokenKey) => {
    try {
        let decodedJson = await jwt.verify(tokenKey, secretString)
        if(Date.now() / 1000 >  decodedJson.exp) {
            throw "Token hết hạn, mời bạn login lại"
        }
        let foundUser = await User.findById(decodedJson.id)
        if (!foundUser) {
            throw "Ko tìm thấy user với token này"
        }
        if(foundUser.isBanned === 1) {
            throw "User đã bị khoá tài khoản, do vi phạm điều khoản"
        }
        return foundUser
    } catch(error) {
        throw error
    }
}
const blockOrDeleteUsers = async (userIds, tokenKey, actionType) => {
    //Admin có thể xoá/khoá nhiều user một lúc
    try {
        let signedInUser = await verifyJWT(tokenKey)
        if (signedInUser.permission !== 2){
            throw "Chỉ có tài khoản admin mới có chức năng này"
        }
        userIds.forEach(async (userId) => {
            let user = await User.findById(userId)
            if (!user) { //Ko thấy user
                return
            }
            //Xoá hay block ?
            if(actionType === ACTION_BLOCK_USER) {
                user.isBanned = 1
                await user.save()
            } else if(actionType === ACTION_DELETE_USER) {
                //Gồm 2 bước:
                //1. Xoá các blogposts của user
                //await deleteBlogPostsByAuthor(userId)
                //2. Xoá user
                await User.findByIdAndDelete(userId)
            }
        })
    } catch(error) {
        throw error
    }
}

module.exports = {
    User,
    insertUser,
    activateUser,
    loginUser,
    verifyJWT,
    blockOrDeleteUsers
}
