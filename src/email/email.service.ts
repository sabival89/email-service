import { Injectable, Logger } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import * as sendGrid from '@sendgrid/mail';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  sendEmail(sendEmailDto: SendEmailDto) {
    // this.logger.log('Email process started..');

    const msg = {
      to: 'test@example.com', // Change to your recipient
      from: 'test@example.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    // this.logger.error('Cannot process started..');

    // sendGrid
    //   .send(msg)
    //   .then(() => {
    //     console.log('Email sent');
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    console.log(sendEmailDto, process.env.SENDGRID_API_KEY);
    return 'This action adds a new email';
  }
}
