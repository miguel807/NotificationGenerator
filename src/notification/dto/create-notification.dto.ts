import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEmail, IsUUID, IsDate, IsBoolean, IsString, IsIn, ValidateIf } from 'class-validator';

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
 
  @ApiProperty()
  @IsOptional()
  @IsString()
  userId?: string; 
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  eventName: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  createdAt: Date;
  
  @ApiProperty()
  @IsBoolean()
  read: boolean;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(NotificationChannel))
  channel: NotificationChannel;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(NotificationType))
  type: NotificationType;
  
  @ApiProperty()
  @ValidateIf(o => o.channel === NotificationChannel.EMAIL)
  @IsNotEmpty()
  @IsEmail()
  email?: string; 
}


