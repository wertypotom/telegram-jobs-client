import React from 'react';
import { Search, Radio, Users } from 'lucide-react';

export function StatsBar() {
  return (
    <div className="border-y border-slate-100 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
          <div className="flex flex-col items-center justify-center p-2">
            <div className="flex items-center gap-2 text-cyan-600 font-bold text-2xl mb-1">
              <Search size={24} />
              <span>1,240</span>
            </div>
            <p className="text-sm text-slate-500 font-medium">New jobs found today</p>
          </div>

          <div className="flex flex-col items-center justify-center p-2">
            <div className="flex items-center gap-2 text-cyan-600 font-bold text-2xl mb-1">
              <Radio size={24} />
              <span>120+</span>
            </div>
            <p className="text-sm text-slate-500 font-medium">Active Channels Monitored</p>
          </div>

          <div className="flex flex-col items-center justify-center p-2">
            <div className="flex items-center gap-2 text-cyan-600 font-bold text-2xl mb-1">
              <Users size={24} />
              <span>15 min</span>
            </div>
            <p className="text-sm text-slate-500 font-medium">Average Time to Application</p>
          </div>
        </div>
      </div>
    </div>
  );
}
