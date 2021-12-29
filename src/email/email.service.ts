import { Injectable, Logger } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import * as Mailgun from 'mailgun-js';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  // private readonly mailgun: ({}) => void;

  // private mailer = new NodeMailgun();

  constructor(private configService: ConfigService) {
    // sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
    SendGrid.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));

    /* this.mailer.apiKey = this.configService.get<string>('MAILGUN_API_KEY');
    this.mailer.domain = this.configService.get<string>('MAILGUN_DOMAIN');
    this.mailer.fromEmail = `vaduaka@${this.configService.get<string>(
      'MAILGUN_DOMAIN',
    )}`;
    this.mailer.fromTitle = 'Just a test email';

    this.mailer.init(); */
  }

  sendEmail(sendEmailDto: SendEmailDto) {
    // this.logger.log('Email process started..');

    const mailgun = new Mailgun({
      apiKey: this.configService.get<string>('MAILGUN_API_KEY'),
      domain: this.configService.get<string>('MAILGUN_DOMAIN'),
    });

    const data = {
      from: `vaduaka@${this.configService.get<string>('MAILGUN_DOMAIN')}`,
      to: 'valentineaduaka@outlook.com',
      subject: 'Hello',
      text: 'Testing some Mailgun awesomness!',
    };

    /* mailgun.messages().send(data, function (error, body) {
      console.log(body);

      if (error) {
        console.log('Error: ', error);
      }
    }); */

    mailgun
      .messages()
      .send(data)
      .then((result) => console.log('Done: ', result))
      .catch((error) => console.error('Error: ', error));

    const msg = {
      to: 'valentineaduaka@outlook.com', // Change to your recipient
      from: 'vaduaka@nochooks.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    /* this.mailer
      .send('valentineaduaka@outlook.com', 'Hello!', '<h1>hsdf</h1>')
      .then((result) => console.log('Done', result))
      .catch((error) => console.error('Error: ', error));
 */
    // this.logger.error('Cannot process started..');

    /* SendGrid.send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      }); */

    console.log(this.configService.get<string>('SENDGRID_API_KEY'));
    return 'This action adds a new email';
  }
}
