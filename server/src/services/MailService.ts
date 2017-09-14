const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '', //email
    pass: '' // password
  }
});

class MailService {

welcomeMessage(client): void {
  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Georgian Academic & Career Prep"', // sender address
    to: client.email, // list of receivers
    subject: 'Welcome, ' + client.firstName, // Subject line
    text: '', // plain text body
    html: 'Youre username is <b>' + client.username + '</b> and your password is your birthday in the following format: ddmmyyyy<br /> Please login and complete the required forms. <br /><br /> Thankyou' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      return console.log('Welcome Message %s sent: %s', info.messageId, info.response);
    }
  });
}

scheduledMessage(mailOptions): void {
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      return console.log('Scheduled Message %s sent: %s', info.messageId, info.response);
    }
  });
}

}
export = MailService;
