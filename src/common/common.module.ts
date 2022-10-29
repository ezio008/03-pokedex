import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';
import { ErrorHandleService } from './services/error-handle.service';

@Module({
  providers: [AxiosAdapter, ErrorHandleService],
  exports: [AxiosAdapter, ErrorHandleService],
})
export class CommonModule {}
