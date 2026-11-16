import { Award, Database, GraduationCap, Printer } from 'lucide-react';
import { CERTIFICATIONS, EXPERIENCE_BULLETS, TOOLS_AND_TECH } from '../data/portfolioData';

interface ExperienceSectionProps {
  selectedTool: string | null;
  onSelectTool: (tool: string) => void;
}

export function ExperienceSection({ selectedTool, onSelectTool }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 border-t border-[var(--border)] scroll-mt-20">
      <div className="mx-auto w-[92%] max-w-[1180px]">
        <div className="flex flex-wrap items-end justify-between gap-5 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[var(--accent)] mb-3">
              Experience
            </p>
            <h2 className="font-display font-extrabold text-3xl md:text-[2.6rem] leading-[1.15] tracking-tight text-[var(--text)]">
              Work experience
            </h2>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="no-print inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm font-semibold text-[var(--text)] hover:border-[var(--accent-border)] hover:bg-[var(--surface-elevated)] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <Printer className="w-4 h-4 text-[var(--accent)]" />
            <span>Print / Save Resume PDF</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.65fr_0.95fr] gap-6 items-start">
          {/* Main Experience Column */}
          <div className="grid gap-5">
            <article className="print-surface pro-card p-7 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                <h3 className="font-display font-bold text-xl text-[var(--text)]">
                  Automation Specialist / Freelance No-Code Developer
                </h3>
                <span className="font-mono-num text-xs font-semibold text-[var(--accent)]">
                  2026 – Present
                </span>
              </div>
              <p className="text-sm font-medium text-[var(--text-muted)] mb-5">
                Freelance · Remote
              </p>

              <ul className="grid gap-3">
                {EXPERIENCE_BULLETS.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-[0.93rem] text-[var(--text-soft)] leading-relaxed"
                  >
                    <span className="text-[var(--accent)] font-bold shrink-0" aria-hidden="true">
                      →
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="print-surface pro-card p-7 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
              <h3 className="font-display font-bold text-lg text-[var(--text)] mb-2.5">
                Professional Summary
              </h3>
              <p className="text-[0.94rem] text-[var(--text-muted)] leading-relaxed">
                AI Automation Specialist and Workflow Architect focused on building production-grade automation systems,
                CRM pipelines, and intelligent AI agents. Experienced in n8n, Make.com, Zapier, GoHighLevel, OpenAI,
                and REST APIs to help businesses eliminate repetitive bottlenecks and scale operations reliably.
              </p>
            </article>
          </div>

          {/* Right Sidebar */}
          <aside className="grid gap-5">
            <div className="print-surface p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="flex items-center gap-2 font-display font-bold text-base text-[var(--text)]">
                  <Database className="w-4 h-4 text-[var(--accent)]" />
                  <span>Tools &amp; Tech</span>
                </h3>
                {selectedTool && (
                  <button
                    type="button"
                    onClick={() => onSelectTool(selectedTool)}
                    className="text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
                  >
                    Clear filter
                  </button>
                )}
              </div>
              <p className="text-xs text-[var(--text-muted)] mb-4">
                Select a tool to filter matching projects in Works.
              </p>

              <div className="flex flex-wrap gap-2">
                {TOOLS_AND_TECH.map((tool) => {
                  const isSelected = selectedTool === tool;
                  return (
                    <button
                      key={tool}
                      type="button"
                      onClick={() => onSelectTool(tool)}
                      aria-pressed={isSelected}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'border-transparent text-white dark:text-[#02040a] font-semibold'
                          : 'border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-soft)] hover:border-[var(--accent-border)] hover:text-[var(--text)]'
                      }`}
                      style={
                        isSelected
                          ? {
                              backgroundImage:
                                'linear-gradient(90deg, var(--accent) 0%, var(--accent-secondary) 100%)',
                            }
                          : undefined
                      }
                    >
                      {tool}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="print-surface p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
              <h3 className="flex items-center gap-2 font-display font-bold text-base text-[var(--text)] mb-4">
                <Award className="w-4 h-4 text-[var(--accent)]" />
                <span>Certifications</span>
              </h3>
              <ul className="grid gap-2.5 text-sm text-[var(--text-muted)]">
                {CERTIFICATIONS.map((cert) => (
                  <li key={cert} className="flex items-center gap-2.5">
                    <span className="text-[var(--accent)]" aria-hidden="true">
                      ·
                    </span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="print-surface p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
              <h3 className="flex items-center gap-2 font-display font-bold text-base text-[var(--text)] mb-3">
                <GraduationCap className="w-4 h-4 text-[var(--accent)]" />
                <span>Education</span>
              </h3>
              <p className="font-semibold text-[0.96rem] text-[var(--text)]">Computer Science</p>
              <p className="text-sm text-[var(--text-muted)] font-mono-num">Infotech · 2012</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
