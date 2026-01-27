import { Component } from '@angular/core';
import { Header } from "../header/header";

@Component({
  selector: 'app-hero',
  imports: [Header],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {

}
