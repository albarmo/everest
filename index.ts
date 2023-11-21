import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import morgan from 'morgan'
import routes from './routes'
import errorHandler from './middleware/errorHandler'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const logger = morgan

app.use(cors())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)
app.use(errorHandler)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: '[TCR_Elbrus]: OK' });
});

app.listen(port, () => {
  console.log(`⚡️[TCR_Elbrus]: Server is running at http://localhost:${port}`);
});