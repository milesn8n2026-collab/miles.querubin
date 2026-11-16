import { MqLogo } from './MqLogo';

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-9 text-[var(--text-muted)]">
      <div className="mx-auto w-[92%] max-w-[1180px] flex flex-wrap items-center justify-between gap-5">
        <a
          href="#top"
          className="inline-flex items-center gap-3 font-display font-bold text-sm text-[var(--text)] whitespace-nowrap"
        >
          <MqLogo width={42} height={22} />
          <span>Miles Kevin Querubin</span>
        </a>

        <p className="text-sm">&copy; 2026 Miles Kevin Querubin. All rights reserved.</p>

        <div className="flex items-center gap-6 text-sm font-medium">
          <a
            href="mailto:miles.automation1@gmail.com"
            className="hover:text-[var(--accent)] transition-colors"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/miles-kevin-querubin/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
