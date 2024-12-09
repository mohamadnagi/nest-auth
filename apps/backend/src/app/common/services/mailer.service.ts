import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // e.g., "smtp.gmail.com"
      port: parseInt(process.env.MAIL_PORT || '587'), // Default SMTP port
      secure: process.env.MAIL_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER, // Your email address
        pass: process.env.MAIL_PASSWORD, // Your email password or app-specific password
      },
    });
  }

  async sendMail(to: string, subject: string, message: string): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.MAIL_FROM || '"Your App Name" <no-reply@yourapp.com>',
        to,
        subject,
        text: message, // Plain text body
        html: `<p>${message}</p>`, // HTML body
      };

      const info = await this.transporter.sendMail(mailOptions);

      this.logger.log(`Email sent to ${to}: ${info.messageId}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error.stack);
      throw error;
    }
  }
}
