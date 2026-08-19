import React from 'react';
import { CricketCVFull, CareerEntry, StatisticsBlock, Achievement, ProfessionalExperience, Education, Certification, Reference } from '../CVTypes';
import { User, Phone, Mail, MapPin, Globe, Award, Calendar, Shield, Linkedin, Instagram, Twitter } from 'lucide-react';

interface TemplateProps {
  cv: CricketCVFull;
  accentColour: string;
  font: string;
  isPreview?: boolean;
}

// Global helper to get font family string
export const getFontFamily = (fontName: string) => {
  switch (fontName) {
    case 'Montserrat': return "'Montserrat', sans-serif";
    case 'Poppins': return "'Poppins', sans-serif";
    case 'Roboto': return "'Roboto', sans-serif";
    case 'Open Sans': return "'Open Sans', sans-serif";
    case 'Lato': return "'Lato', sans-serif";
    case 'Merriweather': return "'Merriweather', serif";
    case 'Source Sans': return "'Source Sans Pro', sans-serif";
    case 'Playfair Display': return "'Playfair Display', serif";
    case 'Inter':
    default: return "'Inter', sans-serif";
  }
};

// Watermark Component
const Watermark = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-50">
    <div 
      className="text-slate-400/20 text-4xl md:text-5xl font-black uppercase tracking-widest border-4 border-slate-400/20 px-8 py-4 rounded-xl rotate-[-30deg] text-center"
      style={{ whiteSpace: 'nowrap' }}
    >
      THE CRICKET ADVISOR<br/>
      <span className="text-xl tracking-wider">PREVIEW</span>
    </div>
  </div>
);

