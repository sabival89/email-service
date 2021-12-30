import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { EmailProvidersService } from 'src/email-providers/email-providers.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [EmailController],
  providers: [EmailProvidersService, EmailService, ConfigService],
  exports: [EmailService],
})
export class EmailModule {}
