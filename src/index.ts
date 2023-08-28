import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from './items/items.router';
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import mongoDbBootstrap from './bootstrap/mongodbBootstrap';

dotenv.config();

(async () => {
  const app: Express = express();

  await mongoDbBootstrap(process.env.MONGO_DB_URI);

  const whitelist = ['http://localhost:8081', 'http://localhost:8080']; //white list consumers
  const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
  };

  app.use(helmet());
  app.use(cors(corsOptions));
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
})();
