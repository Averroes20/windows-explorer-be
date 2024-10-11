import { Module } from '@nestjs/common';
import { ControllerController } from './controllers/controller.controller';
import { ServiceService } from './services/service.service';

@Module({
  controllers: [ControllerController],
  providers: [ServiceService]
})
export class PicturesModule {}
