// Online Cricket Skills Certification - Assessment Categories

export interface SubCategory {
  key: string;
  label: string;
}

export interface CategoryGroup {
  key: string;
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
  subCategories: SubCategory[];
}

export const ONLINE_CATEGORIES: CategoryGroup[] = [
  {
    key: "batting",
    label: "Batting",
    color: "border-emerald-500",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-800",
    subCategories: [
      { key: "batting_technique", label: "Batting Technique" },
      { key: "footwork_balance", label: "Footwork & Balance" },
      { key: "timing", label: "Timing" },
      { key: "shot_selection", label: "Shot Selection" },
      { key: "shot_execution", label: "Shot Execution" },
      { key: "head_position_stability", label: "Head Position & Stability" },
      { key: "bat_speed_followthrough", label: "Bat Speed & Follow-through" },
      { key: "consistency_batting", label: "Consistency" },
    ],
  },
  {
    key: "bowling",
    label: "Bowling",
    color: "border-amber-500",
    bgColor: "bg-amber-50",
    textColor: "text-amber-800",
    subCategories: [
      { key: "bowling_action_mechanics", label: "Bowling Action & Mechanics" },
      { key: "runup_balance", label: "Run-up & Balance" },
      { key: "release_point", label: "Release Point" },
      { key: "accuracy_line_length", label: "Accuracy & Line/Length" },
      { key: "pace_spin", label: "Pace / Spin" },
      { key: "variation", label: "Variation" },
      { key: "control_consistency_bowling", label: "Control & Consistency" },
      { key: "followthrough", label: "Follow-through" },
    ],
  },
  {
    key: "fielding",
    label: "Fielding",
    color: "border-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-800",
    subCategories: [
      { key: "catching_technique", label: "Catching Technique" },
      { key: "ground_fielding", label: "Ground Fielding" },
      { key: "throwing_technique", label: "Throwing Technique" },
      { key: "throwing_accuracy", label: "Throwing Accuracy" },
      { key: "agility_movement", label: "Agility & Movement" },
      { key: "reaction_speed_fielding", label: "Reaction Speed" },
      { key: "footwork_positioning", label: "Footwork & Positioning" },
    ],
  },
  {
    key: "wicketkeeping",
    label: "Wicketkeeping (if applicable)",
    color: "border-purple-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-800",
    subCategories: [
      { key: "stance_positioning_wk", label: "Stance & Positioning" },
      { key: "glovework", label: "Glovework" },
      { key: "footwork_movement_wk", label: "Footwork & Movement" },
      { key: "catching_wk", label: "Catching" },
      { key: "stumping_technique", label: "Stumping Technique" },
      { key: "reaction_speed_wk", label: "Reaction Speed" },
    ],
  },
  {
    key: "overall",
    label: "Overall",
    color: "border-yellow-500",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-900",
    subCategories: [
      { key: "technical_execution", label: "Technical Execution" },
      { key: "skill_consistency", label: "Skill Consistency" },
      { key: "athletic_movement", label: "Athletic Movement" },
      { key: "overall_cricket_skill", label: "Overall Cricket Skill" },
      { key: "overall_performance_rating", label: "Overall Performance Rating" },
    ],
  },
];

export const ALL_ONLINE_KEYS: string[] = ONLINE_CATEGORIES.flatMap(g =>
  g.subCategories.map(s => s.key)
);

export type ScoresMap = Record<string, number>;

export const initialScores = (): ScoresMap =>
  Object.fromEntries(ALL_ONLINE_KEYS.map(k => [k, 0]));

export const categoryAverage = (group: CategoryGroup, scores: ScoresMap): number => {
  const filled = group.subCategories.filter(s => scores[s.key] > 0);
  if (filled.length === 0) return 0;
  const total = filled.reduce((acc, s) => acc + scores[s.key], 0);
  return Math.round((total / filled.length) * 10) / 10;
};

export const grandAverage = (scores: ScoresMap): number => {
  const filled = ALL_ONLINE_KEYS.filter(k => scores[k] > 0);
  if (filled.length === 0) return 0;
  const total = filled.reduce((acc, k) => acc + scores[k], 0);
  return Math.round((total / filled.length) * 10) / 10;
};
