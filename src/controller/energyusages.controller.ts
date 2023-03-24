import { NextFunction, Request, Response } from "express";
import { Inject } from "typescript-ioc";
import { EnergyUsageService } from "../service/energyusages.service";




export class EnergyUsageController {
    private energyUsageService: EnergyUsageService;

    constructor(@Inject energyUsageService: EnergyUsageService) {
        this.energyUsageService = energyUsageService;
    }

    public async totalEnergyGroupedByStationId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log("totla energy")
            const getTotalEnergyGroupedByStationIdResponse = await this.energyUsageService.getTotalEnergyGroupedByStation();
            res.status(201).json({ getTotalEnergyGroupedByStationIdResponse, message: "Data fetched succesfully" })
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })

        }
    }

    public async totalMinutesUsedGroupedByDate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log("totla energy")
            const getTotalEnergyGroupedByStationIdResponse = await this.energyUsageService.getTotalMinutesUsedGroupedByDate();
            res.status(201).json({ getTotalEnergyGroupedByStationIdResponse, message: "Data fetched succesfully" })
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })

        }
    }

}