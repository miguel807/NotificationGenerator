import { CreateNotificationDto } from "../dto/create-notification.dto";
import { UpdateNotificationDto } from "../dto/update-notification.dto";
import { Notification } from "../entities/notification.entity";

export interface INotificationRepository {
    create(notification: CreateNotificationDto): Promise<Notification>;
    findAll(): Promise<Notification[]>;
    findOne(id: number): Promise<Notification>;
    update(id: number, updateNotificationDto: UpdateNotificationDto): Promise<Notification>;
    remove(id: number): Promise<void>;
    findByUserId(userId: string): Promise<Notification[]>; // Método para encontrar notificaciones por usuario
    markAsRead(id: number): Promise<Notification>;
    markAsUnread(id: number): Promise<Notification>;
  }