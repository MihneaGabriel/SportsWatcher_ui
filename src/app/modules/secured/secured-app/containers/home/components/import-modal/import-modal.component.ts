import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropzoneData } from '../../models/dropzone.model';

@Component({
  selector: 'app-import-modal',
  templateUrl: './import-modal.component.html',
  styleUrl: './import-modal.component.scss',
  standalone: false,
})
export class ImportModalComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: DropzoneData) {
    console.log('Received file data:', data);
  }
  
  
  
  confirmImport() {
    console.log('Mock import action')
  }
}
