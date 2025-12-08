import React from 'react';
import { Globe, Sparkles, Filter, FileText } from 'lucide-react';

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Powerful features for the modern job seeker
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl">
            We don't just find links. We restructure the entire hiring ecosystem to work in your
            favor.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-start hover:border-cyan-200 transition-colors">
            <div className="bg-cyan-100 p-3 rounded-lg text-cyan-600 mb-6">
              <Globe size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">The "Hidden" Market</h3>
            <p className="text-slate-600 mb-4 flex-grow">
              Access the largest network of tech job boards in CIS and Europe. We monitor over 120
              distinct channels so you don't have to manually check them every hour.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-start hover:border-cyan-200 transition-colors">
            <div className="bg-purple-100 p-3 rounded-lg text-purple-600 mb-6">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Chaos to Clarity</h3>
            <p className="text-slate-600 mb-4 flex-grow">
              Telegram chats are messy. Our AI standardizes unstructured messages into clean,
              searchable cards with Salary Ranges, Stack, and Contact Info extracted upfront.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-start hover:border-cyan-200 transition-colors">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600 mb-6">
              <Filter size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Filtering</h3>
            <p className="text-slate-600 mb-4 flex-grow">
              Noise cancellation for your job search. Filter by specific tech channel bundles (e.g.,
              'React', 'Python', 'DevOps') to find exactly what you need without the spam.
            </p>
          </div>

          {/* Feature 4 - Coming Soon */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-start relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              COMING SOON
            </div>
            <div className="bg-green-100 p-3 rounded-lg text-green-600 mb-6">
              <FileText size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors">
              Tailor & Apply
            </h3>
            <p className="text-slate-600 mb-4 flex-grow">
              Instantly generate a resume that speaks the language of the job post. Our AI matches
              keywords and phrasing to triple your interview response rate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
