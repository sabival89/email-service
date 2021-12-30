import { SendEmailDto } from '../dto/send-email.dto';
import { Email } from '../entities/email.entity';

export class EmailMapper {
  public static SendGrid(raw: SendEmailDto) {
    return new Email(
      { email: raw.to, name: raw.to_name },
      { email: raw.from, name: raw.from_name },
      raw.subject,
      raw.body,
    );
  }

  public static Mailgun(raw: SendEmailDto) {
    return new Email(
      `${raw.to_name} <${raw.to}>`,
      `${raw.from_name} <${raw.from}>`,
      raw.subject,
      raw.body,
    );
  }
}
