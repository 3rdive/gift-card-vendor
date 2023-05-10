import sendNodeEmail from "./sendEmail";
import sendEmail from '../Utilities/sendGrid.mail'
import emailData from "../../Interfaces/email.dat";

const sendVerificationEmail =  async ({
    name,
    email, 
    verificationToken, 
    origin} : {
        name: string,
        email : string,
        verificationToken: string,
        origin: string
     }) => {

        const verifyEmail = `${origin}/auth/verifyEmail?token=${verificationToken}&email=${email}`;

        const message = `<p>Please confirm your email by clicking on the following link : 
        <a href="${verifyEmail}">Verify Email</a> </p>`;
      
        const emaildata : emailData = {
          to: email,
          subject: 'Email Confirmation',
          html: `<h4> Hello, ${name}</h4>
          ${message}
          `,
          from: "",
          text: "Email Verification"
        };
        return sendEmail(emaildata.to, emaildata.subject, emaildata.html, emaildata.text);
      };
      
      export default sendVerificationEmail;