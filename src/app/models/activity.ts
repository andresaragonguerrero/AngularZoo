import { Season } from "./season.enum";

export interface Activity {
    id: string;
    name: string;
    description: string;
    season: Season;
    daysOfWeek: string[];
    time: string;           
    location: string;
    price: number;
    isFreeForMembers: boolean;
}