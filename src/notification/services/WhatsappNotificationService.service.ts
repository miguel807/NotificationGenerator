import { Injectable } from '@nestjs/common';
import { INotification } from '../interfaces/INotification';
import { CreateNotificationDto } from '../dto/create-notification.dto';

@Injectable()
export class WhatsappNotificationService implements INotification {


  async sendNotification(notification: CreateNotificationDto): Promise<void> {
  
    console.log("se ha enviado una notificacion a traves de whatsapp: "+notification)
  }
}
