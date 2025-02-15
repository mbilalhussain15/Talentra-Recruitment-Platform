import nodemailer from 'nodemailer';
import jwt from "jsonwebtoken";
// Function to send reset email
export const sendPasswordResetEmail = async (email,user) => {
  try {

      // Generate reset token (valid for 30 minutes)
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30m" });

        // Email transporter configuration
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: Number(process.env.EMAIL_PORT),
        secure: Boolean(process.env.SECURE),
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const link = `http://localhost:5173/reset-password?token=${token}`;

      // Sending email
      await transporter.sendMail({
        from: `"Talentra Support" <${process.env.USER}>`,
        to: email,
        subject: "Reset Your Password",
        html: `
          <h2>Password Reset Request</h2>
          <p>We received a request to reset your password for your Talentra account.</p>
          <p>Click the button below to reset your password. This link will expire in <strong>30 minutes</strong>.</p>
          <a href="${link}" style="
            display: inline-block;
            background-color: #007BFF;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
          ">Reset Password</a>
          <p>If you didn't request this, you can safely ignore this email.</p>
          <p>Regards,<br>Talentra Team</p>
        `,
      });

    console.log("Email sent successfully to:", email);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};
