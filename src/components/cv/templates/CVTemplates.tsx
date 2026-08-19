import React from 'react';
import { CricketCVFull, CareerEntry, StatisticsBlock, Achievement, ProfessionalExperience, Education, Certification, Reference } from '../CVTypes';
import { User, Phone, Mail, MapPin, Globe, Award, Calendar, Shield } from 'lucide-react';

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
  if (photo) {
    return (
      <img 
        src={photo} 
        alt={name} 
        className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl border-2 border-white/20 shadow-md"
      />
    );
  }
  return (
    <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 shadow-md">
      <User className="w-12 h-12" />
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
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column: Personal, Cricket Profile, References */}
          <div className="md:col-span-1 space-y-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-2 text-slate-900">Player Profile</h2>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div><strong>Nationality:</strong> {cv.nationality}</div>
                {cv.dateOfBirth && <div><strong>DOB:</strong> {cv.dateOfBirth}</div>}
                {cv.height && <div><strong>Height:</strong> {cv.height} cm</div>}
                {cv.battingStyle && <div><strong>Batting:</strong> {cv.battingStyle}</div>}
                {cv.bowlingStyle && <div><strong>Bowling:</strong> {cv.bowlingStyle}</div>}
                {cv.throwingArm && <div><strong>Throw:</strong> {cv.throwingArm} Arm</div>}
                {cv.bowlingPace && <div><strong>Pace:</strong> {cv.bowlingPace}</div>}
                {cv.careerLevel && <div><strong>Level:</strong> {cv.careerLevel}</div>}
                {cv.currentClub && <div><strong>Club:</strong> {cv.currentClub}</div>}
              </div>
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
            {cv.showReferences === 'show' && cv.references.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-2 text-slate-900">References</h2>
                <div className="space-y-2">
                  {cv.references.map((ref, rIdx) => (
                    <div key={rIdx} className="text-xs text-slate-700">
                      <div className="font-bold text-slate-900">{ref.name}</div>
                      <div className="text-[10px] text-slate-500">{ref.position} - {ref.organisation}</div>
                      <div className="text-[10px]">{ref.email} | {ref.phone}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {cv.showReferences === 'request' && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-2 text-slate-900">References</h2>
                <p className="text-[11px] text-slate-500 italic">References available upon request.</p>
              </div>
            )}
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
            {cv.achievements.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-3 text-slate-900">Career Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cv.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
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
            )}

            {/* Experience */}
            {cv.experience.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-3 text-slate-900">Professional Experience</h2>
                <div className="space-y-3">
                  {cv.experience.map((exp, eIdx) => (
                    <div key={eIdx} className="text-xs">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{exp.position} - {exp.organisation}</span>
                        <span className="text-slate-500">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      {exp.responsibilities && <p className="text-slate-600 text-[11px] mt-0.5">{exp.responsibilities}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education & Certs */}
            {(cv.education.length > 0 || cv.certifications.length > 0) && (
              <div className="grid md:grid-cols-2 gap-4">
                {cv.education.length > 0 && (
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-2 text-slate-900">Education</h2>
                    <div className="space-y-2">
                      {cv.education.map((edu, edIdx) => (
                        <div key={edIdx} className="text-xs">
                          <div className="font-bold text-slate-900">{edu.degree}</div>
                          <div className="text-slate-500 text-[10px]">{edu.school} | {edu.year}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {cv.certifications.length > 0 && (
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-2 text-slate-900">Certifications</h2>
                    <div className="space-y-2">
                      {cv.certifications.map((cert, ceIdx) => (
                        <div key={ceIdx} className="text-xs">
                          <div className="font-bold text-slate-900">{cert.certName}</div>
                          <div className="text-slate-500 text-[10px]">{cert.details} | {cert.year}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
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
        <div className="p-6 rounded-xl text-white mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ backgroundColor: accentColour }}>
          <div className="flex items-center gap-4">
            <PlayerPhoto photo={cv.profilePhoto} name={`${cv.firstName} ${cv.lastName}`} />
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">{cv.firstName} {cv.lastName}</h1>
              <p className="text-xs font-bold text-gold-400 uppercase tracking-widest mt-1">{cv.playingRole || 'Professional Cricketer'}</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-200 mt-2">
                <span>{cv.battingStyle} Bat</span>
                <span>•</span>
                <span>{cv.bowlingStyle}</span>
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
            <div>Location: {cv.currentCity || ''}, {cv.countryOfResidence}</div>
          </div>
        </div>

        {/* Profile */}
        {cv.aboutPlayer && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b-2 pb-1" style={{ color: accentColour, borderColor: accentColour }}>About the Player</h2>
            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{cv.aboutPlayer}</p>
          </div>
        )}

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

        {/* Highlights */}
        {cv.achievements.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b-2 pb-1" style={{ color: accentColour, borderColor: accentColour }}>Achievements</h2>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              {cv.achievements.map((ach, idx) => (
                <div key={idx} className="border-l-4 pl-3" style={{ borderColor: accentColour }}>
                  <div className="font-bold text-slate-900">{ach.title} ({ach.year})</div>
                  <div className="text-[10px] text-slate-500">{ach.teamEvent}</div>
                  {ach.description && <p className="text-slate-600 text-[11px] mt-0.5">{ach.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
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
        <div className="grid md:grid-cols-4 gap-6 items-center pb-6 border-b mb-6">
          <div className="md:col-span-1 flex justify-center">
            <PlayerPhoto photo={cv.profilePhoto} name={`${cv.firstName} ${cv.lastName}`} />
          </div>
          <div className="md:col-span-3 text-left">
            <h1 className="text-3xl font-black text-slate-950">{cv.firstName} {cv.lastName}</h1>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">International Placement Profile</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 text-xs text-slate-700 mt-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div>Nationality: <strong>{cv.nationality}</strong></div>
              <div>Residence: <strong>{cv.countryOfResidence}</strong></div>
              {cv.dateOfBirth && <div>DOB: <strong>{cv.dateOfBirth}</strong></div>}
              <div>Role: <strong>{cv.playingRole}</strong></div>
              {cv.battingStyle && <div>Batting: <strong>{cv.battingStyle}</strong></div>}
              {cv.bowlingStyle && <div>Bowling: <strong>{cv.bowlingStyle}</strong></div>}
            </div>
          </div>
        </div>

        {/* Global Details */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            {cv.aboutPlayer && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider mb-2 text-slate-950" style={{ color: accentColour }}>Professional Ambition</h3>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{cv.aboutPlayer}</p>
              </div>
            )}

            {cv.careerHistory.length > 0 && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider mb-3 text-slate-950" style={{ color: accentColour }}>Playing Career</h3>
                <div className="space-y-4">
                  {cv.careerHistory.map((item, idx) => (
                    <div key={idx} className="bg-slate-50/50 p-3 rounded-lg border border-slate-100">
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
          </div>

          {/* Right sidebar info */}
          <div className="md:col-span-1 space-y-6">
            {/* Stats Block */}
            {cv.statistics.length > 0 && (
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider mb-3 text-slate-950 border-b pb-1">Stats Summary</h3>
                <div className="space-y-3">
                  {cv.statistics.map((stat, idx) => (
                    <div key={idx} className="text-xs">
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
                {cv.availability && <div>Availability: <strong>{cv.availability}</strong></div>}
                <div>Overseas Exp: <strong>{cv.overseasExperience ? 'Yes' : 'No'}</strong></div>
                <div>Intl Exp: <strong>{cv.internationalExperience ? 'Yes' : 'No'}</strong></div>
              </div>
            </div>

            {/* Contact details */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-wider mb-2 text-slate-950">Contact Info</h3>
              <div className="space-y-1 text-xs text-slate-700">
                <div>Email: <strong>{cv.email}</strong></div>
                {cv.phone && <div>Phone: <strong>{cv.phone}</strong></div>}
                {cv.personalWebsite && <div className="truncate">Web: <strong>{cv.personalWebsite}</strong></div>}
              </div>
            </div>
          </div>
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
        <div className="text-center pb-6 border-b mb-6">
          <h1 className="text-3xl font-serif text-slate-900 tracking-wide uppercase">{cv.firstName} {cv.lastName}</h1>
          <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mt-1">{cv.playingRole || 'Cricket Professional'}</p>
          <div className="flex justify-center flex-wrap gap-4 text-xs text-slate-600 mt-3">
            <span>Email: {cv.email}</span>
            {cv.phone && <span>Phone: {cv.phone}</span>}
            <span>Location: {cv.currentCity || ''}, {cv.countryOfResidence}</span>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-700">
              <div>Nationality: <strong>{cv.nationality}</strong></div>
              {cv.dateOfBirth && <div>DOB: <strong>{cv.dateOfBirth}</strong></div>}
              {cv.battingStyle && <div>Batting Style: <strong>{cv.battingStyle}</strong></div>}
              {cv.bowlingStyle && <div>Bowling Style: <strong>{cv.bowlingStyle}</strong></div>}
            </div>
          </div>

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch gap-6 pb-6 border-b mb-6">
          <div className="flex items-center gap-4">
            <PlayerPhoto photo={cv.profilePhoto} name={`${cv.firstName} ${cv.lastName}`} />
            <div>
              <h1 className="text-3xl font-black text-slate-950 uppercase tracking-tight">{cv.firstName} {cv.lastName}</h1>
              <div className="inline-block px-2.5 py-1 text-xs font-bold text-white uppercase tracking-wider rounded mt-1.5" style={{ backgroundColor: accentColour }}>
                {cv.playingRole || 'Cricket Athlete'}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 md:w-80">
            <div>Country: <strong>{cv.countryOfResidence}</strong></div>
            <div>Batting: <strong>{cv.battingStyle || '-'}</strong></div>
            <div>Bowling: <strong>{cv.bowlingStyle || '-'}</strong></div>
            {cv.height && <div>Height: <strong>{cv.height} cm</strong></div>}
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
  switch (cv.templateId) {
    case 'professional':
      return <ProfessionalTemplate cv={cv} accentColour={accentColour} font={font} isPreview={isPreview} />;
    case 'international':
      return <InternationalTemplate cv={cv} accentColour={accentColour} font={font} isPreview={isPreview} />;
    case 'classic':
      return <ClassicTemplate cv={cv} accentColour={accentColour} font={font} isPreview={isPreview} />;
    case 'performance':
      return <PerformanceTemplate cv={cv} accentColour={accentColour} font={font} isPreview={isPreview} />;
    case 'executive':
    default:
      return <ExecutiveTemplate cv={cv} accentColour={accentColour} font={font} isPreview={isPreview} />;
  }
}
