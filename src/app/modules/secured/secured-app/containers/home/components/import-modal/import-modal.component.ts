import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropzoneData } from '../../models/dropzone.model';
import { NomenclatureService } from 'src/libs/services/nomenclature/nomenclature.service';
import { Nomenclature } from 'src/libs/models/nomenclator.model';
import { lastValueFrom } from 'rxjs';
import { ArtificialIntelService } from '../../../services/ai.service';

@Component({
  selector: 'app-import-modal',
  templateUrl: './import-modal.component.html',
  styleUrl: './import-modal.component.scss',
  standalone: false,
})
export class ImportModalComponent implements OnInit {
  userId : number;
  categories: Nomenclature[] = [];
  selectedCategoryId: number;
  loading = false;
  importSuccess = false;
  importError = false;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DropzoneData,
    private nomenclatureService: NomenclatureService,
    private artificialIntelService: ArtificialIntelService
  ) {
    this.userId = Number(localStorage.getItem('id'));
  }

  async ngOnInit() {
    this.categories = await lastValueFrom(this.nomenclatureService.getCategories())
  }
  
  async confirmImport(): Promise<void> {
    if (!this.data.fileName || !this.userId || !this.selectedCategoryId) {
      console.error('Missing required parameters for import');
      return;
    }
  
    this.loading = true;
    this.importSuccess = false;
    this.importError = false;

    const formData = new FormData();
    formData.append('file', this.data.fileName); 
    formData.append('userId', this.userId.toString());
    formData.append('categoryId', this.selectedCategoryId.toString());
  
    this.artificialIntelService.upload(formData).subscribe({
      next: (response) => {
        console.log('Upload successful:', response);
        this.loading = false;
        this.importSuccess = true;
      },
      error: (err) => {
        console.error('Upload failed:', err);
        this.loading = false;
        this.importError = true;
      }
    });
  }

}
