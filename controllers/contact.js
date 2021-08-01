// Setting up mailer
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS
    }
});

exports.postContact = (req, res, next) => {
    if(!req.body.name || !req.body.email || !req.body.message){
        return res.status(400).send('<h4>Response 400</h4><p>Abe pura detail de</p>');
    }
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    res.render('redirect');

/*    
    let mailOptions1 = {
        from: `${name} <${email}>`,
        to: 'dikshantgiri4@gmail.com',
        replyTo: `${email}`,
        subject: `A New Message From ${name} | Dikz Studios`,
        text: `${message}`
    };

    transporter.sendMail(mailOptions1, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

*/
    let mailOptions2 = {
        from: `${name} <${email}>`,
        to: 'adarshchakraborty48@gmail.com',
        replyTo: `${email}`,
        subject: `A New Message From ${name} | Dikz Studios`,
        text: `${message}`
    };

    transporter.sendMail(mailOptions2, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

};

