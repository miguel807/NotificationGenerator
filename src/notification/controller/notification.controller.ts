import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';

import { CreateNotificationDto } from '../dto/create-notification.dto';

import { NotificationDispatcherService } from '../services/NotificationDispatcherService.service';
import { NotificationBatchService } from '../services/NotificationBatchService.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('notification') // 
@Controller('notification')
export class NotificationController {
  constructor(  private readonly notificationBatchService: NotificationBatchService,) {}

  
  @Post()
  @ApiCreatedResponse({ description: 'The notification has been sent.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    try {
      
      await this.notificationBatchService.processNotification(createNotificationDto);
     
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

 
}
