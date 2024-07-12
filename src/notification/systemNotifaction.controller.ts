import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { SystemNotificationService } from "./services/systemNotificationService.service";

@Controller('systemNotification')
export class SystemNotificationController {
    constructor(private readonly notificationService: SystemNotificationService) {}

    @Post('')
    create(@Body() createNotificationDto: CreateNotificationDto):any {
      
      return this.notificationService.create(createNotificationDto);
    }
  
   
    @Get(':id/findOne')
    findOne(@Param('id') id: number):any {
      return this.notificationService.findOne(id);
    }
  
    @Get(':id/findByUserId')
    findByUserId(@Param('id') id: string):any {
      console.log("findByUserID")
      return this.notificationService.findByUserId(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) :any{
      return this.notificationService.remove(+id);
    }


  
    @Patch(':id/read')
    markAsRead(@Param('id') id: string):any {
      return this.notificationService.markAsRead(+id);
    }
  
    @Patch(':id/unread')
    markAsUnread(@Param('id') id: string) :any{
      return this.notificationService.markAsUnread(+id);
    }

 
}
