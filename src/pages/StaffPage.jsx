import React, { useState, useEffect, useMemo } from 'react';
import { getStaff } from '../api/client';
import PageBanner from '../components/common/PageBanner';

export default function StaffPage({ onOpenAdmin }) {
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
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

  // Filter staff by search query (name, designation, subject, qualification)
  const filteredStaffList = useMemo(() => {
    if (!searchQuery.trim()) return staffList;
    const q = searchQuery.toLowerCase().trim();
    return staffList.filter((m) => {
      const name = (m.fullName || '').toLowerCase();
      const desig = (m.designation || '').toLowerCase();
      const qual = (m.qualification || '').toLowerCase();
      const role = (m.role || '').toLowerCase();
      const dept = (m.department || '').toLowerCase();
      const subjects = (m.subjectsTaught || []).join(' ').toLowerCase();
      return (
        name.includes(q) ||
        desig.includes(q) ||
        qual.includes(q) ||
        role.includes(q) ||
        dept.includes(q) ||
        subjects.includes(q)
      );
    });
  }, [staffList, searchQuery]);

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'Director / Chairman':
      case 'Director':
        return {
          pill: 'bg-amber-600 text-white border-amber-500/80',
          icon: 'stars',
          accent: 'border-l-4 border-l-amber-500'
        };
      case 'Principal':
        return {
          pill: 'bg-[#00152b] text-[#ffdea0] border-[#ffdea0]/40',
          icon: 'workspace_premium',
          accent: 'border-l-4 border-l-secondary'
        };
      case 'Vice Principal':
        return {
          pill: 'bg-indigo-700 text-white border-indigo-500/80',
          icon: 'military_tech',
          accent: 'border-l-4 border-l-indigo-600'
        };
      case 'Academic Coordinator':
        return {
          pill: 'bg-purple-700 text-white border-purple-500/80',
          icon: 'psychology',
          accent: 'border-l-4 border-l-purple-600'
        };
      case 'Examination Head':
        return {
          pill: 'bg-rose-700 text-white border-rose-500/80',
          icon: 'assignment_turned_in',
          accent: 'border-l-4 border-l-rose-600'
        };
      case 'Manager':
        return {
          pill: 'bg-emerald-700 text-white border-emerald-500/80',
          icon: 'admin_panel_settings',
          accent: 'border-l-4 border-l-emerald-600'
        };
      case 'Teacher':
      default:
        return {
          pill: 'bg-blue-700 text-white border-blue-500/80',
          icon: 'school',
          accent: 'border-l-4 border-l-blue-600'
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 text-[#111c2d]">
      <PageBanner
        title="Distinguished Faculty & Leadership"
        subtitle="Qualified academicians, visionary administrators, and dedicated mentors committed to holistic education and character building."
        badge="Faculty Directory"
        icon="badge"
        placementKey="campus_facilities"
        breadcrumbs={['Home', 'Faculty & Staff']}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-8">

        {/* Filter Controls & Search Card */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200/90 mb-8 space-y-4">
          
          {/* Search Bar + Results Counter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-slate-400">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search faculty by name, subject, or qualification..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 self-end sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {filteredStaffList.length} Faculty Member{filteredStaffList.length === 1 ? '' : 's'}
              </span>
            </div>
          </div>

          {/* 1. Filter by Role */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1 min-w-[70px]">
              <span className="material-symbols-outlined text-[15px] text-secondary">badge</span> Role:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRole(r)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedRole === r
                      ? 'bg-secondary text-white shadow-sm ring-1 ring-secondary scale-105'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {r === 'All' ? 'All Roles' : r}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Filter by Department */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1 min-w-[70px]">
              <span className="material-symbols-outlined text-[15px] text-primary">domain</span> Dept:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-2.5 py-1 rounded-full text-xs transition-all cursor-pointer ${
                    selectedDept === dept
                      ? 'bg-[#00152b] text-white font-bold shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {dept === 'All' ? 'All Departments' : dept}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Staff Grid: Adaptive Mobile Horizontal / Desktop Vertical Cards */}
        {loading ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="inline-block w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-sm font-semibold text-slate-600">Loading faculty directory...</p>
          </div>
        ) : filteredStaffList.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8 max-w-md mx-auto shadow-sm">
            <span className="material-symbols-outlined text-[48px] text-slate-400 mb-2">person_off</span>
            <h3 className="font-bold text-base text-slate-800">No staff members found</h3>
            <p className="text-xs text-slate-500 mt-1">
              {searchQuery
                ? `No staff matching "${searchQuery}".`
                : 'No faculty found matching the selected filters.'}
            </p>
            <button
              onClick={() => {
                setSelectedRole('All');
                setSelectedDept('All');
                setSearchQuery('');
              }}
              className="mt-4 inline-flex items-center gap-1.5 bg-[#00152b] text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-secondary transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredStaffList.map((member) => {
              const roleStyle = getRoleBadgeStyle(member.role);

              return (
                <div
                  key={member._id}
                  className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/90 overflow-hidden flex flex-row sm:flex-col justify-between group hover:-translate-y-1 ${roleStyle.accent}`}
                >
                  {/* Photo Container:
                      - Mobile: Compact portrait aspect ratio (w-28 xs:w-32 h-auto shrink-0)
                      - Desktop: Expansive vertical frame (sm:w-full sm:h-72)
                  */}
                  <div className="relative w-28 xs:w-32 sm:w-full h-auto sm:h-72 shrink-0 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-200 overflow-hidden flex items-center justify-center border-r sm:border-r-0 sm:border-b border-slate-100">
                    <img
                      src={member.photoUrl}
                      alt={member.fullName}
                      loading="lazy"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400';
                      }}
                    />

                    {/* Subtle studio gradient overlay at the base for crisp portrait framing */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />

                    {/* Experience floating badge on image */}
                    {member.experienceYears > 0 && (
                      <span className="absolute bottom-2 left-2 z-10 bg-black/75 backdrop-blur-xs text-[#ffdea0] font-mono text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/20 shadow-xs flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[10px]">history</span>
                        {member.experienceYears}+ Yrs
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5 min-w-0">
                    <div>
                      {/* Role & Department Row */}
                      <div className="flex flex-wrap items-center justify-between gap-1.5 pb-2 border-b border-slate-100">
                        <span
                          className={`inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs border shrink-0 ${roleStyle.pill}`}
                        >
                          <span className="material-symbols-outlined text-[11px] sm:text-[12px]">
                            {roleStyle.icon}
                          </span>
                          <span>{member.role || 'Faculty'}</span>
                        </span>

                        <span
                          className="text-[9px] sm:text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider truncate max-w-[110px] sm:max-w-[125px]"
                          title={member.department}
                        >
                          {member.department}
                        </span>
                      </div>

                      {/* Name & Designation */}
                      <div className="pt-1.5">
                        <h3 className="font-serif font-bold text-sm sm:text-lg text-[#00152b] tracking-tight leading-snug truncate sm:whitespace-normal group-hover:text-secondary transition-colors">
                          {member.fullName}
                        </h3>
                        <p className="text-[11px] sm:text-xs font-semibold text-secondary mt-0.5 tracking-wide line-clamp-1">
                          {member.designation || member.role}
                        </p>
                      </div>

                      {/* Qualification */}
                      {member.qualification && (
                        <div className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-600 font-medium mt-1.5">
                          <span className="material-symbols-outlined text-[14px] text-amber-600 shrink-0">
                            school
                          </span>
                          <span className="truncate leading-tight">{member.qualification}</span>
                        </div>
                      )}

                      {/* Message / Statement Quote */}
                      {member.message && (
                        <div className="relative bg-slate-50/90 p-2 sm:p-2.5 rounded-xl border border-slate-100 mt-2">
                          <span className="material-symbols-outlined absolute top-1 right-1.5 text-[16px] text-slate-300 select-none pointer-events-none">
                            format_quote
                          </span>
                          <p className="font-serif italic text-[11px] sm:text-xs text-slate-700 leading-relaxed relative z-10 line-clamp-2 sm:line-clamp-3">
                            “{member.message}”
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Card Footer: Subjects and Experience details */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-[10px] sm:text-[11px] text-slate-600">
                      <span className="font-semibold text-slate-500">
                        {member.experienceYears > 0 ? `${member.experienceYears} Years Service` : 'Staff'}
                      </span>

                      {member.subjectsTaught && member.subjectsTaught.length > 0 && (
                        <span
                          className="font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full truncate max-w-[120px] border border-slate-200/60"
                          title={member.subjectsTaught.join(', ')}
                        >
                          {member.subjectsTaught[0]}
                          {member.subjectsTaught.length > 1 ? ` +${member.subjectsTaught.length - 1}` : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}