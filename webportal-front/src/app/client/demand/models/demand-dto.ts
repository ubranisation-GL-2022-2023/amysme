import { HouseDataSchema } from "./house-schema";

export interface DemandDTO{
    houseData: HouseDataSchema,
    totalBudget: number,
}