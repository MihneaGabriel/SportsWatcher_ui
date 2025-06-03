import { Component, Input, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { AiSession } from '../../models/ai-session.model';
import { c } from '@angular/material/dialog.d-B5HZULyo';

@Component({
  selector: 'app-swimming-session',
  templateUrl: './swimming-session.component.html',
  styleUrls: ['./swimming-session.component.scss'],
  standalone: false,
})
export class SwimmingSessionComponent implements OnInit {
  @Input() session: AiSession[]= []; 

  parsedSessions: any[] = [];

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  ngOnInit() {
    if (!Array.isArray(this.session)) {
      console.error('Expected session to be an array');
      return;
    }

    this.parsedSessions = this.session.map((entry: any) => {
      try {
        const parsed = typeof entry.jsonResponse === 'string'
          ? JSON.parse(entry.jsonResponse)
          : entry.jsonResponse;

        return {
          ...parsed,
          expanded: false,
          heartRateChart: this.createHeartRateChart(parsed),
          createdAt: new Date(entry.createdAt),
        };
      } catch (e) {
        console.warn('Invalid JSON in entry:', entry);
        return null;
      }
    }).filter(Boolean);
  }

  toggleExpand(session: any) {
    session.expanded = !session.expanded;
  }

  createHeartRateChart(session: any): {
    labels: string[];
    datasets: ChartDataset<'line'>[];
  } | null {
    if (!Array.isArray(session.heart_rate_trends)) return null;

    const labels = session.heart_rate_trends.map(hr => `${hr.time_point}s`);
    const data = session.heart_rate_trends.map(hr => hr.heart_rate);

    return {
      labels,
      datasets: [
        {
          data,
          label: 'Heart Rate (bpm)',
          borderColor: '#ef4444',
          tension: 0.4,
          fill: false,
        },
      ],
    };
  }
}
