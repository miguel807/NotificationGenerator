import { Injectable, Logger } from '@nestjs/common';
import { INotification } from '../interfaces/INotification';
import {Notification} from '../entities/notification.entity'
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { SystemNotificationService } from './systemNotificationService.service';

@Injectable()
export class PushNotificationService implements INotification {
  private readonly logger = new Logger(SystemNotificationService.name);
  async sendNotification(notification: CreateNotificationDto): Promise<void> {
    this.logger.log(`Notification sent successfully by push: ${JSON.stringify(notification)}`);
  }
}
