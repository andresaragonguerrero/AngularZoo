import { Component } from '@angular/core';

// Componentes
import { ScheduleActivities } from '../../components/schedule-activities/schedule-activities';

@Component({
  selector: 'app-park-info',
  imports: [
    ScheduleActivities,
  ],
  templateUrl: './park-info.html',
  styleUrl: './park-info.scss',
})
export class ParkInfo {

}
