import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../entities/notification.entity';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { UpdateNotificationDto } from '../dto/update-notification.dto';
import { INotificationRepository } from './INotificationRepository';


export class NotificationRepository implements INotificationRepository{
  constructor(
    @InjectRepository(Notification)
    private readonly repository: Repository<Notification>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
   
    const notification = new Notification();
    Object.assign(notification, createNotificationDto);
    const newNotification =  await this.repository.create(notification);
    return await this.repository.save(newNotification)
  }

  async findAll(): Promise<Notification[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Notification> {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
    await this.repository.update(id, updateNotificationDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    return await this.repository.find({ where: { userId } });
  }

  async markAsRead(id: number): Promise<Notification> {
    await this.repository.update(id, { read: true });
    return this.findOne(id);
  }

  async markAsUnread(id: number): Promise<Notification> {
    await this.repository.update(id, { read: false });
    return this.findOne(id);
  }
}
