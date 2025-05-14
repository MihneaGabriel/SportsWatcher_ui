import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SportsRoutingModule } from './sports-routing.module';
import { SportsPageComponent } from './containers/sports-page/sports-page.component';

const declarations = [
  SportsPageComponent,
];

@NgModule({
  declarations,
  imports: [
    CommonModule, 
    SportsRoutingModule
  ],
})
export class SportsModule {}
