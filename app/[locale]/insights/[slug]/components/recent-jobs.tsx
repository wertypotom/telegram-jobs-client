'use client';

import { formatDistanceToNow } from 'date-fns';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';

interface RecentJobsProps {
  jobs: any[];
  jobsLast7Days: number;
}

export function RecentJobs({ jobs, jobsLast7Days }: RecentJobsProps) {
  if (!jobs || jobs.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-2">{jobsLast7Days} Fresh Openings Found This Week</h2>
      <p className="text-muted-foreground mb-6">Recent opportunities in this market</p>

      <div className="grid gap-4">
        {jobs.map((job: any) => (
          <Link key={job._id} href="/jobs" className="block">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">
                  {job.parsedData?.jobTitle || 'Untitled Position'}
                </CardTitle>
                {job.parsedData?.salary && (
                  <CardDescription className="font-medium text-base">
                    {job.parsedData.salary}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  {job.parsedData?.level && (
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{job.parsedData.level}</span>
                    </div>
                  )}
                  {job.parsedData?.candidateLocation && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.parsedData.candidateLocation}
                    </div>
                  )}
                  {job.parsedData?.isRemote && (
                    <div className="flex items-center gap-1">
                      <span className="text-green-600 font-medium">Remote</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/jobs" className="flex items-center gap-2">
            See More Openings
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
