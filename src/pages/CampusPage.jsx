import React from 'react';
import PageBanner from '../components/common/PageBanner';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/common/ScrollReveal';

export default function CampusPage({ onNavigate }) {
  const facilities = [
    {
      title: 'Advanced Computer & AI Laboratory',
      category: 'STEM Wing',
      icon: 'memory',
      desc: 'High-speed networked computer terminals with modern coding environments, digital design tools, and supervised internet access for computational thinking.',
      features: ['Modern Desktop Terminals', 'High-Speed Broadband', 'Programming & Coding Fundamentals']
    },
    {
      title: 'Composite Science Laboratories',
      category: 'Scientific Inquiry',
      icon: 'biotech',
      desc: 'Fully equipped Physics, Chemistry, and Biology lab stations meeting UP Board practical standards with proper safety equipment and experimental kits.',
      features: ['Optical & Electrical Apparatus', 'Chemical Workstations', 'Biological Microscopes & Specimen']
    },
    {
      title: 'Expansive Sports Complex & Athletic Grounds',
      category: 'Physical Education',
      icon: 'sports_cricket',
      desc: 'Dedicated grounds for cricket, football, volleyball, athletics, yoga, and drill exercises guided by trained physical instructors.',
      features: ['Standard Cricket Pitch & Nets', 'Football & Volleyball Courts', 'Annual Inter-House Sports Tournaments']
    },
    {
      title: 'Library & Learning Resource Centre',
      category: 'Scholastic Resources',
      icon: 'local_library',
      desc: 'A quiet haven housing thousands of volumes in English, Hindi, and Urdu spanning literature, competitive exam references, encyclopedias, and periodicals.',
      features: ['Extensive Reference Section', 'Daily Periodicals & Magazines', 'Quiet Self-Study Desks']
    },
    {
      title: 'Smart Audio-Visual Classrooms',
      category: 'Interactive Learning',
      icon: 'co_present',
      desc: 'Multimedia-enabled classrooms allowing teachers to demonstrate 3D animations, educational documentaries, and interactive lessons.',
      features: ['Digital Projectors', 'Acoustic Sound Clarity', 'Well-Ventilated Ergonomic Desks']
    },
    {
      title: 'Safe Campus & Student Transport',
      category: 'Student Safety',
      icon: 'directions_bus',
      desc: '24x7 CCTV surveillance across campus corridors and grounds, clean filtered RO drinking water, and safe school bus routes covering Pankhobari & Bankati region.',
      features: ['Dedicated Bus Fleet', 'RO Drinking Water Stations', 'Complete CCTV Coverage']
    }
  ];

  return (
    <div className="w-full bg-surface pb-16">
      <PageBanner
        title="Campus Life & Infrastructure"
        subtitle="Expansive, secure, and technologically advanced learning spaces nestled in a verdant setting in Pankhobari, Basti."
        badge="State-of-the-Art Campus"
        icon="domain"
        placementKey="sports_complex"
        breadcrumbs={['Home', 'Campus Life']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* Facilities Grid */}
        <div>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest">WORLD-CLASS AMENITIES</span>
              <h2 className="font-serif text-3xl font-bold text-primary tracking-tight mt-1">
                Spaces Built for Growth & Discovery
              </h2>
              <p className="text-sm text-on-surface-variant mt-2">
                Every corner of Iqura Public School is designed to foster curiosity, safety, and physical well-being.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerChildren={0.12}>
            {facilities.map((item, idx) => (
              <StaggerItem key={idx} direction="up">
                <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-sm hover:shadow-lg hover:border-secondary transition-all h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-12 h-12 rounded-xl bg-primary text-tertiary-fixed flex items-center justify-center shadow">
                        <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                      </span>
                      <span className="px-2.5 py-0.5 bg-surface-container-high text-on-surface-variant text-[11px] font-bold uppercase rounded-full">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">{item.desc}</p>

                    <div className="space-y-1.5 pt-3 border-t border-surface-container-high">
                      {item.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-medium text-primary">
                          <span className="material-symbols-outlined text-[15px] text-secondary">check_circle</span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Gallery CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-primary via-primary-container to-primary text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-tertiary-fixed">Explore Campus Gallery</h3>
            <p className="text-xs sm:text-sm text-primary-fixed max-w-xl">
              Browse high-resolution photographs of our campus grounds, laboratories, sports tournaments, and annual events.
            </p>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('gallery')}
            className="px-6 py-3 bg-secondary text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-on-secondary-container transition-all shadow shrink-0"
          >
            Open Photo Gallery
          </button>
        </div>
      </div>
    </div>
  );
}
