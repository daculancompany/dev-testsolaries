const express = require('express');

const app = express();
//const port = process.env.PORT || 3001;

var bodyParser = require('body-parser');
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


// Serve up static assets (usually on heroku)
/*if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}*/

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/api/test', (req, res) => {
    res.json(process.env.SENDGRID_API_KEY);
}); 


app.post('/api/createContact', (req, res) => {
    const nodemailer = require('nodemailer');
    const sgMail = require('@sendgrid/mail');
    let email = 'niel.daculan@gmail.com'; // logicbase.daculan@gmail.com aaron.phillips929@gmail.com

    let html_template = '<!DOCTYPE html> <html> <head> <title>test html</title> <style type="text/css"> table, td, th {border: 1px solid black; } table {border-collapse: collapse; width: 100%; } td {height: 50px; vertical-align: center; } </style> </style> </head> <body> <table> <tr> <td>Name : </td> <td>'+req.body.name+'</td> </tr> <tr> <td>Email address : </td> <td>'+req.body.email+'</td> </tr> <tr> <td>Subject : </td> <td>'+req.body.subject+'</td> </tr> <tr> <td>Message : </td> <td>'+req.body.message+'</td> </tr> </table> </body> </html>';

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to:   email,
        from:  email,
        subject: 'Solaris DEV22',
        text: 'Solaris DEV',
        html: html_template,
    };
    sgMail.send(msg);
    res.json(process.env.SENDGRID_API_KEY);
});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


const port = process.env.PORT || 3001;

app.listen(port, () => `Server running on port ${port}`);