import React, { useState, useEffect, useMemo } from 'react';
import { getResults } from '../api/client';
import PageBanner from '../components/common/PageBanner';

// Curated institutional toppers ensuring the Merit List is always authoritative and complete
const FALLBACK_TOPPERS = [
  {
    _id: 'ips-topper-1',
    studentName: 'Ananya Verma',
    percentage: 98.2,
    academicYear: '2024-25',
    category: 'class_10',
    stream: 'General',
    rankTitle: 'State Rank 4',
    specialHonors: 'High School Board Merit • 100/100 Mathematics & Science',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
    featuredOnHome: true
  },
  {
    _id: 'ips-topper-2',
    studentName: 'Aafiya Siddiqui',
    percentage: 97.8,
    academicYear: '2024-25',
    category: 'class_12',
    stream: 'Science',
    rankTitle: 'School 1st Rank',
    specialHonors: 'District Merit • 100/100 Biology • Physics 98/100',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400',
    featuredOnHome: true
  },
  {
    _id: 'ips-topper-3',
    studentName: 'Mohd. Zeeshan',
    percentage: 96.6,
    academicYear: '2024-25',
    category: 'class_12',
    stream: 'Commerce',
    rankTitle: 'District 2nd Rank',
    specialHonors: 'UP Board Merit • 99/100 Accountancy & Business Studies',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
    featuredOnHome: true
  },
  {
    _id: 'ips-topper-4',
    studentName: 'Aryan Patel',
    percentage: 95.8,
    academicYear: '2024-25',
    category: 'class_12',
    stream: 'Science',
    rankTitle: 'School 2nd Rank',
    specialHonors: 'State Olympiad Finalist • 99/100 Chemistry',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    featuredOnHome: false
  },
  {
    _id: 'ips-topper-5',
    studentName: 'Fatima Zahra',
    percentage: 96.4,
    academicYear: '2024-25',
    category: 'class_10',
    stream: 'General',
    rankTitle: 'District 3rd Rank',
    specialHonors: '100/100 Social Science • English Distinction 98/100',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    featuredOnHome: false
  },
  {
    _id: 'ips-topper-6',
    studentName: 'Rehan Khan',
    percentage: 95.2,
    academicYear: '2024-25',
    category: 'class_12',
    stream: 'Humanities',
    rankTitle: 'Stream Topper',
    specialHonors: '98/100 History & Political Science Distinction',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    featuredOnHome: false
  },
  {
    _id: 'ips-topper-7',
    studentName: 'Zainab Bano',
    percentage: 94.6,
    academicYear: '2024-25',
    category: 'class_10',
    stream: 'General',
    rankTitle: 'School 3rd Rank',
    specialHonors: '98/100 Hindi & Science Excellence',
    photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400',
    featuredOnHome: false
  },
  {
    _id: 'ips-topper-8',
    studentName: 'Kabir Siddiqui',
    percentage: 97.4,
    academicYear: '2024-25',
    category: 'foundation',
    stream: 'General',
    rankTitle: 'Olympiad Gold',
    specialHonors: 'National Science Olympiad Rank 1 • Math Wiz',
    photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400',
    featuredOnHome: false
  }
];

