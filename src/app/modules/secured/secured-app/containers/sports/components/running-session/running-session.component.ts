import { Component, Input, OnInit } from '@angular/core';
import { AiSession } from '../../models/ai-session.model';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-running-session',
  templateUrl: './running-session.component.html',
  styleUrl: './running-session.component.scss',
  standalone: false,

})
export class RunningSessionComponent implements OnInit {
  @Input() session: AiSession[] = [];

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
          splitsChart: this.createSplitsChart(parsed),
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

  createSplitsChart(session: any): {
    labels: string[];
    datasets: ChartDataset<'line'>[];
  } | null {
    if (!Array.isArray(session.splits)) return null;

    const labels = session.splits.map((_, index) => `Split ${index + 1}`);
    const data = session.splits.map(split => split.pace);

    return {
      labels,
      datasets: [
        {
          data,
          label: 'Pace (sec/km)',
          borderColor: '#3b82f6', 
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.3,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  }


}
