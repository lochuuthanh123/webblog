
import React, { useState, useEffect, useMemo } from 'react';
import { getLocalizedContent } from './content/mockData';
import { LiquidGlassCard } from './components/LiquidGlassCard';
import { ImageModal } from './components/ImageModal';
import { SkillRadar } from './components/SkillRadar';
import { Level } from './types';

type Route = 'home' | 'projects' | 'certifications';
type Locale = 'vi' | 'en';

const localeText = {
  vi: {
    nav: {
      home: 'Nhật ký',
      projects: 'Dự án',
      certs: 'Chứng chỉ'
    },
    verified: 'Verified Agent',
    activeOps: 'Active Operations',
    eventStream: 'Event Stream',
    processFlow: 'Process Flow',
    findings: 'Findings',
    captured: 'Captured Evidence'
  },
  en: {
    nav: {
      home: 'Logs',
      projects: 'Projects',
      certs: 'Certs'
    },
    verified: 'Verified Agent',
    activeOps: 'Active Operations',
    eventStream: 'Event Stream',
    processFlow: 'Process Flow',
    findings: 'Findings',
    captured: 'Captured Evidence'
  }
} as const;

// Tactical Tag Component - Highly prominent and technical
const TacticalTag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-white/[0.04] border border-white/20 rounded-lg text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest hover:text-white hover:border-white/50 hover:bg-white/10 transition-all duration-300 group/tag shadow-[0_4px_12px_rgba(0,0,0,0.5)] backdrop-blur-md">
    <div className="relative flex items-center justify-center">
      <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover/tag:bg-blue-400 group-hover/tag:shadow-[0_0_8px_#3b82f6] transition-all" />
      <div className="absolute w-3 h-3 rounded-full bg-blue-400/0 group-hover/tag:bg-blue-400/10 group-hover/tag:animate-ping" />
    </div>
    {children}
  </span>
);

