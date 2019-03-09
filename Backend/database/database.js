/*
File này connect cơ sở dữ liệu
 */
const mongoose = require('mongoose')
//Kết nối CSDL MongoDB
const connectDatabase = async () => {
    try {
        let uri = 'mongodb://dangtuantung1993:vannhuthe1@127.0.0.1:27018/CMTproject'
        let options = {
            connectTimeoutMS: 10000,// 10 giây
            useNewUrlParser: true,
            useCreateIndex: true,
        }
        await mongoose.connect(uri, options)
        console.log('Connect Mongo Database successfully')
    } catch(error) {
        console.log(`Cannot connect Mongo. Error: ${error}`)
    }
}
connectDatabase()
module.exports = {
    mongoose
}