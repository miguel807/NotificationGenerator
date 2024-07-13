import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../application/authUseCase.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/infrastructure/user.module';

@Module({
  imports:[
    UserModule,
    PassportModule.register({defaultStrategy:'jwt'})
    ,JwtModule.register({
    secret: "jwt-secret", 
    signOptions:{
      expiresIn:3600,
    }
  })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[JwtModule]
})
export class AuthModule {}
