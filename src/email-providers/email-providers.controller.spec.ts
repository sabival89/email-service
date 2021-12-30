import { Test, TestingModule } from '@nestjs/testing';
import { EmailProvidersController } from './email-providers.controller';
import { EmailProvidersService } from './email-providers.service';

describe('EmailProvidersController', () => {
  let controller: EmailProvidersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailProvidersController],
      providers: [EmailProvidersService],
    }).compile();

    controller = module.get<EmailProvidersController>(EmailProvidersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
