/*
File này chứa các function dùng chung, PORT, hàm gửi mail
*/
const nodemailer = require('nodemailer')
const PORT = 3000
const sendEmail = async (receiverEmail, secretKey) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "dangtuantunghihi@gmail.com",
                pass: "vannhuthe1"
            }
        })
        let mailOptions = {
            from: '"Tung dep trai test" <dangtuantunghihi@gmail.com>', //Email người gửi
            to: receiverEmail,
            subject: 'Activate email',
            html: `<h1>Please click here to activate your account:</h1>
                   http://${require('os').hostname()}:${PORT}/users/activateUser?secretKey=${secretKey}&email=${receiverEmail}`
        }
        let info = await transporter.sendMail(mailOptions)
        console.log('Message sent: %s', info.messageId);
    } catch(error) {
        throw error
    }
}
module.exports = {
    sendEmail,
    PORT
}