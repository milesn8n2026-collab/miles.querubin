import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { BookingSection } from './components/BookingSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ExperienceSection } from './components/ExperienceSection';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { OutcomesSection } from './components/OutcomesSection';
import { ServicesSection } from './components/ServicesSection';
import { WorksSection, WorksTabKey } from './components/WorksSection';
import { PlatformKey, ProjectCaseStudy } from './data/portfolioData';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mq-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  const [activeSection, setActiveSection] = useState<string>('services');
  const [activeTab, setActiveTab] = useState<WorksTabKey>('n8n');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectCaseStudy | null>(null);
  const [prefilledTopic, setPrefilledTopic] = useState<string>('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sync theme class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('mq-theme', theme);
  }, [theme]);

  // Scroll-spy & back-to-top visibility
  useEffect(() => {
    const sectionIds = ['services', 'experience', 'work', 'outcomes', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    elements.forEach((el) => observer.observe(el));

    const onScroll = () => {
      setShowBackToTop(window.scrollY > 420);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectPlatformFromHero = (platform: PlatformKey) => {
    setActiveTab(platform);
    setSelectedTool(null);
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectToolFromExperience = (tool: string) => {
    setSelectedTool((prev) => {
      const next = prev === tool ? null : tool;
      if (next) {
        setActiveTab('all');
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
      }
      return next;
    });
  };

  const handleBookSimilar = (projectTitle: string) => {
    setActiveProject(null);
    setPrefilledTopic(`Similar to: ${projectTitle}`);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div id="top" className="min-h-screen flex flex-col">
        <Navbar activeSection={activeSection} />

        <main className="flex-1">
          <Hero
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onSelectPlatformFromHero={handleSelectPlatformFromHero}
          />

          <ServicesSection />

          <ExperienceSection
            selectedTool={selectedTool}
            onSelectTool={handleSelectToolFromExperience}
          />

          <WorksSection
            activeTab={activeTab}
            onTabChange={setActiveTab}
            selectedTool={selectedTool}
            onClearToolFilter={() => setSelectedTool(null)}
            onOpenCaseStudy={setActiveProject}
          />

          <OutcomesSection onInspectProject={setActiveProject} />

          <BookingSection prefilledTopic={prefilledTopic} theme={theme} />
        </main>

        <Footer />

        <CaseStudyModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onBookSimilar={handleBookSimilar}
        />

        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.9 }}
              transition={{ duration: 0.18 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="no-print fixed bottom-6 right-6 z-30 w-11 h-11 rounded-full grid place-items-center text-white dark:text-[#02040a] shadow-lg transition-transform duration-150 hover:-translate-y-1 cursor-pointer"
              style={{
                backgroundImage: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)',
              }}
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
