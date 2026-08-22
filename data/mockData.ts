export type Route = { name: string; detail: string; elevation: number; distance: string; time: string; color: string; origin?: string };
export type SummitPost = { id: number; user: string; initials: string; summit: string; route: string; time: string; elevation: number; duration: string; vam: number; image: string; verified: string; kudos: number; comments: number; text: string };

export const sponsors = [
  { name: 'Marktgemeinde Grödig', label: 'Regionspartner', campaign: 'Sauberer Untersberg & Parkplatz-Infrastruktur', description: 'Biologische Müllsäckchen an den Einstiegen Glanegg/Fürstenbrunn und ein klares Wanderer-Leitsystem.', current: 'Glanegg & Fürstenbrunn', progress: 58, accent: '#657A68' },
  { name: 'Salzburger Jägerverband', label: 'Wildschutzpartner', campaign: 'Gams-Biotop & Wildruhezonen', description: 'Naturnahe Info-Tafeln für Schutzgebiete und Drohnen-Kitzrettung am Untersberg-Fuß.', current: '4 Info-Tafeln geplant', progress: 42, accent: '#718B73' },
  { name: 'Österreichischer Alpenverein', label: 'Wegepartner · Sektion Salzburg', campaign: 'Dopplersteig- & Reitsteig-Sanierung', description: '3.000 € für Wegebau, Holztritte und Seilsicherungen.', current: '1.950 / 3.000 €', progress: 65, accent: '#1E382B' },
  { name: 'Salzburg AG', label: 'Impactpartner', campaign: 'Klimawald Untersberg', description: '500 Bäume bei 500.000 Höhenmetern.', current: '320 Bäume', progress: 64, accent: '#D9A036' },
  { name: 'Stieglbrauerei', label: 'Gipfelpartner', campaign: 'Gipfel-Erfrischung', description: 'Freigetränk-Gutschein auf Hütten nach 3 verifizierten Aufstiegen.', current: '2 / 3 Aufstiege', progress: 67, accent: '#B46A34' }
];

export const routes: Route[] = [
  { name: 'Geiereck', detail: 'via Dopplersteig · ab Glanegg/Grödig', elevation: 1805, distance: '9,8 km', time: '4:45 h', color: '#1E382B', origin: 'Glanegg, Grödig' },
  { name: 'Salzburger Hochthron', detail: 'via Reitsteig · ab Glanegg/Grödig', elevation: 1853, distance: '11,2 km', time: '5:20 h', color: '#D9A036', origin: 'Glanegg, Grödig' },
  { name: 'Stöhrhaus', detail: 'über Mittagskogel · ab Marktschellenberg', elevation: 1894, distance: '13,6 km', time: '6:10 h', color: '#B46A34', origin: 'Marktschellenberg' },
  { name: 'Zeppezauerhaus', detail: 'via Reitsteig · ab Glanegg/Grödig', elevation: 1663, distance: '7,4 km', time: '3:50 h', color: '#657A68', origin: 'Glanegg, Grödig' }
];

export const season = {
  startMonth: 5,
  startDay: 1,
  endMonth: 7,
  endDay: 31,
  trackingStartHour: 6,
  trackingEndHour: 20,
  label: 'Sommer-Saison · 1. Juni bis 31. August'
};

export function getSeasonStatus(now = new Date()) {
  const year = now.getFullYear();
  const start = new Date(year, season.startMonth, season.startDay);
  const end = new Date(year, season.endMonth, season.endDay, 23, 59, 59);
  const active = now >= start && now <= end;
  const hoursLeft = Math.max(0, Math.ceil((end.getTime() - now.getTime()) / 86400000));
  const hour = now.getHours();
  const daylightWindow = hour >= season.trackingStartHour && hour < season.trackingEndHour;
  return { active, daylightWindow, hoursLeft, label: active ? `${hoursLeft} Tage verbleiben` : 'Saison pausiert' };
}

