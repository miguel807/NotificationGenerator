import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';

import { CreateNotificationDto } from './dto/create-notification.dto';

import { NotificationDispatcherService } from './services/NotificationDispatcherService.service';
import { NotificationBatchService } from './services/NotificationBatchService.service';

@Controller('notification')
export class NotificationController {
  constructor(  private readonly notificationBatchService: NotificationBatchService,) {}

  
  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    try {
      
      await this.notificationBatchService.processNotification(createNotificationDto);
     
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

 
}
