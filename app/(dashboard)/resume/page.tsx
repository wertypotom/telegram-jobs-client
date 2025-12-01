'use client';

import { useState, useCallback } from 'react';
import { useUploadResume } from '@/shared/hooks';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from '@/shared/ui';
import { Upload, FileText, CheckCircle } from 'lucide-react';

export default function ResumePage() {
  const [dragActive, setDragActive] = useState(false);
  const { mutate: uploadResume, isPending, isSuccess, data } = useUploadResume();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or DOCX file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    uploadResume(file);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Your Resume</h1>
          <p className="text-muted-foreground">
            Upload your master resume to start generating tailored versions for each job
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Master Resume</CardTitle>
            <CardDescription>Upload a PDF or DOCX file (max 10MB)</CardDescription>
          </CardHeader>
          <CardContent>
            {!isSuccess ? (
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">
                  {isPending ? 'Uploading...' : 'Drop your resume here'}
                </p>
                <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.docx"
                  onChange={handleChange}
                  disabled={isPending}
                />
                <Button asChild disabled={isPending}>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Choose File
                  </label>
                </Button>
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <CheckCircle className="h-16 w-16 mx-auto text-green-500" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Resume Uploaded Successfully!</h3>
                  <p className="text-sm text-muted-foreground">
                    Your resume has been processed and is ready to use for tailoring.
                  </p>
                </div>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Upload Another Resume
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {isSuccess && data && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Resume Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{data.resumeText}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
