import { NextFunction, Request, Response } from "express";
import { Inject } from "typescript-ioc";
import { UserAnalyticsService } from "../service/useranalytics.service";

export class UserAnalyticsController {
    private userAnalyticsService: UserAnalyticsService;

    constructor(@Inject userAnalyticsService: UserAnalyticsService) {
        this.userAnalyticsService = userAnalyticsService;
    }

    public async groupedUserIdByAction(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const groupedUserIdByActionResponse = await this.userAnalyticsService.getGroupedUserIdByAction();
            res.status(201).json({ groupedUserIdByActionResponse, message: "Data fetched succesfully" })
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })

        }
    }

    public async mostActiveUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const mostActiveResponse = await this.userAnalyticsService.getMostActiveUser();
            res.status(201).json({ mostActiveResponse, message: "Data fetched succesfully" })
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })
        }
    }


}