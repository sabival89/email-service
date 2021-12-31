import { Module } from '@nestjs/common';
import { EmailProvidersService } from './email-providers.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [EmailProvidersService, ConfigService],
  exports: [EmailProvidersService],
})
export class EmailProvidersModule {}
