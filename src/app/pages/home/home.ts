import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// secciones del home
import { Hero } from '../../shared/components/hero/hero';
import { ParkInfo } from '../../features/zoo/components/park-info/park-info';
import { DailyAnimal } from '../../features/animals/components/daily-animal/daily-animal';
import { ActivityComponent } from '../../features/activities/pages/activities/activities';

// servicios
import { HeaderService } from '../../shared/services/header.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    Hero,
    ParkInfo,
    DailyAnimal,
    ActivityComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnDestroy, OnInit {
  headerService = inject(HeaderService);

  ngOnInit() {
    this.headerService.setMode('fixed');
  }

  ngOnDestroy() {
    this.headerService.setMode('sticky');
  }
}