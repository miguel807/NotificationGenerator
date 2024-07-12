import { CreateNotificationDto } from '../dto/create-notification.dto';
import {Notification} from '../entities/notification.entity'

export interface INotification {
    sendNotification(notification: CreateNotificationDto): Promise<void>;
  }
  