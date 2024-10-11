import { Module } from '@nestjs/common';
import { DownloadController } from './controllers/download.controller';
import { ServicesService } from './services/services.service';

@Module({
  controllers: [DownloadController],
  providers: [ServicesService]
})
export class DownloadModule {}
