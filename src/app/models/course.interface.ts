import { Season } from './season.enum';
import { LocalizedString } from './localize.interface';

export interface Course {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  season: Season;
  startDate: string;
  capacity: number;
  price: number;
  isFreeForMembers: boolean;
}