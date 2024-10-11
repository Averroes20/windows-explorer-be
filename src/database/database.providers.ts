import { DesktopEntity } from 'src/modules/desktop/entities/desktop.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource ({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '12345678',
  database: 'explorer_database',
  entities: [DesktopEntity],
  synchronize: true,
});