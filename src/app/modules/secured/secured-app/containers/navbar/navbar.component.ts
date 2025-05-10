import { Component, OnInit } from '@angular/core';
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false,
})
export class NavbarComponent implements OnInit {
  constructor( 
    private sidebarService : SidebarService,
    private drawerService: DrawerService
  ) {}

  ngOnInit() {
    if( window.innerWidth <= 768 ){
      this.sidebarService.setSidebar(true);
    }
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  toggleDrawer() {
    this.drawerService.toggleDrawer();
  }
  
}
