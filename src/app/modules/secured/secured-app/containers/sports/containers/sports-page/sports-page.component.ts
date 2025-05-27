import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { Nomenclature } from 'src/libs/models/nomenclator.model';
import { NomenclatureService } from 'src/libs/services/nomenclature/nomenclature.service';
import { ArtificialIntelService } from '../../../services/ai.service';
import { c } from '@angular/material/dialog.d-B5HZULyo';

@Component({
  selector: 'app-sports-page',
  templateUrl: './sports-page.component.html',
  styleUrl: './sports-page.component.scss',
  standalone: false,
})
export class SportsPageComponent implements OnInit {
  categories: Nomenclature[] = [];
  userId : number;
  selectedCategoryId: number;
  selectedCategory: string;
  aiResponses: any = null;
  isSidebarOpen = false;
  
  constructor( 
    private sidebarService: SidebarService,
    private nomenclatureService: NomenclatureService,
    private artificialIntelService: ArtificialIntelService
  ) {
    this.userId = Number(localStorage.getItem('id'));
  }

  async ngOnInit() {
    this.sidebarService.isOpen$.subscribe(state => {
      this.isSidebarOpen = state;
    });

    this.categories = await lastValueFrom(this.nomenclatureService.getCategories());
  }

  onCategoryChange() {
    const selected = this.categories.find(cat => cat.id == this.selectedCategoryId);
    this.selectedCategory = selected ? selected.value : '';

    this.getAiResponse(this.userId ,this.selectedCategoryId) 
  }

  getAiResponse(userId : number, categoryId: number) {
    if (!userId || !categoryId) {
      console.error('Missing required parameters for AI response');
      return;
    }

    this.artificialIntelService.getAiResponse(userId, categoryId).subscribe({
      next: (data) => {
        this.aiResponses = data;
      },
      error: (err) => {
        console.error('Error fetching AI response:', err);
        this.aiResponses = null;
      }
    });
  }

}
