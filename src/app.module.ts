import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { NotificationModule } from './notification/notification.module';
import { AuthModule } from './auth/infrastructure/auth.module';
import { UserModule } from './user/infrastructure/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    synchronize: true,
  }), NotificationModule,AuthModule,UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
