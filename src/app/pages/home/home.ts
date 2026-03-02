import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// secciones del home
import { Hero } from '../../sections/hero/hero';
import { ParkInfo } from "../../sections/park-info/park-info";

// servicios
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    Hero,
    ParkInfo,
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