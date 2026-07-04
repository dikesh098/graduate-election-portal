import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-5 text-center">
      <h1 className="font-head text-4xl font-bold text-navy">404</h1>
      <p className="mt-2 text-slate-600">This page could not be found.</p>
      <Link href="/" className="mt-6 rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-white">
        Back to Home
      </Link>
    </div>
  );
}
