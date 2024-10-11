import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/database.providers';
import { DesktopModule } from './modules/desktop/desktop.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { DownloadModule } from './modules/download/download.module';
import { PicturesModule } from './modules/pictures/pictures.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    DownloadModule, 
    DesktopModule, 
    PicturesModule, 
    DocumentsModule,
  ],
})
export class AppModule {}
