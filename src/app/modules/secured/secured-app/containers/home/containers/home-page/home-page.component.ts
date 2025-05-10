import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { DropzoneData } from '../../../models/dropzone.model';
import { MatDialog } from '@angular/material/dialog';
import { ImportModalComponent } from '../../../import-modal/import-modal.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  standalone: false,
})
export class HomePageComponent implements OnInit {
  fileData: DropzoneData;
  isSidebarOpen = false;

  constructor( 
    private sidebarService: SidebarService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.sidebarService.isOpen$.subscribe(state => {
      this.isSidebarOpen = state;
    });
  }

  receiveData(event: DropzoneData){
    this.fileData = event;
    console.log(this.fileData)
  }

  openImportModal() {
    this.dialog.open(ImportModalComponent, {
      width: '400px',
    })
  }
}
