const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const {setTestSendMail} = require("../state/state.data");

const sendEmail = (userEmail, name, confirmationCode) => {

    setTestSendMail(false);

    const emailEnv = process.env.EMAIL;
    const password = process.env.PASSWORD;
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: emailEnv,
            pass: password,
        },
    });


    const mailOptions = {
        from: emailEnv,
        to: userEmail,
        subject: "Código de confirmación práctica backend",
        text: `
        Tu código de confirmación es ${confirmationCode}, utilízalo para finalizar tu registro!
        Nos vemos ${name}!!`
    };


    transporter.sendMail(mailOptions, function(error, info) {
        if(error){
            console.log(error);
            setTestSendMail(false);
            return;
        }
        console.log("Mail enviado: " + info.response);
        setTestSendMail(true);
    });
};

module.exports = sendEmail;