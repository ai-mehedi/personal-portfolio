var express = require('express');
var router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');
const {testimonial} = require('./data'); // Assuming you have a data.js file with the testimonial data
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { testimonials: testimonial });
});

router.get('/download-cv', (req, res) => {
  const file = path.join(__dirname, 'public', 'MD_AMINUL_ISLAM.pdf');
  res.download(file, 'MD_AMINUL_ISLAM.pdf'); // second argument is the filename for user
});


router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Setup transporter (example: Gmail SMTP)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aminulislam0527@gmail.com',        // Your Gmail address
      pass: 'tzpc pifx rvyj csaa'       // Gmail App Password (not your regular password!)
    }
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'mdaminulislamdev23@gmail.com',  // Where you want to receive the message
    subject: 'New Contact Form Message',
    replyTo: email,
    html: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Message Sent Successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send message.');
  }
});





module.exports = router;
