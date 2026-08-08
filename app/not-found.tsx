import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section bg-paper">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-3xl font-bold text-navy">Page not found</h1>
        <p className="mt-3 text-muted">
          That page moved or never existed. The library, however, is right
          where we left it.
        </p>
        <Link href="/" className="mt-6 inline-block rounded-btn bg-teal px-6 py-3 font-semibold text-white hover:opacity-90">
          Back to the home page
        </Link>
      </div>
    </section>
  );
}
