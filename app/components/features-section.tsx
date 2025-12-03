import { Send, Bot, FileText, Download } from 'lucide-react';

const features = [
  {
    icon: Send,
    title: 'Telegram Integration',
    description: 'Automatically monitors job channels and aggregates postings in real-time.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Bot,
    title: 'AI-Powered Parsing',
    description: 'Extracts job details from unstructured messages using advanced AI.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: FileText,
    title: 'Resume Tailoring',
    description: 'Generates customized resumes that match each job description perfectly.',
    color: 'text-green-600',
    bgColor: 'bg-green-600/10',
  },
  {
    icon: Download,
    title: 'Instant Downloads',
    description: 'Get PDF and DOCX files ready to send, plus a Telegram message template.',
    color: 'text-foreground',
    bgColor: 'bg-foreground/10',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Land Your Next Job
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Powerful features that save you time and increase your chances of getting hired.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl border transition-shadow hover:shadow-lg bg-background"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.bgColor}`}
              >
                <feature.icon size={24} className={feature.color} />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="leading-relaxed text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
