import { Module } from '@nestjs/common';
import { EmailProvidersService } from './email-providers.service';
import { EmailProvidersController } from './email-providers.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [EmailProvidersController],
  providers: [EmailProvidersService, ConfigService],
  exports: [EmailProvidersService],
})
export class EmailProvidersModule {}
