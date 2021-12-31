import { HttpException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { EmailProvidersService } from '../../../src/email-providers/email-providers.service';
import { EmailService } from '../../../src/email/email.service';

/**
 * Define dependencies
 */
describe('EmailService', () => {
  let emailServiceMock: EmailService;
  let emailProvidersServiceMock: EmailProvidersService;
  let configServiceMock: ConfigService;

  beforeEach(async () => {
    {
      /**
       * Register and mock dependencies
       */
      const module: TestingModule = await Test.createTestingModule({
        // imports: [EmailModule],
        providers: [EmailProvidersService, EmailService, ConfigService, Logger],
      }).compile();

      emailServiceMock = module.get<EmailService>(EmailService);
      emailProvidersServiceMock = module.get<EmailProvidersService>(
        EmailProvidersService,
      );
      configServiceMock = module.get<ConfigService>(ConfigService);
    }
  });

  describe('sendEmail', () => {
    it('should thrown an error if failed', async () => {
      const emailData = {
        to: 'valentineaduaka@outlook.com',
        to_name: 'Valentine Aduaka',
        from: 'vaduaka@nochooks.com',
        from_name: 'Valentine Aduaka',
        subject: 'Payment Reminder for John Doe',
        body: '<html>Just an email body message...</html>',
      };

      console.log('Testing...'.repeat(20));
      expect(await emailServiceMock.sendEmail(emailData)).toBeInstanceOf(
        HttpException,
      );
    });
  });
});
