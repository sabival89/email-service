import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { EmailProvidersService } from 'src/email-providers/email-providers.service';
import { EmailMapper } from './mappers/email.map';
import { EmailServiceOkException } from 'src/core/exceptions/errors/email-service-ok-exception';

@Injectable()
export class EmailService {
  // Console Activity logs initialization
  private readonly logger = new Logger(EmailService.name);

  // Track current email retries
  private EmailRetryTracker: number;

  /**
   * Inject dependencies
   * @param emailProvider Email service provider class instance
   */
  constructor(private emailProvider: EmailProvidersService) {
    // Initialize email retry tracker
    this.EmailRetryTracker = this.emailProvider.EmailFailureRetryTimes;
  }

  /**
   * Send email to recipient
   * @param sendEmailDto Validated email properties
   * @returns
   */
  async sendEmail(sendEmailDto: SendEmailDto) {
    this.logger.log(`Preparing to send email to ${sendEmailDto.to_name}`);

    try {
      this.logger.log(`Using Mailgun email provider`);

      // Send email via Mailgun
      return await this.useMailgun(sendEmailDto);
    } catch (mailgunError) {
      this.logger.error(
        'Failed to send email via default email provider (Mailgun). Falling back to alternate email provider (Sendgrid)',
      );

      try {
        this.logger.log(`Switching to Sendgrid email provider`);

        // Send email via Sendgrid
        return await this.useSendGrid(sendEmailDto);
      } catch (sendgridError) {
        this.logger.error(
          'Failed to send email via alternate email provider (Sendgrid)',
        );

        // Retry sending email if the email-failure-retry option is enabled
        if (
          this.emailProvider.EmailFailureRetry &&
          this.EmailRetryTracker > 0
        ) {
          this.logger.warn(
            `[${this.EmailRetryTracker}] Retrying after ${
              (this.emailProvider.EmailFailureRetryDelayTime % 60000) / 1000
            } seconds`,
          );

          // Delay email retry interval if email-failure-retry-delay option is enabled
          this.emailProvider.EmailFailureRetryDelay
            ? await this.emailProvider
                .delay()
                .then(async () => await this.retrySendEmail(sendEmailDto))
            : await this.retrySendEmail(sendEmailDto);
        } else {
          // Reset email retry tracker
          this.EmailRetryTracker = this.emailProvider.EmailFailureRetryTimes;

          this.logger.error(
            'Unable to send email at this time. Please contact support',
            JSON.stringify({ mailgunError, sendgridError }),
          );

          throw new HttpException(
            {
              status: HttpStatus.UNAUTHORIZED,
              sendgridError,
              mailgunError,
            },
            HttpStatus.UNAUTHORIZED,
          );
        }
      }
    }
  }

  /**
   * Send email via Mailgun API
   * @param sendEmailDto Validated email properties
   * @returns
   */
  async useMailgun(sendEmailDto: SendEmailDto) {
    // Call Mailgun's API send email method
    await this.emailProvider.Mailgun.messages().send(
      EmailMapper.Mailgun(sendEmailDto),
    );

    this.logger.log(`Email was successfully sent to ${sendEmailDto.to_name}`);

    return new EmailServiceOkException('Email was sent successfully');
  }

  /**
   * Send email via SendGrid API
   * @param sendEmailDto Validated email properties
   * @returns
   */
  async useSendGrid(sendEmailDto: SendEmailDto) {
    // Call SendGrid's API send email method
    await this.emailProvider.SendGrid.send(EmailMapper.SendGrid(sendEmailDto));

    this.logger.log(`Email was successfully sent to ${sendEmailDto.to_name}`);

    return new EmailServiceOkException('Email was sent successfully');
  }

  /**
   * Retry sending email to recipient
   * @param sendEmailDto Validated email properties
   * @returns
   */
  async retrySendEmail(sendEmailDto: SendEmailDto) {
    // Decrement email retry times
    this.EmailRetryTracker -= 1;

    return await this.sendEmail(sendEmailDto);
  }
}
