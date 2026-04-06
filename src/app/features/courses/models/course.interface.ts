import { Season } from '../../../models/season.enum';
import { LocalizedString } from '../../../models/localize.interface';

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