export const posts: SummitPost[] = [
  { id: 1, user: 'Lenz_Salzburg', initials: 'LS', summit: 'Salzburger Hochthron', route: 'Reitsteig', time: 'vor 18 Min.', elevation: 1370, duration: '03:48', vam: 360, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85', verified: 'GPS-Check-In Vor-Ort', kudos: 48, comments: 6, text: 'Früher Start, klare Sicht bis zum Dachstein. Der Reitsteig ist heute unglaublich griffig.' },
  { id: 2, user: 'AlpinLover_Grödig', initials: 'AG', summit: 'Geiereck', route: 'Dopplersteig ab Glanegg', time: 'vor 1 Std.', elevation: 1320, duration: '04:22', vam: 302, image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=85', verified: 'Verifiziert via Strava', kudos: 71, comments: 11, text: 'Der Klassiker bleibt der Klassiker. Oben ein kurzer Kaffee beim Zeppezauerhaus.' },
  { id: 3, user: 'MountainRunner_Grödig', initials: 'MG', summit: 'Stöhrhaus', route: 'Mittagskogel', time: 'gestern', elevation: 1510, duration: '03:16', vam: 462, image: 'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=900&q=85', verified: 'GPS-Check-In Vor-Ort', kudos: 93, comments: 14, text: 'Langer Tag, großes Grinsen. Die letzten Meter zum Stöhrhaus waren jede Schweißperle wert.' },
  { id: 4, user: 'Eva_am_Berg', initials: 'EB', summit: 'Zeppezauerhaus', route: 'Reitsteig', time: 'gestern', elevation: 980, duration: '03:55', vam: 250, image: 'https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=900&q=85', verified: 'Verifiziert via Strava', kudos: 36, comments: 4, text: 'Abendrunde mit goldenem Licht über Salzburg. Genau dafür gibt es Gipfelt.' },
  { id: 5, user: 'Karo_und_Kraxn', initials: 'KK', summit: 'Geiereck', route: 'Dopplersteig', time: 'vor 2 Tagen', elevation: 1288, duration: '05:02', vam: 256, image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85', verified: 'GPS-Check-In Vor-Ort', kudos: 29, comments: 3, text: 'Heute ganz entspannt und mit viel Zeit für die Felsbänder.' },
  { id: 6, user: 'Hannes_Höhenmeter', initials: 'HH', summit: 'Salzburger Hochthron', route: 'Dopplersteig', time: 'vor 3 Tagen', elevation: 1412, duration: '04:05', vam: 345, image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=900&q=85', verified: 'Verifiziert via Strava', kudos: 64, comments: 8, text: 'Runde Sache: 10k Club geknackt und 14.000 Höhenmeter gesammelt.' }
];

export type ProviderId = 'strava' | 'garmin' | 'apple-health' | 'google-health' | 'suunto';
export type FitnessProvider = { id: ProviderId; name: string; short: string; color: string; description: string };
export type ImportableActivity = { id: number; provider: ProviderId; title: string; date: string; elevation: number; distance: string; duration: string };

export const fitnessProviders: FitnessProvider[] = [
  { id: 'strava', name: 'Strava', short: 'ST', color: '#FC4C02', description: 'Aktivitäten & Segmente synchronisieren' },
  { id: 'garmin', name: 'Garmin Connect', short: 'GC', color: '#007CC3', description: 'Touren von Garmin-Geräten importieren' },
  { id: 'apple-health', name: 'Apple Health', short: 'AH', color: '#FF2D55', description: 'Workouts aus der Health-App übernehmen' },
  { id: 'google-health', name: 'Google Health Connect', short: 'GH', color: '#4285F4', description: 'Aktivitäten von Android-Geräten laden' },
  { id: 'suunto', name: 'Suunto App', short: 'SU', color: '#101820', description: 'GPS-Touren von Suunto-Uhren übernehmen' }
];

export const providerActivities: ImportableActivity[] = [
  { id: 101, provider: 'strava', title: 'Salzburger Hochthron via Reitsteig', date: 'gestern, 07:14', elevation: 1370, distance: '11,2 km', duration: '04:56 h' },
  { id: 102, provider: 'strava', title: 'Geiereck Morgenrunde', date: 'vor 4 Tagen', elevation: 1288, distance: '9,8 km', duration: '04:10 h' },
  { id: 201, provider: 'garmin', title: 'Stöhrhaus über Mittagskogel', date: 'vor 2 Tagen', elevation: 1894, distance: '13,6 km', duration: '05:48 h' },
  { id: 202, provider: 'garmin', title: 'Zeppezauerhaus Feierabendrunde', date: 'vor 6 Tagen', elevation: 1663, distance: '7,4 km', duration: '03:44 h' },
  { id: 301, provider: 'apple-health', title: 'Wandern · Untersberg', date: 'vor 3 Tagen', elevation: 940, distance: '7,1 km', duration: '03:20 h' },
  { id: 401, provider: 'google-health', title: 'Zeppezauerhaus Aufstieg', date: 'vor 5 Tagen', elevation: 1663, distance: '7,4 km', duration: '03:50 h' },
  { id: 501, provider: 'suunto', title: 'Dopplersteig Tour', date: 'vor 1 Woche', elevation: 1805, distance: '9,8 km', duration: '04:32 h' }
];

export const leaderboard = [
  { rank: 1, name: 'MountainRunner_Grödig', initials: 'MG', hm: '18.420', tours: 26, badge: 'Dopplersteig-König' },
  { rank: 2, name: 'Lenz_Salzburg', initials: 'LS', hm: '14.860', tours: 19, badge: 'Wald-Retter' },
  { rank: 3, name: 'Hannes_Höhenmeter', initials: 'HH', hm: '12.440', tours: 17, badge: '10k Club' },
  { rank: 4, name: 'AlpinLover_Sbg', initials: 'AL', hm: '9.780', tours: 14, badge: 'Felsfreund' },
  { rank: 5, name: 'Eva_am_Berg', initials: 'EB', hm: '7.360', tours: 11, badge: 'Frühstarterin' }
];
