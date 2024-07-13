import { Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt'


import { CreateAuthDto } from '../infrastructure/create-auth.dto';
import { LoginInterface } from '../domain/login.entity';
import { LoginValue } from '../domain/login.value';
import { UserService } from 'src/user/application/userUseCase.service';


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
              private userService:UserService){}

  public async findByEmail():Promise<void>{
    
  }
  async login(userLogin:LoginInterface){
    const payload = new LoginValue(userLogin)
    const user = await this.userService.findOneByEmail(payload.email);


    if(user && user.password === userLogin.password){
        const payload = {email:user.email,role:user.role} 
        const accesToken = await this.jwtService.sign(payload);
     
        return {"access_token": accesToken};
    }
    
    throw new UnauthorizedException("invalid credentials")
    }
    
}
