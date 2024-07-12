import { Injectable, Logger } from '@nestjs/common';
import {Notification} from '../entities/notification.entity'
import { INotification } from '../interfaces/INotification';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { EmailProvider } from '../interfaces/EmailProvider';
import { SendGridEmailProvider } from '../providers/email/SendGridEmailProvider.provider';
import { SmtpEmailProvider } from '../providers/email/SmtpEmailProvider.provider';
import { SystemNotificationService } from './systemNotificationService.service';

@Injectable()
export class EmailNotificationService implements INotification {
  private emailProvider: EmailProvider;
  private readonly logger = new Logger(SystemNotificationService.name);

  constructor() {
    this.setEmailProvider();
  }
  
  private setEmailProvider() {
    const provider = process.env.EMAIL_PROVIDER || 'SMTP';
    switch (provider) {
      case 'SENDGRID':
        this.emailProvider = new SendGridEmailProvider();
        break;
      case 'SMTP':
      default:
        this.emailProvider = new SmtpEmailProvider();
        break;
    }
  }

  async sendNotification(notification: CreateNotificationDto): Promise<void> {
    this.logger.log(`Notification sent successfully by email: ${JSON.stringify(notification)}`);
    await this.emailProvider.sendEmail(notification.email, notification.content);
  }
}
