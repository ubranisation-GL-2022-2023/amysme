import { HouseDataSchema } from "./house-schema";

export interface DemandDTO{
    house: HouseDataSchema,
    budget: number,
}