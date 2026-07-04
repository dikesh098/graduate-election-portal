import RegistrationForm from "@/components/RegistrationForm";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-gold">Registration</p>
      <h1 className="mt-2 font-head text-3xl font-bold text-navy">Register as a Graduate Voter</h1>
      <p className="mt-3 text-sm text-slate-600">
        Fill in your details below. You&apos;ll receive a tracking ID to follow your application status.
      </p>
      <RegistrationForm />
    </div>
  );
}
