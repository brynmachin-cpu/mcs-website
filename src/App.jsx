import { useEffect, useState } from "react";

// 👉 Replace "your-form-id" with your real Formspree form ID
// Example: https://formspree.io/f/abcd1234
const CONTACT_FORM_ENDPOINT = "https://formspree.io/f/mdayjvde";

export default function MachinConsultingWebsite() {
  const [page, setPage] = useState("home");
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const syncPage = () => {
      const hash = window.location.hash.replace("#", "");
      if (["home", "services", "training", "contact"].includes(hash)) {
        setPage(hash);
      } else {
        setPage("home");
      }
    };

    syncPage();
    window.addEventListener("hashchange", syncPage);
    return () => window.removeEventListener("hashchange", syncPage);
  }, []);

  const services = [
    {
      title: "Technical Business Analysis",
      icon: "BA",
      description:
        "Bridging the gap between business and technology by turning operational needs into clear technical requirements, delivery plans, and actionable documentation.",
    },
    {
      title: "Product & Project Delivery",
      icon: "PD",
      description:
        "Hands-on support for late-running, high-risk, or time-sensitive initiatives that need stronger structure, ownership, and momentum.",
    },
    {
      title: "Business Process Improvement",
      icon: "BI",
      description:
        "Practical analysis of current processes, pain points, and delivery gaps to improve efficiency, alignment, and execution.",
    },
    {
      title: "Requirements & Documentation",
      icon: "RD",
      description:
        "Requirements elicitation, gap analysis, data mapping, process documentation, and delivery artefacts that help teams move with confidence.",
    },
    {
      title: "Delivery Governance & Stakeholder Alignment",
      icon: "DG",
      description:
        "Clear delivery structure, stakeholder communication, and practical oversight to keep complex work aligned and moving forward.",
    },
    {
      title: "Digital Change Support",
      icon: "DC",
      description:
        "Support for organisations navigating change across products, platforms, processes, and technology-enabled business initiatives.",
    },
  ];

  const specialties = [
    "Business Consulting",
    "Business Analysis",
    "Project Management",
    "Product Management",
    "End-to-End Feature Delivery",
    "Software Development Life Cycle",
    "Agile Methodologies",
    "Agile & Scrum Training",
    "Business Process Improvement",
    "Gap Analysis",
    "Competitive Analysis",
    "Data Mapping",
    "Business & Project Documentation",
    "Requirements Elicitation",
  ];

  const trainingCards = [
    {
      title: "Agile Foundations",
      icon: "AF",
      description:
        "Clear, accessible training on Agile values, principles, delivery mindset, iterative planning, and continuous improvement.",
    },
    {
      title: "Scrum Team Training",
      icon: "ST",
      description:
        "Practical guidance on Scrum roles, events, artefacts, backlog refinement, sprint planning, reviews, retrospectives, and day-to-day collaboration.",
    },
    {
      title: "Applied Delivery Coaching",
      icon: "AC",
      description:
        "Support that helps teams apply Agile and Scrum practices to real projects, delivery constraints, stakeholder expectations, and organisational challenges.",
    },
  ];

  const differenceCards = [
    "Bridges business objectives and technical delivery",
    "Supports high-risk or delayed projects with practical structure",
    "Works across short-term and longer-term engagements",
    "Combines analysis, product thinking, and delivery oversight",
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const submittedForm = {
      name: formData.get("name") || "",
      email: formData.get("email") || "",
      message: formData.get("message") || "",
    };
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      if (CONTACT_FORM_ENDPOINT.includes("your-form-id")) {
        throw new Error("Contact form endpoint is not configured yet.");
      }

      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: submittedForm.name,
          email: submittedForm.email,
          message: submittedForm.message,
          _subject: "New enquiry - Machin Consulting Services",
          _replyto: submittedForm.email,
          to: "bryn@mcs.gi",
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to send your message right now.");
      }

      setStatus({
        type: "success",
        message: "Thank you. Your message has been sent successfully.",
      });
      e.currentTarget.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "There was a problem sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const NavLink = ({ target, children }) => {
    const active = page === target;
    return (
      <a
        href={`#${target}`}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          active
            ? "bg-slate-900 text-white"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        {children}
      </a>
    );
  };

  const PageShell = ({ children }) => (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="text-lg font-semibold tracking-tight">Machin Consulting Services</div>
            <div className="text-sm text-slate-500">Bridging the gaps between business and tech</div>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            <NavLink target="home">Home</NavLink>
            <NavLink target="services">Services Offered</NavLink>
            <NavLink target="training">Training</NavLink>
            <NavLink target="contact">Contact</NavLink>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>© 2026 Machin Consulting Services. All rights reserved.</div>
          <div>Gibraltar • Founded 2023</div>
        </div>
      </footer>
    </div>
  );

  const IconBadge = ({ label }) => (
    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-900">
      {label}
    </div>
  );

  const IconCard = ({ icon, title, description }) => (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <IconBadge label={icon} />
      <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-4 leading-7 text-slate-600">{description}</p>
    </div>
  );

  const HomePage = () => (
    <PageShell>
      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-100" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-32">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit rounded-full border border-slate-300 bg-white px-4 py-1 text-sm text-slate-600 shadow-sm">
                Business consulting for regulated digital environments
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Helping organisations fix delivery gaps, clarify requirements, and move complex initiatives forward.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Machin Consulting Services helps organisations bridge the gap between business and technology, translating business needs into structured technical requirements and practical delivery outcomes.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#services" className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
                  Explore Services
                </a>
                <a href="#contact" className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900">
                  Get in Touch
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full overflow-hidden rounded-[2rem] border border-slate-200 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200"
                  alt="Business consulting meeting"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Overview</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Practical expertise for organisations that need delivery clarity and stronger alignment.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                MCS specialises in technical business analysis, product support, and project delivery. Whether a business is facing delivery gaps, a late-running initiative, or the need for a stronger bridge between operational teams and technical stakeholders, the focus remains the same: reduce friction, improve structure, and move work forward.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                The consultancy is especially relevant for businesses operating in regulated or technically demanding environments where requirements, communication, and execution need to be handled with care.
              </p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">What sets MCS apart</h3>
              <div className="mt-6 grid gap-4">
                {differenceCards.map((item, index) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-slate-700">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">About Bryn Machin</h3>
              <p className="mt-4 text-slate-600 leading-7">
                Bryn Machin is an experienced consultant specialising in business analysis, product delivery, and project execution within complex and regulated digital environments. With over two decades of experience across financial services and technology-driven organisations, he brings a pragmatic, delivery-focused approach to every engagement.
              </p>
              <p className="mt-4 text-slate-600 leading-7">
                His work focuses on helping organisations overcome delivery challenges, clarify requirements, and create strong alignment between business and technical teams.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-950">Key Achievements</h3>
              <div className="mt-6 grid gap-4">
                {[
                  "Delivered and stabilised high-risk digital and transformation projects",
                  "Led business analysis and product delivery across complex, multi-stakeholder environments",
                  "Improved delivery outcomes through clearer requirements and stronger governance",
                  "Supported organisations in adopting Agile and improving team performance",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-slate-700">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Specialties</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Expertise tailored to digital delivery and operational improvement
              </h2>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {specialties.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );

  const ServicesPage = () => (
    <PageShell>
      <main className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Services Offered</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Consulting support designed to solve delivery gaps and strengthen execution.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Machin Consulting Services offers flexible consulting support for businesses that need hands-on analysis, stronger product and project delivery, and better alignment between business priorities and technical teams.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <IconCard key={service.title} {...service} />
          ))}
        </div>
        <section className="mt-16 rounded-[2rem] bg-slate-900 p-10 text-white shadow-lg">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">How engagements work</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Flexible support with a straightforward commercial approach</h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Services can be provided on a short-term or longer-term basis, making MCS a suitable partner for immediate project needs as well as ongoing delivery support. The model is built to stay practical, clear, and easy to engage with.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <div className="space-y-4 text-slate-200">
                <div>
                  <div className="text-sm text-slate-400">Typical support areas</div>
                  <div className="mt-1 text-lg">Late-running projects, delivery gaps, requirements definition, and business-to-tech alignment</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Engagement options</div>
                  <div className="mt-1 text-lg">Short-term assignments and longer-term consulting support</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Commercial approach</div>
                  <div className="mt-1 text-lg">Simple pricing structure with discounts for longer engagements</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );

  const TrainingPage = () => (
    <PageShell>
      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-100" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">
            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Training</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Agile & Scrum training for teams that need practical, real-world delivery capability.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                Machin Consulting Services provides Agile and Scrum training designed to help teams understand the principles, ceremonies, roles, and behaviours that support effective delivery. The focus is practical application rather than theory alone.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#contact" className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
                  Enquire About Training
                </a>
                <a href="#services" className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900">
                  View Consulting Services
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200"
                alt="Agile training session"
                className="rounded-[2rem] border border-slate-200 shadow-xl"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {trainingCards.map((card) => (
              <IconCard key={card.title} {...card} />
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1fr_0.9fr] lg:px-8">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Who it is for</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Training for teams, leaders, and organisations seeking better delivery habits.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                This training is suited to organisations adopting Agile ways of working, improving Scrum maturity, onboarding new delivery teams, or looking to strengthen collaboration between business, product, and technology stakeholders.
              </p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
              <h3 className="text-xl font-semibold text-slate-950">Typical outcomes</h3>
              <div className="mt-6 grid gap-4">
                {[
                  "Shared understanding of Agile and Scrum fundamentals",
                  "Clearer team roles, responsibilities, and ceremonies",
                  "Improved backlog, planning, and prioritisation practices",
                  "More effective communication between business and technical teams",
                ].map((item) => (
                  <div key={item} className="rounded-2xl bg-white p-4 text-slate-700 shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="rounded-[2rem] bg-slate-900 p-10 text-white shadow-lg">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Flexible delivery</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Training can be tailored to your organisation.</h2>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Sessions can be shaped around team experience level, delivery context, organisational maturity, and the practical outcomes you want to achieve.
                </p>
              </div>
              <a href="#contact" className="inline-flex w-fit rounded-2xl bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200">
                Discuss Training Requirements
              </a>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );

  const ContactPage = () => (
    <PageShell>
      <main className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Contact</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Let us discuss where Machin Consulting Services can add value.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Whether you need support for a delayed initiative, clearer requirements, stronger delivery ownership, or a more effective bridge between business and technical teams, MCS can help you move forward with confidence.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-950">Send an enquiry</h2>
              <div>
                <label className="mb-1 block text-sm text-slate-600">Name</label>
                <input type="text" name="name" required className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900" />
              </div>
              <div>
                <label className="mb-1 block text-sm text-slate-600">Email</label>
                <input type="email" name="email" required className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900" />
              </div>
              <div>
                <label className="mb-1 block text-sm text-slate-600">Message</label>
                <textarea name="message" required rows={6} className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900" />
              </div>
              {status.message ? (
                <div
                  className={`rounded-2xl border px-5 py-4 text-sm shadow-sm transition-all duration-500 ${
                    status.type === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                        status.type === "success"
                          ? "bg-emerald-600 text-white animate-pulse"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {status.type === "success" ? "✓" : "!"}
                    </span>
                    <div>
                      <div className="font-semibold">
                        {status.type === "success" ? "Message sent successfully" : "Message not sent"}
                      </div>
                      <div className="mt-1 leading-6">{status.message}</div>
                    </div>
                  </div>
                </div>
              ) : null}
              <button type="submit" disabled={isSubmitting} className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              <p className="text-sm text-slate-500">
                
              </p>
            </form>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-lg">
            <h2 className="text-2xl font-semibold">Contact Details</h2>
            <div className="mt-8 space-y-6 text-slate-200">
              <div>
                <div className="text-sm text-slate-400">Email</div>
                <div className="mt-1 text-lg">bryn@mcs.gi</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">Location</div>
                <div className="mt-1 text-lg">Gibraltar</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">LinkedIn</div>
                <a href="https://www.linkedin.com/company/machin-consulting-services/" className="mt-1 block text-lg transition hover:text-white">
                  Machin Consulting Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  );

  if (page === "services") return <ServicesPage />;
  if (page === "training") return <TrainingPage />;
  if (page === "contact") return <ContactPage />;
  return <HomePage />;
}
