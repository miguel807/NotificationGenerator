import { Injectable } from '@nestjs/common';
import { INotification } from '../interfaces/INotification';
import {Notification} from '../entities/notification.entity'
import { CreateNotificationDto } from '../dto/create-notification.dto';

@Injectable()
export class PushNotificationService implements INotification {
  async sendNotification(notification: CreateNotificationDto): Promise<void> {
    // Lógica para enviar notificaciones push a dispositivos móviles
    console.log("se ha enviado una notificacion a un dispositivo movil: "+notification)
  }
}
