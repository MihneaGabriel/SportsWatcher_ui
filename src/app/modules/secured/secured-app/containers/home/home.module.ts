import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { DropzoneComponent } from './components/dropzone/dropzone.component';
import { ImportModalComponent } from './components/import-modal/import-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

const declarations = [
  HomePageComponent,
  DropzoneComponent,
  ImportModalComponent
];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    FormsModule,
  ],
})
export class HomeModule {}
