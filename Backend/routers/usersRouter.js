const express = require('express')
const router = express.Router()
const {
    insertUser,
    activateUser,
    loginUser,
    verifyJWT,
    blockOrDeleteUsers
} = require('../database/models/User')



router.use((req, res, next) => {
    console.log('Time: ', Date.now()) //Time log
    next()
})

router.post('/registerUser', async (req, res) =>{

    let {name, email, password} = req.body //Phần validate trường chúng ta sẽ học ở bài khác
    try {
        await insertUser(name, email, password)
        res.json({
            result: 'ok',
            message: 'Đăng ký user thành công, bạn cần mở mail để kích hoạt'
        })
    } catch(error) {
        res.json({
            result: 'failed',
            message: `Không thể đăng ký thêm user. Lỗi : ${error}`
        })
    }
})
router.get('/activateUser', async (req, res) =>{
    let {email, secretKey} = req.query
    try {
        await activateUser(email, secretKey)
        res.send(`<h1 style="color:MediumSeaGreen;">Kích hoạt User thành công</h1>`)
    } catch(error) {
        res.send(`<h1 style="color:Red;">Không kích hoạt được User, lỗi: ${error}</h1>`)
    }
})
router.post('/loginUser', async (req, res) =>{
    let {email, password} = req.body
    try {
        let foundUser = await loginUser(email, password)
        res.json({
            result : 'ok',
            message : 'Đăng nhập thành công',
            data : foundUser
        })
    }catch (error) {
        res.json({
            result : 'failed',
            message : `Không thể đăng nhập user. Lỗi : ${error}`

        })
    }
})
router.get('/jwtTest', async (req, res) => {
    let tokenKey = req.headers['x-access-token']
    try {

        await verifyJWT(tokenKey)
        res.json({
            result: 'ok',
            message: 'Verify Json Web Token thành công',
        })
    } catch(error) {
        res.json({
            result: 'failed',
            message: `Lỗi kiểm tra token : ${error}`
        })
    }
})
router.post('/admin/blockOrDeleteUsers', async (req, res) => {
    let tokenKey = req.headers['x-access-token']
    let {userIds, actionType} = req.body
    userIds = userIds.split(',')//Biến tring thành array
    try {
        await blockOrDeleteUsers(userIds, tokenKey, actionType)
        res.json({
            result: 'ok',
            message: 'Block/delete user thành công',
        })
    } catch(error) {
        res.json({
            result: 'failed',
            message: `Lỗi Block/delete user.Error: ${error}`
        })
    }

})
module.exports = router