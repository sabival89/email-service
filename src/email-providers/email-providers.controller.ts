import { Controller } from '@nestjs/common';
import { EmailProvidersService } from './email-providers.service';

@Controller('email-providers')
export class EmailProvidersController {
  constructor(private readonly emailProvidersService: EmailProvidersService) {}
}
