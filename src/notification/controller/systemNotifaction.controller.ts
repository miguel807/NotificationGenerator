import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateNotificationDto } from "../dto/create-notification.dto";
import { SystemNotificationService } from "../services/systemNotificationService.service";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/infrastructure/roles.decorator";
import { AuthGuard } from "src/auth/infrastructure/auth.guard";
import { RolesGuard } from "src/auth/infrastructure/roles.guard";
import { Role } from "src/auth/infrastructure/role.enum";

@ApiTags('systemNotification') // 
@Controller('systemNotification')
export class SystemNotificationController {
    constructor(private readonly notificationService: SystemNotificationService) {}


    
    @Post('')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(Role.Admin) 
    @ApiOperation({ summary: 'Create a new notification' })
    @ApiCreatedResponse({ description: 'The notification has been successfully created.' })
    @ApiBadRequestResponse({ description: 'Invalid request.' })
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createNotificationDto: CreateNotificationDto):any {
      
      return this.notificationService.create(createNotificationDto);
    }
  
   
    @Get(':id/findOne')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(Role.Admin) 
    @ApiOperation({ summary: 'Find a notification by its ID' })
    @ApiParam({ name: 'id', description: 'ID of the notification to find', type: Number })
    @ApiResponse({ status: 200, description: 'Notification found successfully.' })
    @ApiResponse({ status: 404, description: 'Notification not found.' })
    findOne(@Param('id') id: number):any {
      return this.notificationService.findOne(id);
    }
  
    @Get(':id/findByUserId')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(Role.Admin) 
    @ApiOperation({ summary: 'Find notifications by user ID' })
    @ApiParam({ name: 'id', description: 'User ID to find notifications', type: String })
    @ApiResponse({ status: 200, description: 'Notifications found successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    findByUserId(@Param('id') id: string):any {
      
      return this.notificationService.findByUserId(id);
    }
  
    @Delete(':id')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(Role.Admin) 
    @ApiOperation({ summary: 'Delete a notification by its ID' })
    @ApiParam({ name: 'id', description: 'ID of the notification to delete', type: String })
    @ApiResponse({ status: 200, description: 'Notification deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Notification not found.' })
    remove(@Param('id') id: string) :any{
      return this.notificationService.remove(+id);
    }


  
    @Patch(':id/read')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(Role.Admin) 
    @ApiOperation({ summary: 'Mark a notification as read by its ID' })
    @ApiParam({ name: 'id', description: 'ID of the notification to mark as read', type: String })
    @ApiResponse({ status: 200, description: 'Notification marked as read successfully.' })
    @ApiResponse({ status: 404, description: 'Notification not found.' })
    markAsRead(@Param('id') id: string):any {
      return this.notificationService.markAsRead(+id);
    }
  
    @Patch(':id/unread')
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(Role.Admin) 
    @ApiOperation({ summary: 'Mark a notification as unread by its ID' })
    @ApiParam({ name: 'id', description: 'ID of the notification to mark as unread', type: String })
    @ApiResponse({ status: 200, description: 'Notification marked as unread successfully.' })
    @ApiResponse({ status: 404, description: 'Notification not found.' })
    markAsUnread(@Param('id') id: string) :any{
      return this.notificationService.markAsUnread(+id);
    }

 
}
