import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Search, X } from 'lucide-react';
import { PlatformKey, PROJECTS, ProjectCaseStudy } from '../data/portfolioData';

export type WorksTabKey = PlatformKey | 'all';

interface WorksSectionProps {
  activeTab: WorksTabKey;
  onTabChange: (tab: WorksTabKey) => void;
  selectedTool: string | null;
  onClearToolFilter: () => void;
  onOpenCaseStudy: (project: ProjectCaseStudy) => void;
}

const TAB_CONFIG: Array<{ key: WorksTabKey; label: string; count: number }> = [
  { key: 'n8n', label: 'n8n', count: PROJECTS.filter((p) => p.platform === 'n8n').length },
  { key: 'make', label: 'Make.com', count: PROJECTS.filter((p) => p.platform === 'make').length },
  { key: 'zapier', label: 'Zapier', count: PROJECTS.filter((p) => p.platform === 'zapier').length },
  { key: 'all', label: 'All Builds', count: PROJECTS.length },
];

export function WorksSection({
  activeTab,
  onTabChange,
  selectedTool,
  onClearToolFilter,
  onOpenCaseStudy,
}: WorksSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const matchesQuery = (project: ProjectCaseStudy, q: string) => {
    const query = q.trim().toLowerCase();
    if (!query) return true;
    return (
      project.title.toLowerCase().includes(query) ||
      project.platformLabel.toLowerCase().includes(query) ||
      project.tags.some((t) => t.toLowerCase().includes(query)) ||
      project.stack.some((s) => s.tool.toLowerCase().includes(query)) ||
      project.shortDesc.toLowerCase().includes(query)
    );
  };

  const filteredProjects = PROJECTS.filter((project) => {
    const tabMatch = activeTab === 'all' || project.platform === activeTab;
    const toolMatch = !selectedTool || matchesQuery(project, selectedTool);
    const searchMatch = matchesQuery(project, searchQuery);
    return tabMatch && toolMatch && searchMatch;
  });

  return (
    <section id="work" className="py-20 border-t border-[var(--border)] scroll-mt-20">
      <div className="mx-auto w-[92%] max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[680px] mb-10"
        >
          <p className="text-xs font-semibold tracking-wide text-[var(--accent)] mb-3">
            Works
          </p>
          <h2 className="font-display font-extrabold text-3xl md:text-[2.6rem] leading-[1.15] tracking-tight text-[var(--text)] mb-3.5">
            Previous works
          </h2>
          <p className="text-[var(--text-muted)] text-[1.02rem] leading-relaxed">
            Switch between platforms or search by integration to explore automation builds and inspect step-by-step workflow architectures.
          </p>
        </motion.div>

        {/* Segmented Platform Filter Tabs + Search */}
        <div className="no-print flex flex-wrap items-center justify-between gap-4 mb-8">
          <div
            className="inline-flex flex-wrap items-center gap-1 p-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)]"
            role="tablist"
            aria-label="Filter projects by automation platform"
          >
            {TAB_CONFIG.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onTabChange(tab.key)}
                  className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-lg font-display text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                    isActive
                      ? 'text-white dark:text-[#02040a]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="works-active-tab"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-lg shadow-sm"
                      style={{
                        backgroundImage:
                          'linear-gradient(90deg, var(--accent) 0%, var(--accent-secondary) 100%)',
                      }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  <span
                    className={`relative z-10 font-mono-num text-xs ${
                      isActive ? 'opacity-90' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search workflows or tools..."
                aria-label="Search workflows or tools"
                className="w-full pl-9 pr-8 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)]/70 focus:outline-none focus:border-[var(--accent)]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {selectedTool && (
              <div className="flex items-center gap-2 text-sm text-[var(--text-soft)]">
                <span>
                  Tool: <strong className="text-[var(--accent)]">{selectedTool}</strong>
                </span>
                <button
                  type="button"
                  onClick={onClearToolFilter}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--surface)] text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent-border)] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="p-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center">
            <p className="font-display font-bold text-lg text-[var(--text)] mb-2">
              No matching workflows found
            </p>
            <p className="text-sm text-[var(--text-muted)] mb-5">
              Switch to All Builds or reset your filters to inspect all {PROJECTS.length} documented automation systems.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onTabChange('all');
                  onClearToolFilter();
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white dark:text-[#02040a] cursor-pointer"
                style={{
                  backgroundImage: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-secondary) 100%)',
                }}
              >
                Show All {PROJECTS.length} Builds
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.24), ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--mx', `${x}px`);
                  e.currentTarget.style.setProperty('--my', `${y}px`);
                  const rx = ((y / rect.height) - 0.5) * -3.5;
                  const ry = ((x / rect.width) - 0.5) * 3.5;
                  e.currentTarget.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                }}
                className="spotlight-card pro-card print-surface group flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] hover:border-[var(--accent-border)] overflow-hidden transition-[border-color,background-color,transform] duration-200 will-change-transform"
              >
                {/* Workflow Screenshot(s) or Node-Flow Architecture Canvas */}
                {project.gallery && project.gallery.length > 0 ? (
                  <div className="border-b border-[var(--border)] bg-[#f8fafc] flex flex-col">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border)] bg-[var(--surface-elevated)] text-xs">
                      <span className="font-mono-num font-semibold text-[var(--accent)]">
                        Project {project.code} · {project.platformLabel}
                      </span>
                      <span className="font-mono-num text-[var(--text-muted)]">
                        {project.gallery.length} connected flows · {project.breakdown.length} stages
                      </span>
                    </div>
                    <div className="h-[190px] w-full grid grid-cols-2 gap-2 p-2">
                      {project.gallery.map((shot, shotIdx) => (
                        <div
                          key={shot.url}
                          className="relative h-full w-full rounded-lg border border-slate-200 bg-[#f4f4f4] overflow-hidden flex flex-col"
                        >
                          <div className="px-2 py-1 border-b border-slate-200 bg-white/95 text-[10px] font-mono-num font-semibold text-slate-600 truncate">
                            Flow 0{shotIdx + 1}
                          </div>
                          <div className="flex-1 min-h-0 flex items-center justify-center p-1">
                            <img
                              src={shot.url}
                              alt={`${project.title} - ${shot.label}`}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : project.imageUrl ? (
                  <div className="border-b border-[var(--border)] bg-[#f8fafc] flex flex-col">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border)] bg-[var(--surface-elevated)] text-xs">
                      <span className="font-mono-num font-semibold text-[var(--accent)]">
                        Project {project.code} · {project.platformLabel}
                      </span>
                      <span className="font-mono-num text-[var(--text-muted)]">
                        {project.breakdown.length} stages
                      </span>
                    </div>
                    <div className="h-[190px] w-full overflow-hidden flex items-center justify-center p-2">
                      <img
                        src={project.imageUrl}
                        alt={`${project.title} ${project.platformLabel} workflow diagram`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="workflow-canvas-bg border-b border-[var(--border)] p-5 min-h-[222px] flex flex-col justify-between gap-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono-num font-semibold text-[var(--accent)]">
                        Project {project.code} · {project.platformLabel}
                      </span>
                      <span className="font-mono-num text-[var(--text-muted)]">
                        {project.breakdown.length} stages
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-1.5 my-auto py-1">
                      {project.flowNodes.map((node, nodeIdx) => (
                        <div key={`${project.id}-${node.label}`} className="flex items-center gap-1.5">
                          <span
                            className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap ${
                              node.isAi
                                ? 'border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)]'
                                : 'border-[var(--border)] bg-[var(--node-bg)] text-[var(--text)]'
                            }`}
                          >
                            {node.label}
                          </span>
                          {nodeIdx < project.flowNodes.length - 1 && (
                            <span className="text-xs font-bold text-[var(--accent)]" aria-hidden="true">
                              →
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <p className="text-xs font-medium text-[var(--accent)]">
                    {project.tags.join(' · ')}
                  </p>

                  <h3 className="font-display font-bold text-[1.18rem] leading-snug text-[var(--text)]">
                    {project.title}
                  </h3>

                  <p className="text-[0.92rem] text-[var(--text-muted)] leading-relaxed">
                    {project.shortDesc}
                  </p>

                  <ul className="grid gap-1.5 mt-1 text-[0.84rem] text-[var(--text-soft)]">
                    {project.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-[var(--accent)] font-bold shrink-0" aria-hidden="true">
                          →
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => onOpenCaseStudy(project)}
                    className="no-print mt-auto pt-3 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-[var(--accent)] hover:gap-2.5 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                  >
                    <span>View Case Study &amp; Workflow</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
