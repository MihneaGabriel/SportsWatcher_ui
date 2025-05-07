import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false,
})
export class NavbarComponent implements OnInit {
  constructor( private sidebarService : SidebarService) {}

  ngOnInit() {
    if( window.innerWidth <= 768 ){
      this.sidebarService.setSidebar(true);
    }
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
  
}
