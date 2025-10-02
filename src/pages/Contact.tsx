// src/pages/Contact.tsx
import { useState } from "react";
import Notice from "@/components/Notice";
import { postJSON } from "@/lib/api";

type Req = { name: string; email: string; subject?: string; message: string };
type Res = { success: boolean; message?: string };

const SPAM_HINT =
  "Heads up: our reply sometimes lands in Spam/Promotions. Please check there if you don't see it in your inbox.";

export default function Contact() {
  const [form, setForm] = useState<Req>({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  function validate(): string | null {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email address.";
    if (!form.message.trim()) return "Please enter a message.";
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
      const data = await postJSON<Res>("/api/contact", form);
      if (data?.success) {
        setSuccessMsg("Message sent! " + SPAM_HINT);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrorMsg(data?.message || "Failed to send message.");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-zinc-100">
      <h1 className="mb-6 text-3xl font-semibold text-amber-300">Contact Us</h1>

      {errorMsg && <Notice kind="error">{errorMsg}</Notice>}
      {successMsg && <Notice kind="success">{successMsg}</Notice>}
      <Notice kind="info">{SPAM_HINT}</Notice>

      <form onSubmit={submit} className="grid gap-4">
        <div className="grid gap-1">
          <label htmlFor="c-name" className="text-sm text-zinc-300">Name</label>
          <input id="c-name" name="name" className="rounded-md bg-zinc-800 px-3 py-2"
            value={form.name} onChange={onChange} required />
        </div>

        <div className="grid gap-1">
          <label htmlFor="c-email" className="text-sm text-zinc-300">Email</label>
          <input id="c-email" type="email" name="email" className="rounded-md bg-zinc-800 px-3 py-2"
            value={form.email} onChange={onChange} required />
        </div>

        <div className="grid gap-1">
          <label htmlFor="c-subject" className="text-sm text-zinc-300">Subject (optional)</label>
          <input id="c-subject" name="subject" className="rounded-md bg-zinc-800 px-3 py-2"
            value={form.subject} onChange={onChange} />
        </div>

        <div className="grid gap-1">
          <label htmlFor="c-message" className="text-sm text-zinc-300">Message</label>
          <textarea id="c-message" name="message" rows={5}
            className="rounded-md bg-zinc-800 px-3 py-2"
            value={form.message} onChange={onChange} required />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-xl bg-amber-400/20 px-4 py-2 font-semibold text-amber-300 ring-1 ring-amber-400/30 hover:bg-amber-400/30 disabled:opacity-60"
          aria-busy={loading}
        >
          {loading ? "Sending…" : "Send Message"}
        </button>
      </form>
    </div>
  );
}
