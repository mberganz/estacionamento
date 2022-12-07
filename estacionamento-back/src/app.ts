import './bootstrap';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import databaseConnection from './database/connection';

async function App() {
  const app = express();
  const connection = await databaseConnection();
  app.use(express.json());
  app.use(cors());
  app.use(routes);
  return { app, connection };
}

export default App;
