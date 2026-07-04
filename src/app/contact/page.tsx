export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-widest text-gold">Get in Touch</p>
      <h1 className="mt-2 font-head text-3xl font-bold text-navy">Contact the Office</h1>

      <div className="mt-8 space-y-4 text-sm text-slate-600">
        <p>Nagpur Graduates&apos; Constituency Office</p>
        <p>Maharashtra Legislative Council</p>
        <p>
          For registration support, email{" "}
          <a href="mailto:support@graduateportal.in" className="font-semibold text-navy underline">
            support@graduateportal.in
          </a>
        </p>
      </div>
    </div>
  );
}
