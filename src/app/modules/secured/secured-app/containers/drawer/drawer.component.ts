import { Component, OnInit } from '@angular/core';
import { DrawerService } from 'src/app/shared/services/drawer.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  standalone: false,
})
export class DrawerComponent implements OnInit {
  isDrawerOpen = false;

  constructor( private drawerService: DrawerService ) {}
  
  ngOnInit() {
    this.drawerService.isOpen$.subscribe( state => {
      this.isDrawerOpen = state;
    })
  }
}
