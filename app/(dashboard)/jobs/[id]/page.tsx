'use client';

import { useParams, useRouter } from 'next/navigation';
import { useJob, useGenerateTailoredResume, useMarkJobAsViewed } from '@/shared/hooks';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  Skeleton,
} from '@/shared/ui';
import {
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Download,
  MessageSquare,
  ArrowLeft,
} from 'lucide-react';
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
          alert(
            error?.response?.data?.message ||
              'Failed to generate resume. Please upload your master resume first.'
          );
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
      <Button variant="ghost" onClick={() => router.push('/jobs')} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Jobs
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-3xl">
                {job.parsedData?.jobTitle || 'Job Position'}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 text-base">
                <Building2 className="h-5 w-5" />
                {job.parsedData?.company || 'Company'}
              </CardDescription>
            </div>
            {job.parsedData?.isRemote && (
              <Badge variant="secondary" className="text-base px-4 py-2">
                Remote
              </Badge>
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

        <CardContent className="space-y-6">
          {/* Description */}
          {job.parsedData?.description && (
            <div>
              <h3 className="font-semibold text-lg mb-2">About the Role</h3>
              <p className="text-muted-foreground">{job.parsedData.description}</p>
            </div>
          )}

          {/* Employment Details */}
          <div className="grid md:grid-cols-2 gap-4">
            {job.parsedData?.employmentType && (
              <div>
                <h4 className="font-semibold text-sm mb-1">Employment Type</h4>
                <p className="text-muted-foreground">{job.parsedData.employmentType}</p>
              </div>
            )}
            {job.parsedData?.location && (
              <div>
                <h4 className="font-semibold text-sm mb-1">Company Location</h4>
                <p className="text-muted-foreground">{job.parsedData.location}</p>
              </div>
            )}
            {job.parsedData?.candidateLocation && (
              <div>
                <h4 className="font-semibold text-sm mb-1">Candidate Location</h4>
                <p className="text-muted-foreground">{job.parsedData.candidateLocation}</p>
              </div>
            )}
          </div>

          {/* Responsibilities */}
          {job.parsedData?.responsibilities && job.parsedData.responsibilities.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <span className="text-green-600">💼</span> Responsibilities
              </h3>
              <ul className="space-y-2">
                {job.parsedData.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Qualifications */}
          {job.parsedData?.requiredQualifications &&
            job.parsedData.requiredQualifications.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="text-blue-600">✓</span> Required Qualifications
                </h3>
                <ul className="space-y-2">
                  {job.parsedData.requiredQualifications.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Preferred Qualifications */}
          {job.parsedData?.preferredQualifications &&
            job.parsedData.preferredQualifications.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="text-purple-600">+</span> Preferred Qualifications
                </h3>
                <ul className="space-y-2">
                  {job.parsedData.preferredQualifications.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Benefits */}
          {job.parsedData?.benefits && job.parsedData.benefits.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <span className="text-yellow-600">★</span> Benefits
              </h3>
              <ul className="space-y-2">
                {job.parsedData.benefits.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Information */}
          {job.parsedData?.contactInfo && (
            <div className="border-t pt-6">
              <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
              <div className="space-y-2">
                {job.parsedData.contactInfo.telegram && (
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`https://t.me/${job.parsedData.contactInfo.telegram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {job.parsedData.contactInfo.telegram}
                    </a>
                  </div>
                )}
                {job.parsedData.contactInfo.email && (
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 text-muted-foreground">✉</span>
                    <a
                      href={`mailto:${job.parsedData.contactInfo.email}`}
                      className="text-primary hover:underline"
                    >
                      {job.parsedData.contactInfo.email}
                    </a>
                  </div>
                )}
                {job.parsedData.contactInfo.applicationUrl && (
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 text-muted-foreground">🔗</span>
                    <a
                      href={job.parsedData.contactInfo.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Apply Here
                    </a>
                  </div>
                )}
                {job.parsedData.contactInfo.other && (
                  <div className="flex items-center gap-2">
                    <span className="h-4 w-4 text-muted-foreground">ℹ</span>
                    <span className="text-muted-foreground">
                      {job.parsedData.contactInfo.other}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Raw Text (Collapsible) */}
          <details className="border-t pt-6">
            <summary className="font-semibold cursor-pointer hover:text-primary">
              View Original Message
            </summary>
            <p className="whitespace-pre-wrap text-muted-foreground mt-4 text-sm">{job.rawText}</p>
          </details>
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
          <Button onClick={handleGenerateResume} disabled={isPending} size="lg" className="w-full">
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
