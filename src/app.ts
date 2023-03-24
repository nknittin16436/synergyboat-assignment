import express, { Express } from 'express';
import { energyUsageRouter } from './routes/energyusages.router';
import { userAnalyticsRouter } from './routes/useranalytics.router';


const app: Express = express();

app.use("/api/v1", energyUsageRouter);
app.use("/api/v1", userAnalyticsRouter);


export default app;