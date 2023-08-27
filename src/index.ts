import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from './items/items.router';
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();

const app: Express = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.use('/api/menu/items', itemsRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server#2');
});

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});