import React, { useState, useEffect } from 'react';
import { getStaff } from '../api/client';
import PageBanner from '../components/common/PageBanner';

export default function StaffPage({ onOpenAdmin }) {
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  const roles = [
    'All',
    'Director / Chairman',
    'Principal',
    'Vice Principal',
    'Academic Coordinator',
    'Examination Head',
    'Manager',
    'Teacher'
  ];

  const departments = [
    'All',
    'Administration',
    'Secondary & Sr Secondary',
    'Middle',
    'Primary',
    'Pre-Primary',
    'Sports & Physical Education',
    'Arts & Culture'
  ];

  useEffect(() => {
    fetchStaff();
  }, [selectedRole, selectedDept]);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedRole !== 'All') params.role = selectedRole;
      if (selectedDept !== 'All') params.department = selectedDept;
      const data = await getStaff(params);
      setStaffList(data.data || []);
    } catch (err) {
      console.error('Failed to load staff:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Director / Chairman':
      case 'Director':
        return 'bg-amber-600 text-white border-amber-400';
      case 'Principal':
        return 'bg-primary text-tertiary-fixed border-tertiary-fixed-dim';
      case 'Vice Principal':
        return 'bg-indigo-700 text-white border-indigo-400';
      case 'Academic Coordinator':
        return 'bg-purple-700 text-white border-purple-400';
      case 'Examination Head':
        return 'bg-rose-700 text-white border-rose-400';
      case 'Manager':
        return 'bg-emerald-700 text-white border-emerald-500';
      case 'Teacher':
      default:
        return 'bg-blue-700 text-white border-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-surface pb-16">
      <PageBanner
        title="Distinguished Faculty & Leadership"
        subtitle="30+ qualified academicians, administrators, and mentors dedicated to cultivating intellectual rigor and moral fortitude."
        badge="Faculty Directory"
        icon="badge"
        placementKey="campus_facilities"
        breadcrumbs={['Home', 'Faculty & Staff']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">

        {/* Dual Filter Controls: Roles & Departments */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container-high mb-10 space-y-4">
          {/* 1. Filter by Role */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-xs font-bold uppercase text-outline tracking-wider flex items-center gap-1 min-w-[80px]">
              <span className="material-symbols-outlined text-[16px] text-secondary">badge</span> Role:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRole(r)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedRole === r
                      ? 'bg-secondary text-on-secondary shadow-md scale-105'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                  }`}
                >
                  {r === 'All' ? 'All Roles' : r}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Filter by Department */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-surface-container-high">
            <span className="text-xs font-bold uppercase text-outline tracking-wider flex items-center gap-1 min-w-[80px]">
              <span className="material-symbols-outlined text-[16px] text-primary">domain</span> Dept:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    selectedDept === dept
                      ? 'bg-primary text-white font-bold shadow-sm'
                      : 'bg-surface hover:bg-surface-container text-on-surface-variant'
                  }`}
                >
                  {dept === 'All' ? 'All Departments' : dept}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Staff Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-sm font-semibold text-gray-600">Loading faculty directory...</p>
          </div>
        ) : staffList.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 p-8 max-w-md mx-auto">
            <span className="material-symbols-outlined text-[48px] text-gray-400 mb-2">person_off</span>
            <h3 className="font-bold text-base text-gray-800">No staff members found</h3>
            <p className="text-xs text-gray-500 mt-1">No faculty found matching the selected filters.</p>
            <button
              onClick={() => { setSelectedRole('All'); setSelectedDept('All'); }}
              className="mt-4 inline-flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {staffList.map((member) => (
              <div
                key={member._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Photo Container - Clean, unobstructed with top framing */}
                  <div className="relative h-64 bg-slate-100 overflow-hidden">
                    <img
                      src={member.photoUrl}
                      alt={member.fullName}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400';
                      }}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* Role & Department Row */}
                      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs border shrink-0 ${getRoleBadgeColor(
                            member.role
                          )}`}
                        >
                          <span className="material-symbols-outlined text-[12px]">workspace_premium</span>
                          <span>{member.role || 'Staff'}</span>
                        </span>

                        <span
                          className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider truncate max-w-[125px]"
                          title={member.department}
                        >
                          {member.department}
                        </span>
                      </div>

                      {/* Name & Designation */}
                      <div className="pt-2">
                        <h3 className="font-serif font-bold text-lg text-primary tracking-tight leading-snug">
                          {member.fullName}
                        </h3>
                        <p className="text-xs font-semibold text-secondary mt-0.5 tracking-wide">
                          {member.designation || member.role}
                        </p>
                      </div>

                      {/* Qualification */}
                      {member.qualification && (
                        <div className="flex items-start gap-1.5 text-xs text-slate-600 font-medium mt-2">
                          <span className="material-symbols-outlined text-[15px] text-tertiary-fixed-dim shrink-0 mt-0.5">school</span>
                          <span className="leading-snug">{member.qualification}</span>
                        </div>
                      )}

                      {/* Message / Statement without cut-off */}
                      {member.message && (
                        <div className="relative bg-slate-50/80 p-3 rounded-xl border border-slate-100 mt-2.5">
                          <span className="material-symbols-outlined absolute top-1 right-1.5 text-[20px] text-slate-200 select-none pointer-events-none">
                            format_quote
                          </span>
                          <p className="font-serif italic text-xs text-slate-700 leading-relaxed relative z-10">
                            “{member.message}”
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 pt-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-2 text-xs mt-auto">
                  <span className="flex items-center gap-1 font-semibold text-slate-600 whitespace-nowrap text-[11px]">
                    <span className="material-symbols-outlined text-[14px] text-secondary">history</span>
                    {member.experienceYears > 0 ? `${member.experienceYears}+ Years Exp.` : 'Staff'}
                  </span>

                  {member.subjectsTaught && member.subjectsTaught.length > 0 && (
                    <span
                      className="text-[10px] font-semibold bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full truncate max-w-[140px]"
                      title={member.subjectsTaught.join(', ')}
                    >
                      {member.subjectsTaught[0]}
                      {member.subjectsTaught.length > 1 ? ` +${member.subjectsTaught.length - 1}` : ''}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}