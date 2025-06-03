import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SportsRoutingModule } from './sports-routing.module';
import { SportsPageComponent } from './containers/sports-page/sports-page.component';
import { FormsModule } from '@angular/forms';
import { SwimmingSessionComponent } from './components/swimming-session/swimming-session.component';
import { BaseChartDirective } from 'ng2-charts';
import { BarController, BarElement, CategoryScale, Chart, Filler, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { RunningSessionComponent } from './components/running-session/running-session.component';
import { CyclingSessionComponent } from './components/cycling-session/cycling-session.component';

Chart.register(
  Filler,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  BarController,
  BarElement,
  CategoryScale,
  Tooltip,
  Legend
);

const declarations = [
  SportsPageComponent,
  SwimmingSessionComponent,
  RunningSessionComponent,
  CyclingSessionComponent,
];

@NgModule({
  declarations,
  imports: [
    CommonModule, 
    SportsRoutingModule, 
    FormsModule,
    BaseChartDirective,
  ],
})
export class SportsModule {}
