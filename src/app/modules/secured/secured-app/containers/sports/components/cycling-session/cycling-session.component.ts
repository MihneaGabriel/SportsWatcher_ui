import { Component, Input, OnInit } from '@angular/core';
import { AiSession } from '../../models/ai-session.model';
import { ChartDataset } from 'chart.js';

@Component({
  selector: 'app-cycling-session',
  templateUrl: './cycling-session.component.html',
  styleUrl: './cycling-session.component.scss',
  standalone: false,
})
export class CyclingSessionComponent implements OnInit {
  @Input() session: AiSession[] = [];

  parsedSessions: any[] = [];

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'High Effort Periods'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
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
          effortChart: this.createEffortChartData(parsed),
          createdAt: new Date(entry.createdAt),
        };
      } catch (e) {
        console.warn('Invalid JSON in entry:', entry);
        return null;
      }
    }).filter(Boolean);

    console.log('Parsed Sessions:', this.parsedSessions);
  }
  
  toggleExpand(session: any) {
    session.expanded = !session.expanded;
  }

  createEffortChartData(session: any): {
      labels: string[];
      datasets: ChartDataset<'bar'>[];
    } | null {
      if (!Array.isArray(session.high_effort_periods)) return null;
    
    const labels = session.high_effort_periods.map((_: any, index: number) => `Effort ${index + 1}`);
    const powerData = session.high_effort_periods.map((effort: any) => effort.power_output);
    const cadenceData = session.high_effort_periods.map((effort: any) => effort.cadence);

    return {
      labels,
      datasets: [
        {
          label: 'Power Output (W)',
          data: powerData,
          backgroundColor: '#42A5F5'
        },
        {
          label: 'Cadence (rpm)',
          data: cadenceData,
          backgroundColor: '#66BB6A'
        }
      ]
    };
  } 
}
