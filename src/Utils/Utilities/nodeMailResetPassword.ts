import nodeEmaillogic from "./nodeEmaillogic";
import node from "./sendEmail";

const sendResetPassswordMail = async ({ name, email, token, origin }  : { 
    name: string,
    email: string,  
    token: string, 
    origin: string,
  }) => {
  const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;
  const message = `<p>Please reset password by clicking on the following link : 
  <a href="${resetURL}">Reset Password</a></p>`;

  return nodeEmaillogic({
    name,
    email,
    verificationToken: token,
    origin
  });
};

export default sendResetPassswordMail;