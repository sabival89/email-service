import { SendEmailDto } from '../dto/send-email.dto';
import { Email } from '../entities/email.entity';

type SendGridEmailProperties = {
  email: string;
  name: string;
};
export class EmailMapper {
  /**
   * Map validated email fields to Sendgrid email format
   * @param sendEmailDto - Email properties
   * @returns Email<string>
   */
  public static SendGrid(sendEmailDto: SendEmailDto) {
    return new Email<SendGridEmailProperties>(
      { email: sendEmailDto.to, name: sendEmailDto.to_name },
      { email: sendEmailDto.from, name: sendEmailDto.from_name },
      sendEmailDto.subject,
      sendEmailDto.body,
    );
  }

  /**
   * Map validated email fields to Mailgun email format
   * @param sendEmailDto - Email properties
   * @returns Email<string>
   */
  public static Mailgun(sendEmailDto: SendEmailDto) {
    return new Email<string>(
      `${sendEmailDto.to_name} <${sendEmailDto.to}>`,
      `${sendEmailDto.from_name} <${sendEmailDto.from}>`,
      sendEmailDto.subject,
      sendEmailDto.body,
    );
  }
}
