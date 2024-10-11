import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesktopController } from './controllers/desktop.controller';
import { DesktopEntity } from './entities/desktop.entity';
import { DesktopService } from './services/desktop.service';

@Module({
  imports: [TypeOrmModule.forFeature([DesktopEntity])],
  controllers: [DesktopController],
  providers: [DesktopService],
})
export class DesktopModule {}
