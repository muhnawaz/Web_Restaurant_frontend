import { useMemo, useState } from "react";
import { postJSON } from "@/lib/api";

type ReservationReq = {
  name: string;
  email: string;
  phone: string;
  date: string;   // yyyy-mm-dd
  time: string;   // HH:mm
  guests: number;
  specialRequests?: string;
};

type ReservationRes = {
  success: boolean;
  message?: string;
  reservationId?: string;
};

export default function Reserve() {
  const [form, setForm] = useState<ReservationReq>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    specialRequests: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // min date = today
  const minDate = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "guests" ? Number(value) : value,
    }));
  };

  // simple client-side validation to avoid 400
  function validate(): string | null {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email address.";
    if (!/^\d{8,15}$/.test(form.phone.replace(/\D/g, "")))
      return "Please enter a valid phone number (digits only).";
    if (!form.date) return "Please pick a date.";
    if (form.date < minDate) return "Reservation date cannot be in the past.";
    if (!form.time) return "Please pick a time.";
    if (!form.guests || form.guests < 1) return "Guests must be at least 1.";
    return null;
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const v = validate();
    if (v) {
      setErrorMsg(v);
      return;
    }

    setLoading(true);
    try {
      const data = await postJSON<ReservationRes>("/api/reservations", form);
      if (data?.success) {
        setSuccessMsg("Reservation request sent! Please check your email.");
        setForm({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          guests: 2,
          specialRequests: "",
        });
      } else {
        setErrorMsg(data?.message || "Failed to send reservation.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-zinc-100">
      <h1 className="mb-6 text-3xl font-semibold text-amber-300">Reserve a Table</h1>

      {/* status banners (site UI only, no browser alert) */}
      {errorMsg && (
        <div className="mb-4 rounded-md bg-red-900/30 p-3 text-red-200 ring-1 ring-red-800/40">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="mb-4 rounded-md bg-emerald-900/30 p-3 text-emerald-200 ring-1 ring-emerald-800/40">
          {successMsg}
        </div>
      )}

      <form onSubmit={submit} className="grid gap-4">
        <div className="grid gap-1">
          <label htmlFor="res-name" className="text-sm text-zinc-300">Name</label>
          <input
            id="res-name"
            className="rounded-md bg-zinc-800 px-3 py-2"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={onChange}
            autoComplete="name"
            required
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="res-email" className="text-sm text-zinc-300">Email</label>
          <input
            id="res-email"
            className="rounded-md bg-zinc-800 px-3 py-2"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={onChange}
            autoComplete="email"
            required
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="res-phone" className="text-sm text-zinc-300">Phone</label>
          <input
            id="res-phone"
            className="rounded-md bg-zinc-800 px-3 py-2"
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={onChange}
            autoComplete="tel"
            inputMode="tel"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <label htmlFor="res-date" className="text-sm text-zinc-300">Date</label>
            <input
              id="res-date"
              className="rounded-md bg-zinc-800 px-3 py-2"
              type="date"
              name="date"
              value={form.date}
              onChange={onChange}
              min={minDate}
              autoComplete="off"
              required
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="res-time" className="text-sm text-zinc-300">Time</label>
            <input
              id="res-time"
              className="rounded-md bg-zinc-800 px-3 py-2"
              type="time"
              name="time"
              value={form.time}
              onChange={onChange}
              autoComplete="off"
              required
            />
          </div>
        </div>

        <div className="grid gap-1">
          <label htmlFor="res-guests" className="text-sm text-zinc-300">Guests</label>
          <input
            id="res-guests"
            className="rounded-md bg-zinc-800 px-3 py-2"
            type="number"
            min={1}
            max={50}
            name="guests"
            value={form.guests}
            onChange={onChange}
            autoComplete="off"
            required
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="res-notes" className="text-sm text-zinc-300">Special requests (optional)</label>
          <textarea
            id="res-notes"
            className="rounded-md bg-zinc-800 px-3 py-2"
            rows={4}
            name="specialRequests"
            placeholder="Allergies, seating preference, etc."
            value={form.specialRequests}
            onChange={onChange}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-xl bg-amber-400/20 px-4 py-2 font-semibold text-amber-300 ring-1 ring-amber-400/30 hover:bg-amber-400/30 disabled:opacity-60"
          aria-busy={loading}
        >
          {loading ? "Sending…" : "Send Reservation"}
        </button>
      </form>
    </div>
  );
}
