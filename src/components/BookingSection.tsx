import { useState } from 'react';
import { Check, Copy, ExternalLink, Mail } from 'lucide-react';

interface BookingSectionProps {
  prefilledTopic: string;
  theme: 'dark' | 'light';
}

const CALENDLY_BASE_URL = 'https://calendly.com/miles-automation1/30min';

export function BookingSection({ prefilledTopic, theme }: BookingSectionProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [copiedTopic, setCopiedTopic] = useState(false);

  const embedParams = new URLSearchParams({
    hide_landing_page_details: '1',
    hide_gdpr_banner: '1',
    background_color: theme === 'dark' ? '070b14' : 'ffffff',
    text_color: theme === 'dark' ? 'f8fafc' : '0f172a',
    primary_color: theme === 'dark' ? '14b8ff' : '0284c7',
  });

  if (typeof window !== 'undefined' && window.location.hostname) {
    embedParams.set('embed_domain', window.location.hostname);
    embedParams.set('embed_type', 'Inline');
  }

  const calendlyEmbedUrl = `${CALENDLY_BASE_URL}?${embedParams.toString()}`;

  const handleCopyTopic = async () => {
    if (!prefilledTopic) return;
    try {
      await navigator.clipboard.writeText(prefilledTopic);
      setCopiedTopic(true);
      window.setTimeout(() => setCopiedTopic(false), 2000);
    } catch {
      // Clipboard API unavailable in restricted contexts
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-[var(--border)] scroll-mt-20">
      <div className="mx-auto w-[92%] max-w-[1180px] grid grid-cols-1 lg:grid-cols-[0.88fr_1.32fr] gap-10 items-start">
        {/* Left Service Discovery & Direct Channels */}
        <div>
          <p className="text-xs font-semibold tracking-wide text-[var(--accent)] mb-3">
            Explore My Services
          </p>
          <h2 className="font-display font-extrabold text-3xl md:text-[2.6rem] leading-[1.15] tracking-tight text-[var(--text)] mb-4">
            Let&apos;s automate the work slowing your team down
          </h2>
          <p className="text-[var(--text-muted)] text-[1.02rem] leading-relaxed mb-8">
            Looking to streamline lead management, connect your CRM and apps, or deploy AI-powered workflows across n8n,
            Make.com, Zapier, and GoHighLevel? Book a call to explore how custom automation can fit your business, or
            reach out directly below.
          </p>

          {/* Direct Contact Links */}
          <div className="grid gap-3">
            <a
              href="mailto:miles.automation1@gmail.com"
              className="print-surface flex items-center justify-between gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent-border)] transition-all hover:translate-x-1"
            >
              <div>
                <span className="block text-xs font-semibold text-[var(--accent)] mb-0.5">Email</span>
                <span className="font-semibold text-sm text-[var(--text)]">
                  miles.automation1@gmail.com
                </span>
              </div>
              <Mail className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
            </a>

            <a
              href="https://www.linkedin.com/in/miles-kevin-querubin/"
              target="_blank"
              rel="noopener noreferrer"
              className="print-surface flex items-center justify-between gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent-border)] transition-all hover:translate-x-1"
            >
              <div>
                <span className="block text-xs font-semibold text-[var(--accent)] mb-0.5">LinkedIn</span>
                <span className="font-semibold text-sm text-[var(--text)]">
                  linkedin.com/in/miles-kevin-querubin
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
            </a>
          </div>
        </div>

        {/* Right Live Calendly Embed Card */}
        <div className="no-print pro-card rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden flex flex-col">
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h3 className="font-display font-bold text-base text-[var(--text)]">
              Calendly — 30 Minute Discovery Call
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Live availability synced in your local timezone
            </p>
          </div>

          {/* Optional Project Reference Banner (when arriving from a Case Study) */}
          {prefilledTopic && (
            <div className="px-6 py-3 border-b border-[var(--border)] bg-[var(--accent-soft)] flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-[var(--text-soft)]">
                <strong className="text-[var(--accent)]">Selected reference:</strong> {prefilledTopic}
              </p>
              <button
                type="button"
                onClick={handleCopyTopic}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[var(--accent-border)] bg-[var(--surface)] text-xs font-semibold text-[var(--accent)] cursor-pointer hover:opacity-90"
              >
                {copiedTopic ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy for booking notes</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Embedded Calendly Iframe */}
          <div className="relative w-full min-h-[680px] bg-[var(--surface)]">
            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center gap-4">
                <p className="font-display font-bold text-base text-[var(--text)]">
                  Loading Calendly Scheduler...
                </p>
                <p className="text-sm text-[var(--text-muted)] max-w-sm">
                  If your browser blocks embedded scheduling frames, book directly on Calendly using the button below.
                </p>
                <a
                  href={CALENDLY_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white dark:text-[#02040a]"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-secondary) 100%)',
                  }}
                >
                  <span>Schedule on Calendly</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            <iframe
              key={theme}
              title="Schedule a 30-minute Discovery Call with Miles Kevin Querubin on Calendly"
              src={calendlyEmbedUrl}
              onLoad={() => setIframeLoaded(true)}
              className="relative z-10 w-full h-[680px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
