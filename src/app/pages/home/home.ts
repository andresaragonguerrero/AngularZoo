import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// secciones del home
import { Hero } from '../../components/hero/hero';
import { ParkInfo } from '../../components/park-info/park-info';
import { DailyAnimal } from '../../components/daily-animal/daily-animal';
import { ActivityComponent } from '../activities/activities';

// servicios
import { HeaderService } from '../../services/header.service';

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