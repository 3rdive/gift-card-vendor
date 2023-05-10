import sgMail from '@sendgrid/mail';
import {Request, Response} from 'express';
import config from '../../Utils/config';
import msgData from '../../Interfaces/email.dat';
import * as dotenv from 'dotenv';
dotenv.config();

const API_KEY = config.SGM

const SGM = process.env.SENDGRID_API_KEY || API_KEY;

const sendEmail = async (to: string, subject: string, html: string, text: string) => {
    if (!SGM) {
        throw new Error('SENDGRID_API_KEY is not defined');
    }
    sgMail.setApiKey(SGM);
    const msg : msgData = {
      to, // Change to your recipient
      from: 'toluabby12@gmail.com', // Change to your verified sender
      subject,
      text,
      html,
    };
    return sgMail.send(msg);
};
  
export default sendEmail;
