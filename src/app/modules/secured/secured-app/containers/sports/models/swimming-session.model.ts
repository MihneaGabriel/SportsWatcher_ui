export interface SwimmingSession {
  total_distance?: number;
  total_time?: number;
  average_pace?: number;
  max_pace?: number;

  heart_rate_trends?: {
    time_interval: number;
    heart_rate: number;
  }[];

  rest_periods?: {
    start_time: number;
    end_time: number;
  }[];

  stroke_consistency?: {
    cadence?: number;
    motion_frequency?: number;
  };

  summary?: {
    start?: string;
    middle?: string;
    end?: string;
  };

  technique_suggestions?: {
    suggestion: string;
    impact?: string;
  }[];
}
