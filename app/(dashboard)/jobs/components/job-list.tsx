import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@/shared/ui';
import type { Job } from '@/shared/types/models';
import { Building2, MapPin, DollarSign, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface JobListProps {
  jobs: Job[];
  total: number;
}

export function JobList({ jobs, total }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No jobs found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground mb-4">
        Showing {jobs.length} of {total} jobs
      </p>

      {jobs.map((job) => (
        <Link key={job.id} href={`/jobs/${job.id}`}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{job.parsedData?.jobTitle || 'Job Position'}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {job.parsedData?.company || 'Company'}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
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
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.parsedData?.techStack?.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
  );
}
