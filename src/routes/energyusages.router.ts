import express from 'express';
import { Container } from 'typescript-ioc';
import { EnergyUsageController } from '../controller/energyusages.controller';
const router = express.Router();


const energyUsageController = Container.get(EnergyUsageController);

router.get("/getTotalEnergyGroupedByStation", (req, res, next) => {
    energyUsageController.totalEnergyGroupedByStationId(req, res, next);
});

router.get("/getTotalMinutesUsedGroupedByDate", (req, res, next) => {
    energyUsageController.totalMinutesUsedGroupedByDate(req, res, next);
});

router.get("/getMostBusyHours", (req, res, next) => {
    energyUsageController.mostBusyHours(req, res, next);
});





// router.route("/register").post(bikeController.registerUser);
// router.route("/login").post(bikeController.loginUser);
export { router as energyUsageRouter };