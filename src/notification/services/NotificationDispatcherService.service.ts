import { Injectable } from '@nestjs/common';
import {Notification} from '../entities/notification.entity'
import { EmailNotificationService } from './EmailNotificationService.service';
import { InternalNotificationService } from './InternalNotificationService.service';
import { PushNotificationService } from './PushNotificationService.service';
import { SmsNotificationService } from './SmsNotificationService.service';
import { WhatsappNotificationService } from './WhatsappNotificationService.service';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateNotificationDto } from '../dto/update-notification.dto';

@Injectable()
export class NotificationDispatcherService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private readonly emailNotificationService: EmailNotificationService,
    private readonly internalNotificationService: InternalNotificationService,
    private readonly pushNotificationService: PushNotificationService,
    private readonly smsNotificationService: SmsNotificationService,
    private readonly whatsappNotificationService: WhatsappNotificationService,
  ) {}

  async dispatch(notification: CreateNotificationDto) {
    switch (notification.channel) {
      case 'EMAIL':
        await this.emailNotificationService.sendNotification(notification);
        break;
      case 'SYSTEM':
        await this.internalNotificationService.sendNotification(notification);
        break;
      case 'PUSH':
        await this.pushNotificationService.sendNotification(notification);
        break;
      case 'SMS':
        await this.smsNotificationService.sendNotification(notification);
        break;
      case 'WHATSAPP':
        await this.whatsappNotificationService.sendNotification(notification);
        break;
      default:
        throw new Error('Unsupported notification channel');
    }
  }

 
}
