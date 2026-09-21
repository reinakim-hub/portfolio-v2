export const PROJECT_MOTION = {
  sap: { base: '#0070F2', hover: '#004DC1' },
  nokia: { base: '#005AFF', hover: '#0039B9' },
  simplii: { base: '#F078B6', hover: '#E45EA3' },
  ssfb: { base: '#080808', hover: 'rgba(0,217,61,.18)' },
} as const;

export type ProjectKey = keyof typeof PROJECT_MOTION;

export const MOTION = {
  enter: 440,
  leave: 360,
  introScrollBounce: 620,
  enterEase: 'cubic-bezier(.22,.68,0,1)',
  leaveEase: 'cubic-bezier(.22,1,.36,1)',
} as const;
