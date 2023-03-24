import express, { Express } from 'express';
import { energyUsageRouter } from './routes/energyusages.router';


const app: Express = express();

app.use("/api/v1", energyUsageRouter);


export default app;