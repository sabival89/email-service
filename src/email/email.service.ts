import { Injectable, Logger } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { EmailProvidersService } from 'src/email-providers/email-providers.service';
import { EmailMapper } from './mappers/email.map';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private emailProvider: EmailProvidersService) {}

  sendEmail(sendEmailDto: SendEmailDto) {
    // this.logger.log('Email process started..');

    console.log(
      EmailMapper.Mailgun(sendEmailDto),
      EmailMapper.SendGrid(sendEmailDto),
    );

    /* const data = {
      to: 'Valentine Aduaka <valentineaduaka@outlook.com>',
      from: `Valentine Aduaka <vaduaka@nochooks.com>`,
      subject: 'Hello',
      html: '<html>HTML version of the body</html>',
    };

    this.emailProvider.Mailgun.messages()
      .send(data)
      .then((result) => console.log('Done: ', result))
      .catch((error) => console.error('Error: ', error)); */

    /* const msg = {
      to: { email: 'valentineaduaka@outlook.com', name: 'Kaosiso Aduaka' }, // Change to your recipient
      from: { email: 'vaduaka@nochooks.com', name: 'Valentine Aduaka' }, // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      html: '<html>and easy to do anywhere, even with Node.js</html>',
    };

    
    this.emailProvider.SendGrid.send(msg)
    .then((response) => {
      console.log('Email sent', 'Response: ', response);
    })
    .catch((error) => {
      console.error(error);
    }); */

    // this.logger.error('Cannot process started..');

    return 'This action adds a new email';
  }
}
