import { Pipe, PipeTransform } from '@angular/core';
import { Season } from '../models/season.enum';

@Pipe({ name: 'seasonLabel' })
export class SeasonPipe implements PipeTransform {
    transform(value: Season): string {
        const map: Record<Season, string> = {
            [Season.SPRING]: 'Primavera',
            [Season.SUMMER]: 'Verano',
            [Season.AUTUMN]: 'Otoño',
            [Season.WINTER]: 'Invierno'
        };
        return map[value] ?? value;
    }
}