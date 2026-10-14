import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">404</p>
      <h1 className="mt-3 font-serif text-3xl text-white">This page is off the geodesic</h1>
      <p className="mt-3 text-slate-400">
        The route does not match a module, lesson, or academy page.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
      >
        Return to dashboard
      </Link>
    </div>
  );
}
