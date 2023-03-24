import express from 'express';
import { Container } from 'typescript-ioc';
import { UserAnalyticsController } from '../controller/useranalytics.controller';
const router = express.Router();


const userAnalyticsController: UserAnalyticsController = Container.get(UserAnalyticsController);

router.get("/getGroupedUserIdByAction", (req, res, next) => {
    userAnalyticsController.groupedUserIdByAction(req, res, next);
});

router.get("/mostActiveUser", (req, res, next) => {
    userAnalyticsController.mostActiveUser(req, res, next);
});

export { router as userAnalyticsRouter };