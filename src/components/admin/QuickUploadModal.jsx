import React, { useState } from 'react';
import { createResult, createStaff, createGallery } from '../../api/client';

export default function QuickUploadModal({ isOpen, onClose, onUploaded }) {
  const [activeTab, setActiveTab] = useState('result'); // 'result' | 'staff' | 'gallery'
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Result form state
  const [resultData, setResultData] = useState({
    studentName: '',
    academicYear: '2024-25',
    category: 'class_12',
    stream: 'Science',
    percentage: '',
    rankTitle: '',
    specialHonors: '',
    featuredOnHome: false,
    file: null
  });

  // Staff form state
  const [staffData, setStaffData] = useState({
    fullName: '',
    role: 'Teacher',
    designation: 'Senior Faculty',
    department: 'Secondary & Sr Secondary',
    qualification: '',
    experienceYears: '',
    subjectsTaught: '',
    subcategory: 'general',
    message: '',
    file: null
  });

  // Gallery form state with target website position
  const [galleryData, setGalleryData] = useState({
    title: '',
    category: 'Campus & Facilities',
    position: 'campus_facilities',
    view: 'all',
    description: '',
    academicYear: '2024-25',
    featuredOnHome: false,
    file: null
  });

  if (!isOpen) return null;

  const handleResultSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append('studentName', resultData.studentName);
      fd.append('academicYear', resultData.academicYear);
      fd.append('category', resultData.category);
      if (resultData.stream) fd.append('stream', resultData.stream);
      fd.append('percentage', resultData.percentage);
      fd.append('rankTitle', resultData.rankTitle);
      fd.append('specialHonors', resultData.specialHonors);
      fd.append('featuredOnHome', resultData.featuredOnHome);
      if (resultData.file) fd.append('photo', resultData.file);

      await createResult(fd);
      setMessage('Topper record & photo uploaded successfully to Cloudinary and DB!');
      if (onUploaded) onUploaded();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleStaffSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append('fullName', staffData.fullName);
      fd.append('role', staffData.role);
      fd.append('designation', staffData.designation);
      fd.append('department', staffData.department);
      fd.append('qualification', staffData.qualification);
      fd.append('experienceYears', staffData.experienceYears || 0);
      fd.append('subjectsTaught', staffData.subjectsTaught);
      fd.append('subcategory', staffData.subcategory || 'general');
      fd.append('message', staffData.message || '');
      if (staffData.file) fd.append('photo', staffData.file);

      await createStaff(fd);
      setMessage('Staff member record & photo uploaded successfully to Cloudinary and DB!');
      if (onUploaded) onUploaded();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append('title', galleryData.title);
      fd.append('category', galleryData.category);
      fd.append('position', galleryData.position);
      fd.append('view', galleryData.view || 'all');
      fd.append('description', galleryData.description);
      fd.append('academicYear', galleryData.academicYear);
      fd.append('featuredOnHome', galleryData.featuredOnHome);
      if (galleryData.file) fd.append('image', galleryData.file);

      await createGallery(fd);
      setMessage(`Gallery photo uploaded successfully to Cloudinary & assigned to "${galleryData.position}"!`);
      if (onUploaded) onUploaded();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-surface-container-high p-6 md:p-8 relative">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[22px]">cloud_upload</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-primary">School Data &amp; Cloudinary Upload</h2>
              <p className="text-body-sm text-on-surface-variant">Upload photos and live records to Cloudinary &amp; MongoDB</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-surface-container-high mb-6 gap-2">
          <button
            onClick={() => { setActiveTab('result'); setMessage(null); setError(null); }}
            className={`pb-2.5 px-4 font-label-md text-label-md border-b-2 font-bold transition-all ${
              activeTab === 'result'
                ? 'border-secondary text-secondary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Board Toppers / Results
          </button>
          <button
            onClick={() => { setActiveTab('staff'); setMessage(null); setError(null); }}
            className={`pb-2.5 px-4 font-label-md text-label-md border-b-2 font-bold transition-all ${
              activeTab === 'staff'
                ? 'border-secondary text-secondary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Faculty &amp; Staff (Roles)
          </button>
          <button
            onClick={() => { setActiveTab('gallery'); setMessage(null); setError(null); }}
            className={`pb-2.5 px-4 font-label-md text-label-md border-b-2 font-bold transition-all ${
              activeTab === 'gallery'
                ? 'border-secondary text-secondary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Photo Gallery (Position)
          </button>
        </div>

        {message && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 text-body-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-800 text-body-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            {error}
          </div>
        )}

        {/* 1. TOPPERS TAB */}
        {activeTab === 'result' && (
          <form onSubmit={handleResultSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-label-sm text-on-surface font-semibold mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={resultData.studentName}
                  onChange={(e) => setResultData({ ...resultData, studentName: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-outline-variant bg-surface text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  placeholder="e.g. Arjun Sharma"
                />
              </div>
              <div>
                <label className="block text-label-sm text-on-surface font-semibold mb-1">Category / Stage *</label>
                <select
                  value={resultData.category}
                  onChange={(e) => setResultData({ ...resultData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-outline-variant bg-surface text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                >
                  <option value="class_12">Class XII (Senior Secondary)</option>
                  <option value="class_10">Class X (Secondary)</option>
                  <option value="foundation">Foundation (Middle / Primary)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-label-sm text-on-surface font-semibold mb-1">Stream</label>
                <select
                  value={resultData.stream}
                  onChange={(e) => setResultData({ ...resultData, stream: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-outline-variant bg-surface text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                >
                  <option value="Science">Science (PCM/PCB)</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Humanities">Humanities</option>
                  <option value="General">General / All Subjects</option>
                </select>
              </div>
              <div>
                <label className="block text-label-sm text-on-surface font-semibold mb-1">Percentage (%) *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={resultData.percentage}
                  onChange={(e) => setResultData({ ...resultData, percentage: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-outline-variant bg-surface text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  placeholder="98.6"
                />
              </div>
              <div>
                <label className="block text-label-sm text-on-surface font-semibold mb-1">Academic Session *</label>
                <input
                  type="text"
                  required
                  value={resultData.academicYear}
                  onChange={(e) => setResultData({ ...resultData, academicYear: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-outline-variant bg-surface text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  placeholder="2024-25"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-label-sm text-on-surface font-semibold mb-1">Rank / State Distinction</label>
                <input
                  type="text"
                  value={resultData.rankTitle}
                  onChange={(e) => setResultData({ ...resultData, rankTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-outline-variant bg-surface text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  placeholder="e.g. AIR 12 • STATE RANK #1"
                />
              </div>
              <div>
                <label className="block text-label-sm text-on-surface font-semibold mb-1">Special Honors / Subject 100s</label>
                <input
                  type="text"
                  value={resultData.specialHonors}
                  onChange={(e) => setResultData({ ...resultData, specialHonors: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-outline-variant bg-surface text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  placeholder="e.g. IIT-JEE Advanced Qualifier • 100/100 Physics"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="heroTopper"
                checked={resultData.featuredOnHome}
                onChange={(e) => setResultData({ ...resultData, featuredOnHome: e.target.checked })}
                className="w-4 h-4 text-secondary rounded border-outline-variant focus:ring-secondary"
              />
              <label htmlFor="heroTopper" className="text-body-sm text-on-surface font-medium cursor-pointer">
                Feature in Homepage Hero Carousel Widget
              </label>
            </div>

            <div>
              <label className="block text-label-sm text-on-surface font-semibold mb-1">Student Photo (Upload to Cloudinary)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setResultData({ ...resultData, file: e.target.files[0] })}
                className="w-full px-3 py-2 border border-outline-variant rounded bg-surface text-body-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-label-sm file:font-semibold file:bg-primary file:text-on-primary hover:file:bg-secondary cursor-pointer"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-secondary text-on-secondary rounded-lg font-label-md font-bold uppercase tracking-wider hover:bg-on-secondary-container transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">publish</span>
              {loading ? 'Uploading to Cloudinary & Saving...' : 'Save Topper Record'}
            </button>
          </form>
        )}

        {/* 2. STAFF TAB WITH ROLE SELECTOR */}
        {activeTab === 'staff' && (
          <form onSubmit={handleStaffSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-label-sm text-on-surface font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={staffData.fullName}
                  onChange={(e) => setStaffData({ ...staffData, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-outline-variant bg-surface text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  placeholder="e.g. Dr. R. K. Srivastava"
                />
              </div>
              <div>
                <label className="block text-label-sm text-on-surface font-semibold mb-1">Role *</label>
                <select
                  value={staffData.role}
                  onChange={(e) => setStaffData({ ...staffData, role: e.target.value })}
                  className="w-full px-3 py-2 rounded border-2 border-secondary/40 bg-surface font-bold text-secondary text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                >
                  <option value="Director / Chairman">1. Director / Chairman</option>
                  <option value="Principal">2. Principal</option>
                  <option value="Vice Principal">3. Vice Principal</option>
                  <option value="Academic Coordinator">4. Academic Coordinator</option>
                  <option value="Examination Head">5. Examination Head</option>
                  <option value="Manager">Manager</option>
                  <option value="Teacher">Teacher</option>
                </select>
              </div>
              <div>
                <label className="block text-label-sm text-on-surface font-semibold mb-1">Department *</label>
                <select
                  value={staffData.department}
                  onChange={(e) => setStaffData({ ...staffData, department: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-outline-variant bg-surface text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                >
                  <option value="Administration">Administration</option>
                  <option value="Secondary & Sr Secondary">Secondary &amp; Sr Secondary</option>
                  <option value="Middle">Middle Wing</option>
                  <option value="Primary">Primary Wing</option>
                  <option value="Pre-Primary">Pre-Primary</option>
                  <option value="Sports & Physical Education">Sports &amp; Physical Education</option>
                  <option value="Arts & Culture">Arts &amp; Culture</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-label-sm text-on-surface font-semibold mb-1">Designation *</label>
                <input
                  type="text"
                  required
                  value={staffData.designation}
                  onChange={(e) => setStaffData({ ...staffData, designation: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-outline-variant bg-surface text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  placeholder="e.g. Managing Director / HOD Physics"
                />
              </div>
              <div>
                <label className="block text-label-sm text-on-surface font-semibold mb-1">Qualification *</label>
                <input
                  type="text"
                  required
                  value={staffData.qualification}
                  onChange={(e) => setStaffData({ ...staffData, qualification: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-outline-variant bg-surface text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  placeholder="e.g. M.Sc., Ph.D."
                />
              </div>
              <div>
                <label className="block text-label-sm text-on-surface font-semibold mb-1">Experience (Years)</label>
                <input
                  type="number"
                  value={staffData.experienceYears}
                  onChange={(e) => setStaffData({ ...staffData, experienceYears: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-outline-variant bg-surface text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  placeholder="15"
                />
              </div>
            </div>

            <div>
              <label className="block text-label-sm text-on-surface font-semibold mb-1">Subjects / Specialization (comma separated)</label>
              <input
                type="text"
                value={staffData.subjectsTaught}
                onChange={(e) => setStaffData({ ...staffData, subjectsTaught: e.target.value })}
                className="w-full px-3 py-2 rounded border border-outline-variant bg-surface text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                placeholder="Institutional Leadership, Educational Pedagogy"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-label-sm text-on-surface font-semibold mb-1">Subcategory / Placement</label>
                <select
                  value={staffData.subcategory}
                  onChange={(e) => setStaffData({ ...staffData, subcategory: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-outline-variant bg-surface text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none font-semibold text-secondary"
                >
                  <option value="general">general (Standard Staff Directory)</option>
                  <option value="hero_staff">hero_staff (Featured in Home Leadership Slider)</option>
                  <option value="leadership">leadership (Executive Council)</option>
                </select>
              </div>
              <div>
                <label className="block text-label-sm text-on-surface font-semibold mb-1">Leadership Quote / Message (Optional)</label>
                <textarea
                  rows={2}
                  value={staffData.message}
                  onChange={(e) => setStaffData({ ...staffData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-outline-variant bg-surface text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  placeholder="e.g. True education does not merely teach a child to read..."
                />
              </div>
            </div>

            <div>
              <label className="block text-label-sm text-on-surface font-semibold mb-1">Staff Photo (Upload to Cloudinary)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setStaffData({ ...staffData, file: e.target.files[0] })}
                className="w-full px-3 py-2 border border-outline-variant rounded bg-surface text-body-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-label-sm file:font-semibold file:bg-primary file:text-on-primary hover:file:bg-secondary cursor-pointer"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-secondary text-on-secondary rounded-lg font-label-md font-bold uppercase tracking-wider hover:bg-on-secondary-container transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">publish</span>
              {loading ? 'Uploading to Cloudinary & Saving...' : 'Save Staff Profile'}
            </button>
          </form>
        )}

        {/* 3. GALLERY TAB WITH WEBSITE PLACEMENT DROPDOWN */}
        {activeTab === 'gallery' && (
          <form onSubmit={handleGallerySubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-label-sm text-on-surface font-semibold mb-1">Photo Title / Caption *</label>
                <input
                  type="text"
                  required
                  value={galleryData.title}
                  onChange={(e) => setGalleryData({ ...galleryData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-outline-variant bg-surface text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  placeholder="e.g. Modern AI & Robotics Complex"
                />
              </div>
              <div>
                <label className="block text-label-sm text-on-surface font-semibold mb-1">
                  Target Website Position / Section *
                </label>
                <select
                  value={galleryData.position}
                  onChange={(e) => {
                    const newPos = e.target.value;
                    const newView = newPos === 'hero_banner_mobile' ? 'mobile' : galleryData.view;
                    setGalleryData({ ...galleryData, position: newPos, view: newView });
                  }}
                  className="w-full px-3 py-2 rounded border-2 border-secondary/50 bg-surface font-bold text-secondary text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                >
                  <option value="hero_banner">Hero Banner (Desktop / All Devices)</option>
                  <option value="hero_banner_mobile">Hero Banner (Mobile View)</option>
                  <option value="campus_facilities">Campus &amp; Infrastructure Overview</option>
                  <option value="computer_lab">Computer &amp; AI Laboratory (STEM Wing)</option>
                  <option value="science_lab">Science &amp; Physics Laboratory</option>
                  <option value="sports_complex">Sports Complex &amp; Athletic Track</option>
                  <option value="library">School Digital Library</option>
                  <option value="cultural_events">Events &amp; Annual Cultural Function</option>
                  <option value="general_gallery">General Photo Gallery</option>
                </select>
                <span className="text-[11px] text-gray-500 mt-0.5 block">
                  API Key: <code className="text-secondary font-mono">{galleryData.position}</code>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-label-sm text-on-surface font-semibold mb-1">Target Device View</label>
                <select
                  value={galleryData.view}
                  onChange={(e) => setGalleryData({ ...galleryData, view: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-outline-variant bg-surface text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none font-semibold text-secondary"
                >
                  <option value="all">All Devices (Desktop &amp; Mobile)</option>
                  <option value="desktop">Desktop View Only</option>
                  <option value="mobile">Mobile View Only</option>
                </select>
              </div>
              <div>
                <label className="block text-label-sm text-on-surface font-semibold mb-1">Gallery Category *</label>
                <select
                  value={galleryData.category}
                  onChange={(e) => setGalleryData({ ...galleryData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-outline-variant bg-surface text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                >
                  <option value="Campus & Facilities">Campus &amp; Facilities</option>
                  <option value="Sports & Athletics">Sports &amp; Athletics</option>
                  <option value="Science & STEM Exhibition">Science &amp; STEM Exhibition</option>
                  <option value="Cultural & Annual Functions">Cultural &amp; Annual Functions</option>
                  <option value="National Festivals">National Festivals</option>
                  <option value="Classroom & Labs">Classroom &amp; Labs</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div>
                <label className="block text-label-sm text-on-surface font-semibold mb-1">Academic Session</label>
                <input
                  type="text"
                  value={galleryData.academicYear}
                  onChange={(e) => setGalleryData({ ...galleryData, academicYear: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-outline-variant bg-surface text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                  placeholder="2024-25"
                />
              </div>
            </div>

            <div>
              <label className="block text-label-sm text-on-surface font-semibold mb-1">Description / Event Details</label>
              <textarea
                rows={2}
                value={galleryData.description}
                onChange={(e) => setGalleryData({ ...galleryData, description: e.target.value })}
                className="w-full px-3 py-2 rounded border border-outline-variant bg-surface text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                placeholder="Brief details of facilities, equipment, or event highlights..."
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featuredPhoto"
                checked={galleryData.featuredOnHome}
                onChange={(e) => setGalleryData({ ...galleryData, featuredOnHome: e.target.checked })}
                className="w-4 h-4 text-secondary rounded border-outline-variant focus:ring-secondary"
              />
              <label htmlFor="featuredPhoto" className="text-body-sm text-on-surface font-medium cursor-pointer">
                Feature prominently on Homepage Highlights
              </label>
            </div>

            <div>
              <label className="block text-label-sm text-on-surface font-semibold mb-1">Image File * (Upload to Cloudinary)</label>
              <input
                type="file"
                required
                accept="image/*"
                onChange={(e) => setGalleryData({ ...galleryData, file: e.target.files[0] })}
                className="w-full px-3 py-2 border border-outline-variant rounded bg-surface text-body-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-label-sm file:font-semibold file:bg-primary file:text-on-primary hover:file:bg-secondary cursor-pointer"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-secondary text-on-secondary rounded-lg font-label-md font-bold uppercase tracking-wider hover:bg-on-secondary-container transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">publish</span>
              {loading ? 'Uploading to Cloudinary & Saving...' : 'Upload Photo to Gallery & Position'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}