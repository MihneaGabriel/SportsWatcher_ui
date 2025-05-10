import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  standalone: false,
})
export class HomePageComponent implements OnInit {
  isSidebarOpen = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.isOpen$.subscribe(state => {
      this.isSidebarOpen = state;
    });
  }
}
