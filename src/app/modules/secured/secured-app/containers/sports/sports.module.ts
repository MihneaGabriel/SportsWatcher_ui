import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SportsRoutingModule } from './sports-routing.module';
import { SportsPageComponent } from './containers/sports-page/sports-page.component';
import { FormsModule } from '@angular/forms';
import { SwimmingSessionComponent } from './components/swimming-session/swimming-session.component';
import { BaseChartDirective } from 'ng2-charts';
import { CategoryScale, Chart, Filler, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { RunningSessionComponent } from './components/running-session/running-session.component';

Chart.register(
  Filler,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

const declarations = [
  SportsPageComponent,
  SwimmingSessionComponent,
  RunningSessionComponent,
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
