/*
file này chứa hàm phong 1 user thành admin
 */
const {mongoose} = require('../database/database')
const {User} = require('../database/models/User')
const makeUserBecomeAdmin = async (userId)=>{
    try {
        let user = await User.findById(userId)
        if (!user){
            console.log(`Không tìm thấy user với id  = ${userId}`)
            return
        }
        user.permission = 2
        user.isBanned = 0
        user.active = 1
        await user.save()
        console.log(`Đã thành admin`)
    }catch (error) {
        console.log(`Không thể update được user với userID = ${userId}`)
    }
}
makeUserBecomeAdmin("5c3fec06067947327874cf04")