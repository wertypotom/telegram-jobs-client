import React from 'react';
import { Users, Clock, Send } from 'lucide-react';

export function WhyTelegram() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Why the best jobs are hidden on Telegram
          </h2>
          <p className="text-lg text-slate-600">
            Traditional job boards are crowded and slow. Telegram is where the real work happens,
            offering a direct line to decision makers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Card 1 */}
          <div className="group p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-cyan-100 transition-all duration-300">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Community Driven</h3>
            <p className="text-slate-600 leading-relaxed">
              Jobs are posted by peers and community leaders in specialized groups. These listings
              carry higher trust and relevance than anonymous corporate boards.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-cyan-100 transition-all duration-300">
            <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
              <Clock size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Incredible Speed</h3>
            <p className="text-slate-600 leading-relaxed">
              Roles are filled in hours, not weeks. By the time a job hits LinkedIn, it's often
              already in final interviews. Telegram puts you at the front of the line.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-cyan-100 transition-all duration-300">
            <div className="w-14 h-14 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform">
              <Send size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Direct Access</h3>
            <p className="text-slate-600 leading-relaxed">
              Many posts link directly to the decision maker (@username), allowing you to DM the
              founder or CTO directly, bypassing the 'HR Portal Black Hole'.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
