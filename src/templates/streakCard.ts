import type { ContributionStreakStats } from "../services/github";
import type { Theme } from "../theme";

export function renderStreakCard(stats: ContributionStreakStats, theme: Theme): string {
  const streakTheme = {
    background: theme.background,
    border: theme.border,
    stroke: theme.border,
    ring: theme.accent,
    fire: theme.accent,
    currStreakNum: theme.text,
    sideNums: theme.text,
    currStreakLabel: theme.accent,
    sideLabels: theme.text,
    dates: theme.mutedText || theme.text,
  };
  const progress = Math.min(100, Math.max(8, stats.currentStreak * 8));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="495" height="195" viewBox="0 0 495 195" role="img" aria-label="GitHub streak stats for ${escapeHtml(
    stats.username
  )}">
  <style>
    .title{font:600 16px 'Segoe UI',Ubuntu,Sans-Serif;fill:${streakTheme.currStreakLabel}}
    .num{font:700 27px 'Segoe UI',Ubuntu,Sans-Serif;fill:${streakTheme.sideNums}}
    .big{font:700 32px 'Segoe UI',Ubuntu,Sans-Serif;fill:${streakTheme.currStreakNum}}
    .label{font:500 13px 'Segoe UI',Ubuntu,Sans-Serif;fill:${streakTheme.sideLabels}}
    .date{font:400 12px 'Segoe UI',Ubuntu,Sans-Serif;fill:${streakTheme.dates};opacity:.9}
    .stagger{opacity:0;animation:fade .45s ease forwards}.s1{animation-delay:.15s}.s2{animation-delay:.3s}.s3{animation-delay:.45s}
    @keyframes fade{to{opacity:1}}@keyframes dash{from{stroke-dashoffset:251}to{stroke-dashoffset:${251 - progress * 2.51}}}
    .ring{animation:dash 1s ease forwards}
  </style>
  <rect x=".5" y=".5" width="494" height="194" rx="4.5" fill="${streakTheme.background}" stroke="${streakTheme.border}"/>
  <text x="247.5" y="32" text-anchor="middle" class="title">${escapeHtml(stats.username)}'s GitHub Streak</text>
  <g class="stagger s1" transform="translate(72 86)">
    <text text-anchor="middle" class="num">${stats.totalContributions}</text>
    <text y="24" text-anchor="middle" class="label">Total Contributions</text>
  </g>
  <g class="stagger s2" transform="translate(247.5 103)">
    <circle r="48" fill="none" stroke="${streakTheme.stroke}" stroke-width="6" opacity=".35"/>
    <circle class="ring" r="48" fill="none" stroke="${streakTheme.ring}" stroke-width="6" stroke-linecap="round" stroke-dasharray="251" transform="rotate(-90)"/>
    <text y="-4" text-anchor="middle" class="big">${stats.currentStreak}</text>
    <text y="20" text-anchor="middle" class="label" fill="${streakTheme.currStreakLabel}">Current Streak</text>
  </g>
  <g class="stagger s3" transform="translate(423 86)">
    <text text-anchor="middle" class="num">${stats.longestStreak}</text>
    <text y="24" text-anchor="middle" class="label">Longest Streak</text>
  </g>
  <text x="247.5" y="172" text-anchor="middle" class="date">Current: ${formatRange(
    stats.currentStreakStart,
    stats.currentStreakEnd
  )} | Longest: ${formatRange(stats.longestStreakStart, stats.longestStreakEnd)}</text>
</svg>`;
}

function formatRange(start?: string, end?: string): string {
  if (!start || !end) return "No recent activity";
  if (start === end) return start;
  return `${start} - ${end}`;
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
