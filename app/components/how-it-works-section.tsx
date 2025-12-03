const steps = [
  {
    step: '01',
    title: 'Connect Telegram',
    description: 'Login with your Telegram account to access job channels.',
  },
  {
    step: '02',
    title: 'Upload Resume',
    description: 'Upload your master resume (PDF or DOCX) once.',
  },
  {
    step: '03',
    title: 'Browse Jobs',
    description: 'Browse AI-parsed job postings with smart filters.',
  },
  {
    step: '04',
    title: 'Generate & Apply',
    description: 'Click to generate a tailored resume and apply instantly.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Four simple steps to start applying with tailored resumes.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-secondary z-0"></div>

          {steps.map((item) => (
            <div
              key={item.step}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-6 border-4 border-primary shadow-sm transition-transform group-hover:scale-110 duration-300 bg-card text-primary">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm px-2 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
