import sgMail from '@sendgrid/mail';
import msgData from '../../Interfaces/email.dat';
import * as dotenv from 'dotenv';
dotenv.config();

const API_KEY = 'default-api-key';
const SGM = process.env.SENDGRID_API_KEY || API_KEY;

if (!SGM) {
  throw new Error('SENDGRID_API_KEY is not defined');
}

sgMail.setApiKey(SGM);

const sendResetPasswordEmail = async ({ name, email, token, origin }: {
  name: string;
  email: string;
  token: string;
  origin: string;
}): Promise<void> => {
  const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;
  const message = `<p>Please reset password by clicking on the following link : 
    <a href="${resetURL}">Reset Password</a></p>`;

  const msg: msgData = {
    to: email,
    from: 'toluabby12@gmail.com',
    text: 'Password reset message',
    subject: 'Reset Password',
    html: `<h4>Hello, ${name}</h4>
      ${message}
    `,
  };

  await sgMail.send(msg);
};

export default sendResetPasswordEmail;
