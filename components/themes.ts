// Keep the original paper/dark IDs to preserve saved light/dark choices.
// Foregrounds and per-theme flower-center accents live in globals.css.
export const THEMES = [
  { id: "paper", name: "Light", color: "#ffffff" },
  { id: "dark", name: "Dark", color: "#151515" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];
export const THEME_STORAGE_KEY = "reina-theme";

export function isTheme(value: unknown): value is ThemeId {
  return THEMES.some((theme) => theme.id === value);
}

// Runs before paint; only the root data attribute changes before hydration.
export const THEME_INIT_SCRIPT = `try{const key=${JSON.stringify(THEME_STORAGE_KEY)};const saved=localStorage.getItem(key);const theme=${JSON.stringify(THEMES.map(({ id }) => id))}.includes(saved)?saved:"paper";document.documentElement.dataset.theme=theme;if(saved&&saved!==theme)localStorage.setItem(key,theme)}catch{}`;
