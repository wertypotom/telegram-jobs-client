const steps = [
  {
    number: '01',
    title: 'Connect Telegram',
    description: 'Login with your Telegram account to access job channels.',
  },
  {
    number: '02',
    title: 'Upload Resume',
    description: 'Upload your master resume (PDF or DOCX) once.',
  },
  {
    number: '03',
    title: 'Browse Jobs',
    description: 'Browse AI-parsed job postings with smart filters.',
  },
  {
    number: '04',
    title: 'Generate & Apply',
    description: 'Click to generate a tailored resume and apply instantly.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="container mx-auto px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to start applying with tailored resumes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="space-y-4">
              <div className="text-5xl font-bold text-primary/20">{step.number}</div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
