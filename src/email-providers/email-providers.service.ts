import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import * as Mailgun from 'mailgun-js';

@Injectable()
export class EmailProvidersService {
  Mailgun: Mailgun.Mailgun;
  SendGrid: SendGrid.MailService;

  constructor(private configService: ConfigService) {
    this.SendGrid = SendGrid;
    this.SendGrid.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));

    this.Mailgun = new Mailgun({
      apiKey: this.configService.get<string>('MAILGUN_API_KEY'),
      domain: this.configService.get<string>('MAILGUN_DOMAIN'),
    });
  }
}
