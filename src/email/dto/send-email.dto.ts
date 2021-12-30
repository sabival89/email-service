import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class SendEmailDto {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsEmail()
  to: string;

  @ApiProperty({ example: 'John Doe' })
  @MaxLength(25)
  @MinLength(3)
  to_name: string;

  @ApiProperty({ example: 'janedoe@gmail.com' })
  @IsEmail()
  from: string;

  @ApiProperty({ example: 'Jane Doe' })
  @MaxLength(25)
  @MinLength(3)
  from_name: string;

  @ApiProperty({ example: 'Payment Reminder for John Doe' })
  @MaxLength(30)
  @MinLength(3)
  subject: string;

  @ApiProperty({ example: '<html>Just an email body message...</html>' })
  @MinLength(3)
  body: string;
}
