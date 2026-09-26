import { asset } from "./assets";
export const BRAND_NAME = "Project Rhapsody";
export const DESCRIPTOR = "Orbital Media Studio";
export const SPINE = "The first instrument for orbit.";
export const timeline = [
  ["OCT 2026", "Conversation Opens in New York"],
  ["APR 2028", "First two works fly"],
  ["Q2 2029", "Commercial platform follows"],
] as const;
export const MANIFESTO = "Nobody has played this before.";
export const CREATIVE_FRAMEWORK = "One creative framework brings each work to life in weeks, not years. Media rights return to their owners, and each work stays protected on its own physically and cryptographically separate network.";
export const BOILERPLATE = `${BRAND_NAME} is Symphony Space's orbital media studio. Brands, artists and cultural institutions can create work shaped by the light, motion and physics of orbit.`;
export const REVEAL_ISO = "2026-10-05T12:00:00-04:00";
export const CONTACT_EMAIL = "merry@symphony-space.com";
export const SITE_URL = "https://www.symphony-space.com";
export const PARENT_LINE = `${BRAND_NAME} is a Symphony Space program.`;
export const SHOW_ORIGIN_NOTE = true;
export const PDF_PATH = asset("/Project-Rhapsody-One-Sheet.pdf");
export const LOCKUPS = { light: asset("/brand/lockup-light.svg"), dark: asset("/brand/lockup-dark.svg") };
export const INVITATION = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${BRAND_NAME}: Founding player inquiry`)}`;
export const moments = [
  { id: "firstlight", label: "First light", body: "Frame a work as sunlight reaches the horizon. The orbit determines the light and the moment.", note: "An image made for a specific window." },
  { id: "eclipse", label: "The eclipse crossing", body: "Stage a work as the studio passes from sunlight into shadow. One crossing, from light to dark.", note: "A reveal timed to the change in light." },
  { id: "city", label: "The pass over the city", body: "A work made above a city you name and seen in it at the same instant.", note: "A launch that belongs to one place." },
  { id: "master", label: "The master", body: "The take happens once, is authenticated at source, downlinked and archived with provenance.", note: "A work that outlives the season." },
] as const;
export type Moment = typeof moments[number]["id"];
export const movements = [
  ["I", "Broadcast", "Composed.", "One voice, scripted years out. The masterpiece is finished before it airs."],
  ["II", "Social", "Algorithmic.", "Many voices, still ruled by the feed. Volume without permanence."],
  ["III", "Space-native", "Improvised.", "A new instrument in a place with new physics. Live, reconfigurable, unrepeatable."],
];
export const sequence = [
  ["01", "Invited", "Access is curated. Every player is reviewed before the studio invites them to play."],
  ["02", "The session", "Compose a time-locked work around a specific pass, light condition, city or moment."],
  ["03", "The master", "The take happens once, is authenticated at source, downlinked and archived with provenance."],
];
