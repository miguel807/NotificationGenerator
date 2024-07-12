import { Injectable } from '@nestjs/common';
import { CreateNotificationDto, NotificationType } from '../dto/create-notification.dto';
import { NotificationDispatcherService } from './NotificationDispatcherService.service';


export enum NotificationChannel {
    SMS = 'SMS',
    EMAIL = 'EMAIL',
    SYSTEM = 'SYSTEM',
    PUSH = 'PUSH',
    WHATSAPP = 'WHATSAPP',
  }


@Injectable()
export class NotificationBatchService {
  private readonly batchMap: Map<string, CreateNotificationDto[]> = new Map();
  private readonly maxBatchSize = 5;
  private readonly maxBatchTime = 10 * 1000; 

  constructor(private readonly notificationDispatcherService: NotificationDispatcherService) {}

  async processNotification(notification: CreateNotificationDto): Promise<void> {

    if (notification.type === NotificationType.INSTANT || notification.channel === NotificationChannel.SYSTEM) {
      await this.notificationDispatcherService.dispatch(notification);
    } else {
      await this.processBatchNotification(notification);
    }
  }

  private async processBatchNotification(notification: CreateNotificationDto): Promise<void> {
    const { eventName, channel, userId } = notification;
    const key = this.getBatchKey(eventName, channel, userId);

    if (!this.batchMap.has(key)) {
      this.batchMap.set(key, []);
      setTimeout(() => this.sendBatchNotification(key), this.maxBatchTime);
    }

    const batch = this.batchMap.get(key);
    batch.push(notification);

    if (batch.length >= this.maxBatchSize) {
      await this.sendBatchNotification(key);
    }
  }

  private async sendBatchNotification(key: string): Promise<void> {
    const notifications = this.batchMap.get(key);
    if (notifications && notifications.length > 0) {
      const combinedNotification = this.combineNotifications(notifications);
      await this.notificationDispatcherService.dispatch(combinedNotification);
      this.batchMap.delete(key);
    }
  }

  private combineNotifications(notifications: CreateNotificationDto[]): CreateNotificationDto {
    const firstNotification = notifications[0];
    return {
      eventName: firstNotification.eventName,
      content: notifications.map(n => n.content).join('\n'), 
      createdAt: new Date(), 
      read: false, 
      channel: firstNotification.channel,
      type: NotificationType.BATCH,
      userId: firstNotification.userId,
      email: firstNotification.email,
    };
  }

  private getBatchKey(eventName: string, channel: NotificationChannel, userId?: string): string {
    return `${eventName}-${channel}-${userId || ''}`;
  }
}
