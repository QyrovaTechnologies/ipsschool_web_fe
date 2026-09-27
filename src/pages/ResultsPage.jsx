import React, { useState, useEffect } from 'react';
import { getResults } from '../api/client';
import PageBanner from '../components/common/PageBanner';

export default function ResultsPage({ onOpenAdmin, onNavigate }) {
  const [selectedYear, setSelectedYear] = useState('2024-25');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStream, setSelectedStream] = useState('All');
  const [results, setResults] = useState([]);
  const [availableYears, setAvailableYears] = useState(['2024-25', '2023-24']);
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
      setResults(data.data || []);
      if (data.availableYears && data.availableYears.length > 0) {
        setAvailableYears(data.availableYears);
      }
    } catch (err) {
      console.error('Failed to load results:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', label: 'All Results', badge: 'All Scholars' },
    { id: 'foundation', label: 'Foundation & Olympiads', badge: 'Junior Scholars' },
    { id: 'class_10', label: 'Class X (Secondary)', badge: 'Board Toppers' },
    { id: 'class_12', label: 'Class XII (Senior Secondary)', badge: 'UP Board 10+2' },
  ];

  return (
    <div className="w-full bg-surface pb-16">
      {/* Full-Screen Width Page Banner */}
      <PageBanner
        title="Student Achievements & Passout Results"
        subtitle="Celebrating scholastic brilliance, district rank holders, and 100% UP Board pass rate across Science, Commerce, and Humanities streams."
        badge="Honor Roll & Merit List"
        icon="workspace_premium"
        placementKey="hero_banner"
        breadcrumbs={['Home', 'Achievements & Results']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        {/* Top Control Bar: Category Tabs & Session Selector */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-surface-container-high flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Academic Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedStream('All');
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white shadow-md scale-105'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded uppercase font-semibold ${
                    selectedCategory === cat.id ? 'bg-secondary text-white' : 'bg-surface-container-highest text-on-surface-variant'
                  }`}
                >
                  {cat.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Academic Session Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-surface-container px-3 py-1.5 rounded-xl border border-surface-container-high">
            <span className="material-symbols-outlined text-secondary text-[18px]">calendar_month</span>
            <label className="text-xs font-bold text-primary whitespace-nowrap">Session:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent text-primary text-xs font-bold focus:outline-none cursor-pointer"
            >
              {availableYears.map((yr) => (
                <option key={yr} value={yr} className="bg-surface text-primary">
                  {yr}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stream Filter (Only for Class 12) */}
        {selectedCategory === 'class_12' && (
          <div className="flex items-center gap-2 bg-surface-container-lowest p-3.5 rounded-xl shadow-sm border border-surface-container-high flex-wrap">
            <span className="text-xs font-bold text-outline uppercase tracking-wider mr-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-secondary">filter_alt</span>
              Filter Stream:
            </span>
            {['All', 'Science', 'Commerce', 'Humanities'].map((stream) => (
              <button
                key={stream}
                onClick={() => setSelectedStream(stream)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedStream === stream
                    ? 'bg-secondary text-white shadow-sm'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {stream}
              </button>
            ))}
          </div>
        )}

        {/* Results Content Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-sm font-semibold text-on-surface-variant">Loading student achievements...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16 bg-surface-container-lowest rounded-2xl border border-dashed border-surface-container-high p-8 shadow-sm">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40 mb-2">school</span>
            <h3 className="font-serif font-bold text-xl text-primary">No passout records found for this selection</h3>
            <p className="text-xs text-on-surface-variant mt-1 max-w-md mx-auto">
              No students uploaded yet for Session {selectedYear} under {selectedCategory.replace('_', ' ')}. Toppers uploaded via admin will appear here instantly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((student) => (
              <div
                key={student._id}
                className="bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-surface-container-high/80 p-6 flex flex-col items-center text-center relative group hover:-translate-y-1 overflow-hidden"
              >
                {/* Gold Crest Rank Tag */}
                {student.rankTitle && (
                  <div className="w-full mb-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-tertiary-fixed text-[10px] font-bold tracking-wider uppercase shadow-sm">
                      <span className="material-symbols-outlined text-[13px] text-tertiary-fixed">workspace_premium</span>
                      {student.rankTitle}
                    </span>
                  </div>
                )}

                {/* Student Photo with Laurel Ring */}
                <div className="relative mb-4">
                  <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-tertiary-fixed via-secondary to-primary shadow-lg group-hover:scale-105 transition-transform">
                    <img
                      src={student.photoUrl}
                      alt={student.studentName}
                      className="w-full h-full object-cover rounded-full border-2 border-white bg-surface-container"
                    />
                  </div>
                  {student.featuredOnHome && (
                    <span className="absolute bottom-0 right-0 bg-secondary text-white text-[10px] p-1 rounded-full shadow" title="Featured on Homepage">
                      <span className="material-symbols-outlined text-[14px]">star</span>
                    </span>
                  )}
                </div>

                {/* Score & Stream */}
                <div className="inline-flex items-baseline gap-0.5">
                  <span className="font-serif font-extrabold text-3xl text-secondary">{student.percentage}</span>
                  <span className="font-bold text-sm text-secondary">%</span>
                </div>

                <h3 className="font-serif font-bold text-lg text-primary mt-1 tracking-tight">
                  {student.studentName}
                </h3>

                <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                  {student.category === 'class_12'
                    ? `Class XII — ${student.stream || 'All Streams'}`
                    : student.category === 'class_10'
                    ? 'Class X Board Merit'
                    : 'Foundation Wing'}
                </p>

                {/* Accolades & Honors */}
                {student.specialHonors && (
                  <div className="mt-3 pt-3 border-t border-surface-container-high w-full text-center">
                    <p className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md leading-tight">
                      {student.specialHonors}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}