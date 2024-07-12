import { Module } from '@nestjs/common';
import { NotificationDispatcherService } from './services/NotificationDispatcherService.service';
import { NotificationController } from './controller/notification.controller';
import { EmailNotificationService } from './services/EmailNotificationService.service';
import { InternalNotificationService } from './services/InternalNotificationService.service';
import { PushNotificationService } from './services/PushNotificationService.service';
import { SmsNotificationService } from './services/SmsNotificationService.service';
import { WhatsappNotificationService } from './services/WhatsappNotificationService.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemNotificationController } from './controller/systemNotifaction.controller';
import { SystemNotificationService } from './services/systemNotificationService.service';
import { Notification } from './entities/notification.entity';
import { NotificationRepository } from './repository/notificationRepository';
import { NotificationBatchService } from './services/NotificationBatchService.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
  ],
  controllers: [NotificationController,SystemNotificationController],
  providers: [NotificationDispatcherService, 
              EmailNotificationService,
              InternalNotificationService,
              PushNotificationService,
              SmsNotificationService,
              WhatsappNotificationService,
              SystemNotificationService,
              NotificationBatchService,
              {useClass:NotificationRepository,provide:"INotificationRepository"}
              ],
})
export class NotificationModule {}
