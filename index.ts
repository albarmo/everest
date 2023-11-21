import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({message:'[TCR_Elbrus]: OK'});
});

app.listen(port, () => {
  console.log(`⚡️[TCR_Elbrus]: Server is running at http://localhost:${port}`);
});