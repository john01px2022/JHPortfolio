const express = require('express');
const nodemailer = require("nodemailer");
var bodyParser = require('body-parser')
require('dotenv').config();
const cors = require('cors');
const app = express();


app.use(cors({
    origin: "https://jh-personal-website-tau.vercel.app/"
}));

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Successful response.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email,
        pass: process.env.pass
    }
});

app.post('/send-email', (req, res) => {
    console.log("mrow");

    const { name, fromEmail, message} = req.body;

    const mailOptions = {
        from: process.env.email, // sender email
        to: process.env.email, // recieving email
        subject: "Message from " + name + ", " + fromEmail, // Subject line
        text: message, // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            return res.status(500).send({message: "Error sending email", error})
        }
        res.status(200).send({message: "Email sent successfully", info});
    })
})