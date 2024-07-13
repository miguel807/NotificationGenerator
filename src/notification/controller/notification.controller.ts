import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationDispatcherService } from '../services/NotificationDispatcherService.service';
import { NotificationBatchService } from '../services/NotificationBatchService.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/infrastructure/roles.decorator';
import { RolesGuard } from 'src/auth/infrastructure/roles.guard';
import { Role } from 'src/auth/infrastructure/role.enum';
import { AuthGuard } from 'src/auth/infrastructure/auth.guard';


@ApiTags('notification') // 
@Controller('notification')
export class NotificationController {
  constructor(  private readonly notificationBatchService: NotificationBatchService,) {}

  
  @Post()
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin) 
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
