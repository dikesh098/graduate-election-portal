const FAQS = [
  {
    q: "Who can register for the Graduate Constituency electoral roll?",
    a: "Graduates who completed their degree at least 3 years before the qualifying date and are ordinarily resident in Maharashtra. Use the Eligibility Checker on the Elections page to confirm.",
  },
  {
    q: "Is this the same as my regular voter ID?",
    a: "No. The Graduate Constituency roll is separate from the regular assembly electoral roll — you need to register for it independently.",
  },
  {
    q: "What documents do I need?",
    a: "Your degree certificate, an address proof, and a photo ID. Upload clear scans or photos during registration.",
  },
  {
    q: "How do I check my application status?",
    a: "Use the tracking ID you received after submitting your registration on the Track Application page.",
  },
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-gold">Help Center</p>
      <h1 className="mt-2 font-head text-3xl font-bold text-navy">Frequently Asked Questions</h1>

      <div className="mt-8 space-y-4">
        {FAQS.map((f) => (
          <details key={f.q} className="rounded-lg border border-slate-200 p-4">
            <summary className="cursor-pointer text-sm font-semibold text-navy">{f.q}</summary>
            <p className="mt-2 text-sm text-slate-600">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
