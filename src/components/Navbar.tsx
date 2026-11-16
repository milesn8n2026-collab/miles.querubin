import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { MqLogo } from './MqLogo';

interface NavbarProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { href: '#services', label: 'Services', id: 'services' },
  { href: '#experience', label: 'Experience', id: 'experience' },
  { href: '#work', label: 'Works', id: 'work' },
  { href: '#outcomes', label: 'Outcomes', id: 'outcomes' },
  { href: '#contact', label: 'Contact', id: 'contact' },
];

export function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(top > 20);
      setScrollProgress(height > 0 ? Math.min(100, (top / height) * 100) : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 h-[3px] z-50 pointer-events-none transition-[width] duration-75"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary), #ec4899)',
        }}
        aria-hidden="true"
      />

      <header
        className={`sticky top-0 z-40 transition-colors duration-200 border-b ${
          scrolled
            ? 'bg-[var(--bg)]/95 backdrop-blur-md border-[var(--border)] shadow-sm'
            : 'bg-[var(--bg)]/80 backdrop-blur-md border-transparent'
        }`}
      >
        <div className="mx-auto w-[92%] max-w-[1180px] h-16 md:h-[74px] flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#top"
            className="inline-flex items-center gap-3 font-display font-bold text-[1.02rem] tracking-tight text-[var(--text)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            aria-label="Miles Querubin Home"
          >
            <MqLogo width={48} height={26} />
            <span>Miles Querubin</span>
          </a>

          {/* Zone 2: Single-line Nav Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Primary Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`relative py-1 text-[0.92rem] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] ${
                    isActive ? 'text-[var(--text)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-[2px] rounded-full transition-all duration-200 ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                    style={{
                      background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary))',
                    }}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shrink-0 transition-transform duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              style={{
                backgroundColor: 'var(--cta-bg)',
                color: 'var(--cta-text)',
              }}
            >
              Book a Discovery Call
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[var(--border)] bg-[var(--surface)] px-6 py-4">
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-2 text-sm font-medium ${
                    activeSection === item.id ? 'text-[var(--accent)]' : 'text-[var(--text-soft)]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold"
                style={{
                  backgroundColor: 'var(--cta-bg)',
                  color: 'var(--cta-text)',
                }}
              >
                Book a Discovery Call
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
