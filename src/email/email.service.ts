import { Injectable, Logger } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import * as SendGrid from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {
    // sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
    SendGrid.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  sendEmail(sendEmailDto: SendEmailDto) {
    // this.logger.log('Email process started..');

    const msg = {
      to: 'valentineaduaka@outlook.com', // Change to your recipient
      from: 'vaduaka@nochooks.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    // this.logger.error('Cannot process started..');

    SendGrid.send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });

    console.log(
      sendEmailDto,
      this.configService.get<string>('SENDGRID_API_KEY'),
    );
    return 'This action adds a new email';
  }
}
