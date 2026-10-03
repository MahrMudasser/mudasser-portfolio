import { useState } from 'react';

/**
 * Contact form.
 * - On Netlify it works with no setup: Netlify Forms detects the form named "contact" in the built HTML.
 * - Anywhere else (Cloudflare Pages), set PUBLIC_FORM_ENDPOINT to a Formspree endpoint.
 */
const ENDPOINT = import.meta.env.PUBLIC_FORM_ENDPOINT as string | undefined;

export default function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('company')) return; // honeypot
    setState('sending');
    try {
      const res = ENDPOINT
        ? await fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        : await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data as unknown as Record<string, string>).toString() });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState('sent');
    } catch {
      setState('error');
    }
  };

  return (
    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="company" onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <input type="hidden" name="form-name" value="contact" />
      <p hidden><label>Leave this empty <input name="company" tabIndex={-1} autoComplete="off" /></label></p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 14 }}>
        <div className="field"><label htmlFor="cf-name">Name</label><input id="cf-name" name="name" required autoComplete="name" /></div>
        <div className="field"><label htmlFor="cf-email">Email</label><input id="cf-email" name="email" type="email" required autoComplete="email" /></div>
      </div>
      <div className="field"><label htmlFor="cf-msg">Message</label><textarea id="cf-msg" name="message" rows={4} required placeholder="A role, a project, or a question." /></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <button className="btn btn-primary" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send message'} <span className="arr" aria-hidden="true">→</span>
        </button>
        <span className={`form-note${state === 'sent' ? ' ok' : ''}`} role="status">
          {state === 'sent' && "Thanks, your message is on its way. I'll get back to you soon."}
          {state === 'error' && 'That did not go through. Please email me directly instead.'}
        </span>
      </div>
    </form>
  );
}
