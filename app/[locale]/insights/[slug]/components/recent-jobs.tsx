'use client';

import { formatDistanceToNow } from 'date-fns';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';

interface RecentJobsProps {
  jobs: any[];
  jobsLast7Days: number;
}

export function RecentJobs({ jobs, jobsLast7Days }: RecentJobsProps) {
  if (!jobs || jobs.length === 0) return null;

  return (
    <section className="h-full flex flex-col">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">{jobsLast7Days} Fresh Openings</h2>
          <p className="text-muted-foreground text-sm">Found this week</p>
        </div>
        <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
          <Link href="/jobs" className="gap-2">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {jobs.map((job: any) => (
          <Link key={job._id} href="/jobs" className="block group">
            <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-transparent hover:border-l-primary group-hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {job.parsedData?.jobTitle || 'Untitled Position'}
                  </CardTitle>
                  {job.parsedData?.salary && (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20 whitespace-nowrap">
                      {job.parsedData.salary}
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  {job.parsedData?.level && (
                    <div className="flex items-center gap-1 bg-secondary/30 px-2 py-1 rounded">
                      <span className="font-medium text-foreground">{job.parsedData.level}</span>
                    </div>
                  )}
                  {job.parsedData?.candidateLocation && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-primary" />
                      {job.parsedData.candidateLocation}
                    </div>
                  )}
                  {job.parsedData?.isRemote && (
                    <div className="flex items-center gap-1">
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        Remote
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 ml-auto text-xs opacity-70">
                    <Calendar className="h-3 w-3" />
                    {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
