const schedule = require('node-schedule');
const MailService = require("./MailService");

var attendance = schedule.scheduleJob([{hour: 1}], function(){
  console.log("Checking student attendance...");
  let mailOptions = {
    from: '"Test Ghost 👻" <ghost@test.com>', // sender address
    to: 'nicholasrowlandson@gmail.com', // list of receivers
    subject: 'SCHEDULER ✔', // Subject line
    text: 'Sending every 10 seconds...', // plain text body
    html: '<b>Hello world ?</b>' // html body
  }
  //new MailService().scheduledMessage(mailOptions);
});
