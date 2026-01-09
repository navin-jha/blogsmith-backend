import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "BlogSmith",
      link: "https://blogsmithlink.com/",
      logo: "https://example.com/logo.png",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHTML = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMPT_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMPT_USERNAME,
      pass: process.env.MAILTRAP_SMPT_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: '"BlogSmith" <noreply@blogsmith.com>',
      to: options.email,
      subject: options.subject,
      text: emailTextual,
      html: emailHTML,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to BlogSmith! We're very excited to have you on board.",
      action: {
        instructions: "To get started with your account, please click here:",
        button: {
          color: "#22BC66",
          text: "Verify Your Email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we're always happy to help.",
    },
  };
};

const passwordResetMailgenContent = (username, resetUrl) => {
  return {
    body: {
      name: username,
      intro: "You have requested to reset your password.",
      action: {
        instructions: "To reset your password, please click here:",
        button: {
          color: "#FF5733",
          text: "Reset Your Password",
          link: resetUrl,
        },
      },
      outro:
        "If you did not request a password reset, please ignore this email.",
    },
  };
};

export {
  sendEmail,
  emailVerificationMailgenContent,
  passwordResetMailgenContent,
};
