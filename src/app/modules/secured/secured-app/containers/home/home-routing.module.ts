import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./containers/home-page/home-page.component";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Home',

  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}