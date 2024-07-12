import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5444,
    username: 'enterprisedb',
    password: 'admin',
    database: 'prueba',
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    synchronize: true,
  }), NotificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
