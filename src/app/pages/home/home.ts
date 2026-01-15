import { Component } from '@angular/core';
import { Hero } from "../../sections/hero/hero";
import { TicketPurchase } from "../../sections/ticket-purchase/ticket-purchase";
import { ParkInfo } from "../../sections/park-info/park-info";
import { Courses } from "../../sections/courses/courses";
import { Activities } from "../../sections/activities/activities";

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    TicketPurchase,
    ParkInfo,
    Courses,
    Activities,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {

}
