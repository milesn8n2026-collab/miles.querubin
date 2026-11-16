import { motion } from 'motion/react';
import { Bot, GitBranch, MessageSquare, Settings2, Workflow, Zap } from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/portfolioData';

function ServiceIcon({ type }: { type: ServiceItem['icon'] }) {
  const iconClass = 'w-5 h-5';
  switch (type) {
    case 'workflow':
      return <Workflow className={iconClass} />;
    case 'ai':
      return <Bot className={iconClass} />;
    case 'crm':
      return <Settings2 className={iconClass} />;
    case 'api':
      return <GitBranch className={iconClass} />;
    case 'lead':
      return <MessageSquare className={iconClass} />;
    case 'optimize':
      return <Zap className={iconClass} />;
  }
}

export function ServicesSection() {
  return (
    <section id="services" className="py-20 border-t border-[var(--border)] scroll-mt-20">
      <div className="mx-auto w-[92%] max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[660px] mb-12"
        >
          <p className="text-xs font-semibold tracking-wide text-[var(--accent)] mb-3">
            Services
          </p>
          <h2 className="font-display font-extrabold text-3xl md:text-[2.6rem] leading-[1.15] tracking-tight text-[var(--text)] mb-3.5">
            What I build
          </h2>
          <p className="text-[var(--text-muted)] text-[1.02rem] leading-relaxed">
            Practical automation systems engineered to remove bottlenecks and free your team for higher-value work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, idx) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mx', `${x}px`);
                e.currentTarget.style.setProperty('--my', `${y}px`);
                const rx = ((y / rect.height) - 0.5) * -5;
                const ry = ((x / rect.width) - 0.5) * 5;
                e.currentTarget.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
              }}
              className="spotlight-card pro-card print-surface group p-7 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] hover:border-[var(--accent-border)] transition-[border-color,background-color,transform] duration-200 will-change-transform"
            >
              <div
                className="w-11 h-11 rounded-lg grid place-items-center mb-5 text-white dark:text-[#02040a] transition-transform duration-200 group-hover:scale-105"
                style={{
                  backgroundImage: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)',
                }}
                aria-hidden="true"
              >
                <ServiceIcon type={service.icon} />
              </div>
              <h3 className="font-display font-bold text-[1.12rem] text-[var(--text)] mb-2.5">
                {service.title}
              </h3>
              <p className="text-[0.92rem] text-[var(--text-muted)] leading-relaxed">
                {service.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
