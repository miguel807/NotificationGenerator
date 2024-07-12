import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { Notification } from '../entities/notification.entity';
import { INotificationRepository } from '../repository/INotificationRepository';


@Injectable()
export class SystemNotificationService {

  constructor(
    @Inject('INotificationRepository')
    private  notificationRepository: INotificationRepository,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
  
    return await this.notificationRepository.create(createNotificationDto)
    
  }


  async findOne(id: number): Promise<Notification> {
   
    return await this.notificationRepository.findOne(id);
  }


  async remove(id: number): Promise<void> {
   return await this.notificationRepository.remove(id);
  }

  async findByUserId(userId: string): Promise<Notification[]> {
   return await this.notificationRepository.findByUserId(userId);

  }

  async markAsRead(id: number): Promise<Notification> {
    return await this.notificationRepository.markAsRead(id);
    
  }

  async markAsUnread(id: number): Promise<Notification> {
    return await this.notificationRepository.markAsUnread(id);
   
  }
}