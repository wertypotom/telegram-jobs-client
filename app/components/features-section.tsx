import { Card, CardHeader, CardTitle, CardDescription } from '@/shared/ui';
import { Bot, FileText, Sparkles, Zap } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'Telegram Integration',
    description: 'Automatically monitors job channels and aggregates postings in real-time.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Parsing',
    description: 'Extracts job details from unstructured messages using advanced AI.',
  },
  {
    icon: FileText,
    title: 'Resume Tailoring',
    description: 'Generates customized resumes that match each job description perfectly.',
  },
  {
    icon: Zap,
    title: 'Instant Downloads',
    description: 'Get PDF and DOCX files ready to send, plus a Telegram message template.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="container mx-auto px-4 py-24 bg-muted/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything You Need to Land Your Next Job
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features that save you time and increase your chances of getting hired.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
