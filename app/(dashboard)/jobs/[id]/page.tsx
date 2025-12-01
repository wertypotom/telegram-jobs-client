'use client';

import { useParams, useRouter } from 'next/navigation';
import { useJob, useGenerateTailoredResume, useMarkJobAsViewed } from '@/shared/hooks';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button, Skeleton } from '@/shared/ui';
import { Building2, MapPin, DollarSign, Calendar, Download, MessageSquare, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useState, useEffect } from 'react';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;
  
  const { data: job, isLoading } = useJob(jobId);
  const { mutate: generateResume, isPending, data: tailoredResume } = useGenerateTailoredResume();
  const { mutate: markAsViewed } = useMarkJobAsViewed();
  const [showResult, setShowResult] = useState(false);

  // Mark job as viewed when page loads
  useEffect(() => {
    if (jobId) {
      markAsViewed(jobId);
    }
  }, [jobId, markAsViewed]);

  const handleGenerateResume = () => {
    generateResume(
      { jobId },
      {
        onSuccess: () => {
          setShowResult(true);
        },
        onError: (error: any) => {
          alert(error?.response?.data?.message || 'Failed to generate resume. Please upload your master resume first.');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8 space-y-6">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-6 py-8">
        <p className="text-center text-muted-foreground">Job not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <Button
        variant="ghost"
        onClick={() => router.push('/jobs')}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Jobs
      </Button>
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-3xl">{job.parsedData?.jobTitle || 'Job Position'}</CardTitle>
              <CardDescription className="flex items-center gap-2 text-base">
                <Building2 className="h-5 w-5" />
                {job.parsedData?.company || 'Company'}
              </CardDescription>
            </div>
            {job.parsedData?.isRemote && (
              <Badge variant="secondary" className="text-base px-4 py-2">Remote</Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {job.parsedData?.techStack?.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <div className="flex items-center gap-6 mt-4 text-muted-foreground">
            {job.parsedData?.salary && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                {job.parsedData.salary}
              </div>
            )}
            {job.parsedData?.level && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {job.parsedData.level}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <h3 className="font-semibold mb-2">Full Description</h3>
          <p className="whitespace-pre-wrap text-muted-foreground">{job.rawText}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generate Tailored Resume</CardTitle>
          <CardDescription>
            Create a customized resume specifically for this job using AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGenerateResume}
            disabled={isPending}
            size="lg"
            className="w-full"
          >
            {isPending ? 'Generating...' : 'Generate Tailored Resume'}
          </Button>

          {showResult && tailoredResume && (
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold">Your Tailored Resume is Ready!</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Button asChild variant="outline">
                  <a href={tailoredResume.pdfUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={tailoredResume.docxUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download DOCX
                  </a>
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Telegram Message
                </h4>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm whitespace-pre-wrap">{tailoredResume.telegramMessage}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Cover Letter</h4>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm whitespace-pre-wrap">{tailoredResume.coverLetter}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
