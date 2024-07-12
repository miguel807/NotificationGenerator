import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../entities/notification.entity';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { UpdateNotificationDto } from '../dto/update-notification.dto';
import { INotificationRepository } from './INotificationRepository';
import { SystemNotificationService } from '../services/systemNotificationService.service';


export class NotificationRepository implements INotificationRepository{
  private readonly logger = new Logger(SystemNotificationService.name);
  constructor(
    @InjectRepository(Notification)
    private readonly repository: Repository<Notification>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
   try{
    const notification = new Notification();
    Object.assign(notification, createNotificationDto);
    const newNotification =  await this.repository.create(notification);
    this.logger.log(`Notification created successfully: ${JSON.stringify(newNotification)}`);
    return await this.repository.save(newNotification)
  } catch (error) {
    throw new HttpException('Error creating notification', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

  async findAll(): Promise<Notification[]> {
    try{
    return await this.repository.find();
  } catch (error) {
    this.logger.error('Error finding notifications', error.stack);
    throw new HttpException('Error finding notifications', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

  async findOne(id: number): Promise<Notification> {
    try {
      const notification = await this.repository.findOne({where:{id:id}});
      if (!notification) {
        this.logger.warn(`Notification with ID ${id} not found`);
        throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
      }
      this.logger.log(`Found notification: ${JSON.stringify(notification)}`);
      return notification;
    } catch (error) {
      this.logger.error('Error finding notification', error.stack);
      throw new HttpException('Error finding notification', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
    try{
      await this.repository.update(id, updateNotificationDto);
      return this.findOne(id);
  } catch (error) {
    this.logger.error('Error updating notification', error.stack);
    throw new HttpException('Error updating notification', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.repository.delete(id);
      if (!result) {
        throw new HttpException('Notification not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      this.logger.error('Error deleting notification', error.stack);
      throw new HttpException('Error deleting notification', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByUserId(userId: string): Promise<Notification[]> {
      try{
        this.logger.log(`Found notifications for user ID ${userId}`);
        return await this.repository.find({ where: { userId } });
      } catch (error) {
        this.logger.error('Error finding notifications by user ID', error.stack);
        throw new HttpException('Error finding notifications by user ID', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }

  async markAsRead(id: number): Promise<Notification> {
       try{
          const notification =  await this.repository.update(id, { read: true });
          this.logger.log(`Notification marked as read: ${JSON.stringify(notification)}`);
          return this.findOne(id);
      } catch (error) {
          this.logger.error('Error marking notification as read', error.stack);
          throw new HttpException('Error marking notification as read', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        }

  async markAsUnread(id: number): Promise<Notification> {
    try{
        const notification =  await this.repository.update(id, { read: false });
        this.logger.log(`Notification marked as unread: ${JSON.stringify(notification)}`);
        return this.findOne(id);
  } catch (error) {
    this.logger.error('Error marking notification as unread', error.stack);
    throw new HttpException('Error marking notification as unread', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }
}
