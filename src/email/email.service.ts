import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  sendEmail(sendEmailDto: SendEmailDto) {
    return 'This action adds a new email';
  }
}
