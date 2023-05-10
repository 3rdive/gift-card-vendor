import nodemailer from 'nodemailer';
import nodemailerConfig from './nodeMailerEmail';

const sendNodeEmail = async  (to: string, subject: string, html: string)=> {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport(nodemailerConfig);

    return transporter.sendMail({
        from: '"Cooler 👻" <foo@gmail.com>', // sender address
        to, 
        subject, 
        html
      });
}
export default sendNodeEmail;