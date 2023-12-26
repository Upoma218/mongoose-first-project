import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'upoma.cdsr@gmail.com',
      pass: 'avsm jdxu rlyv pwsu',
    },
  });

  await transporter.sendMail({
    from: 'upoma.cdsr@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within ten mins!', // Subject line
    text: 'This is your password rest link:', // plain text body
    html, // html body
  });
};