export interface TimeframeData {
  timeframe: '7d' | '30d' | '90d' | '12m';
  label: string;
  totalEnrollment: number;
  completedCourses: number;
  conversionRate: number; // percentage
  totalRevenue: number; // in INR
  enrollmentTrend: { period: string; count: number; completed: number }[];
  courseEnrollments: { courseName: string; count: number; sharePercent: number }[];
  monthlyRevenue: { month: string; revenue: number }[];
}

export const ANALYTICS_DATA: Record<'7d' | '30d' | '90d' | '12m', TimeframeData> = {
  '7d': {
    timeframe: '7d',
    label: 'Last 7 Days',
    totalEnrollment: 42,
    completedCourses: 28,
    conversionRate: 64.2,
    totalRevenue: 154200,
    enrollmentTrend: [
      { period: 'Mon', count: 5, completed: 3 },
      { period: 'Tue', count: 8, completed: 5 },
      { period: 'Wed', count: 6, completed: 4 },
      { period: 'Thu', count: 7, completed: 5 },
      { period: 'Fri', count: 9, completed: 6 },
      { period: 'Sat', count: 4, completed: 3 },
      { period: 'Sun', count: 3, completed: 2 }
    ],
    courseEnrollments: [
      { courseName: 'Computer App. & Data Entry', count: 12, sharePercent: 28.5 },
      { courseName: 'Mobile Phone Repairing', count: 9, sharePercent: 21.4 },
      { courseName: 'Electrical Technician', count: 7, sharePercent: 16.7 },
      { courseName: 'Tally Prime with GST', count: 6, sharePercent: 14.3 },
      { courseName: 'Tailoring & Garment', count: 5, sharePercent: 11.9 },
      { courseName: 'Others', count: 3, sharePercent: 7.2 }
    ],
    monthlyRevenue: [
      { month: 'Oct 17', revenue: 19800 },
      { month: 'Oct 18', revenue: 26400 },
      { month: 'Oct 19', revenue: 21200 },
      { month: 'Oct 20', revenue: 25600 },
      { month: 'Oct 21', revenue: 32000 },
      { month: 'Oct 22', revenue: 16200 },
      { month: 'Oct 23', revenue: 13000 }
    ]
  },
  '30d': {
    timeframe: '30d',
    label: 'Last 30 Days',
    totalEnrollment: 178,
    completedCourses: 134,
    conversionRate: 68.7,
    totalRevenue: 648000,
    enrollmentTrend: [
      { period: 'Week 1', count: 38, completed: 28 },
      { period: 'Week 2', count: 46, completed: 35 },
      { period: 'Week 3', count: 51, completed: 39 },
      { period: 'Week 4', count: 43, completed: 32 }
    ],
    courseEnrollments: [
      { courseName: 'Computer App. & Data Entry', count: 48, sharePercent: 27.0 },
      { courseName: 'Mobile Phone Repairing', count: 37, sharePercent: 20.8 },
      { courseName: 'Electrical Technician', count: 31, sharePercent: 17.4 },
      { courseName: 'Tally Prime with GST', count: 26, sharePercent: 14.6 },
      { courseName: 'Tailoring & Garment', count: 21, sharePercent: 11.8 },
      { courseName: 'Others', count: 15, sharePercent: 8.4 }
    ],
    monthlyRevenue: [
      { month: 'Week 1', revenue: 142000 },
      { month: 'Week 2', revenue: 169000 },
      { month: 'Week 3', revenue: 184000 },
      { month: 'Week 4', revenue: 153000 }
    ]
  },
  '90d': {
    timeframe: '90d',
    label: 'Last Quarter (90 Days)',
    totalEnrollment: 512,
    completedCourses: 398,
    conversionRate: 71.4,
    totalRevenue: 1876000,
    enrollmentTrend: [
      { period: 'Month 1', count: 152, completed: 118 },
      { period: 'Month 2', count: 176, completed: 138 },
      { period: 'Month 3', count: 184, completed: 142 }
    ],
    courseEnrollments: [
      { courseName: 'Computer App. & Data Entry', count: 142, sharePercent: 27.7 },
      { courseName: 'Mobile Phone Repairing', count: 108, sharePercent: 21.1 },
      { courseName: 'Electrical Technician', count: 86, sharePercent: 16.8 },
      { courseName: 'Tally Prime with GST', count: 74, sharePercent: 14.5 },
      { courseName: 'Tailoring & Garment', count: 59, sharePercent: 11.5 },
      { courseName: 'Others', count: 43, sharePercent: 8.4 }
    ],
    monthlyRevenue: [
      { month: 'Aug', revenue: 580000 },
      { month: 'Sep', revenue: 648000 },
      { month: 'Oct', revenue: 648000 }
    ]
  },
  '12m': {
    timeframe: '12m',
    label: 'Full Year (12 Months)',
    totalEnrollment: 1860,
    completedCourses: 1490,
    conversionRate: 74.2,
    totalRevenue: 6842000,
    enrollmentTrend: [
      { period: 'Nov', count: 120, completed: 92 },
      { period: 'Dec', count: 134, completed: 104 },
      { period: 'Jan', count: 148, completed: 118 },
      { period: 'Feb', count: 142, completed: 112 },
      { period: 'Mar', count: 160, completed: 128 },
      { period: 'Apr', count: 172, completed: 138 },
      { period: 'May', count: 165, completed: 132 },
      { period: 'Jun', count: 155, completed: 125 },
      { period: 'Jul', count: 168, completed: 136 },
      { period: 'Aug', count: 152, completed: 122 },
      { period: 'Sep', count: 176, completed: 140 },
      { period: 'Oct', count: 168, completed: 143 }
    ],
    courseEnrollments: [
      { courseName: 'Computer App. & Data Entry', count: 512, sharePercent: 27.5 },
      { courseName: 'Mobile Phone Repairing', count: 395, sharePercent: 21.2 },
      { courseName: 'Electrical Technician', count: 310, sharePercent: 16.7 },
      { courseName: 'Tally Prime with GST', count: 268, sharePercent: 14.4 },
      { courseName: 'Tailoring & Garment', count: 215, sharePercent: 11.6 },
      { courseName: 'Others', count: 160, sharePercent: 8.6 }
    ],
    monthlyRevenue: [
      { month: 'Nov', revenue: 440000 },
      { month: 'Dec', revenue: 492000 },
      { month: 'Jan', revenue: 544000 },
      { month: 'Feb', revenue: 522000 },
      { month: 'Mar', revenue: 588000 },
      { month: 'Apr', revenue: 632000 },
      { month: 'May', revenue: 606000 },
      { month: 'Jun', revenue: 570000 },
      { month: 'Jul', revenue: 618000 },
      { month: 'Aug', revenue: 558000 },
      { month: 'Sep', revenue: 648000 },
      { month: 'Oct', revenue: 624000 }
    ]
  }
};
