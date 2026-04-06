import { Season } from "../../../models/season.enum";
import { LocalizedString } from "../../../models/localize.interface";

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