// Photo / Avatar Helper
const PlayerPhoto = ({ photo, name }: { photo?: string; name: string }) => {
  if (!photo) return null;
  return (
    <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl bg-slate-900 border border-slate-200/20 overflow-hidden flex items-center justify-center shadow-md shrink-0">
      <img 
        src={photo} 
        alt={name} 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

const CVAdditionalContact = ({ cv, align = 'left', textClass = 'text-xs text-slate-600' }: { cv: CricketCVFull; align?: 'left' | 'right' | 'center'; textClass?: string }) => {
  const alignClass = align === 'right' ? 'flex items-center md:justify-end gap-1.5' : align === 'center' ? 'flex items-center justify-center gap-1.5' : 'flex items-center gap-1.5';
  return (
    <>
      {cv.linkedin && <div className={alignClass}><Linkedin className="w-3.5 h-3.5" /> <span className={textClass}>LinkedIn: {cv.linkedin}</span></div>}
      {cv.instagram && <div className={alignClass}><Instagram className="w-3.5 h-3.5" /> <span className={textClass}>Instagram: {cv.instagram}</span></div>}
      {cv.twitter && <div className={alignClass}><Twitter className="w-3.5 h-3.5" /> <span className={textClass}>Twitter: {cv.twitter}</span></div>}
    </>
  );
};

const CVExtraProfileDetails = ({ cv }: { cv: CricketCVFull }) => {
  const showLanguages = cv.languages && cv.languages.length > 0;
  return (
    <div className="space-y-1.5 text-xs text-slate-700">
      {cv.nationality && <div><strong>Nationality:</strong> {cv.nationality}</div>}
      {cv.dateOfBirth && <div><strong>DOB:</strong> {cv.dateOfBirth}</div>}
      {cv.height && <div><strong>Height:</strong> {cv.height} cm</div>}
      {cv.playingRole && <div><strong>Role:</strong> {cv.playingRole}</div>}
      {cv.secondaryRole && <div><strong>Secondary Role:</strong> {cv.secondaryRole}</div>}
      {cv.battingStyle && <div><strong>Batting:</strong> {cv.battingStyle}</div>}
      {cv.bowlingStyle && <div><strong>Bowling:</strong> {cv.bowlingStyle}</div>}
      {cv.throwingArm && <div><strong>Throw:</strong> {cv.throwingArm} Arm</div>}
      {cv.bowlingPace && <div><strong>Pace:</strong> {cv.bowlingPace}</div>}
      {cv.careerLevel && <div><strong>Level:</strong> {cv.careerLevel}</div>}
      {cv.currentClub && <div><strong>Club:</strong> {cv.currentClub}</div>}
      {cv.availability && <div><strong>Availability:</strong> {cv.availability}</div>}
      {cv.overseasExperience !== undefined && <div><strong>Overseas Exp:</strong> {cv.overseasExperience ? 'Yes' : 'No'}</div>}
      {cv.internationalExperience !== undefined && <div><strong>Intl Exp:</strong> {cv.internationalExperience ? 'Yes' : 'No'}</div>}
      {showLanguages && <div><strong>Languages:</strong> {cv.languages.join(', ')}</div>}
    </div>
  );
};

const CVExperienceBlock = ({ cv, accentColour }: { cv: CricketCVFull; accentColour: string }) => {
  if (!cv.experience || cv.experience.length === 0) return null;
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-3 text-slate-900">Professional Experience / Coaching</h2>
      <div className="space-y-3">
        {cv.experience.map((exp, eIdx) => (
          <div key={exp.id || eIdx} className="text-xs">
            <div className="flex justify-between font-bold text-slate-900">
              <span>{exp.position} - {exp.organisation}</span>
              <span className="text-slate-500 font-semibold">{exp.startDate} - {exp.endDate}</span>
            </div>
            {exp.location && <div className="text-[10px] text-slate-500">{exp.location}</div>}
            {exp.responsibilities && <p className="text-slate-600 text-[11px] mt-0.5 whitespace-pre-line">{exp.responsibilities}</p>}
            {exp.achievements && <p className="text-slate-500 text-[10px] mt-0.5 italic">Key Achievements: {exp.achievements}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

const CVEducationBlock = ({ cv }: { cv: CricketCVFull }) => {
  const showEdu = cv.education && cv.education.length > 0;
  const showCert = cv.certifications && cv.certifications.length > 0;
  if (!showEdu && !showCert) return null;
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {showEdu && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-2 text-slate-900">Education</h2>
          <div className="space-y-2">
            {cv.education.map((edu, edIdx) => (
              <div key={edu.id || edIdx} className="text-xs">
                <div className="font-bold text-slate-900">{edu.degree}</div>
                <div className="text-slate-500 text-[10px]">{edu.school} | {edu.year}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showCert && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-2 text-slate-900">Certifications</h2>
          <div className="space-y-2">
            {cv.certifications.map((cert, ceIdx) => (
              <div key={cert.id || ceIdx} className="text-xs">
                <div className="font-bold text-slate-900">{cert.certName}</div>
                <div className="text-slate-500 text-[10px]">{cert.details} | {cert.year}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CVReferencesBlock = ({ cv }: { cv: CricketCVFull }) => {
  const showList = cv.showReferences === 'show' && cv.references && cv.references.length > 0;
  const showReq = cv.showReferences === 'request';
  if (!showList && !showReq) return null;
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-2 text-slate-900">References</h2>
      {showList && (
        <div className="space-y-2">
          {cv.references.map((ref, rIdx) => (
            <div key={ref.id || rIdx} className="text-xs text-slate-700">
              <div className="font-bold text-slate-900">{ref.name}</div>
              <div className="text-[10px] text-slate-500">{ref.position} - {ref.organisation}</div>
              {ref.relationship && <div className="text-[9px] text-slate-400">Relationship: {ref.relationship}</div>}
              {(ref.email || ref.phone) && (
                <div className="text-[10px]">{ref.email} {ref.email && ref.phone ? '|' : ''} {ref.phone}</div>
              )}
            </div>
          ))}
        </div>
      )}
      {showReq && (
        <p className="text-[11px] text-slate-500 italic">References available upon request.</p>
      )}
    </div>
  );
};

const CVAchievementsBlock = ({ cv, accentColour }: { cv: CricketCVFull; accentColour: string }) => {
  if (!cv.achievements || cv.achievements.length === 0) return null;
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-3 text-slate-900">Career Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {cv.achievements.map((ach, aIdx) => (
          <div key={ach.id || aIdx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <div className="flex justify-between items-start text-xs font-bold text-slate-900 mb-1">
              <span>{ach.title}</span>
              <span className="text-slate-500 font-normal">{ach.year}</span>
            </div>
            <div className="text-[10px] text-slate-600 mb-1">{ach.teamEvent}</div>
            {ach.description && <p className="text-[10px] text-slate-500 whitespace-pre-line">{ach.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// DESIGN 01: THE EXECUTIVE
// ==========================================
export function ExecutiveTemplate({ cv, accentColour, font, isPreview }: TemplateProps) {
  const fontStyle = { fontFamily: getFontFamily(font) };
  const borderColour = accentColour;

  return (
    <div 
      className="w-full bg-white text-slate-800 p-8 shadow-inner relative flex flex-col justify-between overflow-hidden" 
      style={{ ...fontStyle, minHeight: '297mm' }}
    >
      {isPreview && <Watermark />}
      
      <div>
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b-2 mb-6" style={{ borderColor: borderColour }}>
          <div className="flex items-center gap-4">
            <PlayerPhoto photo={cv.profilePhoto} name={`${cv.firstName} ${cv.lastName}`} />
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                {cv.firstName} <span style={{ color: accentColour }}>{cv.lastName}</span>
              </h1>
              <p className="text-sm font-bold text-slate-600 uppercase tracking-widest mt-1">
                {cv.playingRole || 'Cricket Professional'}
              </p>
              {cv.preferredName && (
                <p className="text-xs text-slate-500 italic mt-0.5">Known as: {cv.preferredName}</p>
              )}
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 text-left md:text-right space-y-1 text-xs text-slate-600">
            <div className="flex items-center md:justify-end gap-1.5"><Mail className="w-3.5 h-3.5" /> {cv.email}</div>
            {cv.phone && <div className="flex items-center md:justify-end gap-1.5"><Phone className="w-3.5 h-3.5" /> {cv.phone}</div>}
            <div className="flex items-center md:justify-end gap-1.5"><MapPin className="w-3.5 h-3.5" /> {cv.currentCity || ''}, {cv.countryOfResidence}</div>
            {cv.personalWebsite && <div className="flex items-center md:justify-end gap-1.5"><Globe className="w-3.5 h-3.5" /> {cv.personalWebsite}</div>}
            <CVAdditionalContact cv={cv} align="right" />
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column: Personal, Cricket Profile, References */}
          <div className="md:col-span-1 space-y-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-2 text-slate-900">Player Profile</h2>
              <CVExtraProfileDetails cv={cv} />
            </div>

            {/* Statistics Summary */}
            {cv.statistics.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-2 text-slate-900">Key Statistics</h2>
                <div className="space-y-3">
                  {cv.statistics.map((stat, sIdx) => (
                    <div key={sIdx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <div className="font-bold text-slate-900 text-xs mb-1.5 border-b pb-0.5" style={{ color: accentColour }}>{stat.format}</div>
                      <div className="grid grid-cols-2 gap-y-1 gap-x-2 text-[10px]">
                        {stat.batMatches && <div>Matches: <strong>{stat.batMatches}</strong></div>}
                        {stat.batRuns && <div>Runs: <strong>{stat.batRuns}</strong></div>}
                        {stat.batAverage && <div>Bat Avg: <strong>{stat.batAverage}</strong></div>}
                        {stat.bowlWickets && <div>Wickets: <strong>{stat.bowlWickets}</strong></div>}
                        {stat.bowlAverage && <div>Bowl Avg: <strong>{stat.bowlAverage}</strong></div>}
                        {stat.bowlEconomy && <div>Econ: <strong>{stat.bowlEconomy}</strong></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* References */}
            <CVReferencesBlock cv={cv} />
          </div>

          {/* Right Column: About, Playing History, Highlights, Education */}
          <div className="md:col-span-2 space-y-6">
            {cv.aboutPlayer && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-2 text-slate-900">About Me</h2>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{cv.aboutPlayer}</p>
              </div>
            )}

            {/* Playing Career History */}
            {cv.careerHistory.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-3 text-slate-900">Career History</h2>
                <div className="space-y-4">
                  {cv.careerHistory.map((item, cIdx) => (
                    <div key={cIdx} className="relative pl-3 border-l-2" style={{ borderColor: accentColour }}>
                      <div className="flex justify-between items-start text-xs mb-0.5">
                        <span className="font-bold text-slate-900">{item.teamName} ({item.country})</span>
                        <span className="text-slate-500 font-semibold">{item.startYear} - {item.endYear || 'Present'}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-semibold mb-1 uppercase tracking-wide">
                        {item.role} {item.captaincy ? '(Captain)' : ''} | {item.level}
                      </div>
                      {item.description && (
                        <p className="text-xs text-slate-600 whitespace-pre-line">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            <CVAchievementsBlock cv={cv} accentColour={accentColour} />

            {/* Experience */}
            <CVExperienceBlock cv={cv} accentColour={accentColour} />

            {/* Education & Certs */}
            <CVEducationBlock cv={cv} />
          </div>
        </div>
      </div>
      
      {/* Footer / Branding */}
      <div className="mt-8 pt-4 border-t text-center text-[9px] text-slate-400 flex justify-between items-center">
        <span>Verified Profile Ref: {cv.referenceNumber || 'TCA-PENDING'}</span>
        <span>The Cricket Advisor CV Builder</span>
      </div>
    </div>
  );
}

// ==========================================
// DESIGN 02: THE PROFESSIONAL
// ==========================================
export function ProfessionalTemplate({ cv, accentColour, font, isPreview }: TemplateProps) {
  const fontStyle = { fontFamily: getFontFamily(font) };

  return (
    <div 
      className="w-full bg-white text-slate-800 p-8 shadow-inner relative flex flex-col justify-between overflow-hidden" 
      style={{ ...fontStyle, minHeight: '297mm' }}
    >
      {isPreview && <Watermark />}

      <div>
        {/* Banner Header */}
        <div className="p-6 rounded-xl text-white mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in" style={{ backgroundColor: accentColour }}>
          <div className="flex items-center gap-4">
            <PlayerPhoto photo={cv.profilePhoto} name={`${cv.firstName} ${cv.lastName}`} />
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">{cv.firstName} {cv.lastName}</h1>
              <p className="text-xs font-bold text-gold-400 uppercase tracking-widest mt-1">{cv.playingRole || 'Professional Cricketer'}</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-200 mt-2">
                {cv.battingStyle && <span>{cv.battingStyle} Bat</span>}
                {cv.bowlingStyle && (
                  <>
                    <span>•</span>
                    <span>{cv.bowlingStyle}</span>
                  </>
                )}
                {cv.height && (
                  <>
                    <span>•</span>
                    <span>{cv.height} cm</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="text-xs space-y-1 text-slate-200 text-left md:text-right border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto">
            <div>Email: {cv.email}</div>
            {cv.phone && <div>Phone: {cv.phone}</div>}
            <div>Location: {cv.currentCity ? `${cv.currentCity}, ` : ''}{cv.countryOfResidence}</div>
            {cv.personalWebsite && <div>Web: {cv.personalWebsite}</div>}
            <CVAdditionalContact cv={cv} align="right" textClass="text-xs text-slate-200" />
          </div>
        </div>

        {/* Two Column details for Profile / extra details */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            {cv.aboutPlayer && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b-2 pb-1" style={{ color: accentColour, borderColor: accentColour }}>About the Player</h2>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{cv.aboutPlayer}</p>
              </div>
            )}
          </div>
          <div className="md:col-span-1">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b-2 pb-1" style={{ color: accentColour, borderColor: accentColour }}>Profile Details</h2>
            <CVExtraProfileDetails cv={cv} />
          </div>
        </div>

        {/* Statistics Grid */}
        {cv.statistics.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b-2 pb-1" style={{ color: accentColour, borderColor: accentColour }}>Cricket Statistics</h2>
            <div className="space-y-4">
              {cv.statistics.map((stat, idx) => (
                <div key={idx} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <h3 className="text-xs font-bold text-slate-900 mb-2">{stat.format} Format</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 text-center">
                    {stat.batMatches && (
                      <div className="bg-white p-2 rounded border border-slate-100">
                        <div className="text-[10px] text-slate-500 uppercase">Matches</div>
                        <div className="text-sm font-black text-slate-900">{stat.batMatches}</div>
                      </div>
                    )}
                    {stat.batRuns && (
                      <div className="bg-white p-2 rounded border border-slate-100">
                        <div className="text-[10px] text-slate-500 uppercase">Runs</div>
                        <div className="text-sm font-black text-slate-900">{stat.batRuns}</div>
                      </div>
                    )}
                    {stat.batHighestScore && (
                      <div className="bg-white p-2 rounded border border-slate-100">
                        <div className="text-[10px] text-slate-500 uppercase">HS</div>
                        <div className="text-sm font-black text-slate-900">{stat.batHighestScore}</div>
                      </div>
                    )}
                    {stat.batAverage && (
                      <div className="bg-white p-2 rounded border border-slate-100">
                        <div className="text-[10px] text-slate-500 uppercase">Average</div>
                        <div className="text-sm font-black text-slate-900">{stat.batAverage}</div>
                      </div>
                    )}
                    {stat.bowlWickets && (
                      <div className="bg-white p-2 rounded border border-slate-100">
                        <div className="text-[10px] text-slate-500 uppercase">Wkts</div>
                        <div className="text-sm font-black text-slate-900">{stat.bowlWickets}</div>
                      </div>
                    )}
                    {stat.bowlEconomy && (
                      <div className="bg-white p-2 rounded border border-slate-100">
                        <div className="text-[10px] text-slate-500 uppercase">Econ</div>
                        <div className="text-sm font-black text-slate-900">{stat.bowlEconomy}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Career Timeline */}
        {cv.careerHistory.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b-2 pb-1" style={{ color: accentColour, borderColor: accentColour }}>Career History</h2>
            <div className="space-y-3">
              {cv.careerHistory.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start gap-4 text-xs">
                  <div className="w-24 text-slate-500 font-bold">{item.startYear} - {item.endYear || 'Present'}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-950">{item.teamName} ({item.country})</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-semibold">{item.role} • {item.level}</p>
                    {item.description && <p className="text-slate-600 text-xs mt-1">{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Highlights / Achievements */}
        <div className="mb-6">
          <CVAchievementsBlock cv={cv} accentColour={accentColour} />
        </div>

        {/* Coaching / Professional Experience */}
        <div className="mb-6">
          <CVExperienceBlock cv={cv} accentColour={accentColour} />
        </div>

        {/* Education & Certifications */}
        <div className="mb-6">
          <CVEducationBlock cv={cv} />
        </div>

        {/* References */}
        <div className="mb-6">
          <CVReferencesBlock cv={cv} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t text-center text-[9px] text-slate-400 flex justify-between items-center">
        <span>Verified Profile Ref: {cv.referenceNumber || 'TCA-PENDING'}</span>
        <span>The Cricket Advisor CV Builder</span>
      </div>
    </div>
  );
}

// ==========================================
// DESIGN 03: THE INTERNATIONAL
// ==========================================
export function InternationalTemplate({ cv, accentColour, font, isPreview }: TemplateProps) {
  const fontStyle = { fontFamily: getFontFamily(font) };

  // Robust fallback defaults to prevent rendering crashes on partial drafts
  const firstName = cv?.firstName || '';
  const lastName = cv?.lastName || '';
  const profilePhoto = cv?.profilePhoto || '';
  const nationality = cv?.nationality || '';
  const countryOfResidence = cv?.countryOfResidence || '';
  const dateOfBirth = cv?.dateOfBirth || '';
  const playingRole = cv?.playingRole || '';
  const battingStyle = cv?.battingStyle || '';
  const bowlingStyle = cv?.bowlingStyle || '';
  const aboutPlayer = cv?.aboutPlayer || '';
  const availability = cv?.availability || '';
  const email = cv?.email || '';
  const phone = cv?.phone || '';
  const personalWebsite = cv?.personalWebsite || '';
  const referenceNumber = cv?.referenceNumber || '';

  const overseasExperience = cv?.overseasExperience === true;
  const internationalExperience = cv?.internationalExperience === true;

  const careerHistory = Array.isArray(cv?.careerHistory) ? cv.careerHistory : [];
  const statistics = Array.isArray(cv?.statistics) ? cv.statistics : [];

  return (
    <div 
      className="w-full bg-white text-slate-800 p-8 shadow-inner relative flex flex-col justify-between overflow-hidden" 
      style={{ ...fontStyle, minHeight: '297mm' }}
    >
      {isPreview && <Watermark />}

      <div>
        {/* Top bar Accent */}
        <div className="h-2 w-full mb-6 rounded" style={{ backgroundColor: accentColour }} />

        {/* Identity Grid */}
        <div className="grid md:grid-cols-4 gap-6 items-center pb-6 border-b mb-6 animate-fade-in">
          {profilePhoto && (
            <div className="md:col-span-1 flex justify-center">
              <PlayerPhoto photo={profilePhoto} name={`${firstName} ${lastName}`} />
            </div>
          )}
          <div className={`${profilePhoto ? 'md:col-span-3' : 'md:col-span-4'} text-left`}>
            <h1 className="text-3xl font-black text-slate-950">{firstName} {lastName}</h1>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">International Placement Profile</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 text-xs text-slate-700 mt-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
              {nationality && <div>Nationality: <strong>{nationality}</strong></div>}
              {countryOfResidence && <div>Residence: <strong>{countryOfResidence}</strong></div>}
              {dateOfBirth && <div>DOB: <strong>{dateOfBirth}</strong></div>}
              {playingRole && <div>Role: <strong>{playingRole}</strong></div>}
              {battingStyle && <div>Batting: <strong>{battingStyle}</strong></div>}
              {bowlingStyle && <div>Bowling: <strong>{bowlingStyle}</strong></div>}
              {cv.height && <div>Height: <strong>{cv.height} cm</strong></div>}
              {cv.languages && cv.languages.length > 0 && <div className="col-span-2">Languages: <strong>{cv.languages.join(', ')}</strong></div>}
            </div>
          </div>
        </div>

        {/* Global Details */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            {aboutPlayer && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider mb-2 text-slate-950 animate-fade-in" style={{ color: accentColour }}>Professional Ambition</h3>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{aboutPlayer}</p>
              </div>
            )}

            {careerHistory.length > 0 && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider mb-3 text-slate-950 border-b pb-1" style={{ color: accentColour }}>Playing Career</h3>
                <div className="space-y-4">
                  {careerHistory.map((item, idx) => item && (
                    <div key={item.id || idx} className="bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                      <div className="flex justify-between font-bold text-xs text-slate-900">
                        <span>{item.teamName} ({item.country})</span>
                        <span style={{ color: accentColour }}>{item.startYear} - {item.endYear || 'Present'}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">
                        {item.role} | Level: {item.level} {item.captaincy ? '(Captain)' : ''}
                      </div>
                      {item.description && <p className="text-slate-600 text-xs mt-1.5">{item.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            <CVAchievementsBlock cv={cv} accentColour={accentColour} />

            {/* Experience (Coaching) */}
            <CVExperienceBlock cv={cv} accentColour={accentColour} />

            {/* References */}
            <CVReferencesBlock cv={cv} />
          </div>

          {/* Right sidebar info */}
          <div className="md:col-span-1 space-y-6">
            {/* Stats Block */}
            {statistics.length > 0 && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider mb-3 text-slate-950 border-b pb-1">Stats Summary</h3>
                <div className="space-y-3">
                  {statistics.map((stat, idx) => stat && (
                    <div key={stat.id || idx} className="text-xs">
                      <div className="font-bold text-slate-900 mb-1">{stat.format}</div>
                      <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-700 bg-slate-50 p-2 rounded">
                        {stat.batRuns && <div>Runs: {stat.batRuns}</div>}
                        {stat.batAverage && <div>Avg: {stat.batAverage}</div>}
                        {stat.bowlWickets && <div>Wkts: {stat.bowlWickets}</div>}
                        {stat.bowlEconomy && <div>Econ: {stat.bowlEconomy}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Visa / Global Availability */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-wider mb-2 text-slate-950">Availability</h3>
              <div className="space-y-2 text-xs text-slate-700">
                {availability && <div>Availability: <strong>{availability}</strong></div>}
                <div>Overseas Exp: <strong>{overseasExperience ? 'Yes' : 'No'}</strong></div>
                <div>Intl Exp: <strong>{internationalExperience ? 'Yes' : 'No'}</strong></div>
              </div>
            </div>

            {/* Education & Certs */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-wider mb-2 text-slate-950">Education & Certifications</h3>
              <CVEducationBlock cv={cv} />
            </div>

            {/* Contact details */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-wider mb-2 text-slate-950">Contact Info</h3>
              <div className="space-y-1 text-xs text-slate-700">
                <div>Email: <strong>{email}</strong></div>
                {phone && <div>Phone: <strong>{phone}</strong></div>}
                {personalWebsite && <div className="truncate">Web: <strong>{personalWebsite}</strong></div>}
                <CVAdditionalContact cv={cv} align="left" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t text-center text-[9px] text-slate-400 flex justify-between items-center">
        <span>Verified Profile Ref: {referenceNumber || 'TCA-PENDING'}</span>
        <span>The Cricket Advisor CV Builder</span>
      </div>
    </div>
  );
}

// ==========================================
// DESIGN 04: THE CLASSIC
// ==========================================
export function ClassicTemplate({ cv, accentColour, font, isPreview }: TemplateProps) {
  const fontStyle = { fontFamily: getFontFamily(font) };

  return (
    <div 
      className="w-full bg-white text-slate-800 p-8 shadow-inner relative flex flex-col justify-between overflow-hidden" 
      style={{ ...fontStyle, minHeight: '297mm' }}
    >
      {isPreview && <Watermark />}

      <div>
        {/* Simple Centered Header */}
        <div className="text-center pb-6 border-b mb-6 animate-fade-in flex flex-col items-center gap-4">
          <PlayerPhoto photo={cv.profilePhoto} name={`${cv.firstName} ${cv.lastName}`} />
          <div>
            <h1 className="text-3xl font-serif text-slate-900 tracking-wide uppercase">{cv.firstName} {cv.lastName}</h1>
            <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mt-1">{cv.playingRole || 'Cricket Professional'}</p>
            <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 mt-3">
              <span>Email: {cv.email}</span>
              {cv.phone && <span>Phone: {cv.phone}</span>}
              <span>Location: {cv.currentCity || ''}, {cv.countryOfResidence}</span>
              {cv.personalWebsite && <span>Web: {cv.personalWebsite}</span>}
            </div>
            <div className="mt-2 flex justify-center gap-3">
              <CVAdditionalContact cv={cv} align="center" />
            </div>
          </div>
        </div>

        {/* Content columns */}
        <div className="space-y-6">
          {cv.aboutPlayer && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2">Profile</h3>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{cv.aboutPlayer}</p>
            </div>
          )}

          {/* Details Table style */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2">Personal Data</h3>
            <CVExtraProfileDetails cv={cv} />
          </div>

          {/* Stats summary table */}
          {cv.statistics.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2">Statistics Record</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-900">
                      <th className="p-2 border font-bold">Format</th>
                      <th className="p-2 border font-bold">Matches</th>
                      <th className="p-2 border font-bold">Runs</th>
                      <th className="p-2 border font-bold">Avg</th>
                      <th className="p-2 border font-bold">Wickets</th>
                      <th className="p-2 border font-bold">Econ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cv.statistics.map((stat, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-2 border font-semibold">{stat.format}</td>
                        <td className="p-2 border">{stat.batMatches || '-'}</td>
                        <td className="p-2 border">{stat.batRuns || '-'}</td>
                        <td className="p-2 border">{stat.batAverage || '-'}</td>
                        <td className="p-2 border">{stat.bowlWickets || '-'}</td>
                        <td className="p-2 border">{stat.bowlEconomy || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Career Table */}
          {cv.careerHistory.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-3">Playing Experience</h3>
              <div className="space-y-4">
                {cv.careerHistory.map((item, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between font-bold text-slate-950">
                      <span>{item.teamName} - {item.role}</span>
                      <span>{item.startYear} - {item.endYear || 'Present'}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 italic mb-1">{item.country} | {item.level}</div>
                    {item.description && <p className="text-slate-600 whitespace-pre-line">{item.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          <CVAchievementsBlock cv={cv} accentColour={accentColour} />

          {/* Professional Coaching Experience */}
          <CVExperienceBlock cv={cv} accentColour={accentColour} />

          {/* Education & Certifications */}
          <CVEducationBlock cv={cv} />

          {/* References */}
          <CVReferencesBlock cv={cv} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t text-center text-[9px] text-slate-400 flex justify-between items-center">
        <span>Verified Profile Ref: {cv.referenceNumber || 'TCA-PENDING'}</span>
        <span>The Cricket Advisor CV Builder</span>
      </div>
    </div>
  );
}

// ==========================================
// DESIGN 05: THE PERFORMANCE
// ==========================================
export function PerformanceTemplate({ cv, accentColour, font, isPreview }: TemplateProps) {
  const fontStyle = { fontFamily: getFontFamily(font) };

  return (
    <div 
      className="w-full bg-white text-slate-800 p-8 shadow-inner relative flex flex-col justify-between overflow-hidden" 
      style={{ ...fontStyle, minHeight: '297mm' }}
    >
      {isPreview && <Watermark />}

      <div>
        {/* Left Bar Identity Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch gap-6 pb-6 border-b mb-6 animate-fade-in">
          <div className="flex items-center gap-4">
            <PlayerPhoto photo={cv.profilePhoto} name={`${cv.firstName} ${cv.lastName}`} />
            <div>
              <h1 className="text-3xl font-black text-slate-950 uppercase tracking-tight">{cv.firstName} {cv.lastName}</h1>
              <div className="inline-block px-2.5 py-1 text-xs font-bold text-white uppercase tracking-wider rounded mt-1.5" style={{ backgroundColor: accentColour }}>
                {cv.playingRole || 'Cricket Athlete'}
              </div>
              <div className="mt-3 text-xs text-slate-600 space-y-1 text-left">
                <div>Email: {cv.email}</div>
                {cv.phone && <div>Phone: {cv.phone}</div>}
                <div>Location: {cv.currentCity || ''}, {cv.countryOfResidence}</div>
                {cv.personalWebsite && <div>Web: {cv.personalWebsite}</div>}
                <CVAdditionalContact cv={cv} align="left" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 md:w-80 shrink-0">
            <CVExtraProfileDetails cv={cv} />
          </div>
        </div>

        {/* Stats High-Impact Block */}
        {cv.statistics.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900">Career Stats Highlights</h2>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Matches Detailed</span>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {cv.statistics.slice(0, 2).map((stat, idx) => (
                <div key={idx} className="border p-4 rounded-xl relative overflow-hidden" style={{ borderColor: accentColour }}>
                  <div className="absolute top-0 right-0 px-3 py-1 text-[9px] font-bold text-white uppercase" style={{ backgroundColor: accentColour }}>
                    {stat.format}
                  </div>
                  <div className="font-bold text-slate-900 text-xs mb-3">{stat.format} Stats</div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase">Matches</div>
                      <div className="text-lg font-black text-slate-900">{stat.batMatches || '-'}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase">Runs</div>
                      <div className="text-lg font-black text-slate-900">{stat.batRuns || '-'}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-400 uppercase">Wickets</div>
                      <div className="text-lg font-black text-slate-900">{stat.bowlWickets || '-'}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile/About */}
        {cv.aboutPlayer && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-2">About The Athlete</h2>
            <p className="text-xs text-slate-650 leading-relaxed whitespace-pre-line bg-slate-50/30 p-3 rounded-lg border border-slate-100">{cv.aboutPlayer}</p>
          </div>
        )}

        {/* Playing Career */}
        {cv.careerHistory.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-3">Performance Log</h2>
            <div className="space-y-3">
              {cv.careerHistory.map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex justify-between items-center gap-4 text-xs">
                  <div>
                    <span className="font-bold text-slate-950">{item.teamName}</span>
                    <span className="text-slate-500 text-[10px] ml-2">({item.country})</span>
                    <div className="text-[10px] text-slate-500 font-semibold mt-0.5">{item.role} • {item.level}</div>
                  </div>
                  <div className="font-bold text-slate-600">{item.startYear} - {item.endYear || 'Present'}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Highlights */}
        {cv.achievements.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-3">Major Achievements</h2>
            <div className="space-y-2">
              {cv.achievements.map((ach, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs border-b pb-2">
                  <div>
                    <span className="font-bold text-slate-900">{ach.title}</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">{ach.teamEvent} - {ach.description}</p>
                  </div>
                  <span className="font-semibold text-slate-500">{ach.year}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Coaching / Professional Experience */}
        <div className="mb-6">
          <CVExperienceBlock cv={cv} accentColour={accentColour} />
        </div>

        {/* Education & Certs */}
        <div className="mb-6">
          <CVEducationBlock cv={cv} />
        </div>

        {/* References */}
        <div className="mb-6">
          <CVReferencesBlock cv={cv} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t text-center text-[9px] text-slate-400 flex justify-between items-center">
        <span>Verified Profile Ref: {cv.referenceNumber || 'TCA-PENDING'}</span>
        <span>The Cricket Advisor CV Builder</span>
      </div>
    </div>
  );
}

// Master Render Router Component
export default function CVTemplateRenderer({ cv, accentColour, font, isPreview }: TemplateProps) {
  // Safeguard: Ensure all lists are arrays and default values are defined to prevent rendering crashes
  const safeCv = {
    ...cv,
    careerHistory: Array.isArray(cv?.careerHistory) ? cv.careerHistory : [],
    statistics: Array.isArray(cv?.statistics) ? cv.statistics : [],
    achievements: Array.isArray(cv?.achievements) ? cv.achievements : [],
    experience: Array.isArray(cv?.experience) ? cv.experience : [],
    education: Array.isArray(cv?.education) ? cv.education : [],
    certifications: Array.isArray(cv?.certifications) ? cv.certifications : [],
    references: Array.isArray(cv?.references) ? cv.references : [],
    languages: Array.isArray(cv?.languages) ? cv.languages : [],
  };

  switch (safeCv.templateId) {
    case 'professional':
      return <ProfessionalTemplate cv={safeCv} accentColour={accentColour} font={font} isPreview={isPreview} />;
    case 'international':
      return <InternationalTemplate cv={safeCv} accentColour={accentColour} font={font} isPreview={isPreview} />;
    case 'classic':
      return <ClassicTemplate cv={safeCv} accentColour={accentColour} font={font} isPreview={isPreview} />;
    case 'performance':
      return <PerformanceTemplate cv={safeCv} accentColour={accentColour} font={font} isPreview={isPreview} />;
    case 'executive':
    default:
      return <ExecutiveTemplate cv={safeCv} accentColour={accentColour} font={font} isPreview={isPreview} />;
  }
}
