'use strict';

const express = require("express");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const PORT = 1776;

app.use(bodyParser.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static('public'));

//Method POST responds in body:
app.post("/email_ms", (req, res) => {

  const person_first = req.body.first_name;
  const person_last = req.body.last_name;
  const email = req.body.email;
  const quantity = req.body.quantity;
  const measure = req.body.measure;
  const milestone = req.body.milestone;

  //EMAIL TEMPLATING:
  // Generate SMTP service account from ethereal.email
  nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');
    console.log(req.body);
    // Create a SMTP transporter object
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      security: 'STARTTLS',
      auth: {
        user: 'maryse.ward61@ethereal.email',
        pass: 'c86BXw1BFVs9ckceXF'
        }
    });

    // Message object
    let message = {
      from: 'Maryse Ward <maryse.ward61@ethereal.email>',
      to: `${person_first} ${person_last} <${email}>`,
      subject: 'Milestone Achieved',
      text: `
        Hello, ${person_first}.

        Great work! You have completed ${quantity} ${measure} of ${milestone}. Keep up the
        hard work and you will further engrain those habits. We are so proud of the
        work that you are putting in.

        You deserve a round of applause for your efforts.

        On behalf of Jonas and the rest of the team, thank you for making this journey with us.

        Thank you,
        Maryse
        `,
      html: `
      <h3>Hello, ${person_first}.</h3>
      <p>
        Great work! You have completed <strong>${quantity} ${measure} of ${milestone}</strong>. Keep up the hard work
        and you will further engrain those habits. We are so proud of the work that you are
        putting in.
      </p>
      <p>
        You deserve a round of applause for your efforts.
      </p>
      <p>
        On behalf of Jonas and the rest of the team, thank you for making this journey with us.
      </p>
      <p>
        Sincerely,
      </p>
      <p>
        <em>Maryse</em>
      </p>
      `
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
          res.status(500);
          console.log('Error occurred. ' + err.message);
          return process.exit(1);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      res.status(200);
      res.send(info);
    });


  });
});


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});