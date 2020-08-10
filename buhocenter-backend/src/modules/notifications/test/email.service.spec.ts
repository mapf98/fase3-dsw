import { Test, TestingModule } from '@nestjs/testing';
import { EmailsService } from '../services/emails.service';
import { WinstonModule } from 'nest-winston';
import { LoggerSettingsService } from '../../settings/services/logger.service';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { repositoryMockFactory } from '../../../../test/mock.functions';

describe('emailService', () => {
  let service: EmailsService;
  let sendGridService: SendGridService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailsService,
        {
          provide: SendGridService,
          useFactory: repositoryMockFactory,
        }
      ],
      imports: [
        WinstonModule.forRootAsync({
          useClass: LoggerSettingsService,
        })
      ],
    }).compile();

    service = module.get<EmailsService>(EmailsService);
    sendGridService = module.get<SendGridService>(SendGridService);
  });

  describe('sendEmailWelcome()', () => {
    it('should send an email', async () => {
      sendGridService.send = jest.fn().mockResolvedValue(true);
      const response = await service.sendEmailWelcome('test@gmail.com', 'Test');
      expect(sendGridService.send).toHaveBeenCalledWith({
          to: 'test@gmail.com',
          from: process.env.MAIL_AUTH_USERNAME,
          subject: 'Welcome to Buhocenter',
          templateId: process.env.MAIL_TEMPLATE_ID_WELCOME,
          dynamic_template_data: {
            name: 'Test',
          },
      });
    });
  });
});
