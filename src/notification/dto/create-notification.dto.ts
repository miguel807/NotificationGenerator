import { IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDate, IsBoolean, IsString, IsIn } from 'class-validator';

export enum NotificationChannel {
  EMAIL = 'EMAIL',
  SYSTEM = 'SYSTEM',
  PUSH = 'PUSH',
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
}
export enum NotificationType {
  INSTANT = 'INSTANT',
  BATCH = 'BATCH',
}


export class CreateNotificationDto {
 
  @IsOptional()
  @IsString()
  userId?: string; 
  
  @IsNotEmpty()
  @IsString()
  eventName: string;
  
  @IsNotEmpty()
  @IsString()
  content: string;
  
  @IsNotEmpty()
  @IsString()
  createdAt: Date;
  
  @IsBoolean()
  read: boolean;
  
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(NotificationChannel))
  channel: NotificationChannel;
  
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(NotificationType))
  type: NotificationType;
  
  @IsOptional()
  @IsEmail()
  email?: string; 
}


