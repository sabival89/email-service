import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/send-email.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  sendEmail(@Body(new ValidationPipe()) sendEmailDto: SendEmailDto) {
    return this.emailService.sendEmail(sendEmailDto);
  }
}
