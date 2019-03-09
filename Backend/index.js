const  express = require('express')
const app = express()
const { PORT } = require('./helpers/utility')
//Nhúng middleware body-parser vào Express
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const usersRouter  = require('./routers/usersRouter')
const blogPostRouter = require('./routers/blogPostRouter')
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token")
    next()
})
app.use('/users',usersRouter)
app.use('/blogposts', blogPostRouter)
//Start server
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})