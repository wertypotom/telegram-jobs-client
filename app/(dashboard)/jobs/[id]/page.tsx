'use client';

import { useParams, useRouter } from 'next/navigation';
import { useJob, useMarkJobAsViewed } from '@/shared/hooks';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Skeleton,
} from '@/shared/ui';
import { Building2, MapPin, Calendar, MessageSquare, ArrowLeft, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function JobDetailPage() {
  const { t } = useTranslation('dashboard');
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;

  const { data: job, isLoading } = useJob(jobId);
  // Extract numeric message ID from composite key (e.g., "@channel_12345" -> "12345")
  const getMessageId = (telegramMessageId: string) => {
    const parts = telegramMessageId.split('_');
    return parts[parts.length - 1]; // Get last part after underscore
  };

  const { mutate: markAsViewed } = useMarkJobAsViewed();

  // Mark job as viewed when page loads
  useEffect(() => {
    if (jobId) {
      markAsViewed(jobId);
    }
  }, [jobId, markAsViewed]);

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
        <p className="text-center text-muted-foreground">{t('jobDetail.jobNotFound')}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <Button variant="ghost" onClick={() => router.push('/jobs')} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('jobDetail.backToJobs')}
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
            {job.channelUsername && job.telegramMessageId && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`https://t.me/${job.channelUsername.replace('@', '')}/${getMessageId(job.telegramMessageId)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t('jobDetail.viewOriginalPost')}
                </a>
              </Button>
            )}
          </div>

          <div className="flex items-center gap-6 mt-4 text-muted-foreground">
            {job.parsedData?.salary && (
              <div className="flex items-center gap-2">{job.parsedData.salary}</div>
            )}
            {job.parsedData?.level && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {job.parsedData.level}
              </div>
            )}
            {/* Job Type (Remote/Onsite/Hybrid) */}
            {(job.parsedData?.isRemote || job.parsedData?.location) && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {job.parsedData.isRemote ? 'Remote' : job.parsedData.location}
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
              <h3 className="font-semibold text-lg mb-2">{t('jobDetail.aboutTheRole')}</h3>
              <p className="text-muted-foreground">{job.parsedData.description}</p>
            </div>
          )}

          {/* Employment Details */}
          <div className="grid md:grid-cols-2 gap-4">
            {job.parsedData?.employmentType && (
              <div>
                <h4 className="font-semibold text-sm mb-1">{t('jobDetail.employmentType')}</h4>
                <p className="text-muted-foreground">{job.parsedData.employmentType}</p>
              </div>
            )}
            {job.parsedData?.location && (
              <div>
                <h4 className="font-semibold text-sm mb-1">{t('jobDetail.companyLocation')}</h4>
                <p className="text-muted-foreground">{job.parsedData.location}</p>
              </div>
            )}
            {job.parsedData?.candidateLocation && (
              <div>
                <h4 className="font-semibold text-sm mb-1">{t('jobDetail.candidateLocation')}</h4>
                <p className="text-muted-foreground">{job.parsedData.candidateLocation}</p>
              </div>
            )}
          </div>

          {/* Responsibilities */}
          {job.parsedData?.responsibilities && job.parsedData.responsibilities.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <span className="text-green-600">💼</span> {t('jobDetail.responsibilities')}
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
                  <span className="text-blue-600">✓</span> {t('jobDetail.requiredQualifications')}
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
                  <span className="text-purple-600">+</span>{' '}
                  {t('jobDetail.preferredQualifications')}
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
                <span className="text-yellow-600">★</span> {t('jobDetail.benefits')}
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
          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-3">{t('jobDetail.contactInformation')}</h3>
            {job.parsedData?.contactInfo &&
            (job.parsedData.contactInfo.telegram ||
              job.parsedData.contactInfo.email ||
              job.parsedData.contactInfo.applicationUrl ||
              job.parsedData.contactInfo.other) ? (
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
            ) : (
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <p className="text-muted-foreground">{t('jobDetail.contactNotProvided')}</p>
                {job.senderUsername && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t('jobDetail.directMessage')}</p>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`https://t.me/${job.senderUsername.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                      >
                        {job.senderUsername}
                      </a>
                    </div>
                  </div>
                )}
                {!job.senderUsername && job.channelUsername && job.telegramMessageId && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={`https://t.me/${job.channelUsername.replace('@', '')}/${getMessageId(job.telegramMessageId)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-fit"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {t('jobDetail.viewOriginalToContact')}
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
