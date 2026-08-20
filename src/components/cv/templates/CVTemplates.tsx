import React from 'react';
import { CricketCVFull, CareerEntry, StatisticsBlock, Achievement, ProfessionalExperience, Education, Certification, Reference } from '../CVTypes';
import { User, Phone, Mail, MapPin, Globe, Award, Calendar, Shield, Linkedin, Instagram, Twitter } from 'lucide-react';
import { CVPaginatedRenderer, CVAtomicBlock, CVSectionHeading, CVColumn, usePageContext } from './registry/CVPaginationEngine';

interface TemplateProps {
  cv: CricketCVFull;
  accentColour: string;
  font: string;
  isPreview?: boolean;
  isCapture?: boolean;
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
      {cv.playingRole && <div><strong>Role:</strong> {cv.playingRoleDetail || cv.playingRole}</div>}
      {cv.secondaryRole && <div><strong>Secondary Role:</strong> {cv.secondaryRole}</div>}
      {cv.battingStyle && <div><strong>Batting:</strong> {cv.battingStyle}</div>}
      {cv.bowlingStyle && <div><strong>Bowling:</strong> {cv.bowlingStyle}</div>}
      {cv.throwingArm && <div><strong>Throw:</strong> {cv.throwingArm} Arm</div>}
      {cv.bowlingPace && <div><strong>Pace:</strong> {cv.bowlingPace}</div>}
      {cv.typeOfPlayerLevel && <div><strong>Player Level:</strong> {cv.typeOfPlayerLevel}</div>}
      {cv.highestLevelPlayed && <div><strong>Highest Level:</strong> {cv.highestLevelPlayed}</div>}
      {cv.playerLevelCountry && <div><strong>Country Played:</strong> {cv.playerLevelCountry}</div>}
      {cv.espnLink && (
        <div>
          <strong>ESPN Cricinfo:</strong>{' '}
          <a href={cv.espnLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">
            Profile
          </a>
        </div>
      )}
      {cv.crickherosLink && (
        <div>
          <strong>CrickHeroes:</strong>{' '}
          <a href={cv.crickherosLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">
            Profile
          </a>
        </div>
      )}
      {cv.currentClub && <div><strong>Club:</strong> {cv.currentClub}</div>}
      {cv.availability && <div><strong>Availability:</strong> {cv.availability}</div>}
      {cv.overseasExperience === true && <div><strong>Overseas Exp:</strong> Yes</div>}
      {cv.internationalExperience === true && <div><strong>Intl Exp:</strong> Yes</div>}
      {showLanguages && <div><strong>Languages:</strong> {cv.languages.join(', ')}</div>}
      {cv.hobbies && cv.hobbies.length > 0 && <div><strong>Hobbies:</strong> {cv.hobbies.join(', ')}</div>}
    </div>
  );
};

const CVExperienceBlock = ({ cv, accentColour }: { cv: CricketCVFull; accentColour: string }) => {
  if (!cv.experience || cv.experience.length === 0) return null;
  return (
    <div>
      <CVSectionHeading id="heading-experience">
        <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-3 text-slate-900">Professional Experience / Coaching</h2>
      </CVSectionHeading>
      <div className="space-y-3">
        {cv.experience.map((exp, eIdx) => (
          <CVAtomicBlock key={exp.id || eIdx} id={`block-experience-${eIdx}`}>
            <div className="text-xs text-left">
              <div className="flex justify-between font-bold text-slate-900">
                <span>{exp.position} - {exp.organisation}</span>
                <span className="text-slate-500 font-semibold">{exp.startDate} - {exp.endDate}</span>
              </div>
              {exp.location && <div className="text-[10px] text-slate-500">{exp.location}</div>}
              {exp.responsibilities && <p className="text-slate-600 text-[11px] mt-0.5 whitespace-pre-line">{exp.responsibilities}</p>}
              {exp.achievements && <p className="text-slate-500 text-[10px] mt-0.5 italic">Key Achievements: {exp.achievements}</p>}
            </div>
          </CVAtomicBlock>
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
          <CVSectionHeading id="heading-education">
            <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-2 text-slate-900">Education</h2>
          </CVSectionHeading>
          <div className="space-y-2">
            {cv.education.map((edu, edIdx) => (
              <CVAtomicBlock key={edu.id || edIdx} id={`block-education-${edIdx}`}>
                <div className="text-xs text-left">
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-500 text-[10px] text-left">
                    {[edu.school, edu.year].filter(Boolean).join(' | ')}
                  </div>
                </div>
              </CVAtomicBlock>
            ))}
          </div>
        </div>
      )}
      {showCert && (
        <div>
          <CVSectionHeading id="heading-certifications">
            <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-2 text-slate-900">Certifications</h2>
          </CVSectionHeading>
          <div className="space-y-2">
            {cv.certifications.map((cert, ceIdx) => (
              <CVAtomicBlock key={cert.id || ceIdx} id={`block-certification-${ceIdx}`}>
                <div className="text-xs text-left">
                  <div className="font-bold text-slate-900">{cert.certName}</div>
                  <div className="text-slate-500 text-[10px]">{cert.details} | {cert.year}</div>
                </div>
              </CVAtomicBlock>
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
      <CVSectionHeading id="heading-references">
        <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-2 text-slate-900">References</h2>
      </CVSectionHeading>
      {showList && (
        <div className="space-y-2">
          {cv.references.map((ref, rIdx) => (
            <CVAtomicBlock key={ref.id || rIdx} id={`block-reference-${rIdx}`}>
              <div className="text-xs text-slate-700 text-left">
                <div className="font-bold text-slate-900">{ref.name}</div>
                <div className="text-[10px] text-slate-500">{ref.position} - {ref.organisation}</div>
                {ref.relationship && <div className="text-[9px] text-slate-400">Relationship: {ref.relationship}</div>}
                {(ref.email || ref.phone) && (
                  <div className="text-[10px]">{ref.email} {ref.email && ref.phone ? '|' : ''} {ref.phone}</div>
                )}
              </div>
            </CVAtomicBlock>
          ))}
        </div>
      )}
      {showReq && (
        <CVAtomicBlock id="block-references-request">
          <p className="text-[11px] text-slate-500 italic text-left">References available upon request.</p>
        </CVAtomicBlock>
      )}
    </div>
  );
};

const CVFitnessBlock = ({ cv, accentColour }: { cv: CricketCVFull; accentColour: string }) => {
  if (!cv.fitnessActivities || cv.fitnessActivities.length === 0) return null;
  return (
    <div className="text-left">
      <CVSectionHeading id="heading-fitness">
        <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-3 text-slate-900">Fitness & Conditioning</h2>
      </CVSectionHeading>
      <CVAtomicBlock id="block-fitness">
        <div className="flex flex-wrap gap-1.5">
          {cv.fitnessActivities.map((act) => (
            <span key={act} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.75 rounded-md font-semibold border border-slate-200">
              {act}
            </span>
          ))}
        </div>
      </CVAtomicBlock>
    </div>
  );
};

const CVAchievementsBlock = ({ cv, accentColour }: { cv: CricketCVFull; accentColour: string }) => {
  if (!cv.achievements || cv.achievements.length === 0) return null;
  return (
    <div>
      <CVSectionHeading id="heading-achievements">
        <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-3 text-slate-900">Achievements & Awards</h2>
      </CVSectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
        {cv.achievements.map((ach, aIdx) => (
          <CVAtomicBlock key={ach.id || aIdx} id={`block-achievement-${aIdx}`}>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 h-full">
              <div className="flex justify-between items-start text-xs font-bold text-slate-900 mb-1 text-left">
                <span>{ach.title}</span>
                <span className="text-slate-500 font-normal shrink-0">{ach.year}</span>
              </div>
              <div className="text-[10px] text-slate-650 mb-1 text-left">
                {ach.teamEvent}{ach.opponentTeam ? ` vs ${ach.opponentTeam}` : ''}
              </div>
              {ach.description && <p className="text-[10px] text-slate-550 whitespace-pre-line text-left">{ach.description}</p>}
            </div>
          </CVAtomicBlock>
        ))}
      </div>
    </div>
  );
};

const CVCareerHighlightsBlock = ({ cv, accentColour }: { cv: CricketCVFull; accentColour: string }) => {
  if (!cv.careerHighlights || cv.careerHighlights.length === 0) return null;

  const sortedHighlights = [...cv.careerHighlights].sort((a, b) => {
    return (parseInt(b.year, 10) || 0) - (parseInt(a.year, 10) || 0);
  });

  const formatHighlightText = (hl: any) => {
    let prefix = '';
    if (hl.achievement === 'Scored a Match-Winning 100') prefix = 'Match-Winning 100';
    else if (hl.achievement === 'Scored a Match-Winning 50') prefix = 'Match-Winning 50';
    else if (hl.achievement === 'Took a Match-Winning 5-Wicket Haul') prefix = 'Match-Winning 5-Wicket Haul';
    else if (hl.achievement === 'Took 10 Wickets in a Match') prefix = '10-Wicket Match';
    else prefix = hl.achievement;

    return `${prefix} vs ${hl.opponent} — ${hl.tournament}, ${hl.year}`;
  };

  return (
    <div>
      <CVSectionHeading id="heading-highlights">
        <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-3 text-slate-900">Career Highlights</h2>
      </CVSectionHeading>
      <div className="space-y-1.5 text-left">
        {sortedHighlights.map((hl, hIdx) => (
          <CVAtomicBlock key={hl.id || hIdx} id={`block-highlight-${hl.id}`}>
            <div className="text-xs text-slate-750 font-medium py-1 border-b border-dashed border-slate-100 last:border-0 flex items-start gap-2 text-left">
              <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: accentColour }} />
              <span className="text-slate-800">{formatHighlightText(hl)}</span>
            </div>
          </CVAtomicBlock>
        ))}
      </div>
    </div>
  );
};

const CVFormatStatisticsBlock = ({ cv, accentColour }: { cv: CricketCVFull; accentColour: string }) => {
  const formats = [
    { key: 'oneDayStats', label: 'ONE DAY' },
    { key: 'multiDayStats', label: 'MULTI-DAY' },
    { key: 't20Stats', label: 'T20' }
  ] as const;

  const activeFormats = formats.filter(f => {
    const stats = cv[f.key];
    return stats && stats.hasStats === true;
  });

  if (activeFormats.length === 0) return null;

  return (
    <div>
      <CVSectionHeading id="heading-stats">
        <h2 className="text-xs font-bold uppercase tracking-widest border-b pb-1 mb-3 text-slate-900">Career Statistics Summary</h2>
      </CVSectionHeading>
      <div className="space-y-4">
        {activeFormats.map(f => {
          const stats = cv[f.key]!;
          const batDismissals = Math.max(0, stats.batInnings - stats.batNotOuts);
          const batAverage = batDismissals > 0 ? (stats.batRuns / batDismissals).toFixed(2) : '-';
          const batStrikeRate = stats.batBallsFaced > 0 ? ((stats.batRuns / stats.batBallsFaced) * 100).toFixed(2) : '-';

          const bowlTotalBalls = (stats.bowlOvers * 6) + stats.bowlBalls;
          const bowlEconomy = bowlTotalBalls > 0 ? ((stats.bowlRunsConceded * 6) / bowlTotalBalls).toFixed(2) : '-';

          return (
            <CVAtomicBlock key={f.key} id={`block-stats-${f.key}`}>
              <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-3 text-left">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColour }} />
                  {f.label} PERFORMANCE
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[10px] text-slate-700 border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                        <th className="p-1.5">Matches</th>
                        <th className="p-1.5">Innings</th>
                        <th className="p-1.5">Runs</th>
                        <th className="p-1.5">Avg</th>
                        <th className="p-1.5">SR</th>
                        <th className="p-1.5">Wickets</th>
                        <th className="p-1.5">Econ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="font-medium text-slate-800">
                        <td className="p-1.5">{stats.batMatches}</td>
                        <td className="p-1.5">{stats.batInnings}</td>
                        <td className="p-1.5">{stats.batRuns}</td>
                        <td className="p-1.5">{batAverage}</td>
                        <td className="p-1.5">{batStrikeRate}</td>
                        <td className="p-1.5">{stats.bowlWickets}</td>
                        <td className="p-1.5">{bowlEconomy}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CVAtomicBlock>
          );
        })}
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
                {cv.playingRoleDetail || cv.playingRole || 'Cricket Professional'}
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
            <CVFormatStatisticsBlock cv={cv} accentColour={accentColour} />
            
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
                      <div className="flex justify-between items-start text-xs mb-0.5 text-left">
                        <span className="font-bold text-slate-900">{item.teamName}{item.country ? ` (${item.country})` : ''}</span>
                        <span className="text-slate-500 font-semibold shrink-0">{item.startYear} - {item.endYear || 'Present'}</span>
                      </div>
                      {(item.role || item.level) && (
                        <div className="text-[10px] text-slate-500 font-semibold mb-1 uppercase tracking-wide text-left">
                          {[
                            item.role ? `${item.role}${item.captaincy ? ' (Captain)' : ''}` : '',
                            item.level
                          ].filter(Boolean).join(' | ')}
                        </div>
                      )}
                      {item.description && (
                        <p className="text-xs text-slate-600 whitespace-pre-line text-left">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            <CVAchievementsBlock cv={cv} accentColour={accentColour} />
            <CVCareerHighlightsBlock cv={cv} accentColour={accentColour} />

            {/* Experience */}
            <CVExperienceBlock cv={cv} accentColour={accentColour} />

            {/* Education & Certs */}
            <CVEducationBlock cv={cv} />

            {/* Fitness & Conditioning */}
            <CVFitnessBlock cv={cv} accentColour={accentColour} />
          </div>
        </div>
      </div>
      
      {/* Footer / Branding */}
      <div className="mt-8 pt-4 border-t text-center text-[9px] text-slate-400 flex justify-between items-center">
        <span></span>
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
              <p className="text-xs font-bold text-gold-400 uppercase tracking-widest mt-1">{cv.playingRoleDetail || cv.playingRole || 'Professional Cricketer'}</p>
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
        <CVFormatStatisticsBlock cv={cv} accentColour={accentColour} />

        {/* Career Timeline */}
        {cv.careerHistory.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 border-b-2 pb-1" style={{ color: accentColour, borderColor: accentColour }}>Career History</h2>
            <div className="space-y-3">
              {cv.careerHistory.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start gap-4 text-xs text-left">
                  <div className="w-24 text-slate-500 font-bold shrink-0">{item.startYear} - {item.endYear || 'Present'}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-950">{item.teamName}{item.country ? ` (${item.country})` : ''}</h4>
                    {(item.role || item.level) && (
                      <p className="text-[10px] text-slate-500 uppercase font-semibold">
                        {[item.role, item.level].filter(Boolean).join(' • ')}
                      </p>
                    )}
                    {item.description && <p className="text-slate-650 mt-1">{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Highlights / Achievements */}
        <div className="mb-6">
          <CVAchievementsBlock cv={cv} accentColour={accentColour} />
          <CVCareerHighlightsBlock cv={cv} accentColour={accentColour} />
        </div>

        {/* Coaching / Professional Experience */}
        <div className="mb-6">
          <CVExperienceBlock cv={cv} accentColour={accentColour} />
        </div>

        {/* Education & Certifications */}
        <div className="mb-6">
          <CVEducationBlock cv={cv} />
        </div>

        {/* Fitness & Conditioning */}
        {cv.fitnessActivities && cv.fitnessActivities.length > 0 && (
          <div className="mb-6">
            <CVFitnessBlock cv={cv} accentColour={accentColour} />
          </div>
        )}

        {/* References */}
        <div className="mb-6">
          <CVReferencesBlock cv={cv} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t text-center text-[9px] text-slate-400 flex justify-between items-center">
        <span></span>
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
  const playingRole = cv?.playingRoleDetail || cv?.playingRole || '';
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
                    <div key={item.id || idx} className="bg-slate-50/50 p-3 rounded-lg border border-slate-100 text-left">
                      <div className="flex justify-between font-bold text-xs text-slate-900">
                        <span>{item.teamName}{item.country ? ` (${item.country})` : ''}</span>
                        <span style={{ color: accentColour }} className="shrink-0">{item.startYear} - {item.endYear || 'Present'}</span>
                      </div>
                      {(item.role || item.level) && (
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">
                          {[
                            item.role ? `${item.role}${item.captaincy ? ' (Captain)' : ''}` : '',
                            item.level ? `Level: ${item.level}` : ''
                          ].filter(Boolean).join(' | ')}
                        </div>
                      )}
                      {item.description && <p className="text-slate-600 text-xs mt-1.5">{item.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            <CVAchievementsBlock cv={cv} accentColour={accentColour} />
            <CVCareerHighlightsBlock cv={cv} accentColour={accentColour} />
            <CVFormatStatisticsBlock cv={cv} accentColour={accentColour} />

            {/* Experience (Coaching) */}
            <CVExperienceBlock cv={cv} accentColour={accentColour} />

            {/* References */}
            <CVReferencesBlock cv={cv} />
          </div>

          {/* Right sidebar info */}
          <div className="md:col-span-1 space-y-6">
            {/* Visa / Global Availability */}
            {(availability || overseasExperience || internationalExperience) && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h3 className="text-xs font-black uppercase tracking-wider mb-2 text-slate-950">Availability</h3>
                <div className="space-y-2 text-xs text-slate-700">
                  {availability && <div>Availability: <strong>{availability}</strong></div>}
                  {overseasExperience && <div>Overseas Exp: <strong>Yes</strong></div>}
                  {internationalExperience && <div>Intl Exp: <strong>Yes</strong></div>}
                </div>
              </div>
            )}

            {/* Education & Certs */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-wider mb-2 text-slate-950">Education & Certifications</h3>
              <CVEducationBlock cv={cv} />
            </div>

            {/* Fitness & Conditioning */}
            {cv.fitnessActivities && cv.fitnessActivities.length > 0 && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-left">
                <h3 className="text-xs font-black uppercase tracking-wider mb-2 text-slate-950">Fitness & Conditioning</h3>
                <div className="flex flex-wrap gap-1.5">
                  {cv.fitnessActivities.map((act) => (
                    <span key={act} className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.75 rounded-md font-semibold border border-slate-300">
                      {act}
                    </span>
                  ))}
                </div>
              </div>
            )}

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
        <span></span>
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
            <p className="text-xs font-bold tracking-widest text-slate-500 uppercase mt-1">{cv.playingRoleDetail || cv.playingRole || 'Cricket Professional'}</p>
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
          <CVFormatStatisticsBlock cv={cv} accentColour={accentColour} />

          {/* Career Table */}
          {cv.careerHistory.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-3">Playing Experience</h3>
              <div className="space-y-4">
                {cv.careerHistory.map((item, idx) => (
                  <div key={idx} className="text-xs text-left">
                    <div className="flex justify-between font-bold text-slate-950">
                      <span>{item.teamName}{item.role ? ` - ${item.role}` : ''}</span>
                      <span className="shrink-0">{item.startYear} - {item.endYear || 'Present'}</span>
                    </div>
                    {(item.country || item.level) && (
                      <div className="text-[10px] text-slate-500 italic mb-1">
                        {[item.country, item.level].filter(Boolean).join(' | ')}
                      </div>
                    )}
                    {item.description && <p className="text-slate-650 whitespace-pre-line">{item.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          <CVAchievementsBlock cv={cv} accentColour={accentColour} />
          <CVCareerHighlightsBlock cv={cv} accentColour={accentColour} />

          {/* Professional Coaching Experience */}
          <CVExperienceBlock cv={cv} accentColour={accentColour} />

          {/* Education & Certifications */}
          <CVEducationBlock cv={cv} />

          {/* Fitness & Conditioning */}
          <CVFitnessBlock cv={cv} accentColour={accentColour} />

          {/* References */}
          <CVReferencesBlock cv={cv} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t text-center text-[9px] text-slate-400 flex justify-between items-center">
        <span></span>
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
                {cv.playingRoleDetail || cv.playingRole || 'Cricket Athlete'}
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
        <CVFormatStatisticsBlock cv={cv} accentColour={accentColour} />

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
                <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex justify-between items-center gap-4 text-xs text-left">
                  <div>
                    <span className="font-bold text-slate-950">{item.teamName}</span>
                    {item.country && <span className="text-slate-500 text-[10px] ml-2">({item.country})</span>}
                    {(item.role || item.level) && (
                      <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                        {[item.role, item.level].filter(Boolean).join(' • ')}
                      </div>
                    )}
                  </div>
                  <div className="font-bold text-slate-600 shrink-0">{item.startYear} - {item.endYear || 'Present'}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Highlights */}
        <CVAchievementsBlock cv={cv} accentColour={accentColour} />
        <CVCareerHighlightsBlock cv={cv} accentColour={accentColour} />

        {/* Coaching / Professional Experience */}
        <div className="mb-6">
          <CVExperienceBlock cv={cv} accentColour={accentColour} />
        </div>

        {/* Education & Certs */}
        <div className="mb-6">
          <CVEducationBlock cv={cv} />
        </div>

        {/* Fitness & Conditioning */}
        {cv.fitnessActivities && cv.fitnessActivities.length > 0 && (
          <div className="mb-6">
            <CVFitnessBlock cv={cv} accentColour={accentColour} />
          </div>
        )}

        {/* References */}
        <div className="mb-6">
          <CVReferencesBlock cv={cv} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t text-center text-[9px] text-slate-400 flex justify-between items-center">
        <span></span>
        <span>The Cricket Advisor CV Builder</span>
      </div>
    </div>
  );
}

// ==========================================
// DESIGN 06: THE PRESTIGE
// ==========================================
export function PrestigeTemplate({ cv, accentColour, font, isPreview }: TemplateProps) {
  const fontStyle = { fontFamily: getFontFamily(font) };

  // Calculate Batting Average & Strike Rate safely
  const getBattingStats = (stats: any) => {
    if (!stats || stats.hasStats !== true) return { matches: 0, runs: 0, average: '-', strikeRate: '-', hundreds: 0, fifties: 0 };
    const matches = parseInt(stats.batMatches, 10) || 0;
    const innings = parseInt(stats.batInnings, 10) || 0;
    const runs = parseInt(stats.batRuns, 10) || 0;
    const notOuts = parseInt(stats.batNotOuts, 10) || 0;
    const ballsFaced = parseInt(stats.batBallsFaced, 10) || 0;
    const hundreds = parseInt(stats.batHundreds, 10) || 0;
    const fifties = parseInt(stats.batFifties, 10) || 0;

    const outs = innings - notOuts;
    const average = outs > 0 ? (runs / outs).toFixed(2) : runs > 0 ? runs.toFixed(2) : '-';
    const strikeRate = ballsFaced > 0 ? ((runs / ballsFaced) * 100).toFixed(2) : '-';

    return {
      matches,
      runs,
      average,
      strikeRate,
      hundreds,
      fifties
    };
  };

  const getBowlingStats = (stats: any) => {
    if (!stats || stats.hasStats !== true) return { matches: 0, wickets: 0, bowlingAverage: '-', economy: '-', bestWickets: 0, bestRuns: 0 };
    const matches = parseInt(stats.bowlMatches, 10) || 0;
    const wickets = parseInt(stats.bowlWickets, 10) || 0;
    const runsConceded = parseInt(stats.bowlRunsConceded, 10) || 0;
    const overs = parseInt(stats.bowlOvers, 10) || 0;
    const balls = parseInt(stats.bowlBalls, 10) || 0;
    const bestWickets = parseInt(stats.bowlBestWickets, 10) || 0;
    const bestRuns = parseInt(stats.bowlBestRuns, 10) || 0;

    const totalBalls = (overs * 6) + balls;
    const bowlingAverage = wickets > 0 ? (runsConceded / wickets).toFixed(2) : '-';
    const economy = totalBalls > 0 ? ((runsConceded * 6) / totalBalls).toFixed(2) : '-';

    return {
      matches,
      wickets,
      bowlingAverage,
      economy,
      bestWickets,
      bestRuns
    };
  };

  const getFieldingStats = (stats: any) => {
    if (!stats || stats.hasStats !== true) return { matches: 0, catches: 0, stumpings: 0 };
    const matches = parseInt(stats.batMatches || stats.bowlMatches, 10) || 0;
    const catches = parseInt(stats.fieldCatches, 10) || 0;
    const stumpings = parseInt(stats.fieldStumpings, 10) || 0;
    return {
      matches,
      catches,
      stumpings
    };
  };

  const odBat = getBattingStats(cv.oneDayStats);
  const mdBat = getBattingStats(cv.multiDayStats);
  const t20Bat = getBattingStats(cv.t20Stats);

  const odBowl = getBowlingStats(cv.oneDayStats);
  const mdBowl = getBowlingStats(cv.multiDayStats);
  const t20Bowl = getBowlingStats(cv.t20Stats);

  const odField = getFieldingStats(cv.oneDayStats);
  const mdField = getFieldingStats(cv.multiDayStats);
  const t20Field = getFieldingStats(cv.t20Stats);

  const hasBattingStats = (cv.oneDayStats?.hasStats && cv.oneDayStats.batMatches > 0) ||
                          (cv.multiDayStats?.hasStats && cv.multiDayStats.batMatches > 0) ||
                          (cv.t20Stats?.hasStats && cv.t20Stats.batMatches > 0);

  const hasBowlingStats = (cv.oneDayStats?.hasStats && cv.oneDayStats.bowlMatches > 0) ||
                          (cv.multiDayStats?.hasStats && cv.multiDayStats.bowlMatches > 0) ||
                          (cv.t20Stats?.hasStats && cv.t20Stats.bowlMatches > 0);

  const hasFieldingStats = (cv.oneDayStats?.hasStats && cv.oneDayStats.fieldCatches > 0) ||
                           (cv.multiDayStats?.hasStats && cv.multiDayStats.fieldCatches > 0) ||
                           (cv.t20Stats?.hasStats && cv.t20Stats.fieldCatches > 0);

  return (
    <div 
      className="w-full flex text-left relative overflow-hidden" 
      style={{ ...fontStyle, height: '100%', minHeight: '100%', background: 'var(--cream)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .template-prestige {
          --navy: #152238;
          --navy-2: #1c2f4d;
          --gold: ${accentColour};
          --gold-light: ${accentColour}d0;
          --cream: #faf8f4;
          --line: #e4ddd0;
          --text-dark: #1c2430;
          --text-light: #cfd6e4;
        }

        .template-prestige .sidebar {
          width: 33%;
          background: linear-gradient(180deg, var(--navy) 0%, var(--navy-2) 100%) !important;
          color: var(--text-light) !important;
          padding: 34px 20px 34px 34px !important;
          position: relative;
          height: calc(100% + 68px) !important;
          margin-top: -34px !important;
          margin-bottom: -34px !important;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .template-prestige .photo-wrap {
          width: 100%;
          aspect-ratio: 3/3.4;
          background: #0f1a2c;
          position: relative;
          overflow: hidden;
          border-bottom: 5px solid var(--gold);
        }
        .template-prestige .photo-wrap img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .template-prestige .photo-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          color: #5c6a85; font-size: 14px; text-align: center; flex-direction: column; gap: 10px;
        }
        .template-prestige .photo-placeholder svg { width: 70px; height: 70px; opacity: .5; }

        .template-prestige .side-section {
          padding: 12px 14px;
          border: 1.5px solid var(--cream);
          border-radius: 2px;
          margin-bottom: 12px;
        }

        .template-prestige .side-heading {
          color: #ffffff !important;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          border-bottom: 2px solid var(--gold);
          padding-bottom: 6px;
          margin-bottom: 12px;
        }

        .template-prestige .contact-list { list-style: none; display: flex; flex-direction: column; gap: 10px; font-size: 12px; }
        .template-prestige .contact-list li { display: flex; gap: 10px; align-items: flex-start; }
        .template-prestige .contact-list .ico { flex: 0 0 16px; color: var(--gold); font-size: 13px; }

        .template-prestige .profile-text { font-size: 11px; line-height: 1.6; color: var(--text-light); }

        .template-prestige .skills-list { list-style: none; font-size: 12px; display: flex; flex-direction: column; gap: 7px; }
        .template-prestige .skills-list li { display: flex; gap: 8px; align-items: flex-start; }
        .template-prestige .skills-list li::before {
          content: '';
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--gold);
          margin-top: 5px; flex: 0 0 6px;
        }

        .template-prestige .stat-table {
          width: 100% !important;
          border-collapse: collapse !important;
          font-size: 8.5px !important;
          margin-bottom: 12px !important;
          border: 1.5px solid rgba(250,248,244,0.3) !important;
          table-layout: fixed !important;
        }
        .template-prestige .stat-table caption {
          text-align: left;
          font-weight: 700;
          color: #ffffff !important;
          font-size: 11px;
          margin-bottom: 4px;
          letter-spacing: .04em;
          text-transform: uppercase;
        }
        .template-prestige .stat-table th {
          background: rgba(255,255,255,.08);
          color: #ffffff !important;
          font-weight: 700;
          padding: 4px 3px;
          text-align: left;
          border-bottom: 1.5px solid rgba(250,248,244,0.3);
        }
        .template-prestige .stat-table td {
          padding: 4px 3px;
          color: var(--text-light);
          border-bottom: 1px solid rgba(250,248,244,0.15);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .template-prestige .main {
          width: 67%;
          padding: 0px 40px 0px 34px !important;
          position: relative;
          height: 100%;
          box-sizing: border-box;
          background: var(--cream);
          color: var(--text-dark);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .template-prestige .header-block {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 18px 20px;
          border: 1.5px solid #000;
          border-radius: 2px;
          margin-bottom: 12px;
        }
        .template-prestige .name-block h1 {
          font-size: 32px;
          letter-spacing: .02em;
          color: var(--navy);
          font-weight: 800;
        }
        .template-prestige .name-block .role {
          color: var(--gold);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          margin-top: 4px;
        }
        .template-prestige .meta-row {
          display: flex; flex-wrap: wrap; gap: 14px;
          margin-top: 12px; font-size: 11px; color: #4b5568;
        }
        .template-prestige .meta-row span { display: flex; align-items: center; gap: 6px; }
        .template-prestige .meta-row .ico { color: var(--navy); font-size: 12px; }

        .template-prestige .section {
          border: 1.5px solid #000;
          border-radius: 2px;
          padding: 16px 18px;
          margin-bottom: 16px;
        }
        .template-prestige .section-title {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 12px;
        }
        .template-prestige .badge {
          width: 28px; height: 28px; border-radius: 50%;
          background: var(--navy);
          display: flex; align-items: center; justify-content: center;
          color: var(--gold); font-size: 13px; flex-shrink: 0;
        }
        .template-prestige .section-title h2 {
          font-size: 15px; letter-spacing: .03em; color: var(--navy);
          text-transform: uppercase; font-weight: 800;
          border-bottom: 2px solid var(--line);
          flex: 1; padding-bottom: 6px;
        }

        .template-prestige .bullet-list { list-style: none; display: flex; flex-direction: column; gap: 8px; padding-left: 2px; }
        .template-prestige .bullet-list li {
          font-size: 12.5px; color: var(--text-dark); line-height: 1.5;
          display: flex; gap: 10px; align-items: flex-start;
        }
        .template-prestige .bullet-list li::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background: var(--gold); margin-top: 6px; flex: 0 0 6px;
        }

        .template-prestige .timeline { display: flex; flex-direction: column; gap: 8px; }
        .template-prestige .timeline-entry {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 16px;
          padding: 8px 0;
          border-bottom: 1px dashed var(--line);
          font-size: 12.5px;
        }
        .template-prestige .timeline-entry:last-child { border-bottom: none; }
        .template-prestige .timeline-entry .years { color: #5b6577; font-weight: 600; }
        .template-prestige .timeline-entry .team { font-weight: 700; color: var(--navy); }
        .template-prestige .timeline-entry .role { color: #6b7280; font-size: 11.5px; margin-top: 2px; }

        .template-prestige .edu-block .degree { font-weight: 700; color: var(--navy); font-size: 13px; }
        .template-prestige .edu-block .school-row {
          display: flex; justify-content: space-between; font-size: 12px; color: #5b6577; margin-top: 3px;
        }

        .template-prestige .personal-grid {
          display: grid; grid-template-columns: 120px 1fr; row-gap: 8px; font-size: 12.5px;
        }
        .template-prestige .personal-grid dt { color: #5b6577; }
        .template-prestige .personal-grid dd { color: var(--text-dark); font-weight: 600; }

        .template-prestige .references-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
        }
        .template-prestige .ref-card {
          font-size: 12px; line-height: 1.6;
        }
        .template-prestige .ref-card .rname { font-weight: 700; color: var(--navy); }
        .template-prestige .ref-card .rorg { color: #5b6577; }
      ` }} />

      {/* ============ SIDEBAR ============ */}
      <CVColumn type="left" className="sidebar">
        {cv.profilePhoto && (
          <CVAtomicBlock id="side-photo" className="photo-wrap shrink-0">
            <img src={cv.profilePhoto} alt={`${cv.firstName} ${cv.lastName}`} />
          </CVAtomicBlock>
        )}

        {(cv.phone || cv.email || cv.currentCity || cv.countryOfResidence || cv.instagram || cv.linkedin) && (
          <CVAtomicBlock id="side-contact" className="side-section">
            <div className="side-heading">Contact</div>
            <ul className="contact-list">
              {cv.phone && <li><span className="ico">&#9742;</span><span>{cv.phone}</span></li>}
              {cv.email && <li><span className="ico">&#9993;</span><span>{cv.email}</span></li>}
              {(cv.currentCity || cv.countryOfResidence) && (
                <li>
                  <span className="ico">&#128205;</span>
                  <span>{[cv.currentCity, cv.countryOfResidence].filter(Boolean).join(', ')}</span>
                </li>
              )}
              {cv.instagram && <li><span className="ico">&#128247;</span><span>{cv.instagram}</span></li>}
              {cv.linkedin && <li><span className="ico">in</span><span>{cv.linkedin}</span></li>}
            </ul>
          </CVAtomicBlock>
        )}

        {cv.aboutPlayer && (
          <CVAtomicBlock id="side-profile" className="side-section">
            <div className="side-heading">Profile</div>
            <p className="profile-text whitespace-pre-line">{cv.aboutPlayer}</p>
          </CVAtomicBlock>
        )}

        {(cv.playingRole || cv.battingStyle || cv.bowlingStyle || cv.throwingArm || cv.currentClub || cv.availability) && (
          <CVAtomicBlock id="side-skills" className="side-section">
            <div className="side-heading">Skills</div>
            <ul className="skills-list">
              {cv.playingRole && <li>{cv.playingRoleDetail || cv.playingRole}</li>}
              {cv.battingStyle && <li>{cv.battingStyle} Hand Bat</li>}
              {cv.bowlingStyle && <li>{cv.bowlingStyle}</li>}
              {cv.throwingArm && <li>{cv.throwingArm} Arm Throw</li>}
              {cv.currentClub && <li>Club: {cv.currentClub}</li>}
              {cv.availability && <li>Availability: {cv.availability}</li>}
            </ul>
          </CVAtomicBlock>
        )}

        {/* Career Stats Tables */}
        {(hasBattingStats || hasBowlingStats || hasFieldingStats) && (
          <div className="side-section">
            <div className="side-heading">Career Stats</div>

            {hasBattingStats && (
              <CVAtomicBlock id="side-stats-batting">
                <table className="stat-table">
                  <colgroup>
                    <col style={{ width: '22%' }} />
                    <col style={{ width: '8%' }} />
                    <col style={{ width: '14%' }} />
                    <col style={{ width: '14%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '27%' }} />
                  </colgroup>
                  <caption>Batting</caption>
                  <thead>
                    <tr><th>Format</th><th>M</th><th>Runs</th><th>Avg</th><th>SR</th><th>100/50</th></tr>
                  </thead>
                  <tbody>
                    {mdBat.matches > 0 && (
                      <tr><td>Multi-Day</td><td>{mdBat.matches}</td><td>{mdBat.runs}</td><td>{mdBat.average}</td><td>{mdBat.strikeRate}</td><td>{mdBat.hundreds}/{mdBat.fifties}</td></tr>
                    )}
                    {odBat.matches > 0 && (
                      <tr><td>One Day</td><td>{odBat.matches}</td><td>{odBat.runs}</td><td>{odBat.average}</td><td>{odBat.strikeRate}</td><td>{odBat.hundreds}/{odBat.fifties}</td></tr>
                    )}
                    {t20Bat.matches > 0 && (
                      <tr><td>T20</td><td>{t20Bat.matches}</td><td>{t20Bat.runs}</td><td>{t20Bat.average}</td><td>{t20Bat.strikeRate}</td><td>{t20Bat.hundreds}/{t20Bat.fifties}</td></tr>
                    )}
                  </tbody>
                </table>
              </CVAtomicBlock>
            )}

            {hasBowlingStats && (
              <CVAtomicBlock id="side-stats-bowling">
                <table className="stat-table">
                  <colgroup>
                    <col style={{ width: '22%' }} />
                    <col style={{ width: '8%' }} />
                    <col style={{ width: '14%' }} />
                    <col style={{ width: '14%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '27%' }} />
                  </colgroup>
                  <caption>Bowling</caption>
                  <thead>
                    <tr><th>Format</th><th>M</th><th>Wkts</th><th>Avg</th><th>Econ</th><th>BBI</th></tr>
                  </thead>
                  <tbody>
                    {mdBowl.matches > 0 && (
                      <tr><td>Multi-Day</td><td>{mdBowl.matches}</td><td>{mdBowl.wickets}</td><td>{mdBowl.bowlingAverage}</td><td>{mdBowl.economy}</td><td>{mdBowl.bestWickets}/{mdBowl.bestRuns}</td></tr>
                    )}
                    {odBowl.matches > 0 && (
                      <tr><td>One Day</td><td>{odBowl.matches}</td><td>{odBowl.wickets}</td><td>{odBowl.bowlingAverage}</td><td>{odBowl.economy}</td><td>{odBowl.bestWickets}/{odBowl.bestRuns}</td></tr>
                    )}
                    {t20Bowl.matches > 0 && (
                      <tr><td>T20</td><td>{t20Bowl.matches}</td><td>{t20Bowl.wickets}</td><td>{t20Bowl.bowlingAverage}</td><td>{t20Bowl.economy}</td><td>{t20Bowl.bestWickets}/{t20Bowl.bestRuns}</td></tr>
                    )}
                  </tbody>
                </table>
              </CVAtomicBlock>
            )}

            {hasFieldingStats && (
              <CVAtomicBlock id="side-stats-fielding">
                <table className="stat-table">
                  <colgroup>
                    <col style={{ width: '28%' }} />
                    <col style={{ width: '12%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '30%' }} />
                  </colgroup>
                  <caption>Fielding</caption>
                  <thead>
                    <tr><th>Format</th><th>M</th><th>Catches</th><th>Stump</th></tr>
                  </thead>
                  <tbody>
                    {mdField.matches > 0 && (
                      <tr><td>Multi-Day</td><td>{mdField.matches}</td><td>{mdField.catches}</td><td>{mdField.stumpings}</td></tr>
                    )}
                    {odField.matches > 0 && (
                      <tr><td>One Day</td><td>{odField.matches}</td><td>{odField.catches}</td><td>{odField.stumpings}</td></tr>
                    )}
                    {t20Field.matches > 0 && (
                      <tr><td>T20</td><td>{t20Field.matches}</td><td>{t20Field.catches}</td><td>{t20Field.stumpings}</td></tr>
                    )}
                  </tbody>
                </table>
              </CVAtomicBlock>
            )}
          </div>
        )}
      </CVColumn>

      {/* ============ MAIN ============ */}
      <CVColumn type="right" className="main">
        
        <CVAtomicBlock id="main-header" className="header-block">
          <div className="name-block">
            <h1>{cv.firstName} <span style={{ color: 'var(--gold)' }}>{cv.lastName}</span></h1>
            <div className="role">{cv.playingRoleDetail || cv.playingRole || 'Professional Cricket Player'}</div>
            <div className="meta-row">
              {cv.dateOfBirth && <span><span className="ico">&#128197;</span>{cv.dateOfBirth}</span>}
              {cv.height && <span><span className="ico">&#128207;</span>Height: {cv.height} cm</span>}
              {cv.battingStyle && <span><span className="ico">&#127951;</span>{cv.battingStyle} Bat</span>}
              {cv.bowlingStyle && <span><span className="ico">&#127951;</span>{cv.bowlingStyle}</span>}
            </div>
          </div>
        </CVAtomicBlock>

        {cv.careerHighlights && cv.careerHighlights.length > 0 && (
          <CVAtomicBlock id="main-section-highlights">
            <div className="section">
              <div className="section-title">
                <div className="badge">&#127942;</div>
                <h2>Career Highlights</h2>
              </div>
              <ul className="bullet-list">
                {cv.careerHighlights.map((hl, idx) => (
                  <li key={hl.id || idx}>
                    {hl.achievement === 'Scored a Match-Winning 100' ? 'Scored a Match-Winning 100' :
                     hl.achievement === 'Scored a Match-Winning 50' ? 'Scored a Match-Winning 50' :
                     hl.achievement === 'Took a Match-Winning 5-Wicket Haul' ? 'Took a Match-Winning 5-Wicket Haul' :
                     hl.achievement === 'Took 10 Wickets in a Match' ? 'Took 10 Wickets in a Match' : hl.achievement} 
                     {' '}vs {hl.opponent} — {hl.tournament}, {hl.year}
                  </li>
                ))}
              </ul>
            </div>
          </CVAtomicBlock>
        )}

        {cv.careerHistory && cv.careerHistory.length > 0 && (
          <CVAtomicBlock id="main-section-history">
            <div className="section">
              <div className="section-title">
                <div className="badge">&#128101;</div>
                <h2>Experience / Teams</h2>
              </div>
              <div className="timeline">
                {cv.careerHistory.map((item, idx) => (
                  <div key={idx} className="timeline-entry">
                    <div className="years">{item.startYear} &ndash; {item.endYear || 'Present'}</div>
                    <div>
                      <div className="team">{item.teamName}{item.country ? ` (${item.country})` : ''}</div>
                      <div className="role">{[item.role, item.level].filter(Boolean).join(' • ')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CVAtomicBlock>
        )}

        {cv.achievements && cv.achievements.length > 0 && (
          <CVAtomicBlock id="main-section-achievements">
            <div className="section">
              <div className="section-title">
                <div className="badge">&#11088;</div>
                <h2>Achievements</h2>
              </div>
              <ul className="bullet-list">
                {cv.achievements.map((ach, idx) => (
                  <li key={ach.id || idx}>
                    {ach.title} {ach.teamEvent ? `— ${ach.teamEvent}` : ''} {ach.opponentTeam ? `vs ${ach.opponentTeam}` : ''} ({ach.year})
                  </li>
                ))}
              </ul>
            </div>
          </CVAtomicBlock>
        )}

        {cv.fitnessActivities && cv.fitnessActivities.length > 0 && (
          <CVAtomicBlock id="main-section-fitness">
            <div className="section">
              <div className="section-title">
                <div className="badge">&#128170;</div>
                <h2>Fitness</h2>
              </div>
              <ul className="bullet-list">
                {cv.fitnessActivities.map((act, idx) => (
                  <li key={idx}>{act}</li>
                ))}
              </ul>
            </div>
          </CVAtomicBlock>
        )}

        {cv.education && cv.education.length > 0 && (
          <CVAtomicBlock id="main-section-education">
            <div className="section">
              <div className="section-title">
                <div className="badge">&#127891;</div>
                <h2>Education</h2>
              </div>
              <div className="space-y-3">
                {cv.education.map((edu, idx) => (
                  <div key={idx} className="edu-block">
                    <div className="degree">{edu.degree}</div>
                    <div className="school-row">
                      <span>{edu.school || 'Education'}</span>
                      <span>{edu.year || ''}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CVAtomicBlock>
        )}

        {(cv.dateOfBirth || cv.nationality || (cv.languages && cv.languages.length > 0) || (cv.hobbies && cv.hobbies.length > 0)) && (
          <CVAtomicBlock id="main-section-personal">
            <div className="section">
              <div className="section-title">
                <div className="badge">&#128100;</div>
                <h2>Personal Information</h2>
              </div>
              <dl className="personal-grid">
                {cv.dateOfBirth && (
                  <>
                    <dt>Date of Birth</dt>
                    <dd>{cv.dateOfBirth}</dd>
                  </>
                )}
                {cv.nationality && (
                  <>
                    <dt>Nationality</dt>
                    <dd>{cv.nationality}</dd>
                  </>
                )}
                {cv.languages && cv.languages.length > 0 && (
                  <>
                    <dt>Languages</dt>
                    <dd>{cv.languages.join(', ')}</dd>
                  </>
                )}
                {cv.hobbies && cv.hobbies.length > 0 && (
                  <>
                    <dt>Hobbies</dt>
                    <dd>{cv.hobbies.join(', ')}</dd>
                  </>
                )}
              </dl>
            </div>
          </CVAtomicBlock>
        )}

        {cv.showReferences === 'show' && cv.references && cv.references.length > 0 && (
          <CVAtomicBlock id="main-section-references">
            <div className="section">
              <div className="section-title">
                <div className="badge">&#128101;</div>
                <h2>References</h2>
              </div>
              <div className="references-grid">
                {cv.references.map((ref, idx) => (
                  <div key={ref.id || idx} className="ref-card">
                    <div className="rname">{ref.name}</div>
                    <div className="rorg">{ref.position} &mdash; {ref.organisation}</div>
                    {(ref.phone || ref.email) && (
                      <div className="text-slate-500 font-sans mt-0.5" style={{ fontSize: '10.5px' }}>
                        {ref.email} {ref.email && ref.phone ? '|' : ''} {ref.phone}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CVAtomicBlock>
        )}

      </CVColumn>
    </div>
  );
}

// Master Render Router Component
export default function CVTemplateRenderer({ cv, accentColour, font, isPreview, isCapture }: TemplateProps) {
  // Safeguard: Ensure all lists are arrays and default values are defined to prevent rendering crashes
  const safeCv = {
    ...cv,
    careerHistory: Array.isArray(cv?.careerHistory) ? cv.careerHistory : [],
    statistics: Array.isArray(cv?.statistics) ? cv.statistics : [],
    achievements: Array.isArray(cv?.achievements) ? cv.achievements : [],
    careerHighlights: Array.isArray(cv?.careerHighlights) ? cv.careerHighlights : [],
    experience: Array.isArray(cv?.experience) ? cv.experience : [],
    education: Array.isArray(cv?.education) ? cv.education : [],
    certifications: Array.isArray(cv?.certifications) ? cv.certifications : [],
    fitnessActivities: Array.isArray(cv?.fitnessActivities) ? cv.fitnessActivities : [],
    references: Array.isArray(cv?.references) ? cv.references : [],
    languages: Array.isArray(cv?.languages) ? cv.languages : [],
    hobbies: Array.isArray(cv?.hobbies) ? cv.hobbies : [],
  };

  const getTemplateComponent = (templateId: string) => {
    switch (templateId) {
      case 'professional': return ProfessionalTemplate;
      case 'international': return InternationalTemplate;
      case 'classic': return ClassicTemplate;
      case 'performance': return PerformanceTemplate;
      case 'prestige': return PrestigeTemplate;
      case 'executive':
      default: return ExecutiveTemplate;
    }
  };

  const SelectedTemplate = getTemplateComponent(safeCv.templateId);

  return (
    <CVPaginatedRenderer
      cv={safeCv}
      accentColour={accentColour}
      font={font}
      isPreview={isPreview}
      isCapture={isCapture}
      TemplateComponent={SelectedTemplate}
    />
  );
}
