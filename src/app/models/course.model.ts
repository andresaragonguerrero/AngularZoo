import { Season } from './season.enum';

export interface Course {
  id: string;
  name: string;
  description: string;
  season: Season;
  startDate: string; 
  capacity: number;
  price: number;
  isFreeForMembers: boolean;
}