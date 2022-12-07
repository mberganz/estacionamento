import '../bootstrap';
import { createConnection, Connection } from 'typeorm';
import { Park } from '../app/entities/park.entity';
import { Report } from '../app/entities/report.entity';

async function databaseConnection(): Promise<Connection> {
  const connection = await createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [Park, Report],
    logging: false,
  });

  return connection;
}

export default databaseConnection;
