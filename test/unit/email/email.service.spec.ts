import { HttpException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { EmailProvidersService } from '../../../src/email-providers/email-providers.service';
import { EmailService } from '../../../src/email/email.service';
import * as SendGrid from '@sendgrid/mail';
import * as Mailgun from 'mailgun-js';
import { EmailServiceOkException } from '../../../src/core/exceptions/email-service-ok-exception';
import { MailgunTemplate } from 'ts-mailgun/dist/mailgun-template';
import { SendEmailDto } from '../../../src/email/dto/send-email.dto';
import { EmailMapper } from '../../../src/email/mappers/email.map';

const emailMockData: SendEmailDto = {
  to: 'valentineaduaka@outlook.com',
  to_name: 'Valentine Aduaka',
  from: 'vaduaka@nochooks.com',
  from_name: 'Valentine Aduaka',
  subject: 'Payment Reminder for John Doe',
  body: '<html>Just an email body message...</html>',
};

const mockSendgridMapper = EmailMapper.SendGrid(emailMockData);

type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]: jest.Mock<{}>;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const mockSendGridApi: () => MockType<SendGrid.MailService> = jest.fn(() => ({
  setApiKey: jest.fn(),
  SendGrid: jest.fn().mockReturnThis(),
  send: jest.fn((entity) => entity),
}));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const mockMailgunApi: () => MockType<Mailgun.Mailgun> = jest.fn(() => ({
  messages: jest.fn().mockReturnThis(),
  send: jest.fn(),
}));

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
        providers: [
          EmailProvidersService,
          EmailService,
          ConfigService,
          Logger,

          {
            provide: EmailProvidersService,
            useFactory: mockSendGridApi,
          },
        ],
      }).compile();

      emailServiceMock = module.get<EmailService>(EmailService);
      configServiceMock = module.get<ConfigService>(ConfigService);
      emailProvidersServiceMock = module.get<EmailProvidersService>(
        EmailProvidersService,
      );
    }
  });

  describe('sendEmail', () => {
    it('Should throw an error if email sending process failed', async () => {
      expect(await emailServiceMock.sendEmail(emailMockData)).toBeInstanceOf(
        HttpException,
      );
    });
  });

  describe('useSendgrid', () => {
    beforeEach(async () => {
      emailProvidersServiceMock.SendGrid = SendGrid;
      emailProvidersServiceMock.SendGrid.setApiKey('SG.TEST-KEY');
    });
    it('Should successfully send email with SendGrid Api', async () => {
      console.log('cALL ME: ');

      const response = await emailProvidersServiceMock.SendGrid.send(
        mockSendgridMapper,
      );
      console.log('response: ', response);

      expect(await emailServiceMock.useSendGrid(emailMockData)).toBeInstanceOf(
        EmailServiceOkException,
      );
    });
  });
});
