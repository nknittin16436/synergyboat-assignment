import express from 'express';
import { Container } from 'typescript-ioc';
import { EnergyUsageController } from '../controller/energyusages.controller';
const router = express.Router();


const energyUsageController: EnergyUsageController = Container.get(EnergyUsageController);

router.get("/getTotalEnergyGroupedByStation", (req, res, next) => {
    energyUsageController.totalEnergyGroupedByStationId(req, res, next);
});

router.get("/getTotalMinutesUsedGroupedByDate", (req, res, next) => {
    energyUsageController.totalMinutesUsedGroupedByDate(req, res, next);
});

router.get("/getMostBusyHours", (req, res, next) => {
    energyUsageController.mostBusyHours(req, res, next);
});
router.get("/mapHourlyPortToPortNumber", (req, res, next) => {
    energyUsageController.mapHourlyPortToPortNumber(req, res, next);
});

export { router as energyUsageRouter };