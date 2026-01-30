import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// secciones del home
import { Hero } from '../../sections/hero/hero';
import { ParkInfo } from "../../sections/park-info/park-info";
import { Courses } from "../../sections/courses/courses";
import { Activities } from "../../sections/activities/activities";

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    Hero,
    ParkInfo,
    Courses,
    Activities,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {

}