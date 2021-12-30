type SendGridEmailProperties =
  | {
      email: string;
      name: string;
    }
  | string;

export class Email {
  to: SendGridEmailProperties;

  from: SendGridEmailProperties;

  subject: string;

  text: string;

  constructor(
    to: string | SendGridEmailProperties,
    from: string | SendGridEmailProperties,
    subject: string,
    text: string,
  ) {
    this.to = to;
    this.from = from;
    this.subject = subject;
    this.text = text;
  }
}
