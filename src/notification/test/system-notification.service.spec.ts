import { Test, TestingModule } from '@nestjs/testing';
import { SystemNotificationService } from '../services/systemNotificationService.service';
import { INotificationRepository } from '../repository/INotificationRepository';
import { CreateNotificationDto, NotificationChannel, NotificationType } from '../dto/create-notification.dto';


describe('SystemNotificationService', () => {
  let service: SystemNotificationService;
  let notificationRepository: INotificationRepository;

  const mockNotificationRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    findByUserId: jest.fn(),
    markAsRead: jest.fn(),
    markAsUnread: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SystemNotificationService,
        {
          provide: 'INotificationRepository',
          useValue: mockNotificationRepository,
        },
      ],
    }).compile();

    service = module.get<SystemNotificationService>(SystemNotificationService);
    notificationRepository = module.get<INotificationRepository>('INotificationRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call repository.create with correct parameters', async () => {
      const dto: CreateNotificationDto = {
        eventName: 'Test Event',
        content: 'Test Content',
        createdAt: new Date(),
        read: false,
        channel: NotificationChannel.EMAIL,
        type: NotificationType.INSTANT,
      } as CreateNotificationDto;

      await service.create(dto);
      expect(notificationRepository.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findOne', () => {
    it('should call repository.findOne with correct ID', async () => {
      const id = 1;
      await service.findOne(id);
      expect(notificationRepository.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('remove', () => {
    it('should call repository.remove with correct ID', async () => {
      const id = 1;
      await service.remove(id);
      expect(notificationRepository.remove).toHaveBeenCalledWith(id);
    });
  });

  describe('findByUserId', () => {
    it('should call repository.findByUserId with correct user ID', async () => {
      const userId = 'user123';
      await service.findByUserId(userId);
      expect(notificationRepository.findByUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('markAsRead', () => {
    it('should call repository.markAsRead with correct ID', async () => {
      const id = 1;
      await service.markAsRead(id);
      expect(notificationRepository.markAsRead).toHaveBeenCalledWith(id);
    });
  });

  describe('markAsUnread', () => {
    it('should call repository.markAsUnread with correct ID', async () => {
      const id = 1;
      await service.markAsUnread(id);
      expect(notificationRepository.markAsUnread).toHaveBeenCalledWith(id);
    });
  });
});
