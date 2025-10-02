// src/pages/Contact.tsx
import { useState } from 'react';
import { postJSON } from '@/lib/api';
import { toast } from 'sonner';

type ContactReq = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

type ContactRes = { success: boolean; message?: string };

export default function Contact() {
  const [form, setForm] = useState<ContactReq>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error('Please enter your name.');
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return toast.error('Please enter a valid email.');
    if (!form.message.trim()) return toast.error('Please write a message.');

    setLoading(true);
    try {
      const res = await postJSON<ContactRes>('/api/contact', form);
      if (res.success) {
        toast.success('Message sent! We’ll get back to you soon.');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(res.message || 'Failed to send message.');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-zinc-100">
      <h1 className="mb-6 text-3xl font-semibold text-amber-300">Contact Us</h1>
      <form onSubmit={submit} className="grid gap-4">
        <div className="grid gap-1">
          <label htmlFor="ct-name" className="text-sm text-zinc-300">Name</label>
          <input id="ct-name" className="rounded-md bg-zinc-800 px-3 py-2"
                 name="name" value={form.name} onChange={onChange}
                 autoComplete="name" required />
        </div>

        <div className="grid gap-1">
          <label htmlFor="ct-email" className="text-sm text-zinc-300">Email</label>
          <input id="ct-email" className="rounded-md bg-zinc-800 px-3 py-2"
                 type="email" name="email" value={form.email} onChange={onChange}
                 autoComplete="email" required />
        </div>

        <div className="grid gap-1">
          <label htmlFor="ct-subject" className="text-sm text-zinc-300">Subject (optional)</label>
          <input id="ct-subject" className="rounded-md bg-zinc-800 px-3 py-2"
                 name="subject" value={form.subject} onChange={onChange}
                 autoComplete="off" />
        </div>

        <div className="grid gap-1">
          <label htmlFor="ct-message" className="text-sm text-zinc-300">Message</label>
          <textarea id="ct-message" className="rounded-md bg-zinc-800 px-3 py-2"
                    rows={5} name="message" value={form.message} onChange={onChange}
                    autoComplete="off" required />
        </div>

        <button type="submit" disabled={loading}
                className="mt-2 rounded-xl bg-amber-400/20 px-4 py-2 font-semibold text-amber-300 ring-1 ring-amber-400/30 hover:bg-amber-400/30 disabled:opacity-60"
                aria-busy={loading}>
          {loading ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
