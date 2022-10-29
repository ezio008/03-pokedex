import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './entities/user.entity';
import { CommonModule } from 'src/common/common.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { MailModule } from 'src/mail/mail.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    CommonModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),

    JwtModule.registerAsync({
      imports: [ConfigModule, MailModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwtSecret'),
        signOptions: {
          expiresIn: '60d',
        },
      }),
    }),
    MailModule,
  ],
  exports: [MongooseModule, JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
