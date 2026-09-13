import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="py-28">
      <div className="container-x text-center">
        <p className="text-sm font-semibold text-ember">404</p>
        <h1 className="mt-2 text-3xl font-display font-semibold text-ink">Page not found</h1>
        <p className="mt-3 text-slate">The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="mt-6 inline-block rounded-lg bg-ember px-5 py-3 text-sm font-semibold text-white">
          Back to home
        </Link>
      </div>
    </section>
  );
}
