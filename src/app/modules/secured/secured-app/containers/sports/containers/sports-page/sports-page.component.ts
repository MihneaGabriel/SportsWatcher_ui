import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-sports-page',
  templateUrl: './sports-page.component.html',
  styleUrl: './sports-page.component.scss',
  standalone: false,
})
export class SportsPageComponent implements OnInit {
  isSidebarOpen = false;

  constructor( 
    private sidebarService: SidebarService,
  ) {}

  ngOnInit() {
    this.sidebarService.isOpen$.subscribe(state => {
      this.isSidebarOpen = state;
    });
  }
}
