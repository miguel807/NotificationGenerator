import { Inject, Injectable, Logger } from '@nestjs/common';
import { INotification } from '../interfaces/INotification';
import {Notification} from '../entities/notification.entity'
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { INotificationRepository } from '../repository/INotificationRepository';
import { SystemNotificationService } from './systemNotificationService.service';

@Injectable()
export class InternalNotificationService implements INotification {
  private readonly logger = new Logger(SystemNotificationService.name);
  constructor(
    @Inject('INotificationRepository')
    private  notificationRepository: INotificationRepository,
  ) {}
  async sendNotification(notification: CreateNotificationDto): Promise<void> {
    
    await this.notificationRepository.create(notification)
    this.logger.log(`Notification sent successfully by interal system: ${JSON.stringify(notification)}`);
    
  }
}