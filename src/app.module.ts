import { Module } from '@nestjs/common';
import { EmailController } from './email/email.controller';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { ConfigModule } from '@nestjs/config';
import { EmailProvidersModule } from './email-providers/email-providers.module';

@Module({
  imports: [EmailModule, ConfigModule.forRoot(), EmailProvidersModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class AppModule {}
