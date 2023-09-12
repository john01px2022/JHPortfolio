const express = require('express');
const nodemailer = require("nodemailer");

const app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Successful response.');
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));

app.post('/email', (req, res) => {
    console.log(req.body.name);
    transporter.sendMail({
        from: 'jhopwforwarding@gmail.com', // sender address
        to: "jhopwforwarding@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
    }).then(function(response) {
        console.log(response);
    });
    
    console.log("Message sent: %s", info.messageId);
})
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jhopwforwarding@gmail.com',
        pass: 'wpoqcbizwmceyaji'
    }
});