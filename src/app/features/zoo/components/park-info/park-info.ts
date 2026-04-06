import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

// Componentes
import { ScheduleActivities } from '../../../activities/components/schedule-activities/schedule-activities';

@Component({
  selector: 'app-park-info',
  imports: [
    CommonModule,
    RouterModule,
    ScheduleActivities,
    TranslateModule,
  ],
  templateUrl: './park-info.html',
  styleUrl: './park-info.scss',
})
export class ParkInfo {

}
