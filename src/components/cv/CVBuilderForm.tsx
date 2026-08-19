import React, { useState } from 'react';
import { CricketCVFull, CareerEntry, StatisticsBlock, Achievement, ProfessionalExperience, Education, Certification, Reference } from './CVTypes';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  AlertCircle,
  FileText,
  Activity,
  Layers,
  Award,
  BookOpen
} from 'lucide-react';
import CVFontSelector from './CVFontSelector';
import CVColourSelector from './CVColourSelector';

interface CVBuilderFormProps {
  cv: CricketCVFull;
  onChange: (cv: CricketCVFull) => void;
  onSaveDraft: () => Promise<void>;
  onNext: () => void;
  onPrev: () => void;
  isSaving: boolean;
  isIdentityLocked: boolean;
}

export default function CVBuilderForm({
  cv,
  onChange,
  onSaveDraft,
  onNext,
  onPrev,
  isSaving,
  isIdentityLocked
}: CVBuilderFormProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const steps = [
    { num: 1, name: 'Personal', desc: 'Basic Details' },
    { num: 2, name: 'Cricket Profile', desc: 'Playing Role & Style' },
    { num: 3, name: 'Playing Career', desc: 'Teams & Clubs' },
    { num: 4, name: 'Statistics', desc: 'Stats Log' },
    { num: 5, name: 'Experience', desc: 'Coaching & Ops' },
    { num: 6, name: 'Achievements', desc: 'Major Highlights' },
    { num: 7, name: 'Education', desc: 'Academic & Qualifications' },
    { num: 8, name: 'Contact', desc: 'Contact Info' },
    { num: 9, name: 'Branding & Preview', desc: 'Font & Theme' }
  ];

  const updateCVField = (field: keyof CricketCVFull, value: any) => {
    onChange({
      ...cv,
      [field]: value
    });
  };

  const handleNextStep = () => {
    onSaveDraft();
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      onNext();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    } else {
      onPrev();
    }
  };

  // Add/Remove Helpers
  const addCareerEntry = () => {
    const entry: CareerEntry = {
      id: `career-${Date.now()}`,
      teamName: '',
      country: '',
      competition: '',
      startYear: '',
      endYear: '',
      role: '',
      captaincy: false,
      level: '',
      description: ''
    };
    updateCVField('careerHistory', [...cv.careerHistory, entry]);
  };

  const removeCareerEntry = (id: string) => {
    updateCVField('careerHistory', cv.careerHistory.filter(c => c.id !== id));
  };

  const updateCareerEntry = (id: string, field: keyof CareerEntry, value: any) => {
    updateCVField('careerHistory', cv.careerHistory.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const addStatBlock = () => {
    const block: StatisticsBlock = {
      id: `stat-${Date.now()}`,
      format: 'Club',
      batMatches: '',
      batInnings: '',
      batRuns: '',
      batHighestScore: '',
      batAverage: '',
      batStrikeRate: '',
      batFifties: '',
      batHundreds: '',
      bowlWickets: '',
      bowlBestBowling: '',
      bowlAverage: '',
      bowlEconomy: ''
    };
    updateCVField('statistics', [...cv.statistics, block]);
  };

  const updateStatBlock = (id: string, field: keyof StatisticsBlock, value: any) => {
    updateCVField('statistics', cv.statistics.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeStatBlock = (id: string) => {
    updateCVField('statistics', cv.statistics.filter(s => s.id !== id));
  };

  const addAchievement = () => {
    const ach: Achievement = {
      id: `ach-${Date.now()}`,
      title: '',
      year: '',
      teamEvent: '',
      description: ''
    };
    updateCVField('achievements', [...cv.achievements, ach]);
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: any) => {
    updateCVField('achievements', cv.achievements.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const removeAchievement = (id: string) => {
    updateCVField('achievements', cv.achievements.filter(a => a.id !== id));
  };

  const addExperience = () => {
    const exp: ProfessionalExperience = {
      id: `exp-${Date.now()}`,
      organisation: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      responsibilities: '',
      achievements: ''
    };
    updateCVField('experience', [...cv.experience, exp]);
  };

  const updateExperience = (id: string, field: keyof ProfessionalExperience, value: any) => {
    updateCVField('experience', cv.experience.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const removeExperience = (id: string) => {
    updateCVField('experience', cv.experience.filter(e => e.id !== id));
  };

  const addEducation = () => {
    const edu: Education = {
      id: `edu-${Date.now()}`,
      school: '',
      degree: '',
      year: ''
    };
    updateCVField('education', [...cv.education, edu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    updateCVField('education', cv.education.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const removeEducation = (id: string) => {
    updateCVField('education', cv.education.filter(e => e.id !== id));
  };

  const addCertification = () => {
    const cert: Certification = {
      id: `cert-${Date.now()}`,
      certName: '',
      details: '',
      year: ''
    };
    updateCVField('certifications', [...cv.certifications, cert]);
  };

  const updateCertification = (id: string, field: keyof Certification, value: any) => {
    updateCVField('certifications', cv.certifications.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const removeCertification = (id: string) => {
    updateCVField('certifications', cv.certifications.filter(c => c.id !== id));
  };

  const addReference = () => {
    const ref: Reference = {
      id: `ref-${Date.now()}`,
      name: '',
      position: '',
      organisation: '',
      relationship: '',
      email: '',
      phone: ''
    };
    updateCVField('references', [...cv.references, ref]);
  };

  const updateReference = (id: string, field: keyof Reference, value: any) => {
    updateCVField('references', cv.references.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const removeReference = (id: string) => {
    updateCVField('references', cv.references.filter(r => r.id !== id));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl p-5 md:p-6 text-left">
      {/* Save Status Banner */}
      <div className="flex justify-between items-center mb-6 text-xs border-b border-slate-800 pb-4">
        <span className="font-semibold text-slate-400">
          Step {currentStep} of {steps.length}: {steps[currentStep-1].name}
        </span>
        <span className={`px-2 py-0.5 rounded font-mono ${isSaving ? 'text-gold-400 bg-gold-400/10' : 'text-green-400 bg-green-400/10'}`}>
          {isSaving ? 'Autosaving...' : 'Saved ✓'}
        </span>
      </div>

      {/* Progress Dots */}
      <div className="flex gap-1.5 mb-6 overflow-x-auto pb-2">
        {steps.map(s => (
          <button 
            key={s.num}
            onClick={() => {
              onSaveDraft();
              setCurrentStep(s.num);
            }}
            className={`h-2 flex-1 min-w-[30px] rounded transition-all ${
              s.num === currentStep 
                ? 'bg-gold-500' 
                : s.num < currentStep 
                  ? 'bg-blue-600' 
                  : 'bg-slate-800 hover:bg-slate-700'
            }`}
            title={s.name}
          />
        ))}
      </div>

      {/* Step Render Area */}
      <div className="min-h-[400px]">
        {/* STEP 1: PERSONAL */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-1.5">
              <User className="w-4 h-4 text-gold-400" /> Personal Identity
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-bold">First Name</label>
                <input 
                  type="text" 
                  value={cv.firstName}
                  disabled={isIdentityLocked}
                  onChange={(e) => updateCVField('firstName', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded text-white text-xs disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-bold">Last Name</label>
                <input 
                  type="text" 
                  value={cv.lastName}
                  disabled={isIdentityLocked}
                  onChange={(e) => updateCVField('lastName', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded text-white text-xs disabled:opacity-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-bold">Nationality</label>
                <input 
                  type="text" 
                  value={cv.nationality}
                  disabled={isIdentityLocked}
                  onChange={(e) => updateCVField('nationality', e.target.value)}
                  placeholder="e.g. Indian, British"
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded text-white text-xs disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-bold">Date of Birth</label>
                <input 
                  type="date" 
                  value={cv.dateOfBirth}
                  disabled={isIdentityLocked}
                  max={new Date().toISOString().split('T')[0]}
                  onChange={(e) => updateCVField('dateOfBirth', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded text-white text-xs disabled:opacity-50"
                />
              </div>
            </div>

            {isIdentityLocked && (
              <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-850 flex items-start gap-2 text-[10px] text-slate-400">
                <AlertCircle className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                <span>Identity details (Name, DOB, Nationality) are verified and locked. To correct mistakes, request a change from the admin console.</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-bold">Country of Residence</label>
                <input 
                  type="text" 
                  value={cv.countryOfResidence}
                  onChange={(e) => updateCVField('countryOfResidence', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-bold">City / Location</label>
                <input 
                  type="text" 
                  value={cv.currentCity}
                  onChange={(e) => updateCVField('currentCity', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded text-white text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-bold">Height (cm)</label>
                <input 
                  type="number" 
                  value={cv.height}
                  onChange={(e) => updateCVField('height', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-bold">Preferred Name (Optional)</label>
                <input 
                  type="text" 
                  value={cv.preferredName}
                  onChange={(e) => updateCVField('preferredName', e.target.value)}
                  placeholder="e.g. Jimmy"
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-bold">Profile Photo (Max 5MB)</label>
              {cv.profilePhoto ? (
                <div className="flex items-center gap-4 p-4 bg-slate-950 border border-slate-850 rounded-xl animate-fade-in text-left">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    <img 
                      src={cv.profilePhoto} 
                      alt="Profile Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-green-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Photo Uploaded
                    </div>
                    <p className="text-[10px] text-slate-500 font-sans">Your photo has been captured successfully.</p>
                    <button 
                      type="button"
                      onClick={() => updateCVField('profilePhoto', '')}
                      className="text-[10px] text-red-400 hover:text-red-300 font-bold underline cursor-pointer block text-left"
                    >
                      Remove & Re-upload another image
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative border border-dashed border-slate-800 bg-slate-950/60 hover:bg-slate-950 hover:border-gold-500/50 p-6 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition duration-200 text-center">
                  <User className="w-8 h-8 text-slate-500" />
                  <span className="text-[11px] text-slate-400 font-medium font-sans">Click to upload player photo</span>
                  <span className="text-[9px] text-slate-500 font-mono">Max size 5MB (JPG, PNG, WEBP)</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.size > 5 * 1024 * 1024) {
                        alert("File size exceeds the 5MB limit. Please upload a smaller image.");
                        return;
                      }
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        if (typeof reader.result === 'string') {
                          updateCVField('profilePhoto', reader.result);
                        }
                      };
                      reader.readAsDataURL(file);
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: CRICKET PROFILE */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-gold-400" /> Playing Proficiency & Style
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-bold">Primary Playing Role</label>
                <select 
                  value={cv.playingRole}
                  onChange={(e) => updateCVField('playingRole', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded text-white text-xs"
                >
                  <option value="">Select Role</option>
                  <option value="Batter">Batter</option>
                  <option value="Bowler">Bowler</option>
                  <option value="All-Rounder">All-Rounder</option>
                  <option value="Wicket-Keeper">Wicket-Keeper</option>
                  <option value="Wicket-Keeper Batter">Wicket-Keeper Batter</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-bold">Batting Style</label>
                <select 
                  value={cv.battingStyle}
                  onChange={(e) => updateCVField('battingStyle', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded text-white text-xs"
                >
                  <option value="">Select Style</option>
                  <option value="Right-Handed">Right-Handed</option>
                  <option value="Left-Handed">Left-Handed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-bold">Bowling Style</label>
                <select 
                  value={cv.bowlingStyle}
                  onChange={(e) => updateCVField('bowlingStyle', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded text-white text-xs"
                >
                  <option value="">Select Bowling</option>
                  <option value="Right-Arm Fast">Right-Arm Fast</option>
                  <option value="Right-Arm Fast-Medium">Right-Arm Fast-Medium</option>
                  <option value="Right-Arm Off Spin">Right-Arm Off Spin</option>
                  <option value="Right-Arm Leg Spin">Right-Arm Leg Spin</option>
                  <option value="Left-Arm Fast">Left-Arm Fast</option>
                  <option value="Left-Arm Fast-Medium">Left-Arm Fast-Medium</option>
                  <option value="Left-Arm Orthodox">Left-Arm Orthodox</option>
                  <option value="Left-Arm Wrist Spin">Left-Arm Wrist Spin</option>
                  <option value="None">None</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-bold">Throwing Arm</label>
                <select 
                  value={cv.throwingArm}
                  onChange={(e) => updateCVField('throwingArm', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded text-white text-xs"
                >
                  <option value="">Select Throwing Arm</option>
                  <option value="Right">Right Arm</option>
                  <option value="Left">Left Arm</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-bold">Current Club</label>
                <input 
                  type="text" 
                  value={cv.currentClub}
                  onChange={(e) => updateCVField('currentClub', e.target.value)}
                  placeholder="e.g. Melbourne CC"
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-bold">Career Level</label>
                <input 
                  type="text" 
                  value={cv.careerLevel}
                  onChange={(e) => updateCVField('careerLevel', e.target.value)}
                  placeholder="e.g. First-Class, Elite Club"
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-bold">About the Player (Bio Summary)</label>
              <textarea 
                value={cv.aboutPlayer}
                onChange={(e) => updateCVField('aboutPlayer', e.target.value)}
                placeholder="Briefly describe your cricket journey, key playing achievements, and career goals."
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded text-white text-xs font-sans resize-none"
              />
            </div>
          </div>
        )}

        {/* STEP 3: PLAYING CAREER */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-gold-400" /> Playing History
              </h3>
              <button 
                onClick={addCareerEntry}
                className="flex items-center gap-1 text-xs text-gold-400 hover:text-white px-2 py-1 rounded bg-slate-850"
              >
                <Plus className="w-3 h-3" /> Add Team
              </button>
            </div>

            {cv.careerHistory.length === 0 ? (
              <div className="text-center py-10 bg-slate-950/20 rounded-xl border border-dashed border-slate-800 text-slate-500 text-xs">
                No teams added. Click "Add Team" to build your log history.
              </div>
            ) : (
              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
                {cv.careerHistory.map((item, idx) => (
                  <div key={item.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3 relative">
                    <button 
                      onClick={() => removeCareerEntry(item.id)}
                      className="absolute top-3 right-3 text-red-500 hover:text-red-400 p-1 hover:bg-slate-900 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <div className="grid grid-cols-2 gap-3 pr-6">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1 font-bold">Team / Club Name</label>
                        <input 
                          type="text" 
                          value={item.teamName}
                          onChange={(e) => updateCareerEntry(item.id, 'teamName', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1 font-bold">Country</label>
                        <input 
                          type="text" 
                          value={item.country}
                          onChange={(e) => updateCareerEntry(item.id, 'country', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1 font-bold">Playing Role</label>
                        <input 
                          type="text" 
                          value={item.role}
                          onChange={(e) => updateCareerEntry(item.id, 'role', e.target.value)}
                          placeholder="e.g. Opening Bowler"
                          className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1 font-bold">Start Year</label>
                        <input 
                          type="number" 
                          value={item.startYear}
                          onChange={(e) => updateCareerEntry(item.id, 'startYear', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1 font-bold">End Year (or Present)</label>
                        <input 
                          type="text" 
                          value={item.endYear}
                          onChange={(e) => updateCareerEntry(item.id, 'endYear', e.target.value)}
                          placeholder="Present"
                          className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 4: STATISTICS */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-gold-400" /> Matches & Formats Statistics
              </h3>
              <button 
                onClick={addStatBlock}
                className="flex items-center gap-1 text-xs text-gold-400 hover:text-white px-2 py-1 rounded bg-slate-850"
              >
                <Plus className="w-3 h-3" /> Add Format
              </button>
            </div>

            {cv.statistics.length === 0 ? (
              <div className="text-center py-10 bg-slate-950/20 rounded-xl border border-dashed border-slate-800 text-slate-500 text-xs">
                No statistics defined. Click "Add Format" to enter statistics records.
              </div>
            ) : (
              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
                {cv.statistics.map((block) => (
                  <div key={block.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3 relative">
                    <button 
                      onClick={() => removeStatBlock(block.id)}
                      className="absolute top-3 right-3 text-red-500 hover:text-red-400 p-1 hover:bg-slate-900 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="w-1/3">
                      <label className="block text-[10px] text-slate-500 mb-1 font-bold">Format Category</label>
                      <select 
                        value={block.format}
                        onChange={(e) => updateStatBlock(block.id, 'format', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white text-xs"
                      >
                        <option value="Club">Club Cricket</option>
                        <option value="First-Class">First-Class</option>
                        <option value="List A">List A</option>
                        <option value="T20">Domestic T20</option>
                        <option value="Test">Test Match</option>
                        <option value="ODI">ODI Match</option>
                        <option value="T20I">T20I Match</option>
                        <option value="Youth">Youth Cricket</option>
                      </select>
                    </div>

                    <div className="border-t border-slate-900 pt-3">
                      <div className="text-slate-300 text-xs font-bold mb-2">Batting statistics</div>
                      <div className="grid grid-cols-4 gap-2">
                        <div>
                          <label className="block text-[9px] text-slate-500 mb-1">Matches</label>
                          <input 
                            type="number" 
                            value={block.batMatches || ''}
                            onChange={(e) => updateStatBlock(block.id, 'batMatches', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 p-1.5 rounded text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] text-slate-500 mb-1">Runs</label>
                          <input 
                            type="number" 
                            value={block.batRuns || ''}
                            onChange={(e) => updateStatBlock(block.id, 'batRuns', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 p-1.5 rounded text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] text-slate-500 mb-1">Avg</label>
                          <input 
                            type="text" 
                            value={block.batAverage || ''}
                            onChange={(e) => updateStatBlock(block.id, 'batAverage', e.target.value)}
                            placeholder="e.g. 35.40"
                            className="w-full bg-slate-900 border border-slate-800 p-1.5 rounded text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] text-slate-500 mb-1">HS</label>
                          <input 
                            type="text" 
                            value={block.batHighestScore || ''}
                            onChange={(e) => updateStatBlock(block.id, 'batHighestScore', e.target.value)}
                            placeholder="e.g. 102*"
                            className="w-full bg-slate-900 border border-slate-800 p-1.5 rounded text-white text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-900 pt-3">
                      <div className="text-slate-300 text-xs font-bold mb-2">Bowling statistics</div>
                      <div className="grid grid-cols-4 gap-2">
                        <div>
                          <label className="block text-[9px] text-slate-500 mb-1">Wickets</label>
                          <input 
                            type="number" 
                            value={block.bowlWickets || ''}
                            onChange={(e) => updateStatBlock(block.id, 'bowlWickets', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 p-1.5 rounded text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] text-slate-500 mb-1">Econ</label>
                          <input 
                            type="text" 
                            value={block.bowlEconomy || ''}
                            onChange={(e) => updateStatBlock(block.id, 'bowlEconomy', e.target.value)}
                            placeholder="e.g. 4.50"
                            className="w-full bg-slate-900 border border-slate-800 p-1.5 rounded text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] text-slate-500 mb-1">Average</label>
                          <input 
                            type="text" 
                            value={block.bowlAverage || ''}
                            onChange={(e) => updateStatBlock(block.id, 'bowlAverage', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 p-1.5 rounded text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] text-slate-500 mb-1">Best Bowl</label>
                          <input 
                            type="text" 
                            value={block.bowlBestBowling || ''}
                            onChange={(e) => updateStatBlock(block.id, 'bowlBestBowling', e.target.value)}
                            placeholder="e.g. 5/24"
                            className="w-full bg-slate-900 border border-slate-800 p-1.5 rounded text-white text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 5: EXPERIENCE */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-gold-400" /> Professional/Coaching Experience
              </h3>
              <button 
                onClick={addExperience}
                className="flex items-center gap-1 text-xs text-gold-400 hover:text-white px-2 py-1 rounded bg-slate-850"
              >
                <Plus className="w-3 h-3" /> Add Experience
              </button>
            </div>

            {cv.experience.length === 0 ? (
              <div className="text-center py-10 bg-slate-950/20 rounded-xl border border-dashed border-slate-800 text-slate-500 text-xs">
                No coaching or administrative experience added.
              </div>
            ) : (
              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
                {cv.experience.map((item) => (
                  <div key={item.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3 relative">
                    <button 
                      onClick={() => removeExperience(item.id)}
                      className="absolute top-3 right-3 text-red-500 hover:text-red-400 p-1 hover:bg-slate-900 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-2 gap-3 pr-6">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1 font-bold">Organisation / Academy</label>
                        <input 
                          type="text" 
                          value={item.organisation}
                          onChange={(e) => updateExperience(item.id, 'organisation', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1 font-bold">Position / Title</label>
                        <input 
                          type="text" 
                          value={item.position}
                          onChange={(e) => updateExperience(item.id, 'position', e.target.value)}
                          placeholder="e.g. Head Youth Coach"
                          className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1 font-bold">Location</label>
                        <input 
                          type="text" 
                          value={item.location}
                          onChange={(e) => updateExperience(item.id, 'location', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1 font-bold">Start Date</label>
                        <input 
                          type="text" 
                          value={item.startDate}
                          onChange={(e) => updateExperience(item.id, 'startDate', e.target.value)}
                          placeholder="e.g. 2021"
                          className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1 font-bold">End Date</label>
                        <input 
                          type="text" 
                          value={item.endDate}
                          onChange={(e) => updateExperience(item.id, 'endDate', e.target.value)}
                          placeholder="e.g. 2023 / Present"
                          className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 6: ACHIEVEMENTS */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <Award className="w-4 h-4 text-gold-400" /> Career Highlights & Awards
              </h3>
              <button 
                onClick={addAchievement}
                className="flex items-center gap-1 text-xs text-gold-400 hover:text-white px-2 py-1 rounded bg-slate-850"
              >
                <Plus className="w-3 h-3" /> Add Award
              </button>
            </div>

            {cv.achievements.length === 0 ? (
              <div className="text-center py-10 bg-slate-950/20 rounded-xl border border-dashed border-slate-800 text-slate-500 text-xs">
                No achievements listed yet.
              </div>
            ) : (
              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
                {cv.achievements.map((ach) => (
                  <div key={ach.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3 relative">
                    <button 
                      onClick={() => removeAchievement(ach.id)}
                      className="absolute top-3 right-3 text-red-500 hover:text-red-400 p-1 hover:bg-slate-900 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-3 gap-3 pr-6">
                      <div className="col-span-2">
                        <label className="block text-[10px] text-slate-500 mb-1 font-bold">Achievement Title</label>
                        <input 
                          type="text" 
                          value={ach.title}
                          onChange={(e) => updateAchievement(ach.id, 'title', e.target.value)}
                          placeholder="e.g. Leading Wicket Taker"
                          className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1 font-bold">Year</label>
                        <input 
                          type="number" 
                          value={ach.year}
                          onChange={(e) => updateAchievement(ach.id, 'year', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1 font-bold">Team / Event Context</label>
                      <input 
                        type="text" 
                        value={ach.teamEvent}
                        onChange={(e) => updateAchievement(ach.id, 'teamEvent', e.target.value)}
                        placeholder="e.g. County Championship, Club Division 1"
                        className="w-full bg-slate-900 border border-slate-800 p-2 rounded text-white text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 7: EDUCATION & CERTIFICATIONS */}
        {currentStep === 7 && (
          <div className="space-y-6">
            {/* Education */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-gold-400" /> Academic Education
                </h3>
                <button 
                  onClick={addEducation}
                  className="flex items-center gap-1 text-xs text-gold-400 hover:text-white px-2 py-1 rounded bg-slate-850"
                >
                  <Plus className="w-3 h-3" /> Add School
                </button>
              </div>

              {cv.education.length === 0 ? (
                <div className="text-center py-6 bg-slate-950/20 rounded-xl border border-dashed border-slate-800 text-slate-500 text-xs">
                  No academic entries.
                </div>
              ) : (
                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {cv.education.map((item) => (
                    <div key={item.id} className="bg-slate-950 p-3 rounded-lg border border-slate-850 space-y-2 relative">
                      <button 
                        onClick={() => removeEducation(item.id)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-400 p-1 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="grid grid-cols-3 gap-2 pr-6">
                        <div className="col-span-2">
                          <label className="block text-[9px] text-slate-500 mb-1">Degree / School</label>
                          <input 
                            type="text" 
                            value={item.degree}
                            onChange={(e) => updateEducation(item.id, 'degree', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 p-1.5 rounded text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] text-slate-500 mb-1">Year</label>
                          <input 
                            type="number" 
                            value={item.year}
                            onChange={(e) => updateEducation(item.id, 'year', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 p-1.5 rounded text-white text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Certifications */}
            <div className="space-y-4 border-t border-slate-800 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-gold-400" /> Cricket & Coaching Qualifications
                </h3>
                <button 
                  onClick={addCertification}
                  className="flex items-center gap-1 text-xs text-gold-400 hover:text-white px-2 py-1 rounded bg-slate-850"
                >
                  <Plus className="w-3 h-3" /> Add Certificate
                </button>
              </div>

              {cv.certifications.length === 0 ? (
                <div className="text-center py-6 bg-slate-950/20 rounded-xl border border-dashed border-slate-800 text-slate-500 text-xs">
                  No certifications listed.
                </div>
              ) : (
                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {cv.certifications.map((item) => (
                    <div key={item.id} className="bg-slate-950 p-3 rounded-lg border border-slate-850 space-y-2 relative">
                      <button 
                        onClick={() => removeCertification(item.id)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-400 p-1 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="grid grid-cols-3 gap-2 pr-6">
                        <div className="col-span-2">
                          <label className="block text-[9px] text-slate-500 mb-1">Certification Name</label>
                          <input 
                            type="text" 
                            value={item.certName}
                            onChange={(e) => updateCertification(item.id, 'certName', e.target.value)}
                            placeholder="e.g. ECB Level 2 Coach"
                            className="w-full bg-slate-900 border border-slate-800 p-1.5 rounded text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] text-slate-500 mb-1">Year</label>
                          <input 
                            type="number" 
                            value={item.year}
                            onChange={(e) => updateCertification(item.id, 'year', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 p-1.5 rounded text-white text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 8: CONTACT */}
        {currentStep === 8 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-gold-400" /> Contact Info
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-bold">Email Address</label>
                  <input 
                    type="email" 
                    value={cv.email}
                    disabled={true} // email is associated with their login account
                    className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded text-white text-xs opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-bold">Phone Number</label>
                  <input 
                    type="text" 
                    value={cv.phone}
                    onChange={(e) => updateCVField('phone', e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-bold">Personal Website (Optional)</label>
                  <input 
                    type="text" 
                    value={cv.personalWebsite}
                    onChange={(e) => updateCVField('personalWebsite', e.target.value)}
                    placeholder="e.g. www.playerprofile.com"
                    className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-bold">LinkedIn Username (Optional)</label>
                  <input 
                    type="text" 
                    value={cv.linkedin}
                    onChange={(e) => updateCVField('linkedin', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded text-white text-xs"
                  />
                </div>
              </div>
            </div>

            {/* References Option */}
            <div className="space-y-4 border-t border-slate-800 pt-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <User className="w-4 h-4 text-gold-400" /> References
                </h3>
                <button 
                  onClick={addReference}
                  className="flex items-center gap-1 text-xs text-gold-400 hover:text-white px-2 py-1 rounded bg-slate-850"
                >
                  <Plus className="w-3 h-3" /> Add Reference
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-xs text-slate-400 mb-1.5 font-bold">References Display Setting</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                    <input 
                      type="radio" 
                      name="showReferences"
                      checked={cv.showReferences === 'show'}
                      onChange={() => updateCVField('showReferences', 'show')}
                      className="text-gold-500 focus:ring-0" 
                    />
                    Display directly on CV
                  </label>
                  <label className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                    <input 
                      type="radio" 
                      name="showReferences"
                      checked={cv.showReferences === 'request'}
                      onChange={() => updateCVField('showReferences', 'request')}
                      className="text-gold-500 focus:ring-0" 
                    />
                    Show "Available upon request"
                  </label>
                </div>
              </div>

              {cv.showReferences === 'show' && (
                cv.references.length === 0 ? (
                  <div className="text-center py-6 bg-slate-950/20 rounded-xl border border-dashed border-slate-800 text-slate-500 text-xs">
                    No references added yet.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {cv.references.map((ref) => (
                      <div key={ref.id} className="bg-slate-950 p-3 rounded-lg border border-slate-850 space-y-2 relative">
                        <button 
                          onClick={() => removeReference(ref.id)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-400 p-1 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="grid grid-cols-2 gap-2 pr-6">
                          <div>
                            <label className="block text-[9px] text-slate-500 mb-1">Name</label>
                            <input 
                              type="text" 
                              value={ref.name}
                              onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 p-1.5 rounded text-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] text-slate-500 mb-1">Organisation</label>
                            <input 
                              type="text" 
                              value={ref.organisation}
                              onChange={(e) => updateReference(ref.id, 'organisation', e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 p-1.5 rounded text-white text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* STEP 9: BRANDING & PREVIEW */}
        {currentStep === 9 && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-gold-400" /> Branding & Theme Controls
            </h3>

            <CVFontSelector 
              selectedFont={cv.font} 
              onSelectFont={(font) => updateCVField('font', font)} 
            />

            <CVColourSelector 
              selectedColour={cv.accentColour} 
              onSelectColour={(color) => updateCVField('accentColour', color)} 
            />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="pt-6 border-t border-slate-800 mt-6 flex justify-between">
        <button
          onClick={handlePrevStep}
          className="px-4 py-2.5 rounded-lg border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-1 text-xs cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        
        <button
          onClick={handleNextStep}
          className="px-6 py-2.5 rounded-lg font-bold bg-gold-gradient text-navy-950 hover:opacity-90 transition-all flex items-center gap-1 text-xs cursor-pointer"
        >
          {currentStep === steps.length ? 'Go to Review' : 'Save & Continue'} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
