import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Box,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Layers,
  Moon,
  Play,
  RotateCcw,
  Sun,
} from 'lucide-react';
import { HERO_TOOLS, PlatformKey, PROJECTS, TOOLS_AND_TECH } from '../data/portfolioData';
import { AutomationCore3D, BlueprintMode } from './AutomationCore3D';

interface HeroProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onSelectPlatformFromHero: (platform: PlatformKey) => void;
}

interface SimBlueprint {
  id: BlueprintMode;
  label: string;
  platform: PlatformKey;
  trigger: string;
  steps: Array<{
    title: string;
    detail: string;
    isAi?: boolean;
  }>;
}

const SIM_BLUEPRINTS: SimBlueprint[] = [
  {
    id: 'lead-triage',
    label: 'Lead Qualification',
    platform: 'n8n',
    trigger: 'POST /webhook/inbound-lead',
    steps: [
      { title: 'Webhook & Validation', detail: 'Verify required contact fields & normalize payload' },
      { title: 'Google Sheets Dedupe', detail: 'Check CRM rows to prevent duplicate prospect entries' },
      { title: 'OpenAI Lead Qualifier', detail: 'Score intent & output Hot / Warm / Cold JSON', isAi: true },
      { title: 'Sales Alert & Follow-Up', detail: 'Notify sales on Hot leads or dispatch Gmail nurture' },
    ],
  },
  {
    id: 'ai-receptionist',
    label: 'AI Receptionist',
    platform: 'n8n',
    trigger: 'POST /webhook/incoming-call',
    steps: [
      { title: 'Call Payload Intake', detail: 'Capture caller details & transcript metadata' },
      { title: 'AI Intent Extraction', detail: 'Classify new booking, reschedule, or cancellation', isAi: true },
      { title: 'Calendar Availability', detail: 'Check open appointment windows in real time' },
      { title: 'Booking & Reminder', detail: 'Confirm slot and queue customer SMS / email alert' },
    ],
  },
  {
    id: 'content-engine',
    label: 'Content Repurposing',
    platform: 'zapier',
    trigger: 'Google Drive · New Media File',
    steps: [
      { title: 'File Filter Gate', detail: 'Validate media format & folder eligibility rules' },
      { title: 'AI Transcription & Draft', detail: 'Generate transcript and structured blog post', isAi: true },
      { title: 'Loop & Path Routing', detail: 'Split line items across Path A and Path B conditions' },
      { title: 'Social Distribution', detail: 'Publish updates to Facebook Pages and LinkedIn' },
    ],
  },
];

