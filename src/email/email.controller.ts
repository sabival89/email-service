import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  /**
   * Send email to recipient
   * @param sendEmailDto
   * @returns
   */
  @Post()
  async sendEmail(@Body(new ValidationPipe()) sendEmailDto: SendEmailDto) {
    return await this.emailService.sendEmail(sendEmailDto);
  }
}
