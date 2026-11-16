import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, X, ZoomIn, ZoomOut } from 'lucide-react';
import { ProjectCaseStudy } from '../data/portfolioData';

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onBookSimilar: (projectTitle: string) => void;
}

export function CaseStudyModal({ project, onClose, onBookSimilar }: CaseStudyModalProps) {
  const [zoomed, setZoomed] = useState(false);
  const [galleryView, setGalleryView] = useState<'all' | number>('all');

  useEffect(() => {
    setZoomed(false);
    setGalleryView('all');
    if (!project) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  const visibleGallery =
    project?.gallery && project.gallery.length > 0
      ? galleryView === 'all'
        ? project.gallery
        : [project.gallery[galleryView]].filter(Boolean)
      : [];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="case-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[880px] max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 shadow-2xl grid gap-6"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-[var(--border)]">
              <div>
                <p className="font-mono-num text-xs font-semibold text-[var(--accent)] mb-2">
                  Project {project.code} · {project.platformLabel}
                </p>
                <h3
                  id="case-modal-title"
                  className="font-display font-extrabold text-xl md:text-2xl text-[var(--text)] leading-tight"
                >
                  {project.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text)] hover:border-[var(--accent-border)] hover:text-[var(--accent)] grid place-items-center shrink-0 cursor-pointer transition-colors"
                aria-label="Close case study"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Workflow Screenshot(s) (if available) + Architecture Topology */}
            {project.gallery && project.gallery.length > 0 ? (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <p className="text-xs font-semibold text-[var(--accent)]">
                    Connected Workflow Screenshots ({project.gallery.length})
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-1 p-0.5 rounded-lg border border-[var(--border)] bg-[var(--bg)]">
                      <button
                        type="button"
                        onClick={() => setGalleryView('all')}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                          galleryView === 'all'
                            ? 'bg-[var(--surface-elevated)] text-[var(--accent)]'
                            : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                        }`}
                      >
                        Combined ({project.gallery.length})
                      </button>
                      {project.gallery.map((shot, idx) => (
                        <button
                          key={shot.url}
                          type="button"
                          onClick={() => setGalleryView(idx)}
                          className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                            galleryView === idx
                              ? 'bg-[var(--surface-elevated)] text-[var(--accent)]'
                              : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                          }`}
                        >
                          Flow 0{idx + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setZoomed((z) => !z)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-soft)] hover:text-[var(--accent)] cursor-pointer transition-colors"
                    >
                      {zoomed ? (
                        <>
                          <ZoomOut className="w-3.5 h-3.5" />
                          <span>Fit to Modal</span>
                        </>
                      ) : (
                        <>
                          <ZoomIn className="w-3.5 h-3.5" />
                          <span>HD Zoom (150%)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {visibleGallery.map((shot) => (
                    <div
                      key={shot.url}
                      className="rounded-xl border border-[var(--border)] bg-[#f8fafc] overflow-hidden"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-b border-slate-200 bg-white">
                        <span className="text-xs font-semibold text-slate-700">{shot.label}</span>
                        <a
                          href={shot.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-sky-600 hover:underline"
                        >
                          Open full size ↗
                        </a>
                      </div>
                      <div className="p-3 overflow-auto max-h-[380px]">
                        <img
                          src={shot.url}
                          alt={`${project.title} - ${shot.label}`}
                          referrerPolicy="no-referrer"
                          onClick={() => setZoomed((z) => !z)}
                          className={`mx-auto transition-all duration-200 ${
                            zoomed
                              ? 'w-[150%] max-w-none cursor-zoom-out'
                              : 'w-full max-h-[340px] object-contain cursor-zoom-in'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : project.imageUrl ? (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <p className="text-xs font-semibold text-[var(--accent)]">Workflow Screenshot</p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setZoomed((z) => !z)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-soft)] hover:text-[var(--accent)] cursor-pointer transition-colors"
                    >
                      {zoomed ? (
                        <>
                          <ZoomOut className="w-3.5 h-3.5" />
                          <span>Fit to Modal</span>
                        </>
                      ) : (
                        <>
                          <ZoomIn className="w-3.5 h-3.5" />
                          <span>HD Zoom (150%)</span>
                        </>
                      )}
                    </button>
                    <a
                      href={project.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                    >
                      Open full size ↗
                    </a>
                  </div>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[#f8fafc] p-3 overflow-auto max-h-[460px]">
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} full workflow diagram`}
                    referrerPolicy="no-referrer"
                    onClick={() => setZoomed((z) => !z)}
                    className={`mx-auto transition-all duration-200 ${
                      zoomed
                        ? 'w-[150%] max-w-none cursor-zoom-out'
                        : 'w-full max-h-[420px] object-contain cursor-zoom-in'
                    }`}
                  />
                </div>
              </div>
            ) : (
              <div>
                <p className="text-xs font-semibold text-[var(--accent)] mb-2.5">Workflow Architecture</p>
                <div className="workflow-canvas-bg rounded-xl border border-[var(--border)] p-5 flex flex-wrap items-center justify-center gap-2">
                  {project.flowNodes.map((node, idx) => (
                    <div key={`${project.id}-modal-${node.label}`} className="flex items-center gap-2">
                      <span
                        className={`px-3 py-2 rounded-lg border text-xs font-semibold whitespace-nowrap ${
                          node.isAi
                            ? 'border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)]'
                            : 'border-[var(--border)] bg-[var(--node-bg)] text-[var(--text)]'
                        }`}
                      >
                        {node.label}
                      </span>
                      {idx < project.flowNodes.length - 1 && (
                        <span className="text-sm font-bold text-[var(--accent)]" aria-hidden="true">
                          →
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            <div>
              <p className="text-xs font-semibold text-[var(--accent)] mb-3">Project Overview</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-sm text-[var(--text-soft)]">
                {project.overview.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Problem vs Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                <h4 className="font-display font-bold text-[0.98rem] text-[var(--text)] mb-2">
                  The Business Problem
                </h4>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{project.problem}</p>
              </div>
              <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                <h4 className="font-display font-bold text-[0.98rem] text-[var(--text)] mb-2">
                  The Solution
                </h4>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Breakdown Table */}
            <div>
              <p className="text-xs font-semibold text-[var(--accent)] mb-3">Workflow Breakdown</p>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--surface-elevated)] text-left text-[var(--text-soft)]">
                      <th className="py-3 px-4 font-semibold w-16">No.</th>
                      <th className="py-3 px-4 font-semibold w-48">Step</th>
                      <th className="py-3 px-4 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.breakdown.map((row) => (
                      <tr key={row.no} className="border-b border-[var(--border)] last:border-b-0">
                        <td className="py-3 px-4 font-mono-num font-semibold text-[var(--accent)] align-top">
                          {row.no}
                        </td>
                        <td className="py-3 px-4 font-semibold text-[var(--text)] align-top">
                          {row.step}
                        </td>
                        <td className="py-3 px-4 text-[var(--text-muted)] align-top">
                          {row.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Technology Stack */}
            <div>
              <p className="text-xs font-semibold text-[var(--accent)] mb-3">Technology Stack</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.stack.map((item) => (
                  <div
                    key={item.tool}
                    className="px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--text-muted)]"
                  >
                    <strong className="text-[var(--text)]">{item.tool}</strong> — {item.role}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
              <p className="text-sm text-[var(--text-muted)]">
                Want a similar {project.platformLabel} workflow customized for your business?
              </p>
              <button
                type="button"
                onClick={() => onBookSimilar(project.title)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer transition-transform duration-150 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
                style={{
                  backgroundColor: 'var(--cta-bg)',
                  color: 'var(--cta-text)',
                }}
              >
                <span>Book a Discovery Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
