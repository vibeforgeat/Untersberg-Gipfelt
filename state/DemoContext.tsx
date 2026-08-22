import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { ImportableActivity, posts as seedPosts, ProviderId, SummitPost } from '@/data/mockData';

type DemoContextValue = {
  hm: number;
  trees: number;
  checkins: number;
  importedTracks: number;
  repairedTrailMeters: number;
  posts: SummitPost[];
  connections: Partial<Record<ProviderId, boolean>>;
  importedActivityIds: number[];
  completeCheckin: (summit: string, elevation: number) => void;
  toggleConnection: (provider: ProviderId) => boolean;
  importActivity: (activity: ImportableActivity) => void;
  addPost: (text: string, summit?: string) => void;
  giveKudos: (id: number) => void;
  resetDemo: () => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: PropsWithChildren) {
  const [hm, setHm] = useState(4250);
  const [checkins, setCheckins] = useState(0);
  const [importedTracks, setImportedTracks] = useState(0);
  const [repairedTrailMeters, setRepairedTrailMeters] = useState(184);
  const [posts, setPosts] = useState(seedPosts);
  const [connections, setConnections] = useState<Partial<Record<ProviderId, boolean>>>({});
  const [importedActivityIds, setImportedActivityIds] = useState<number[]>([]);
  const trees = 42 + Math.floor((hm - 4250) / 100);

  const completeCheckin = (summit: string, elevation: number) => {
    setHm(current => current + elevation);
    setCheckins(current => current + 1);
    setRepairedTrailMeters(current => current + 12);
    setPosts(current => current.map(post => post.id === 1 ? { ...post, kudos: post.kudos + 1 } : post));
  };

  const toggleConnection = (provider: ProviderId) => {
    const next = !connections[provider];
    setConnections(current => ({ ...current, [provider]: next }));
    return next;
  };

  const importActivity = (activity: ImportableActivity) => {
    if (importedActivityIds.includes(activity.id)) return;
    setImportedActivityIds(current => [...current, activity.id]);
    setImportedTracks(current => current + 1);
    setHm(current => current + activity.elevation);
  };

  const addPost = (text: string, summit = 'Salzburger Hochthron') => {
    const newPost: SummitPost = {
      id: Date.now(), user: 'Lenz_Salzburg', initials: 'LS', summit, route: 'Reitsteig', time: 'gerade eben', elevation: 1370,
      duration: '04:12', vam: 326, image: 'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=900&q=85',
      verified: 'GPS-Check-In Vor-Ort', kudos: 1, comments: 0, text
    };
    setPosts(current => [newPost, ...current]);
  };

  const giveKudos = (id: number) => setPosts(current => current.map(post => post.id === id ? { ...post, kudos: post.kudos + 1 } : post));
  const resetDemo = () => { setHm(4250); setCheckins(0); setImportedTracks(0); setRepairedTrailMeters(184); setPosts(seedPosts); setConnections({}); setImportedActivityIds([]); };

  return <DemoContext.Provider value={{ hm, trees, checkins, importedTracks, repairedTrailMeters, posts, connections, importedActivityIds, completeCheckin, toggleConnection, importActivity, addPost, giveKudos, resetDemo }}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemo must be used inside DemoProvider');
  return context;
}
