import { Injectable, Logger } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  sendEmail(sendEmailDto: SendEmailDto) {
    // this.logger.log('Email process started..');

    // this.logger.error('Cannot process started..');

    console.log(sendEmailDto);
    return 'This action adds a new email';
  }
}
