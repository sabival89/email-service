export class Email<EmailProp> {
  /**
   * Recipient's email address
   */
  to: EmailProp;

  /**
   * Sender's email address
   */
  from: EmailProp;

  /**
   * Email subject
   */
  subject: string;

  /**
   * Email body
   */
  text: string;

  /**
   * Initialize email properties
   * @param to
   * @param from
   * @param subject
   * @param text
   */
  constructor(to: EmailProp, from: EmailProp, subject: string, text: string) {
    this.to = to;
    this.from = from;
    this.subject = subject;
    this.text = text;
  }
}
