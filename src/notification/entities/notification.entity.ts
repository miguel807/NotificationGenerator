import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";





export enum NotificationChannel {
    SMS = 'SMS',
    EMAIL = 'EMAIL',
    SYSTEM = 'SYSTEM',
    PUSH = 'PUSH',
    WHATSAPP = 'WHATSAPP',
  }

export enum NotificationType {
    INSTANT = 'INSTANT',
    BATCH = 'BATCH',
  }
  
  
@Entity()
export class Notification {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    userId?: string; 
  
    @Column()
    eventName: string;
  
    @Column()
    content: string;
  
    @Column()
    createdAt: Date;
  
    @Column({ default: false })
    read: boolean;
  
    @Column({ type: 'enum', enum: NotificationChannel })
    channel: NotificationChannel;
  
    @Column({ type: 'enum', enum: NotificationType })
    type: NotificationType; 
  
    @Column({ nullable: true })
    email?: string; 
  
}
