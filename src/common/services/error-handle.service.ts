import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Logger } from '@nestjs/common/services';

@Injectable()
export class ErrorHandleService {
  handleDBExpections(error: any, logger: Logger) {
    if (error.code === 11000) {
      throw new BadRequestException(`Register exist key`);
    }
    logger.error(error);

    throw new InternalServerErrorException(
      `Can't create registre - Check server logs`,
    );
  }
}
