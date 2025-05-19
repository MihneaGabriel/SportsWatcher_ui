import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SportsRoutingModule } from './sports-routing.module';
import { SportsPageComponent } from './containers/sports-page/sports-page.component';
import { FormsModule } from '@angular/forms';
import { SwimmingSessionComponent } from './components/swimming-session/swimming-session.component';

const declarations = [
  SportsPageComponent,
  SwimmingSessionComponent
];

@NgModule({
  declarations,
  imports: [
    CommonModule, 
    SportsRoutingModule, 
    FormsModule
  ],
})
export class SportsModule {}
