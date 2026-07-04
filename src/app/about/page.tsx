import Image from "next/image";
import { GraduationCap, Landmark, ShieldCheck, Users2, Laptop2, Handshake } from "lucide-react";
import Reveal from "@/components/Reveal";
import GradientBlobs from "@/components/GradientBlobs";

const FOCUS_AREAS = [
  {
    icon: GraduationCap,
    title: "Education & Employability",
    description: "Championing initiatives that connect graduates to career pathways, skill development, and higher education opportunities.",
  },
  {
    icon: Laptop2,
    title: "Digital Governance",
    description: "Bringing constituency services online — from voter registration to grievance redressal — so no graduate is left behind by distance or paperwork.",
  },
  {
    icon: ShieldCheck,
    title: "Transparency & Accountability",
    description: "Building public systems where every application, update, and decision is trackable and open to scrutiny.",
  },
  {
    icon: Users2,
    title: "Graduate & Alumni Engagement",
    description: "Creating lasting platforms — beyond election season — for graduates to stay connected, informed, and involved.",
  },
  {
    icon: Landmark,
    title: "Institutional Strengthening",
    description: "Working with universities and colleges across the constituency to improve infrastructure and student support systems.",
  },
  {
    icon: Handshake,
    title: "Community Outreach",
    description: "Regular engagement with graduates across districts through camps, helpdesks, and volunteer-driven awareness drives.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* HERO PROFILE */}
      <section className="dot-grid relative overflow-hidden bg-gradient-to-b from-navy-deep via-navy to-navy-light px-5 py-20 text-white">
        <GradientBlobs variant="dark" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <div className="relative mx-auto h-40 w-40 md:h-48 md:w-48">
              <div className="absolute inset-0 animate-float-slow rounded-full bg-gradient-to-br from-gold to-navy-light opacity-70 blur-md" />
              <Image
                src="/images/mlc-portrait.jpg"
                alt="Shri Abhijit Govindrao Wanjari"
                fill
                priority
                className="relative rounded-full border-4 border-gold-light object-cover shadow-2xl"
              />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="mt-6 font-head text-3xl font-bold md:text-4xl">
              Shri Abhijit Govindrao Wanjari
            </h1>
            <p className="mt-2 text-sm font-medium text-gold-light">
              Member, Maharashtra Legislative Council
            </p>
            <p className="text-sm text-blue-200">Nagpur Graduates&apos; Constituency</p>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-blue-100 md:text-base">
              &ldquo;Every graduate carries the potential to shape our constituency&apos;s future. My
              commitment is to make sure that potential is matched with access, opportunity, and a
              government that listens.&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      {/* BIO */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Profile</p>
          <h2 className="mt-2 font-head text-2xl font-bold text-navy">Representing the Graduate Voice</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Shri Abhijit Govindrao Wanjari represents the Nagpur Graduates&apos; Constituency in the
            Maharashtra Legislative Council, one of the seats reserved specifically for the state&apos;s
            graduate voters. As an MLC representing graduates, his role is distinct from a regular
            constituency representative — focused on advocating for the interests of educated
            professionals, students, and alumni across the region, and channelling their concerns
            directly into state policy.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            This portal is one part of that ongoing effort: a direct, transparent line between the
            office and the graduates it represents, so that registration, updates, and engagement are
            no longer barriers to participation.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="h-full rounded-xl bg-slate-50 p-6">
              <h3 className="font-head text-lg font-bold text-navy">Vision</h3>
              <p className="mt-2 text-sm text-slate-600">
                Empowering graduates through education, innovation, transparency and digital public
                services.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="h-full rounded-xl bg-slate-50 p-6">
              <h3 className="font-head text-lg font-bold text-navy">Mission</h3>
              <p className="mt-2 text-sm text-slate-600">
                Building stronger engagement with graduates through technology-driven communication,
                voter awareness and citizen services.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="bg-slate-50 px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Priorities in Office</p>
            <h2 className="mt-2 font-head text-2xl font-bold text-navy">Key Focus Areas</h2>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FOCUS_AREAS.map((area, i) => (
              <Reveal key={area.title} delay={i * 0.06}>
                <div className="h-full rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-light text-white">
                    <area.icon size={18} />
                  </div>
                  <h3 className="font-head text-base font-semibold text-navy">{area.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{area.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-16">
        <Reveal className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-br from-navy to-navy-light p-10 text-center text-white">
          <h2 className="font-head text-xl font-bold">Have a question for the office?</h2>
          <p className="mt-2 text-sm text-blue-100">
            Reach out directly, or start with the AI assistant in the corner of your screen.
          </p>
          <a
            href="/contact"
            className="mt-5 inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep"
          >
            Contact the Office
          </a>
        </Reveal>
      </section>
    </div>
  );
}
