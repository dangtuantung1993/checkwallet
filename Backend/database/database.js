/*
File này connect cơ sở dữ liệu
 */
const mongoose = require('mongoose')
//Kết nối CSDL MongoDB
const connectDatabase = async () => {
    try {
        let uri = 'mongodb://dangtuantung1993:vannhuthe1@webversion1-shard-00-00-8rtop.mongodb.net:27017,webversion1-shard-00-01-8rtop.mongodb.net:27017,webversion1-shard-00-02-8rtop.mongodb.net:27017/test?ssl=true&replicaSet=Webversion1-shard-0&authSource=admin&retryWrites=true'
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
