import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Componentes
import { ScheduleActivities } from '../../components/schedule-activities/schedule-activities';

@Component({
  selector: 'app-park-info',
  imports: [
    CommonModule,
    RouterModule,
    ScheduleActivities,
  ],
  templateUrl: './park-info.html',
  styleUrl: './park-info.scss',
})
export class ParkInfo {

}
