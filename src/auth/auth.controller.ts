import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './decorators';
import { GetUser } from './decorators/get-user.decorator';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-auth-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('confirm')
  confirmUser(@Query('token') token) {
    return this.authService.confirmUser(token);
  }

  @Delete('deactivate/:id')
  @Auth(ValidRoles.admin)
  deactivateUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.authService.deactivateUser(id);
  }
}
