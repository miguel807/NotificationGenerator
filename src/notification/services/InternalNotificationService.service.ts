import { Inject, Injectable } from '@nestjs/common';
import { INotification } from '../interfaces/INotification';
import {Notification} from '../entities/notification.entity'
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { INotificationRepository } from '../repository/INotificationRepository';

@Injectable()
export class InternalNotificationService implements INotification {
  constructor(
    @Inject('INotificationRepository')
    private  notificationRepository: INotificationRepository,
  ) {}
  async sendNotification(notification: CreateNotificationDto): Promise<void> {
    
    await this.notificationRepository.create(notification)
    console.log("se ha enviado una notificacion: " +notification)
    
  }
}