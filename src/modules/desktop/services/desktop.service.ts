import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as fs from 'fs';
import * as path from 'path';
import { IPagination } from "src/modules/Options/Interface";
import { QueryBasedDto } from "src/modules/Options/QueryBased.dto";
import { Repository } from "typeorm";
import { DesktopEntity } from "../entities/desktop.entity";
import { CreateDesktopParams, UpdateDesktopParams } from "../utils/types";

@Injectable()
export class DesktopService {
  constructor(
    @InjectRepository(DesktopEntity) private readonly desktopRepository: Repository<DesktopEntity>,
  ) {}

  async createDesktop(createDesktopDto: CreateDesktopParams): Promise<DesktopEntity>{

    if(createDesktopDto.parent_id){
      const parentFolder = await this.desktopRepository.findOneBy({id: createDesktopDto.parent_id});

      if(!parentFolder){
        throw new BadRequestException("Parent folder not found");
      } 

      if(parentFolder.type !== 'folder'){
        throw new BadRequestException("Cannot set parent_id to a non folder type.");
      }
    }

    const desktop = this.desktopRepository.create({
      ...createDesktopDto,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return await this.desktopRepository.save(desktop);
  }

  async uploadFile(file: Express.Multer.File, parent_id?: number): Promise<DesktopEntity> {
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, file.originalname);

    fs.writeFileSync(uploadPath, file.buffer);

    const desktopEntity = new DesktopEntity();
    desktopEntity.name = file.originalname;
    desktopEntity.size = file.size;
    desktopEntity.type = 'file';

    if (parent_id) {
      const parentFolder = await this.desktopRepository.findOne({ where: { id: parent_id } });
      
      if (!parentFolder) {
        throw new BadRequestException("Parent folder not found.");
      }

      if (parentFolder.type !== 'folder') {
        throw new BadRequestException("Cannot set parent_id to a file type.");
      }

      desktopEntity.parent_id = parent_id;
    } else {
      desktopEntity.parent_id = null;
    }

    desktopEntity.created_at = new Date();
    desktopEntity.updated_at = new Date();

    // Simpan metadata ke database
    return this.desktopRepository.save(desktopEntity);
  } 
  
  async getAll(query: QueryBasedDto): Promise<[DesktopEntity[], IPagination]> {
    const qb = this.desktopRepository.createQueryBuilder('desktop');

    qb.where('desktop.parent_id IS NULL');

    if (query.search) {
      qb.andWhere('desktop.name LIKE :search', { search: `%${query.search}%` });
    }

    if (query.type) {
      qb.andWhere('desktop.type = :type', { type: query.type });
    }

    if (query.sort && query.order) {
      qb.orderBy(`desktop.${query.sort}`, query.order.toUpperCase() as 'ASC' | 'DESC');
    }

    if (query.limit && query.page) {
      qb.take(query.limit);
      qb.skip((query.page - 1) * query.limit);
    }

    const [data, total] = await qb.getManyAndCount();

    const pagination: IPagination = {
      page: query.page || 1,
      size: data.length,
      rows_per_page: query.limit || data.length,
      total,
    };

    return [data, pagination];
  }

  async getDesktop(parentId?: number, query?: QueryBasedDto): Promise<[DesktopEntity[], IPagination]> {
    const qb = this.desktopRepository.createQueryBuilder('desktop');
  
    qb.where('desktop.parent_id = :parentId', { parentId });
  
    if (query?.search) {
      qb.andWhere('desktop.name LIKE :search', { search: `%${query.search}%` });
    }
  
    if (query?.type) {
      qb.andWhere('desktop.type = :type', { type: query.type });
    }
  
    // Sorting
    if (query?.sort && query.order) {
      qb.orderBy(`desktop.${query.sort}`, query.order.toUpperCase() as 'ASC' | 'DESC');
    }
  
    // Pagination
    if (query?.limit && query.page) {
      qb.take(query.limit);
      qb.skip((query.page - 1) * query.limit);
    }
  
    const [data, total] = await qb.getManyAndCount();
  
    const pagination: IPagination = {
      page: query?.page || 1,
      size: data.length,
      rows_per_page: query?.limit || data.length,
      total,
    };
  
    return [data, pagination]; // Kembalikan data dan informasi pagination
  }
  

  async updateDesktop(id: number, updateDesktopDto: UpdateDesktopParams): Promise<DesktopEntity>{
    await this.desktopRepository.update(id, {
      ...updateDesktopDto,
      updated_at: new Date(),
    });

    return await this.desktopRepository.findOne({ where: {id}});
  }

  async deleteDesktop(id: number): Promise<void> {
    await this.desktopRepository.delete(id);
  }
}