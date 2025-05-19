import { Component, Input, OnChanges } from '@angular/core';
import { SwimmingSession } from '../../models/swimming-session.model';

@Component({
  selector: 'app-swimming-session',
  templateUrl: './swimming-session.component.html',
  styleUrl: './swimming-session.component.scss',
  standalone: false,
})
export class SwimmingSessionComponent implements OnChanges {
  @Input() session: SwimmingSession;

  heartRateData = [];
  heartRateLabels = [];

  ngOnChanges() {
    if(this.session?.heart_rate_trends?.length) {
      this.heartRateLabels = this.session.heart_rate_trends.map(h => h.time_interval + 's');
      this.heartRateData = [{
        data: this.session.heart_rate_trends.map(h => h.heart_rate),
        label: 'Heart Rate'
      }];
    }
  }

}
