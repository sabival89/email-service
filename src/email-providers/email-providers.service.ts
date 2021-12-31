import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import * as Mailgun from 'mailgun-js';

@Injectable()
export class EmailProvidersService {
  /**
   * Define Email Providers
   */
  public readonly Mailgun: Mailgun.Mailgun;

  public SendGrid: SendGrid.MailService;

  public readonly EmailFailureRetry: boolean;

  public readonly EmailFailureRetryDelay: boolean;

  public readonly EmailFailureRetryDelayTime: number;

  public EmailFailureRetryTimes: number;

  constructor(private configService: ConfigService) {
    /**
     * SendGrid Api config Initialization
     */
    this.SendGrid = SendGrid;
    this.SendGrid.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));

    /**
     * Mailgun Api config Initialization
     */
    this.Mailgun = new Mailgun({
      apiKey: this.configService.get<string>('MAILGUN_API_KEY'),
      domain: this.configService.get<string>('MAILGUN_DOMAIN'),
    });

    /**
     * Initialize the retry option for email sending process after a failure
     */
    this.EmailFailureRetry =
      Boolean(this.configService.get<boolean>('EMAIL_FAILURE_RETRY')) || false;

    /**
     * Initialize the number of times to retry email sending process after a failure
     */
    this.EmailFailureRetryTimes =
      Number(this.configService.get<number>('EMAIL_FAILURE_RETRY_TIMES')) || 0;

    /**
     * Initialize the retry delay option for email sending process after failure
     */
    this.EmailFailureRetryDelay =
      Boolean(this.configService.get<boolean>('EMAIL_FAILURE_RETRY_DELAY')) ||
      false;

    /**
     * Initialize the time to wait before retrying email sending process after a failure
     */
    this.EmailFailureRetryDelayTime =
      Number(
        this.configService.get<number>('EMAIL_FAILURE_RETRY_DELAY_TIME'),
      ) || 3000;
  }

  /**
   * Delay the email sending process
   * @returns
   */
  async delay() {
    return new Promise((resolve) =>
      setTimeout(resolve, this.EmailFailureRetryDelayTime),
    );
  }
}
