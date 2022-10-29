import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `${this.configService.get(
      'hostApi',
    )}/auth/confirm?token=${token}`;
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Bienbenido a Misterika!!',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.userName,
        url,
      },
    });
  }
}
