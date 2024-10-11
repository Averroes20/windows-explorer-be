import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { IPagination } from 'src/modules/Options/Interface';
import { QueryBasedDto } from 'src/modules/Options/QueryBased.dto';
import { CreateDesktopDto } from '../dtos/create-desktop.dto';
import { DesktopEntity } from '../entities/desktop.entity';
import { DesktopService } from '../services/desktop.service';

@ApiTags('desktop')
@Controller('desktop')
export class DesktopController {

  constructor(private readonly desktopService: DesktopService){}

  @Post('folder')
  async create(@Body() createDesktopDto: CreateDesktopDto): Promise<DesktopEntity>{
    return this.desktopService.createDesktop(createDesktopDto);
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('parent_id') parent_id?: number): Promise<DesktopEntity>{
    return this.desktopService.uploadFile(file, parent_id);
  }
  
  @Get('all')
  async findAll(@Query() query: QueryBasedDto) {
    return this.desktopService.getAll(query);;
  }
  
  @Get('parentid/:parentId')
  async findByParamId(
    @Param('parentId') parentId: number,
    @Query() query: QueryBasedDto
  ): Promise<[DesktopEntity[], IPagination]> {
    return this.desktopService.getDesktop(parentId, query);
  }

  @Put('update/:id')
  async update(@Param('id') id: number, @Body() updateDesktopDto: CreateDesktopDto): Promise<DesktopEntity> {
    return this.desktopService.updateDesktop(id, updateDesktopDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.desktopService.deleteDesktop(id);
  }
}
