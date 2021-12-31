export class Email<EmailProp> {
  to: EmailProp;

  from: EmailProp;

  subject: string;

  text: string;

  constructor(to: EmailProp, from: EmailProp, subject: string, text: string) {
    this.to = to;
    this.from = from;
    this.subject = subject;
    this.text = text;
  }
}
