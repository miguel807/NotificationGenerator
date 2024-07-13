import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from '../application/authUseCase.service';
import { CreateAuthDto } from './create-auth.dto';
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth') // 
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid credentials.' })
  login(@Body() createAuthDto: CreateAuthDto) {
  
    return this.authService.login(createAuthDto);
  }

}
