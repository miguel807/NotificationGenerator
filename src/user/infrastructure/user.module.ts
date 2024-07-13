import { Module } from '@nestjs/common';
import { UserService } from '../application/userUseCase.service';
import { UserController } from './user.controller';
import { UserMySqlRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';


@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService,{
    provide:'UserRepositoryInterface',
    useClass:UserMySqlRepository
  }],
  exports:[UserService]
})
export class UserModule {}