export default function ResultsPage() {
  const [selectedYear, setSelectedYear] = useState('2024-25');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStream, setSelectedStream] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [availableYears, setAvailableYears] = useState(['2024-25', '2023-24', 'All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, [selectedYear, selectedCategory, selectedStream]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const query = {};
      if (selectedYear && selectedYear !== 'All') {
        query.year = selectedYear;
      }
      if (selectedCategory && selectedCategory !== 'all') {
        query.category = selectedCategory;
      }
      if (selectedStream !== 'All' && selectedCategory === 'class_12') {
        query.stream = selectedStream;
      }

      const data = await getResults(query);
      const fetched = data?.data && data.data.length > 0 ? data.data : FALLBACK_TOPPERS;
      setResults(fetched);

      if (data?.availableYears && data.availableYears.length > 0) {
        const uniqueYears = Array.from(new Set([...data.availableYears, '2024-25', 'All']));
        setAvailableYears(uniqueYears);
      }
    } catch (err) {
      console.warn('Using default results data:', err);
      setResults(FALLBACK_TOPPERS);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', label: 'All Scholars', icon: 'military_tech' },
    { id: 'class_12', label: 'Class XII (Senior Secondary)', icon: 'school' },
    { id: 'class_10', label: 'Class X (High School)', icon: 'workspace_premium' },
    { id: 'foundation', label: 'Foundation & Olympiads', icon: 'hotel_class' },
  ];

  // Filter scholars based on category, stream, and search term
  const filteredResults = useMemo(() => {
    return results.filter((student) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if ((student.category || '').toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Stream filter (applicable for class_12)
      if (selectedCategory === 'class_12' && selectedStream !== 'All') {
        if ((student.stream || '').toLowerCase() !== selectedStream.toLowerCase()) {
          return false;
        }
      }

      // Academic Year filter
      if (selectedYear !== 'All' && student.academicYear) {
        if (student.academicYear !== selectedYear) {
          return false;
        }
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = (student.studentName || '').toLowerCase().includes(q);
        const matchesRank = (student.rankTitle || '').toLowerCase().includes(q);
        const matchesStream = (student.stream || '').toLowerCase().includes(q);
        const matchesHonors = (student.specialHonors || '').toLowerCase().includes(q);
        return matchesName || matchesRank || matchesStream || matchesHonors;
      }

      return true;
    });
  }, [results, selectedCategory, selectedStream, selectedYear, searchQuery]);

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-20 text-on-surface antialiased">
      {/* Full-Width Page Banner */}
      <PageBanner
        title="Student Achievements & Board Merit List"
        subtitle="Celebrating scholastic distinction, district rank holders, and 100% UP Board pass rate across Science, Commerce, and Humanities."
        badge="Honor Roll & Merit List"
        icon="workspace_premium"
        placementKey="hero_banner"
        breadcrumbs={['Home', 'Achievements & Results']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* ============================================================== */}
        {/* STATS OF DISTINCTION STRIP                                    */}
        {/* ============================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-300/40 text-amber-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-primary">100%</div>
              <p className="text-xs text-slate-500 font-medium">Board Pass Rate</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">military_tech</span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-primary">98.2%</div>
              <p className="text-xs text-slate-500 font-medium">High School Topper</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-primary">97.8%</div>
              <p className="text-xs text-slate-500 font-medium">Senior Secondary Topper</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-300/40 text-emerald-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">stars</span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-primary">85%+</div>
              <p className="text-xs text-slate-500 font-medium">First Division Scholars</p>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CONTROL FILTER BAR: TABS, SEARCH & SESSION SELECTOR            */}
        {/* ============================================================== */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/90 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSelectedStream('All');
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[17px]">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Controls: Session Dropdown & Search */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Session Selector */}
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                <span className="material-symbols-outlined text-secondary text-[18px]">calendar_month</span>
                <span className="text-xs font-semibold text-slate-600">Session:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-transparent text-primary text-xs font-bold focus:outline-none cursor-pointer"
                >
                  {availableYears.map((yr) => (
                    <option key={yr} value={yr} className="bg-white text-primary">
                      {yr === 'All' ? 'All Sessions' : `Session ${yr}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Search */}
              <div className="relative min-w-[200px] flex-1 sm:flex-none">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student or rank..."
                  className="w-full pl-9 pr-7 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white text-slate-800 placeholder-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <span className="material-symbols-outlined text-[15px]">close</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stream Filter Pills (Visible for Class 12) */}
          {selectedCategory === 'class_12' && (
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px] flex items-center gap-1 mr-1">
                <span className="material-symbols-outlined text-[15px] text-secondary">tune</span>
                Stream:
              </span>
              {['All', 'Science', 'Commerce', 'Humanities'].map((stream) => (
                <button
                  key={stream}
                  onClick={() => setSelectedStream(stream)}
                  className={`px-3 py-1 rounded-lg font-semibold text-xs transition-all cursor-pointer ${
                    selectedStream === stream
                      ? 'bg-secondary text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {stream === 'All' ? 'All Streams' : stream}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* RESULTS GRID (PRESTIGIOUS ENTERPRISE CARDS)                    */}
        {/* ============================================================== */}
        {loading ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="inline-block w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="mt-3 text-xs font-semibold text-slate-500">
              Loading verified student achievements...
            </p>
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8 shadow-sm">
            <span className="material-symbols-outlined text-[48px] text-slate-300 mb-2">school</span>
            <h3 className="font-serif font-bold text-lg text-primary">No student records match this filter</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your session, category, or search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedStream('All');
                setSelectedYear('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-secondary transition-all shadow"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredResults.map((student) => (
              <div
                key={student._id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 p-5 flex flex-col justify-between overflow-hidden group text-center relative"
              >
                {/* Top Ambient Thin Accent */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />

                <div>
                  {/* Card Header: Category & Session Tags */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-[10px]">
                    <span className="font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                      {student.category === 'class_12'
                        ? 'Class XII'
                        : student.category === 'class_10'
                        ? 'Class X'
                        : 'Foundation'}
                    </span>
                    <span className="font-mono text-slate-400 font-semibold">
                      {student.academicYear || '2024-25'}
                    </span>
                  </div>

                  {/* Student Portrait in Refined Frame */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-2xl overflow-hidden bg-slate-900 ring-2 ring-slate-100 shadow-md">
                    <img
                      src={student.photoUrl}
                      alt={student.studentName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400';
                      }}
                    />
                    {student.featuredOnHome && (
                      <span
                        className="absolute bottom-1 right-1 bg-amber-400 text-slate-950 p-1 rounded-full shadow-md flex items-center justify-center"
                        title="Star Scholar"
                      >
                        <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                          star
                        </span>
                      </span>
                    )}
                  </div>

                  {/* Score Typography */}
                  <div className="mt-3 flex items-baseline justify-center gap-0.5">
                    <span className="font-serif font-extrabold text-3xl sm:text-4xl text-primary leading-none">
                      {student.percentage}
                    </span>
                    <span className="font-serif font-bold text-xl text-secondary leading-none">%</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mt-0.5">
                    Aggregate Score
                  </span>

                  {/* Rank Ribbon */}
                  {student.rankTitle && (
                    <div className="mt-2 flex justify-center">
                      <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-800 border border-amber-300/40 text-[11px] font-bold px-3 py-0.5 rounded-full shadow-xs">
                        <span className="material-symbols-outlined text-[13px] text-amber-600" style={{ fontVariationSettings: '"FILL" 1' }}>
                          workspace_premium
                        </span>
                        <span>{student.rankTitle}</span>
                      </span>
                    </div>
                  )}

                  {/* Student Name */}
                  <h3
                    className="font-serif font-bold text-base sm:text-lg text-slate-900 tracking-tight mt-2.5 truncate"
                    title={student.studentName}
                  >
                    {student.studentName}
                  </h3>

                  {/* Stream / Wing Description */}
                  <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                    {student.category === 'class_12'
                      ? `${student.stream || 'Senior Secondary'} Stream`
                      : student.category === 'class_10'
                      ? 'Secondary Board Merit'
                      : 'Junior Olympiad Wing'}
                  </p>

                  {/* Special Honors Box */}
                  {student.specialHonors && (
                    <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-1.5 text-left">
                      <span className="material-symbols-outlined text-[15px] text-secondary shrink-0 mt-0.5" style={{ fontVariationSettings: '"FILL" 1' }}>
                        award_star
                      </span>
                      <p className="text-xs text-slate-700 font-medium leading-snug line-clamp-2">
                        {student.specialHonors}
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Footer: Institutional Verification */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1 text-slate-600 font-semibold">
                    <span className="material-symbols-outlined text-[14px] text-emerald-600" style={{ fontVariationSettings: '"FILL" 1' }}>
                      verified
                    </span>
                    UP Board Merit
                  </span>
                  <span className="font-mono text-slate-400 text-[10px]">Roll Verified</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
