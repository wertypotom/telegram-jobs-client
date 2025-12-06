'use client';

import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@/shared/ui';
import type { Job } from '@/shared/types/models';
import { Building2, MapPin, DollarSign, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface JobListProps {
  jobs: Job[];
  total: number;
}

export function JobList({ jobs, total }: JobListProps) {
  const router = useRouter();

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No jobs found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted-foreground">
        Showing {jobs.length} of {total} jobs
      </p>

      <div className="grid gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            onClick={() => router.push(`/jobs/${job.id}`)}
            className="cursor-pointer"
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1 min-w-0">
                    <CardTitle className="text-xl">
                      {job.parsedData?.jobTitle || 'Untitled Position'}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">
                        {job.parsedData?.company || 'Company not specified'}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {job.parsedData?.isRemote && <Badge variant="secondary">Remote</Badge>}
                    {job.isVisited ? (
                      <Badge variant="outline" className="text-muted-foreground">
                        Visited
                      </Badge>
                    ) : (
                      <Badge variant="default">New</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.parsedData?.techStack?.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  {job.parsedData?.salary && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {job.parsedData.salary}
                    </div>
                  )}
                  {job.parsedData?.level && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.parsedData.level}
                    </div>
                  )}
                  {job.parsedData?.candidateLocation && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.parsedData.candidateLocation}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
