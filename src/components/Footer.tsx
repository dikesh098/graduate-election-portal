import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-blue-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-3">
        <div>
          <h3 className="font-head text-lg font-bold text-white">Graduate Election Portal</h3>
          <p className="mt-2 text-sm text-blue-200">
            A digital platform for graduate voter registration, assistance and citizen engagement —
            Nagpur Graduates&apos; Constituency.
          </p>
        </div>

        <div>
          <h4 className="mb-2 text-sm font-semibold text-gold-light">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/elections">Election Information</Link></li>
            <li><Link href="/register">Register Now</Link></li>
            <li><Link href="/track">Track Application</Link></li>
            <li><Link href="/help">Help Center</Link></li>
            <li><Link href="/volunteer">Volunteer</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 text-sm font-semibold text-gold-light">Office</h4>
          <p className="text-sm">Nagpur Graduates&apos; Constituency Office</p>
          <p className="text-sm">Maharashtra Legislative Council</p>
          <p className="mt-2 text-sm">
            Built by{" "}
            <a href="mailto:aixoniqtechnologies@gmail.com" className="underline">
              Aixoniq Technologies
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-blue-300">
        © {new Date().getFullYear()} Graduate Election Portal. All rights reserved.
      </div>
    </footer>
  );
}
