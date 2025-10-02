import { useState } from "react";
// if you want toasts: import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function Reserve() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    specialRequests: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "guests" ? Number(value) : value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data?.success) {
        // toast.success("Reservation request sent!");
        alert("Reservation request sent!");
        setForm({ name: "", email: "", phone: "", date: "", time: "", guests: 2, specialRequests: "" });
      } else {
        // toast.error(data?.message || "Failed to send reservation");
        alert(data?.message || "Failed to send reservation");
      }
    } catch (err) {
      // toast.error("Network error. Please try again.");
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-zinc-100">
      <h1 className="mb-6 text-3xl font-semibold text-amber-300">Reserve a Table</h1>

      <form onSubmit={submit} className="grid gap-4">
        <input className="rounded-md bg-zinc-800 px-3 py-2" name="name" placeholder="Your Name" value={form.name} onChange={onChange} required />
        <input className="rounded-md bg-zinc-800 px-3 py-2" name="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input className="rounded-md bg-zinc-800 px-3 py-2" name="phone" placeholder="Phone" value={form.phone} onChange={onChange} required />
        <div className="grid grid-cols-2 gap-4">
          <input className="rounded-md bg-zinc-800 px-3 py-2" type="date" name="date" value={form.date} onChange={onChange} required />
          <input className="rounded-md bg-zinc-800 px-3 py-2" type="time" name="time" value={form.time} onChange={onChange} required />
        </div>
        <input className="rounded-md bg-zinc-800 px-3 py-2" type="number" min={1} max={50} name="guests" value={form.guests} onChange={onChange} required />
        <textarea className="rounded-md bg-zinc-800 px-3 py-2" rows={4} name="specialRequests" placeholder="Special requests (optional)" value={form.specialRequests} onChange={onChange} />

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-xl bg-amber-400/20 px-4 py-2 font-semibold text-amber-300 ring-1 ring-amber-400/30 hover:bg-amber-400/30 disabled:opacity-60"
        >
          {loading ? "Sending…" : "Send Reservation"}
        </button>
      </form>
    </div>
  );
}
