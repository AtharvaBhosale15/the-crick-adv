import React, { useState, useRef } from "react";
import { X, Download, ChevronDown, ChevronUp, Trophy, Star, Loader2, MessageSquare } from "lucide-react";
import { ONLINE_CATEGORIES, initialScores, ScoresMap, categoryAverage, grandAverage, CategoryGroup } from "./OnlineReportCategories";
import { SubmissionData } from "../assessment/types";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import logoImg from "../../assets/images/the_cricket_advisor_logo.png";

interface ReportFormProps {
  candidate: SubmissionData;
  onClose: () => void;
}

const SCORE_LABELS: Record<number, string> = {
  1: "1 – Poor", 2: "2 – Below Average", 3: "3 – Weak", 4: "4 – Below Par",
  5: "5 – Average", 6: "6 – Satisfactory", 7: "7 – Good",
  8: "8 – Very Good", 9: "9 – Excellent", 10: "10 – Outstanding",
};

function scoreColor(v: number): string {
  if (v === 0) return "bg-slate-100 text-slate-400";
  if (v <= 4) return "bg-red-100 text-red-700";
  if (v <= 7) return "bg-amber-100 text-amber-800";
  return "bg-emerald-100 text-emerald-700";
}

function ScoreBar({ value }: { value: number }) {
  const pct = value > 0 ? (value / 10) * 100 : 0;
  const barColor = value === 0 ? "bg-slate-200" : value <= 4 ? "bg-red-400" : value <= 7 ? "bg-amber-400" : "bg-emerald-500";
  return (
    <div className="w-full bg-slate-100 rounded-full h-2 mt-1.5 overflow-hidden">
      <div className={`h-2 rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

interface SectionCardProps {
  group: CategoryGroup;
  scores: ScoresMap;
  comments: Record<string, string>;
  onChange: (key: string, val: number) => void;
  onComment: (groupKey: string, val: string) => void;
}

function SectionCard({ group, scores, comments, onChange, onComment }: SectionCardProps) {
  const [open, setOpen] = useState(true);
  const avg = categoryAverage(group, scores);

  return (
    <div className={`rounded-2xl border-2 ${group.color} overflow-hidden shadow-sm`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-5 py-4 ${group.bgColor} cursor-pointer`}
      >
        <div className="flex items-center gap-3">
          <span className={`text-base font-black uppercase tracking-wider ${group.textColor}`}>{group.label}</span>
          {avg > 0 && (
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${group.textColor} border-current bg-white/60`}>
              Avg: {avg} / 10
            </span>
          )}
        </div>
        {open ? <ChevronUp size={18} className="text-slate-500" /> : <ChevronDown size={18} className="text-slate-500" />}
      </button>

      {open && (
        <div className="bg-white p-5 space-y-4">
          {group.subCategories.map(sub => {
            const v = scores[sub.key] || 0;
            return (
              <div key={sub.key}>
                <div className="flex items-center justify-between gap-3">
                  <label className="text-sm font-semibold text-slate-800 flex-1">{sub.label}</label>
                  <select
                    value={v}
                    onChange={e => onChange(sub.key, Number(e.target.value))}
                    className={`text-xs font-bold px-3 py-2 rounded-xl border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400/30 cursor-pointer min-w-[170px] ${scoreColor(v)}`}
                  >
                    <option value={0}>-- Select Score --</option>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{SCORE_LABELS[n]}</option>
                    ))}
                  </select>
                </div>
                <ScoreBar value={v} />
              </div>
            );
          })}

          {/* Coach's Comments for this section */}
          <div className="pt-3 border-t border-slate-100">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              <MessageSquare size={12} /> Coach&apos;s Comments – {group.label}
            </label>
            <textarea
              rows={2}
              value={comments[group.key] || ""}
              onChange={e => onComment(group.key, e.target.value)}
              placeholder={`Optional coach notes for ${group.label}...`}
              className="w-full px-3 py-2 text-xs text-slate-700 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 resize-none bg-slate-50 placeholder-slate-400"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export const ReportForm: React.FC<ReportFormProps> = ({ candidate, onClose }) => {
  const [scores, setScores] = useState<ScoresMap>(initialScores());
  const [sectionComments, setSectionComments] = useState<Record<string, string>>({});
  const [overallRemarks, setOverallRemarks] = useState("");
  const [generating, setGenerating] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const grand = grandAverage(scores);
  const allFilled = Object.values(scores).every(v => v > 0);
  const isOffline = candidate.testMode === "Offline";

  const handleScore = (key: string, val: number) => {
    setScores(prev => ({ ...prev, [key]: val }));
  };

  const handleComment = (groupKey: string, val: string) => {
    setSectionComments(prev => ({ ...prev, [groupKey]: val }));
  };

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    setGenerating(true);
    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let yPos = 10;
      let remainingHeight = imgHeight;

      while (remainingHeight > 0) {
        if (yPos > 10) pdf.addPage();
        const pageHeight = pdfHeight - 20;
        const slice = Math.min(remainingHeight, pageHeight);
        pdf.addImage(imgData, "PNG", 10, yPos === 10 ? 10 : 10, imgWidth, imgHeight, undefined, "FAST");
        remainingHeight -= pageHeight;
        yPos = 10;
        if (remainingHeight > 0) {
          // Next page offset handled by addPage
        }
      }

      pdf.save(`CoachReport_${candidate.firstName}_${candidate.lastName}_${candidate.id}.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex flex-col overflow-hidden">
      {/* Sticky top bar */}
      <div className="bg-[#0B1A30] text-white px-6 py-4 flex items-center justify-between shadow-2xl flex-shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer">
            <X size={18} />
          </button>
          <div>
            <p className="text-xs text-amber-400 uppercase tracking-widest font-semibold">Creating Assessment Report</p>
            <h2 className="text-lg font-black">{candidate.firstName} {candidate.lastName}</h2>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-black uppercase border ${candidate.testMode === "Online" ? "bg-emerald-500/20 border-emerald-400 text-emerald-300" : "bg-amber-500/20 border-amber-400 text-amber-300"}`}>
            {candidate.testMode} Package
          </span>
        </div>
        <div className="flex items-center gap-4">
          {grand > 0 && (
            <div className="text-right">
              <p className="text-xs text-slate-400">Grand Score</p>
              <p className={`text-2xl font-black ${grand >= 8 ? "text-emerald-400" : grand >= 5 ? "text-amber-400" : "text-red-400"}`}>
                {grand} <span className="text-sm font-semibold text-slate-400">/ 10</span>
              </p>
            </div>
          )}
          <button
            onClick={handleDownloadPDF}
            disabled={!allFilled || generating}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-[#0B1A30] font-extrabold rounded-xl transition text-sm shadow-lg cursor-pointer"
          >
            {generating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {generating ? "Generating..." : "Download Report PDF"}
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto bg-slate-100 p-6">
        {!allFilled && (
          <div className="max-w-3xl mx-auto mb-4 bg-amber-50 border-2 border-amber-300 rounded-xl px-4 py-3 text-amber-800 text-sm font-semibold flex items-center gap-2">
            <Star size={16} className="text-amber-500" />
            All categories must be scored before you can download the report.
          </div>
        )}

        {isOffline ? (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-10 text-center space-y-4 border-2 border-dashed border-amber-300">
            <div className="text-5xl">🚧</div>
            <h3 className="text-xl font-black text-slate-800">Offline Assessment Categories Coming Soon</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Offline assessment scoring categories are currently being finalised. Please check back once they are added.
            </p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-5">
            {/* Candidate Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Candidate Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 text-sm">
                {[
                  ["Full Name", `${candidate.firstName} ${candidate.lastName}`],
                  ["Registration ID", candidate.id],
                  ["Package", candidate.testMode],
                  ["Playing Role", candidate.playingRole],
                  ["Specialty", candidate.subRole],
                  ["Age", candidate.age],
                  ["Nationality", candidate.nationality],
                  ["Country of Residence", candidate.countryOfResidence],
                  ["Email", candidate.email],
                  ["Mobile", `${candidate.mobileCountryCode} ${candidate.mobileNumber}`],
                  ["Assessment Date", today],
                  ["Submitted At", candidate.submittedAt],
                ].map(([label, val]) => (
                  <div key={label}>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">{label}</span>
                    <span className="block text-slate-800 font-semibold mt-0.5 break-words">{val || "–"}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scoring Sections */}
            {ONLINE_CATEGORIES.map(group => (
              <SectionCard
                key={group.key}
                group={group}
                scores={scores}
                comments={sectionComments}
                onChange={handleScore}
                onComment={handleComment}
              />
            ))}

            {/* Overall Remarks */}
            <div className="bg-white rounded-2xl shadow-sm border-2 border-[#0B1A30] p-5 space-y-3">
              <label className="flex items-center gap-2 text-sm font-black text-[#0B1A30] uppercase tracking-wider">
                <Trophy size={16} className="text-amber-500" /> Overall Coach Remarks
              </label>
              <textarea
                rows={4}
                value={overallRemarks}
                onChange={e => setOverallRemarks(e.target.value)}
                placeholder="Write your overall assessment remarks and recommendations for the candidate..."
                className="w-full px-4 py-3 text-sm text-slate-700 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 resize-none bg-slate-50 placeholder-slate-400"
              />
            </div>

            {/* Grand score summary */}
            {grand > 0 && (
              <div className="bg-gradient-to-br from-[#0B1A30] to-[#0f2a48] rounded-2xl p-6 text-center shadow-xl">
                <p className="text-amber-400 text-xs uppercase tracking-widest font-bold mb-2">Grand Overall Score</p>
                <p className={`text-6xl font-black ${grand >= 8 ? "text-emerald-400" : grand >= 5 ? "text-amber-400" : "text-red-400"}`}>
                  {grand}
                </p>
                <p className="text-slate-400 text-sm font-semibold mt-1">out of 10</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hidden Print Template for PDF */}
      {!isOffline && (
        <div className="absolute -top-[9999px] -left-[9999px] pointer-events-none">
          <div ref={printRef} style={{ width: "794px", backgroundColor: "#fff", padding: "40px", fontFamily: "Georgia, serif" }}>
            {/* Report Header */}
            <div style={{ textAlign: "center", borderBottom: "3px solid #0B1A30", paddingBottom: "20px", marginBottom: "24px" }}>
              <img src={logoImg} alt="TCA Logo" style={{ height: "64px", marginBottom: "10px" }} />
              <h1 style={{ fontSize: "20px", fontWeight: 900, color: "#0B1A30", margin: "0 0 4px 0" }}>Online Cricket Skills Certification Report</h1>
              <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>Issued by The Cricket Advisor – Certified Assessment Division</p>
              <p style={{ fontSize: "10px", color: "#94a3b8", marginTop: "6px" }}>Assessment Date: {today}</p>
            </div>

            {/* Candidate Details */}
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Candidate Information</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                {[
                  ["Full Name", `${candidate.firstName} ${candidate.lastName}`],
                  ["Registration ID", candidate.id],
                  ["Package Type", candidate.testMode],
                  ["Playing Role", candidate.playingRole],
                  ["Specialty", candidate.subRole],
                  ["Age", candidate.age],
                  ["Nationality", candidate.nationality],
                  ["Country of Residence", candidate.countryOfResidence],
                  ["Email", candidate.email],
                ].map(([l, v]) => (
                  <div key={l}>
                    <div style={{ fontSize: "9px", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>{l}</div>
                    <div style={{ fontSize: "11px", color: "#1e293b", fontWeight: 600 }}>{v || "–"}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Score Tables per category */}
            {ONLINE_CATEGORIES.map(group => {
              const avg = categoryAverage(group, scores);
              return (
                <div key={group.key} style={{ marginBottom: "20px", borderRadius: "8px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
                  <div style={{ background: "#0B1A30", color: "#fff", padding: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 900, fontSize: "13px", textTransform: "uppercase" }}>{group.label}</span>
                    {avg > 0 && <span style={{ fontSize: "11px", color: "#fbbf24" }}>Section Average: {avg} / 10</span>}
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f8fafc" }}>
                        <th style={{ padding: "6px 12px", fontSize: "10px", textAlign: "left", color: "#64748b", fontWeight: 700 }}>Category</th>
                        <th style={{ padding: "6px 12px", fontSize: "10px", textAlign: "center", color: "#64748b", fontWeight: 700, width: "100px" }}>Score</th>
                        <th style={{ padding: "6px 12px", fontSize: "10px", textAlign: "left", color: "#64748b", fontWeight: 700 }}>Rating Bar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.subCategories.map((sub, i) => {
                        const v = scores[sub.key] || 0;
                        const barColor = v === 0 ? "#e2e8f0" : v <= 4 ? "#f87171" : v <= 7 ? "#fbbf24" : "#34d399";
                        return (
                          <tr key={sub.key} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc", borderTop: "1px solid #f1f5f9" }}>
                            <td style={{ padding: "7px 12px", fontSize: "11px", color: "#334155" }}>{sub.label}</td>
                            <td style={{ padding: "7px 12px", textAlign: "center", fontSize: "13px", fontWeight: 900, color: v <= 4 ? "#ef4444" : v <= 7 ? "#d97706" : "#10b981" }}>{v > 0 ? `${v} / 10` : "—"}</td>
                            <td style={{ padding: "7px 12px" }}>
                              <div style={{ background: "#e2e8f0", borderRadius: "4px", height: "8px", overflow: "hidden" }}>
                                <div style={{ width: `${v * 10}%`, height: "8px", background: barColor, borderRadius: "4px" }} />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {sectionComments[group.key] && (
                    <div style={{ background: "#fffbeb", padding: "8px 16px", borderTop: "1px solid #fde68a", fontSize: "10px", color: "#78350f" }}>
                      <strong>Coach Notes:</strong> {sectionComments[group.key]}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Grand Score */}
            <div style={{ background: "#0B1A30", borderRadius: "12px", padding: "20px", textAlign: "center", marginBottom: "20px" }}>
              <p style={{ color: "#fbbf24", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 6px 0" }}>Grand Overall Score</p>
              <p style={{ color: grand >= 8 ? "#34d399" : grand >= 5 ? "#fbbf24" : "#f87171", fontSize: "48px", fontWeight: 900, margin: 0 }}>{grand > 0 ? `${grand} / 10` : "—"}</p>
            </div>

            {/* Overall Remarks */}
            {overallRemarks && (
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px", marginBottom: "20px" }}>
                <h3 style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "#64748b", marginBottom: "8px" }}>Overall Coach Remarks</h3>
                <p style={{ fontSize: "12px", color: "#334155", lineHeight: 1.7 }}>{overallRemarks}</p>
              </div>
            )}

            {/* Footer */}
            <div style={{ borderTop: "2px solid #e2e8f0", paddingTop: "16px", textAlign: "center" }}>
              <p style={{ fontSize: "10px", color: "#94a3b8", marginBottom: "4px" }}>
                This report has been generated based on assessment conducted by BCCI Level 3 & ECB Level 1 certified coaches of The Cricket Advisor.
              </p>
              <p style={{ fontSize: "10px", color: "#94a3b8" }}>
                © The Cricket Advisor | www.thecricketadvisor.com | Confidential Assessment Report | {today}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
