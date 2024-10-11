import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UploadFileDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  type: 'file' | 'folder';

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  parent_id?: number;

  @ApiProperty()
  @IsNotEmpty()
  size: number;
}