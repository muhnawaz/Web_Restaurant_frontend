// src/components/restaurant/ReservationForm.tsx
import { useState } from "react";

export function ReservationForm() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const form = e.currentTarget;
      const data = Object.fromEntries(new FormData(form).entries());
      // TODO: call your backend here
      console.log("reserve payload", data);
      alert("Reservation sent!");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputBase =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 " +
    "focus:outline-none focus:ring-2 focus:ring-amber-400/60";

  return (
    <section id="reservation" className="mx-auto max-w-2xl px-4 md:px-6 py-12 md:py-16">
      <h2 className="text-3xl md:text-4xl font-extrabold text-amber-300 mb-6">
        Reserve a Table
      </h2>

      {/* noValidate avoids browser’s default tooltips; we still use required/patterns */}
      <form onSubmit={onSubmit} noValidate className="space-y-4" aria-label="Reservation form">
        {/* Full name */}
        <div>
          <label htmlFor="res-name" className="block text-sm text-white/80 mb-1">
            Full name
          </label>
          <input
            id="res-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="e.g., Akash Kumar"
            className={inputBase}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="res-email" className="block text-sm text-white/80 mb-1">
            Email
          </label>
          <input
            id="res-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            placeholder="you@example.com"
            className={inputBase}
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="res-phone" className="block text-sm text-white/80 mb-1">
            Phone
          </label>
          <input
            id="res-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            pattern="[0-9]{10}"
            required
            placeholder="10-digit number"
            className={inputBase}
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="res-date" className="block text-sm text-white/80 mb-1">
              Date
            </label>
            <input
              id="res-date"
              name="date"
              type="date"
              autoComplete="off"      // no reliable token for reservations → turn off
              required
              className={inputBase}
            />
          </div>

          <div>
            <label htmlFor="res-time" className="block text-sm text-white/80 mb-1">
              Time
            </label>
            <input
              id="res-time"
              name="time"
              type="time"
              autoComplete="off"
              required
              className={inputBase}
            />
          </div>
        </div>

        {/* Guests */}
        <div>
          <label htmlFor="res-guests" className="block text-sm text-white/80 mb-1">
            Guests
          </label>
          <input
            id="res-guests"
            name="guests"
            type="number"
            min={1}
            max={20}
            autoComplete="off"
            required
            placeholder="2"
            className={inputBase}
          />
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="res-notes" className="block text-sm text-white/80 mb-1">
            Special requests (optional)
          </label>
          <textarea
            id="res-notes"
            name="notes"
            rows={4}
            autoComplete="off"
            placeholder="Allergies, occasion, seating preference…"
            className={inputBase}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-gradient-to-r from-amber-300 to-amber-500 text-black font-semibold py-3 hover:brightness-110 disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send Reservation"}
        </button>
      </form>
    </section>
  );
}
