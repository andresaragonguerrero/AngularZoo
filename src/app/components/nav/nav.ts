import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [
    RouterLink,
    RouterModule,
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  @Output() linkClicked = new EventEmitter<void>();

  onClick(): void {
    this.linkClicked.emit();
  }
}
