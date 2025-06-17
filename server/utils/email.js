import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,       
    pass: process.env.EMAIL_PASSWORD   
  }
});

export const sendEmail = async (email, name, subject, text) => {


  const data = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text
  };

  try {
    await transporter.sendMail(data);
    console.log('Done');
  } catch (err) {
    console.error('Not done', err);
  }

};


