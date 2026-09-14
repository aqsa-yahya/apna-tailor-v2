import React, { useState } from 'react';
import './Contact.css';

const MailIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="6" width="26" height="20" rx="3" />
    <path d="m5 9 11 8 11-8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M8 4h5l2 6-3 2.3a17 17 0 0 0 8.7 8.7L23 18l6 2v5a3 3 0 0 1-3.2 3C15 27.3 6.7 19 5 8.2A3 3 0 0 1 8 4Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M16 29s9.5-8.7 9.5-16A9.5 9.5 0 0 0 6.5 13c0 7.3 9.5 16 9.5 16Z" strokeLinejoin="round" />
    <circle cx="16" cy="13" r="3.4" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="16" cy="16" r="12" />
    <path d="M16 9v7l5 3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const contactDetails = [
  { Icon: MailIcon, label: 'Email', value: 'hello@apnatailor.com', href: 'mailto:hello@apnatailor.com' },
  { Icon: PhoneIcon, label: 'WhatsApp / Call', value: '+92 300 1234567', href: 'tel:+923001234567' },
  { Icon: PinIcon, label: 'Location', value: 'Lahore, Pakistan', href: null },
  { Icon: ClockIcon, label: 'Response time', value: 'Usually within 24 hours', href: null },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <span className="contact-eyebrow">Get In Touch</span>
        <h1>Contact Us</h1>
        <p>Questions about a design, a tailor recommendation, or feedback on the app - we&apos;d love to hear from you.</p>
      </section>

      <section className="contact-grid">
        <div className="contact-info-col">
          {contactDetails.map(({ Icon, label, value, href }) => (
            <div className="contact-info-card" key={label}>
              <span className="contact-info-icon"><Icon /></span>
              <div>
                <span className="contact-info-label">{label}</span>
                {href ? (
                  <a href={href} className="contact-info-value">{value}</a>
                ) : (
                  <span className="contact-info-value">{value}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="contact-form-card">
          {sent ? (
            <div className="contact-sent">
              <span className="contact-sent-icon">✓</span>
              <h3>Message noted!</h3>
              <p>Thanks for reaching out - we&apos;ll get back to you soon.</p>
              <button type="button" onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>
                Name
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Your name"
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="you@example.com"
                />
              </label>
              <label>
                Message
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="How can we help?"
                />
              </label>
              <button type="submit" className="contact-submit-btn">Send Message</button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
