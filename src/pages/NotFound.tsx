// src/pages/NotFound.tsx
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.error("404: attempted route:", pathname);
    document.title = "404 • AKIR-Restaurant";
  }, [pathname]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="text-center px-6">
        <h1 className="text-5xl font-extrabold tracking-tight mb-2">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center rounded-lg bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}