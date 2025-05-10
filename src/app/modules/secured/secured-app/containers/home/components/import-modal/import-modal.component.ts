import { Component } from '@angular/core';

@Component({
  selector: 'app-import-modal',
  templateUrl: './import-modal.component.html',
  styleUrl: './import-modal.component.scss',
  standalone: false,
})
export class ImportModalComponent {
  
  confirmImport() {
    console.log('Mock import action')
  }
}