export function Hero({ theme, onToggleTheme, onSelectPlatformFromHero }: HeroProps) {
  const [blueprintIndex, setBlueprintIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'3d' | 'trace'>('3d');
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(2);
  const [isSimulating, setIsSimulating] = useState(false);

  const blueprint = SIM_BLUEPRINTS[blueprintIndex];

  useEffect(() => {
    if (!isSimulating) return;
    setActiveStep(0);

    const timers: number[] = [];
    blueprint.steps.forEach((_, idx) => {
      const t = window.setTimeout(() => {
        setActiveStep(idx);
        if (idx === blueprint.steps.length - 1) {
          setIsSimulating(false);
        }
      }, idx * 520);
      timers.push(t);
    });

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [isSimulating, blueprint]);

  const handleSelectBlueprint = (idx: number) => {
    setIsSimulating(false);
    setBlueprintIndex(idx);
    setActiveStep(0);
  };

  const handleToolClick = (name: string) => {
    if (name === 'n8n') {
      onSelectPlatformFromHero('n8n');
    } else if (name === 'Make.com') {
      onSelectPlatformFromHero('make');
    } else if (name === 'Zapier') {
      onSelectPlatformFromHero('zapier');
    } else {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-20 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 8%, rgba(20, 184, 255, 0.14), transparent 38%), radial-gradient(circle at 82% 14%, rgba(91, 108, 249, 0.12), transparent 40%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] -z-10 workflow-canvas-bg opacity-65"
        style={{
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 25%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 25%, black 20%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      <div className="mx-auto w-[92%] max-w-[1180px]">
        {/* Top Utility Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <p className="text-sm font-medium text-[var(--text-muted)]">
            <span className="text-[var(--accent)] font-semibold">Miles Kevin Querubin</span>
            <span className="mx-2 text-[var(--border-strong)]" aria-hidden="true">
              ·
            </span>
            <span>Automation Specialist &amp; AI Workflow Builder</span>
            <span className="mx-2 text-[var(--border-strong)]" aria-hidden="true">
              ·
            </span>
            <span>Available for projects</span>
          </p>

          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold text-[var(--text-soft)] hover:border-[var(--accent-border)] hover:text-[var(--text)] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Light mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Dark mode</span>
              </>
            )}
          </button>
        </div>

        {/* Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-8 lg:gap-10 items-stretch">
          {/* Left: Headline & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <h1
              className="font-display font-extrabold tracking-[-0.03em] leading-[1.06] text-[var(--text)] mb-6"
              style={{
                fontSize: 'clamp(2.4rem, 4.7vw, 4rem)',
                textWrap: 'balance',
              }}
            >
              I build{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-secondary) 100%)',
                }}
              >
                automations
              </span>{' '}
              that quietly run your business.
            </h1>

            <p className="text-[1.03rem] md:text-[1.12rem] text-[var(--text-muted)] leading-relaxed max-w-[60ch] mb-8">
              I design reliable n8n, Make.com, Zapier, and GoHighLevel systems powered by ChatGPT, Claude, and Gemini to
              eliminate manual work and scale your operations.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-[0.94rem] text-white dark:text-[#02040a] whitespace-nowrap shrink-0 shadow-[0_8px_24px_-6px_rgba(20,184,255,0.45)] transition-transform duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                style={{
                  backgroundImage: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-secondary) 100%)',
                }}
              >
                <span>Book a Discovery Call</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#work"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg font-semibold text-[0.94rem] border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent-border)] hover:bg-[var(--surface-elevated)] whitespace-nowrap shrink-0 transition-all duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                Explore Workflows
              </a>
            </div>
          </motion.div>

          {/* Right: HD 3D AI Automation Core + Collapsible Bottom Dock */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="no-print pro-card relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden min-h-[400px] lg:min-h-[440px] flex flex-col"
          >
            {/* Top Minimal Label Bar (no backdrop-filter over WebGL) */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
              <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-soft)]">
                <span className="font-mono-num font-semibold text-[var(--accent)]">
                  {viewMode === '3d' ? '3D Orchestration Core' : 'Blueprint Execution Trace'}
                </span>
                <span className="text-[var(--border-strong)]" aria-hidden="true">
                  ·
                </span>
                <span className="text-[var(--text-muted)]">
                  {viewMode === '3d' ? 'Drag to rotate' : blueprint.trigger}
                </span>
              </div>

              <div className="inline-flex items-center gap-1 p-0.5 rounded-lg border border-[var(--border)] bg-[var(--bg)]">
                <button
                  type="button"
                  onClick={() => setViewMode('3d')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                    viewMode === '3d'
                      ? 'bg-[var(--surface-elevated)] text-[var(--accent)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>3D Engine</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('trace')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                    viewMode === 'trace'
                      ? 'bg-[var(--surface-elevated)] text-[var(--accent)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Flow Trace</span>
                </button>
              </div>
            </div>

            {/* Viewport Area (100% unobstructed center for 3D or Trace) */}
            <div className="relative flex-1 min-h-[300px]">
              {viewMode === '3d' ? (
                <div className="absolute inset-0">
                  <AutomationCore3D theme={theme} mode={blueprint.id} />
                </div>
              ) : (
                <div className="p-4 md:p-5 grid gap-2.5 h-full content-center bg-[var(--bg)]">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-medium text-[var(--text-muted)]">
                      Click any node or simulate step-by-step execution
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsSimulating(true)}
                      disabled={isSimulating}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)] hover:opacity-90 disabled:opacity-60 cursor-pointer whitespace-nowrap"
                    >
                      {isSimulating ? (
                        <>
                          <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                          <span>Running</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Simulate Flow</span>
                        </>
                      )}
                    </button>
                  </div>

                  {blueprint.steps.map((step, idx) => {
                    const isCurrent = idx === activeStep;
                    const isDone = idx < activeStep;
                    return (
                      <button
                        key={step.title}
                        type="button"
                        onClick={() => {
                          setIsSimulating(false);
                          setActiveStep(idx);
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition-all duration-150 flex items-start gap-3 cursor-pointer ${
                          isCurrent
                            ? 'border-[var(--accent-border)] bg-[var(--accent-soft)]'
                            : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)]'
                        }`}
                      >
                        <span
                          className={`font-mono-num text-xs font-bold mt-0.5 shrink-0 ${
                            isCurrent || isDone ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-[var(--text)] truncate">
                              {step.title}
                            </span>
                            {(isCurrent || isDone) && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-snug">
                            {step.detail}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Collapsible Bottom Control Dock (solid surface, zero backdrop-filter over WebGL) */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-[480px] flex flex-col items-center pointer-events-none z-10">
                <button
                  type="button"
                  onClick={() => setDockCollapsed((prev) => !prev)}
                  className="pointer-events-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-t-lg border border-b-0 border-[var(--border)] bg-[var(--surface)] text-[11px] font-semibold text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
                >
                  {dockCollapsed ? (
                    <>
                      <ChevronUp className="w-3 h-3" />
                      <span>Show Controls</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3" />
                      <span>Hide Controls</span>
                    </>
                  )}
                </button>

                {!dockCollapsed && (
                  <div className="pointer-events-auto w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1.5 flex items-center justify-between gap-1 shadow-lg">
                    {SIM_BLUEPRINTS.map((item, idx) => {
                      const selected = idx === blueprintIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectBlueprint(idx)}
                          className={`flex-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap truncate transition-colors cursor-pointer ${
                            selected
                              ? 'bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)]'
                              : 'text-[var(--text-muted)] hover:text-[var(--text)] border border-transparent'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 5-Card Platform Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
          {HERO_TOOLS.map((tool, idx) => (
            <motion.button
              key={tool.name}
              type="button"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 + idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleToolClick(tool.name)}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
              }}
              className="spotlight-card pro-card text-left p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] hover:border-[var(--accent-border)] transition-all duration-150 hover:-translate-y-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              <span className="block font-display font-bold text-[1.02rem] text-[var(--text)] mb-1">
                {tool.name}
              </span>
              <span className="block text-[0.84rem] text-[var(--text-muted)]">{tool.role}</span>
            </motion.button>
          ))}
        </div>

        {/* Clean Verifiable Portfolio Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-6 border-t border-[var(--border)]">
          <div>
            <p className="font-mono-num font-bold text-xl text-[var(--text)]">{PROJECTS.length}</p>
            <p className="text-xs text-[var(--text-muted)]">Documented automation systems</p>
          </div>
          <div>
            <p className="font-mono-num font-bold text-xl text-[var(--text)]">3</p>
            <p className="text-xs text-[var(--text-muted)]">Core engines · n8n, Make &amp; Zapier</p>
          </div>
          <div>
            <p className="font-mono-num font-bold text-xl text-[var(--text)]">{TOOLS_AND_TECH.length}+</p>
            <p className="text-xs text-[var(--text-muted)]">APIs, CRMs &amp; AI integrations</p>
          </div>
          <div>
            <p className="font-mono-num font-bold text-xl text-[var(--text)]">24/7</p>
            <p className="text-xs text-[var(--text-muted)]">Webhook &amp; scheduled orchestration</p>
          </div>
        </div>
      </div>
    </section>
  );
}
