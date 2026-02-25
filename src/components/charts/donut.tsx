"use client";

import { motion } from 'framer-motion';

export function DonutChart({ data = [40, 25, 20, 15] }: { data?: number[] }) {
  const total = data.reduce((sum, value) => sum + value, 0);
  const segments = data.map((value, index) => ({
    value,
    offset: data.slice(0, index).reduce((sum, v) => sum + v, 0),
  }));

  const colors = ['#2dd4bf', '#38bdf8', '#f59e0b', '#818cf8'];

  return (
    <div className="relative h-40 w-40">
      <svg viewBox="0 0 36 36" className="h-full w-full">
        <circle cx="18" cy="18" r="16" fill="none" stroke="#ffffff10" strokeWidth="3" />
        {segments.map((segment, index) => (
          <motion.circle
            key={index}
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke={colors[index % colors.length]}
            strokeWidth="3"
            strokeDasharray={`${(segment.value / total) * 100} 100`}
            strokeDashoffset={-((segment.offset / total) * 100)}
            strokeLinecap="round"
            initial={{ strokeDasharray: '0 100' }}
            animate={{ strokeDasharray: `${(segment.value / total) * 100} 100` }}
            transition={{ duration: 1, delay: index * 0.2, ease: 'easeInOut' }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
        {total}
      </div>
    </div>
  );
}
