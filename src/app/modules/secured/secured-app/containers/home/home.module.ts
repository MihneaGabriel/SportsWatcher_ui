import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';

const declarations = [
  HomePageComponent
];

@NgModule({
  declarations,
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
})
export class HomeModule {}
