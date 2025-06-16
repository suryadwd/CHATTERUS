import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,       
    pass: process.env.EMAIL_PASSWORD   
  }
});

export const sendWelcomeEmail = async (email, name) => {


  const data = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome in Chatter',
    text: `Hello ${name },sir Welcome to our platform! We're glad you're here`
  };

  try {
    await transporter.sendMail(data);
    console.log('Done');
  } catch (err) {
    console.error('Not done', err);
  }

};


