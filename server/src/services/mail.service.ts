const nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'georgianTest@gmail.com',
    pass: 'georgianTest1'
  }
});

class MailService {
  sendMail() {
    console.log("SENDING MAIL");
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Test Ghost 👻" <ghost@test.com>', // sender address
      to: 'georgianTest@gmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world ?', // plain text body
      html: '<b>Hello world ?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      } else {
        return console.log('Message %s sent: %s', info.messageId, info.response);
      }
    });
  }
}
Object.seal(MailService);
export = MailService;
