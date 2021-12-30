import { Test, TestingModule } from '@nestjs/testing';
import { EmailProvidersService } from './email-providers.service';

describe('EmailProvidersService', () => {
  let service: EmailProvidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailProvidersService],
    }).compile();

    service = module.get<EmailProvidersService>(EmailProvidersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
