import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendEmailDto {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsEmail()
  to: string;
}
