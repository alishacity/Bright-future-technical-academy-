import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Award, Clock, ArrowUpRight, AlertCircle, RefreshCw } from 'lucide-react';
import { ANALYTICS_DATA, TimeframeData } from '../data/mockAnalytics';
import { formatINR } from '../data/coursesData';

export const AnalyticsDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '12m'>('30d');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [liveSimulationActive, setLiveSimulationActive] = useState<boolean>(false);
  const [simulatedBonus, setSimulatedBonus] = useState<number>(0);

  const data: TimeframeData = ANALYTICS_DATA[timeframe];

  // Dynamic values that update if user tests live simulation
  const displayEnrollments = data.totalEnrollment + simulatedBonus;
  const displayRevenue = data.totalRevenue + simulatedBonus * 3700;

  const handleSimulate = () => {
    setLiveSimulationActive(true);
    setSimulatedBonus((prev) => prev + 1);
    setTimeout(() => setLiveSimulationActive(false), 800);
  };

  // Coordinates for trend line
  const maxTrend = Math.max(...data.enrollmentTrend.map((t) => t.count), 1);
  const chartHeight = 160;
  const chartWidth = 500;
  const points = data.enrollmentTrend.map((item, idx) => {
    const x = (idx / (data.enrollmentTrend.length - 1 || 1)) * (chartWidth - 60) + 30;
    const y = chartHeight - (item.count / maxTrend) * (chartHeight - 40) - 20;
    return { x, y, ...item };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  return (
    <section id="analytics" className="py-16 sm:py-20 bg-slate-900 text-white border-b border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header with Demo Data Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#e5c46d] mb-2 bg-[#0a2240] px-3 py-1 rounded-md border border-[#c99b2e]/40">
              <TrendingUp className="w-3.5 h-3.5 text-[#e5c46d]" />
              <span>LIVE ENROLLMENT & REVENUE ANALYTICS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-title text-white tracking-tight">
              Institute Performance Dashboard
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Simulation button */}
            <button
              onClick={handleSimulate}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                liveSimulationActive
                  ? 'bg-[#c99b2e] text-[#0a2240] border-[#c99b2e] scale-95'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              title="Test real-time chart animation locally"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${liveSimulationActive ? 'animate-spin' : ''}`} />
              <span>Simulate New Enrollment (+1)</span>
            </button>

            {/* Timeframe Filter Buttons */}
            <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-lg border border-slate-700">
              {(['7d', '30d', '90d', '12m'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => { setTimeframe(tf); setHoveredPoint(null); }}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    timeframe === tf
                      ? 'bg-[#145da0] text-white font-bold shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tf.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Transparent Demo Data Disclaimer */}
        <div className="mb-8 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3 text-xs text-amber-200/90">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-amber-300 font-semibold">Important Data Integrity Disclosure (Demo Data): </strong>
            All student enrollments, completion metrics, and revenue figures shown on this dashboard are illustrative sample data for demonstration. In production, figures are calculated strictly from recorded payment gateway transactions and active batch enrollments.
          </div>
        </div>

        {/* 4 Primary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
              <span>Total Enrolled</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <div className="text-3xl font-black font-mono text-white tracking-tight">
                {displayEnrollments.toLocaleString('en-IN')}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 mt-1 font-medium">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+14.8% vs previous {data.label}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
              <span>Completed & Certified</span>
              <Award className="w-4 h-4 text-[#e5c46d]" />
            </div>
            <div>
              <div className="text-3xl font-black font-mono text-white tracking-tight">
                {data.completedCourses.toLocaleString('en-IN')}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                <span>Verified credentials issued</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
              <span>Conversion Rate</span>
              <BarChart3 className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-3xl font-black font-mono text-white tracking-tight">
                {data.conversionRate}%
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                <span>Inquiry to confirmed admission</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
              <span>Total Revenue (Demo)</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-3xl font-black font-mono text-[#e5c46d] tracking-tight">
                {formatINR(displayRevenue)}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                <span>Subject to recorded payments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dual Chart Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Enrollment Trend Interactive Line Chart (7 cols) */}
          <div className="lg:col-span-7 bg-slate-800/90 rounded-2xl p-6 border border-slate-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Enrollment Trend Activity</h3>
                  <span className="text-xs text-slate-400">Timeframe: {data.label} (Interactive points)</span>
                </div>
                <span className="text-[11px] bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded">
                  Live View
                </span>
              </div>

              {/* SVG Line Chart */}
              <div className="relative w-full aspect-16/7 bg-slate-900/60 rounded-xl p-3 border border-slate-700/50 flex items-center justify-center">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#145da0" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#145da0" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  {[0.25, 0.5, 0.75, 1].map((lvl, i) => (
                    <line
                      key={i}
                      x1="20"
                      y1={chartHeight - lvl * (chartHeight - 30)}
                      x2={chartWidth - 20}
                      y2={chartHeight - lvl * (chartHeight - 30)}
                      stroke="#334155"
                      strokeDasharray="4 4"
                      strokeWidth="0.8"
                    />
                  ))}

                  {/* Shaded Area */}
                  <path d={areaD} fill="url(#areaGradient)" />

                  {/* Trend Line */}
                  <path d={pathD} fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Data Point Circles */}
                  {points.map((pt, idx) => (
                    <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredPoint(idx)}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={hoveredPoint === idx ? 6 : 4}
                        fill={hoveredPoint === idx ? '#e5c46d' : '#38bdf8'}
                        stroke="#0f172a"
                        strokeWidth="2"
                        className="transition-all"
                      />
                      <text x={pt.x} y={chartHeight - 4} textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">
                        {pt.period}
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Hover Tooltip Box */}
                {hoveredPoint !== null && points[hoveredPoint] && (
                  <div className="absolute top-4 right-4 bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-lg border border-slate-600 shadow-md">
                    <span className="font-bold text-[#e5c46d]">{points[hoveredPoint].period}:</span>{' '}
                    <span>{points[hoveredPoint].count} Enrolled</span>
                    <span className="text-slate-400 block text-[10px]">{points[hoveredPoint].completed} completed</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
              <span>● Enrolled Candidates</span>
              <span>Total for {data.label}: <strong className="text-white">{displayEnrollments}</strong></span>
            </div>
          </div>

          {/* Course-Wise Popularity Breakdown (5 cols) */}
          <div className="lg:col-span-5 bg-slate-800/90 rounded-2xl p-6 border border-slate-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white">Course Demand Breakdown</h3>
                <span className="text-[11px] text-slate-400">Share %</span>
              </div>

              <div className="space-y-3.5">
                {data.courseEnrollments.map((c, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-200 font-medium truncate max-w-[200px]">{c.courseName}</span>
                      <span className="font-mono text-slate-300 font-bold">{c.count} ({c.sharePercent}%)</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#145da0] to-[#c99b2e] rounded-full transition-all duration-500"
                        style={{ width: `${c.sharePercent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-700/60 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Highest Demand: <strong className="text-white">Computer & Data Entry</strong></span>
              <span className="text-emerald-400 font-semibold">100% Practical</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
