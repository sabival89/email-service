import { Module } from '@nestjs/common';
import { EmailController } from './email/email.controller';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';

@Module({
  imports: [EmailModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class AppModule {}
