const nodemailer = require("nodemailer")
const crypto = require('crypto');

const generateToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

const token = generateToken()

function send_mail(mail,code){

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "mariam.charchyan.96@gmail.com",
        pass: "kslgcjoqkcxkmhqr"
    }
})

const mailOptions = {
    from: "mariam.charchyan.96@gmail.com",
    to: mail,
    subject: "Sending Email using Node.js",
    text: `sexmel http://localhost:3000/verify/${code}`
}

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error)
    } else{
        console.log("Email sent: "+ info.response)
    }
})
}

send_mail("mariam.charchyan.1996@mail.ru", token)