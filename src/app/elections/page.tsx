import EligibilityChecker from "@/components/EligibilityChecker";

export default function ElectionsPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-gold">Election Information</p>
      <h1 className="mt-2 font-head text-3xl font-bold text-navy">Graduate Constituency Elections</h1>

      <div className="mt-6 space-y-4 text-sm text-slate-600">
        <p>
          The Nagpur Graduates&apos; Constituency is one of the graduate constituencies of the
          Maharashtra Legislative Council. Only graduates registered on the separate Graduate
          Constituency electoral roll — distinct from the regular assembly voter list — can vote here.
        </p>
        <p>
          Registration is a one-time process; once verified, your name stays on the graduate electoral
          roll for future elections unless your details change.
        </p>
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 p-6">
        <h2 className="font-head text-lg font-bold text-navy">Check Your Eligibility</h2>
        <EligibilityChecker />
      </div>
    </div>
  );
}
