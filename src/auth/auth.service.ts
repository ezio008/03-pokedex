import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorHandleService } from 'src/common/services/error-handle.service';
import { Logger } from '@nestjs/common/services';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { MailService } from '../mail/mail.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly errorHandle: ErrorHandleService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      delete user.password;

      const token = this.getJwtToken({ id: user.id });
      const confirmToken = this.getJwtToken({
        id: `${user.id}/${user.creationDate.toUTCString()}`,
      });
      //await this.mailService.sendUserConfirmation(user, confirmToken);
      return { ...user, token, confirmToken };
    } catch (error) {
      this.errorHandle.handleDBExpections(error, this.logger);
    }
  }

  async confirmUser(token: string) {
    await this.checkToken(token);
    const res = this.jwtService.decode(token) as JwtPayload;
    const [id, date] = res.id.split('/');

    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not exist');

    if (user.creationDate.toUTCString() !== date)
      throw new BadRequestException('Payload malformed');

    user.isConfirmed = true;
    await user.save();

    return 'ok';
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email });

    console.log(user);

    if (!user) throw new UnauthorizedException('User not exist');

    if (!user.isActive) throw new UnauthorizedException('User inActive');

    if (!user.isConfirmed)
      throw new UnauthorizedException('User not confirmed');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Wrong password');

    return { token: this.getJwtToken({ id: user.id }) };
  }

  async checkAuthStatus(user: User) {
    const { id } = await this.userModel.findOne({ email: user.email });
    return { ...user, token: this.getJwtToken({ id }) };
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async checkToken(token: string) {
    try {
      this.jwtService.verify(token);
    } catch (error) {
      if (error) {
        if (error.name === 'JsonWebTokenError')
          throw new BadRequestException('Token invalid');

        this.logger.error(`Server error on checkToken. Token: ${token}`);
        throw new InternalServerErrorException('Server Error');
      }
    }
  }

  async deactivateUser(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not exist');

    user.isActive = false;

    return user.save();
  }
}