const App: React.FC = () => {
  const [route, setRoute] = useState<Route>('home');
  const [locale, setLocale] = useState<Locale>('vi');
  const [galleryState, setGalleryState] = useState<{ images: string[], index: number } | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const { profileData, activitiesData, projectsData, certificationsData, toolboxSnippets } = useMemo(
    () => getLocalizedContent(locale),
    [locale]
  );

  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'projects') setRoute('projects');
      else if (hash === 'certifications') setRoute('certifications');
      else setRoute('home');
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    return () => window.removeEventListener('hashchange', handleLocationChange);
  }, []);

  const navigateTo = (target: Route) => {
    window.location.hash = target === 'home' ? '#' : `#${target}`;
  };

  const filteredActivities = useMemo(() => {
    if (!selectedTool) return activitiesData;
    return activitiesData.filter(a => a.tools_used.includes(selectedTool));
  }, [selectedTool, activitiesData]);

  const openGallery = (images: string[], index: number) => {
    setGalleryState({ images, index });
  };

  const localeCopy = useMemo(() => localeText[locale], [locale]);
  const toggleLocale = () => setLocale(prev => (prev === 'vi' ? 'en' : 'vi'));

  const renderHeader = () => (
    <header className="sticky top-0 z-50 w-full px-8 py-5 flex justify-between items-center backdrop-blur-xl bg-black/40 border-b border-white/5">
      <div className="flex items-center gap-4">
        <button onClick={() => navigateTo('home')} className="flex items-center gap-4 hover:opacity-100 transition-opacity group">
          <div className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative z-10 w-2.5 h-2.5 rounded-full pulse-dot status-dot-dynamic" />
            <div className="absolute inset-0 border border-white/20 rounded-xl group-hover:border-white/40 transition-colors" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-white/90 tracking-tighter text-[11px] uppercase tracking-[0.25em]">LTH_SEC_NODE</span>
            <span className="text-[8px] font-mono tracking-widest uppercase status-text-dynamic font-bold">Status: Nominal</span>
          </div>
        </button>
      </div>
      <div className="flex items-center gap-6">
        <nav className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
        <button
          onClick={() => navigateTo('home')}
          className={`text-white/30 hover:text-white transition-colors relative ${route === 'home' ? 'text-white' : ''}`}
        >
          {localeCopy.nav.home}
        </button>
        <button
          onClick={() => navigateTo('projects')}
          className={`text-white/30 hover:text-white transition-colors relative ${route === 'projects' ? 'text-white' : ''}`}
        >
          {localeCopy.nav.projects}
        </button>
        <button
          onClick={() => navigateTo('certifications')}
          className={`text-white/30 hover:text-white transition-colors relative ${route === 'certifications' ? 'text-white' : ''}`}
        >
          {localeCopy.nav.certs}
        </button>
        </nav>
        <button
          onClick={toggleLocale}
          className="relative w-16 h-7 border border-white/20 rounded-full bg-white/5 flex items-center px-1 transition-colors hover:border-white"
          aria-label="Toggle language"
        >
          <span className={`text-[10px] font-mono uppercase tracking-widest ${locale === 'vi' ? 'text-white' : 'text-white/40'}`}>VI</span>
          <div className="flex-1 relative h-full">
            <span
              className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${locale === 'en' ? 'translate-x-6' : ''}`}
            />
          </div>
          <span className={`text-[10px] font-mono uppercase tracking-widest ${locale === 'en' ? 'text-white' : 'text-white/40'}`}>EN</span>
        </button>
      </div>
    </header>
  );

  const HomeView = () => (
    <div className="space-y-40 py-20 animate-fade-up">
      {/* Profile Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-8 flex flex-col md:flex-row gap-12 items-center md:items-start group/profile">
          <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0 group">
            <div className="absolute -inset-4 rounded-[3rem] bg-white/[0.02] border border-white/5 pointer-events-none group-hover:border-white/10 transition-colors" />
            <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden inner-highlight border border-white/15 bg-black shadow-2xl">
              <img src="https://cdn.save.moe/b/v0zpt0D2.jpg" alt={profileData.full_name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" />
              <div className="scan-line" />
            </div>
            <div className="absolute -bottom-3 -right-3 px-3 py-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl">
              <div className="text-[8px] font-mono text-white/80 uppercase tracking-widest font-bold">{localeCopy.verified}</div>
            </div>
          </div>
          <div className="space-y-8 text-center md:text-left">
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.4em]">{localeCopy.activeOps}</span>
              </div>
              <h1 className="hero-name text-6xl md:text-7xl font-bold leading-[0.9]">
                Loc Huu
                <span className="block">Thanh</span>
              </h1>
              <p className="text-xs font-mono text-white/40 uppercase tracking-[0.2em]">
                {profileData.school} • {profileData.field}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-[10px] font-mono text-white/50 uppercase tracking-widest">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.03] border border-white/5 rounded-full">SOC Level I</span>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.03] border border-white/5 rounded-full">Blue Team</span>
              </div>
            </div>
            <p className="bio-text max-w-2xl">{profileData.bio}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4">
              {profileData.tools.map(tool => (
                <button key={tool} onClick={() => setSelectedTool(selectedTool === tool ? null : tool)} className={`px-4 py-1.5 rounded-xl text-[10px] font-mono transition-all border ${selectedTool === tool ? 'bg-white text-black border-white' : 'bg-white/5 text-white/40 border-white/10 hover:border-white'}`}>{tool}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 flex flex-col items-center justify-center gap-8 group/radar">
           <SkillRadar skills={profileData.skills} size={340} />
        </div>
      </section>

      {/* Activity Feed */}
      <section className="space-y-16">
        <div className="flex justify-between items-end">
          <div className="space-y-2 group/title">
            <h2 className="text-[11px] font-bold text-white/20 uppercase tracking-[0.4em] group-hover/title:text-white transition-colors">{localeCopy.eventStream}</h2>
            <p className="text-[10px] font-mono text-white/10">Tail -f security_log.stdout</p>
          </div>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-white/30 uppercase tracking-widest">{filteredActivities.length} Records</span>
        </div>
        
        <div className="space-y-32">
          {filteredActivities.map((activity) => {
            const secondaryImages = activity.images.slice(1, 4);
            const overflowCount = Math.max(0, activity.images.length - 1 - secondaryImages.length);
            return (
            <div key={activity.slug} className="group relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-3">
                  <div className="sticky top-32 space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-white/40" />
                      <time className="text-[11px] font-mono text-white/30 block tracking-wider">{activity.date}</time>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {activity.tags.map(t => <TacticalTag key={t}>{t}</TacticalTag>)}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-9">
                  <LiquidGlassCard className="p-10 hover:bg-white/[0.05]">
                    <div className="flex flex-col md:flex-row gap-16 items-start">
                      <div className="flex-grow space-y-10">
                        <section className="space-y-4">
                            <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] flex items-center gap-2">
                              <span className="relative flex items-center justify-center w-2 h-2">
                               <span className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
                               <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                              </span> {localeCopy.processFlow}
                          </h4>
                          <ul className="space-y-3 text-sm text-white/50 leading-relaxed font-light">
                            {activity.what_i_did.map((item, i) => (
                              <li key={i} className="flex gap-4 hover:text-white transition-colors">
                                <span className="text-white/10 font-mono text-[10px] mt-1">[{i+1}]</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </section>
                        <section className="space-y-4">
                            <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] flex items-center gap-2">
                              <span className="relative flex items-center justify-center w-2 h-2">
                               <span className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
                               <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                              </span> {localeCopy.findings}
                          </h4>
                          <p className="text-sm text-white/40 italic leading-relaxed font-light group-hover:text-white transition-colors">"{activity.what_i_learned[0]}"</p>
                        </section>
                      </div>

                      <div className="w-full md:w-[424px] shrink-0">
                        <div 
                          className="relative aspect-[3/2] rounded-[2rem] overflow-hidden cursor-zoom-in group/img border border-white/10 bg-black shadow-inner"
                          onClick={() => openGallery(activity.images, 0)}
                        >
                          <img src={activity.images[0]} alt={activity.title} className="object-cover w-full h-full brightness-110 opacity-90 group-hover/img:opacity-100 group-hover/img:brightness-125 transition-all duration-1000 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                          <div className="absolute bottom-6 left-6 px-3 py-1 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-[9px] font-mono text-white/60">{localeCopy.captured}</div>
                        </div>
                        {secondaryImages.length > 0 && (
                          <div className="flex items-center justify-center gap-2 mt-3">
                            {secondaryImages.map((thumb, idx) => {
                              const globalIndex = idx + 1;
                              const isOverflowSlot = overflowCount > 0 && idx === secondaryImages.length - 1;
                              return (
                                <button
                                  key={`${activity.slug}-thumb-${globalIndex}`}
                                  onClick={() => !isOverflowSlot && openGallery(activity.images, globalIndex)}
                                  className={`group/thumb relative w-16 h-12 rounded-xl border border-white/10 overflow-hidden bg-white/5 ${isOverflowSlot ? 'cursor-default' : 'cursor-zoom-in'}`}
                                >
                                  <img src={thumb} alt={`${activity.title} thumb ${globalIndex}`} className={`w-full h-full object-cover transition-all duration-500 ${isOverflowSlot ? 'opacity-40' : 'opacity-25 hover:opacity-100'}`} />
                                  {isOverflowSlot && (
                                    <span className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-xs font-mono tracking-widest">
                                      +{overflowCount}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </LiquidGlassCard>
                </div>
              </div>
            </div>
          );
          })}
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen pb-4 selection:bg-white/20 selection:text-white">
      {renderHeader()}
      <main className="max-w-7xl mx-auto px-8">
        {route === 'home' && <HomeView />}
        {route === 'projects' && (
          <div className="py-20 animate-fade-up space-y-20">
            <h2 className="text-5xl font-bold text-white tracking-tighter">Operational Projects</h2>
            <div className="grid gap-16">
              {projectsData.map(project => (
                <LiquidGlassCard key={project.slug} className="p-12 hover:bg-white/[0.05] group/project">
                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                      <div className="lg:col-span-5 space-y-8">
                        <h3 className="text-3xl font-bold text-white/90">{project.title}</h3>
                        <div className="flex flex-wrap gap-3">
                           {project.tags.map(t => <TacticalTag key={t}>{t}</TacticalTag>)}
                        </div>
                        <p className="text-base text-white/40 leading-relaxed font-light">{project.description}</p>
                      </div>
                      <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                        {project.images.slice(0, 4).map((img, idx) => (
                          <div key={idx} className="aspect-[3/2] rounded-3xl overflow-hidden border border-white/10 cursor-pointer bg-black" onClick={() => openGallery(project.images, idx)}>
                            <img src={img} className="object-cover w-full h-full brightness-110 opacity-90 hover:opacity-100 hover:brightness-125 transition-all duration-700" />
                          </div>
                        ))}
                      </div>
                   </div>
                </LiquidGlassCard>
              ))}
            </div>
          </div>
        )}
        {route === 'certifications' && (
          <div className="py-20 animate-fade-up space-y-20">
            <h2 className="text-5xl font-bold text-white tracking-tighter">Verified Credentials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certificationsData.map(cert => (
                <LiquidGlassCard key={cert.slug} className="flex flex-col h-full group/cert">
                  <div className="aspect-[3/2] overflow-hidden relative border-b border-white/5 bg-black cursor-zoom-in" onClick={() => cert.image && openGallery([cert.image], 0)}>
                    {cert.image && (
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="object-cover w-full h-full brightness-110 opacity-90 group-hover/cert:opacity-100 group-hover/cert:brightness-125 transition-all duration-1000"
                      />
                    )}
                  </div>
                  <div className="p-8 flex flex-col flex-grow space-y-6">
                    <div className="flex justify-between items-start">
                       <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">{cert.issuer}</span>
                       <span className="text-[10px] font-mono text-white/30 uppercase">{cert.date.split('-')[0]}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white/90 leading-tight">{cert.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed flex-grow font-light">{cert.description}</p>
                  </div>
                </LiquidGlassCard>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono text-white/60">SOC</div>
            <div>
              <p className="text-sm font-mono text-white/40 uppercase tracking-[0.3em]">Loc Huu Thanh</p>
              <p className="text-xl font-semibold text-white">Telemetry & Incident Response</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 text-sm font-mono text-white/60">
            <div>
              <p className="text-white/40 uppercase tracking-[0.2em] text-[10px]">Email</p>
              <p>lochuuthanh2004@gmail.com</p>
            </div>
            <div>
              <p className="text-white/40 uppercase tracking-[0.2em] text-[10px]">Signal</p>
              <p>+84 • 388898481</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="px-3 py-1 border border-white/15 rounded-full text-[10px] uppercase tracking-wide hover:text-white hover:border-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="px-3 py-1 border border-white/15 rounded-full text-[10px] uppercase tracking-wide hover:text-white hover:border-white transition-colors">LinkedIn</a>
            <a href="https://www.facebook.com/Thanhdubai.user" target="_blank" rel="noreferrer" className="px-3 py-1 border border-white/15 rounded-full text-[10px] uppercase tracking-wide hover:text-white hover:border-white transition-colors">Facebook</a>
          </div>
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/30">© {new Date().getFullYear()} LOC HUU THANH</p>
        </div>
      </footer>

      {galleryState && <ImageModal images={galleryState.images} initialIndex={galleryState.index} onClose={() => setGalleryState(null)} />}
    </div>
  );
};

export default App;
