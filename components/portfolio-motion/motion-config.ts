export const PROJECT_MOTION = {
  sap: { base: '#0065DB', hover: '#004595' },
  nokia: { base: '#005AFF', hover: '#0039B9' },
  simplii: { base: '#DD55A6', hover: '#B14485' },
  ssfb: { base: '#009F3A', hover: '#007F2E' },
} as const;

export type ProjectKey = keyof typeof PROJECT_MOTION;

export const MOTION = {
  enter: 440,
  leave: 360,
  introScrollBounce: 620,
  enterEase: 'cubic-bezier(.22,.68,0,1)',
  leaveEase: 'cubic-bezier(.22,1,.36,1)',
} as const;
