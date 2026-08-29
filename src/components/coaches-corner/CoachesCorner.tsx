import React, { useState, useMemo } from "react";
import { X, Search, Trophy, ClipboardList, User, Award, Filter } from "lucide-react";
import { SubmissionData } from "../assessment/types";
import { CoachesCornerLogin } from "./CoachesCornerLogin";
import { ReportForm } from "./ReportForm";

interface CoachesCornerProps {
  onClose: () => void;
  skillsList: SubmissionData[];
}

export const CoachesCorner: React.FC<CoachesCornerProps> = ({ onClose, skillsList }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<SubmissionData | null>(null);
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState<"All" | "Online" | "Offline">("All");

  const paidCandidates = useMemo(() =>
    skillsList.filter(c => c.paymentDetails || c.testMode),
    [skillsList]
  );

  const filtered = useMemo(() => {
    return paidCandidates.filter(c => {
      const modeMatch = filterMode === "All" || c.testMode === filterMode;
      const q = search.toLowerCase();
      const nameMatch = `${c.firstName} ${c.lastName}`.toLowerCase().includes(q);
      const idMatch = c.id.toLowerCase().includes(q);
      return modeMatch && (nameMatch || idMatch || q === "");
    });
  }, [paidCandidates, search, filterMode]);

  const onlineCount = paidCandidates.filter(c => c.testMode === "Online").length;
  const offlineCount = paidCandidates.filter(c => c.testMode === "Offline").length;

  if (!loggedIn) {
    return <CoachesCornerLogin onLogin={() => setLoggedIn(true)} onBack={onClose} />;
  }

  if (selectedCandidate) {
    return <ReportForm candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />;
  }

  return (
    <div className="fixed inset-0 z-[9990] bg-gradient-to-br from-[#0B1A30] via-[#0f2440] to-[#0B1A30] flex flex-col overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 40px)", backgroundSize: "40px 40px" }}
      />

      {/* Header */}
      <div className="relative flex-shrink-0 bg-black/30 backdrop-blur-sm border-b border-white/10 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg text-2xl flex-shrink-0">
            🏏
          </div>
          <div>
            <p className="text-amber-400 text-[10px] uppercase tracking-[0.2em] font-bold">The Cricket Advisor</p>
            <h1 className="text-xl font-black text-white">Coaches Corner</h1>
            <p className="text-slate-400 text-xs">Assessment Report Generator</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Stats badges */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="px-3 py-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold rounded-full">
              🟢 {onlineCount} Online
            </span>
            <span className="px-3 py-1.5 bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold rounded-full">
              🟠 {offlineCount} Offline
            </span>
            <span className="px-3 py-1.5 bg-white/10 border border-white/20 text-white text-xs font-bold rounded-full">
              {paidCandidates.length} Total
            </span>
          </div>
          <button onClick={onClose} className="p-2.5 rounded-xl bg-white/10 hover:bg-red-500/30 text-white hover:text-red-300 transition cursor-pointer border border-white/10">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Sub-header: search + filter */}
      <div className="relative flex-shrink-0 px-6 py-4 bg-black/20 border-b border-white/10 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by candidate name or registration ID..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition"
          />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Filter size={14} className="text-slate-400" />
          {(["All", "Online", "Offline"] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                filterMode === mode
                  ? mode === "Online"
                    ? "bg-emerald-500 border-emerald-400 text-white"
                    : mode === "Offline"
                    ? "bg-amber-500 border-amber-400 text-white"
                    : "bg-white border-white text-[#0B1A30]"
                  : "bg-white/10 border-white/20 text-slate-300 hover:bg-white/20"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Candidate List */}
      <div className="relative flex-1 overflow-y-auto p-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center space-y-3">
            <ClipboardList size={40} className="text-slate-600" />
            <p className="text-slate-400 font-semibold">
              {paidCandidates.length === 0
                ? "No paid candidates found. Candidates who complete payment will appear here."
                : "No candidates match your search."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto">
            {filtered.map(candidate => {
              const isOnline = candidate.testMode === "Online";
              return (
                <div
                  key={candidate.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-amber-400/30 transition group"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${isOnline ? "bg-emerald-500/20" : "bg-amber-500/20"}`}>
                        <User size={18} className={isOnline ? "text-emerald-400" : "text-amber-400"} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-white font-black text-sm truncate">
                          {candidate.firstName} {candidate.lastName}
                        </h3>
                        <p className="text-slate-400 text-[11px] font-mono">{candidate.id}</p>
                      </div>
                    </div>
                    <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${
                      isOnline ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-amber-500/20 border-amber-400/40 text-amber-300"
                    }`}>
                      {isOnline ? "🟢" : "🟠"} {candidate.testMode}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    {[
                      ["Role", candidate.playingRole],
                      ["Specialty", candidate.subRole],
                      ["Age", candidate.age],
                      ["Nationality", candidate.nationality],
                      ["Email", candidate.email],
                      ["Mobile", `${candidate.mobileCountryCode} ${candidate.mobileNumber}`],
                    ].map(([label, val]) => (
                      <div key={label} className="bg-white/5 rounded-lg px-3 py-2">
                        <span className="block text-slate-500 text-[9px] uppercase tracking-wider font-bold">{label}</span>
                        <span className="block text-slate-200 font-semibold truncate mt-0.5">{val || "—"}</span>
                      </div>
                    ))}
                  </div>

                  {candidate.paymentDetails && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">✓ Paid</span>
                      <span className="text-slate-500 text-[10px]">•</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        ₹{candidate.paymentDetails.amount?.toLocaleString("en-IN")} INR
                      </span>
                      <span className="text-slate-500 text-[10px]">•</span>
                      <span className="text-[10px] text-slate-400">{candidate.paymentDetails.paidAt || candidate.submittedAt}</span>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedCandidate(candidate)}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0B1A30] font-extrabold rounded-xl transition text-xs uppercase tracking-wider shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Award size={14} />
                    📋 Create Report
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="relative flex-shrink-0 bg-black/30 border-t border-white/10 px-6 py-3 text-center">
        <p className="text-slate-500 text-[10px]">
          © The Cricket Advisor – Coaches Corner | Showing {filtered.length} of {paidCandidates.length} paid candidates
        </p>
      </div>
    </div>
  );
};
