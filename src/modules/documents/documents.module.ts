import { Module } from '@nestjs/common';
import { ControllersController } from './controllers/controllers.controller';
import { ServiceService } from './services/service.service';

@Module({
  controllers: [ControllersController],
  providers: [ServiceService]
})
export class DocumentsModule {}
