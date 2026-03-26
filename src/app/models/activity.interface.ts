import { Season } from "./season.enum";
import { LocalizedString } from "./localize.interface";

export interface Activity {
    id: string;
    name: LocalizedString;
    description: LocalizedString;
    season: Season;
    daysOfWeek: string[];
    time: string;           
    location: string;
    price: number;
    isFreeForMembers: boolean;
}