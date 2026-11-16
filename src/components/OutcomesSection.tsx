import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { OUTCOMES, PROJECTS, ProjectCaseStudy } from '../data/portfolioData';

interface OutcomesSectionProps {
  onInspectProject: (project: ProjectCaseStudy) => void;
}

export function OutcomesSection({ onInspectProject }: OutcomesSectionProps) {
  const findRelated = (titlePrefix: string) =>
    PROJECTS.find((p) => p.title.toLowerCase().includes(titlePrefix.toLowerCase().split(' ')[1] ?? '')) ??
    PROJECTS[0];

  return (
    <section id="outcomes" className="py-20 border-t border-[var(--border)] scroll-mt-20">
      <div className="mx-auto w-[92%] max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[660px] mb-12"
        >
          <p className="text-xs font-semibold tracking-wide text-[var(--accent)] mb-3">
            Outcomes
          </p>
          <h2 className="font-display font-extrabold text-3xl md:text-[2.6rem] leading-[1.15] tracking-tight text-[var(--text)] mb-3.5">
            Operational impact
          </h2>
          <p className="text-[var(--text-muted)] text-[1.02rem] leading-relaxed">
            How these n8n, Make.com, and Zapier architectures replace repetitive manual bottlenecks with reliable automated flows.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {OUTCOMES.map((item, idx) => {
            const matchedProject =
              PROJECTS.find(
                (p) =>
                  p.title.includes(item.relatedProject.split(' ')[0]) &&
                  p.title.includes(item.relatedProject.split(' ')[1])
              ) ?? findRelated(item.relatedProject);

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
                }}
                className="spotlight-card pro-card print-surface flex flex-col p-7 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent-border)] transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between gap-2 text-xs mb-3">
                  <span className="font-medium text-[var(--text-muted)]">{item.category}</span>
                  <span className="font-mono-num font-semibold text-[var(--accent)]">{item.metric}</span>
                </div>

                <h3 className="font-display font-bold text-lg text-[var(--text)] mb-4">
                  {item.title}
                </h3>

                <div className="grid gap-3 text-sm leading-relaxed mb-5">
                  <div>
                    <span className="font-semibold text-[var(--text)]">Before: </span>
                    <span className="text-[var(--text-muted)]">{item.before}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[var(--accent)]">Automated: </span>
                    <span className="text-[var(--text-soft)]">{item.after}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onInspectProject(matchedProject)}
                  className="no-print mt-auto pt-3 border-t border-[var(--border)] inline-flex items-center justify-between text-xs font-semibold text-[var(--text-soft)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                >
                  <span className="truncate">{matchedProject.title}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0 ml-2" />
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
