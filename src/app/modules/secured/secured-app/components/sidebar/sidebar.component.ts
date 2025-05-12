import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: false
})
export class SidebarComponent implements OnInit {
  isOpen = false;

  constructor( private sidebarService: SidebarService ) {}

  ngOnInit() {
    this.sidebarService.isOpen$.subscribe( state => {
      this.isOpen = state;
    })
  }
}
