import { Test, TestingModule } from '@nestjs/testing';

import { CreateNotificationDto, NotificationChannel, NotificationType } from '../dto/create-notification.dto';
import { SystemNotificationController } from '../controller/systemNotifaction.controller';
import { SystemNotificationService } from '../services/systemNotificationService.service';

describe('SystemNotificationController', () => {
  let controller: SystemNotificationController;
  let service: SystemNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemNotificationController],
      providers: [
        {
          provide: SystemNotificationService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findByUserId: jest.fn(),
            remove: jest.fn(),
            markAsRead: jest.fn(),
            markAsUnread: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SystemNotificationController>(SystemNotificationController);
    service = module.get<SystemNotificationService>(SystemNotificationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with correct parameters', async () => {
      const dto: CreateNotificationDto = {
        eventName: 'Test Event',
        content: 'Test Content',
        createdAt: new Date(),
        read: false,
        channel: NotificationChannel.EMAIL,
        type: NotificationType.INSTANT,
      };

      await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with correct ID', async () => {
      const id = 1;
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('findByUserId', () => {
    it('should call service.findByUserId with correct user ID', async () => {
      const userId = 'user123';
      await controller.findByUserId(userId);
      expect(service.findByUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('remove', () => {
    it('should call service.remove with correct ID', async () => {
      const id = '1';
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });

  describe('markAsRead', () => {
    it('should call service.markAsRead with correct ID', async () => {
      const id = '1';
      await controller.markAsRead(id);
      expect(service.markAsRead).toHaveBeenCalledWith(1);
    });
  });

  describe('markAsUnread', () => {
    it('should call service.markAsUnread with correct ID', async () => {
      const id = '1';
      await controller.markAsUnread(id);
      expect(service.markAsUnread).toHaveBeenCalledWith(1);
    });
  });
});
