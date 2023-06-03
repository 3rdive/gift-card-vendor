import { SentMessageInfo } from "nodemailer";
import emailData from "../../Interfaces/email.dat";
import sendNodeEmail from "./sendEmail";

const sendVerificationMail = async ({
    name,
    email, 
    verificationToken, 
    origin
}: {
    name: string,
    email: string,
    verificationToken: string,
    origin: string
}): Promise<SentMessageInfo> => {

    const verifyEmail = `${origin}/auth/verifyEmail?token=${verificationToken}&email=${email}`;

    const message = `<p>Please confirm your email by clicking on the following link : 
        <a href="${verifyEmail}">Verify Email</a> </p>`;

    const emaildata: emailData = {
        to: email,
        subject: 'Email Confirmation',
        html: `<h4> Hello, ${name}</h4>
          ${message}
          `,
        from: "",
        text: "Email Verification"
    };

    return sendNodeEmail(emaildata.to, emaildata.subject, emaildata.html);
};

const sendResetPasswordMail = async ({
    name,
    email, 
    token, 
    origin
}: {
    name: string,
    email: string,
    token: string,
    origin: string
}): Promise<SentMessageInfo> => {

    const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;
  const message = `<p>Please reset password by clicking on the following link : 
    <a href="${resetURL}">Reset Password</a></p>`;

    const emaildata: emailData = {
        to: email,
        subject: 'Email Confirmation',
        html: `<h4> Hello, ${name}</h4>
          ${message}
          `,
        from: "",
        text: "Reset Password Verification"
    };

    return sendNodeEmail(emaildata.to, emaildata.subject, emaildata.html);
};
const sendTransactionMail = async ({
    name,
    email, 
    code, 
}: {
    name: string,
    email: string,
    code: number,
}): Promise<SentMessageInfo> => {

    const message = `<p>This is your transaction_code with reference code=${code}</p>`;

    const emaildata: emailData = {
        to: email,
        subject: 'Unique Transaction Code',
        html: `<h4> Hello, ${name}</h4>
          ${message}
          `,
        from: "",
        text: "Transaction Verification"
    };

    return sendNodeEmail(emaildata.to, emaildata.subject, emaildata.html);
};
const sendGiftcardMail = async ({
    name,
    email, 
    code,
    expirationDate 
}: {
    name: string,
    email: string,
    code: string,
    expirationDate: Date
}): Promise<SentMessageInfo> => {

    const message = `<p>This is your Giftcard=${code} expiry on  ${expirationDate}</p>`;

    const emaildata: emailData = {
        to: email,
        subject: 'Special Giftcard',
        html: `<h4> Hello, ${name}</h4>
          ${message}
          `,
        from: "",
        text: "Gift Card Special"
    };

    return sendNodeEmail(emaildata.to, emaildata.subject, emaildata.html);
};

export  {sendVerificationMail,
    sendGiftcardMail,
sendTransactionMail,
sendResetPasswordMail};
