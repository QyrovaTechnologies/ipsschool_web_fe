import React from 'react';
import { StaggerContainer, StaggerItem } from '../common/ScrollReveal';

export default function StatsSection() {
  return (
    <section className="w-full py-space-xl bg-primary-container text-on-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-gutter">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg text-center" staggerChildren={0.12}>
          <StaggerItem direction="zoom">
            <div className="space-y-1 p-6 rounded-xl bg-surface-container-lowest/5 border border-primary-container/80 hover:bg-surface-container-lowest/10 hover:border-tertiary-fixed/30 hover:scale-105 transition-all duration-300 shadow-md">
              <span className="block font-display-lg text-display-lg text-tertiary-fixed font-bold leading-none">500+</span>
              <span className="block font-headline-sm text-headline-sm text-on-primary font-medium mt-2">Enrolled Students</span>
              <span className="block font-body-sm text-body-sm text-primary-fixed-dim">Nursery to Class XII (Dual Medium)</span>
            </div>
          </StaggerItem>

          <StaggerItem direction="zoom">
            <div className="space-y-1 p-6 rounded-xl bg-surface-container-lowest/5 border border-primary-container/80 hover:bg-surface-container-lowest/10 hover:border-tertiary-fixed/30 hover:scale-105 transition-all duration-300 shadow-md">
              <span className="block font-display-lg text-display-lg text-tertiary-fixed font-bold leading-none">100%</span>
              <span className="block font-headline-sm text-headline-sm text-on-primary font-medium mt-2">Board Pass Rate</span>
              <span className="block font-body-sm text-body-sm text-primary-fixed-dim">Consistent Academic Excellence</span>
            </div>
          </StaggerItem>

          <StaggerItem direction="zoom">
            <div className="space-y-1 p-6 rounded-xl bg-surface-container-lowest/5 border border-primary-container/80 hover:bg-surface-container-lowest/10 hover:border-tertiary-fixed/30 hover:scale-105 transition-all duration-300 shadow-md">
              <span className="block font-display-lg text-display-lg text-tertiary-fixed font-bold leading-none">30+</span>
              <span className="block font-headline-sm text-headline-sm text-on-primary font-medium mt-2">Qualified Faculty &amp; Staff</span>
              <span className="block font-body-sm text-body-sm text-primary-fixed-dim">Dedicated Mentors &amp; Specialists</span>
            </div>
          </StaggerItem>

          <StaggerItem direction="zoom">
            <div className="space-y-1 p-6 rounded-xl bg-surface-container-lowest/5 border border-primary-container/80 hover:bg-surface-container-lowest/10 hover:border-tertiary-fixed/30 hover:scale-105 transition-all duration-300 shadow-md">
              <span className="block font-display-lg text-display-lg text-tertiary-fixed font-bold leading-none">25+</span>
              <span className="block font-headline-sm text-headline-sm text-on-primary font-medium mt-2">Sports &amp; Activity Clubs</span>
              <span className="block font-body-sm text-body-sm text-primary-fixed-dim">Holistic Co-Curricular Development</span>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}