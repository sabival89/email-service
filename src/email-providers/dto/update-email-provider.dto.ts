import { PartialType } from '@nestjs/swagger';
import { CreateEmailProviderDto } from './create-email-provider.dto';

export class UpdateEmailProviderDto extends PartialType(CreateEmailProviderDto) {}
