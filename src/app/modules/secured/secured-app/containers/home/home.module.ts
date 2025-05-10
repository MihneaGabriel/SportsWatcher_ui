import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { DropzoneComponent } from '../dropzone/dropzone.component';
import { ImportModalComponent } from '../import-modal/import-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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
  ],
})
export class HomeModule {}
