import { IsNumber, IsOptional, IsString } from "class-validator";

export class QueryBasedDto {
  @IsOptional()
  @IsString()
  search?: string; // Pencarian berdasarkan nama

  @IsOptional()
  @IsString()
  type?: string; // Filter berdasarkan tipe

  @IsOptional()
  @IsString()
  sort?: string; // Field untuk sorting

  @IsOptional()
  @IsString()
  order?: 'ASC' | 'DESC'; // Urutan sorting

  @IsOptional()
  @IsNumber()
  limit?: number; // Jumlah item per halaman

  @IsOptional()
  @IsNumber()
  page?: number; // Halaman yang diinginkan
}