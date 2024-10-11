import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpdateDesktopDto {
  @IsNotEmpty()
  name: string;

  @IsEnum([ 'file', 'folder'])
  type: 'file' | 'folder';

  @IsOptional()
  @IsNumber()
  parent_id?: number;

  @IsOptional()
  @IsNumber()
  size?: number;
}