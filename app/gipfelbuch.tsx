import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { AppShell } from '@/components/AppShell';
import { SummitPost } from '@/data/mockData';
import { useDemo } from '@/state/DemoContext';

const filters = ['Alle', 'Dopplersteig', 'Reitsteig', 'Mittagskogel'];

function PostCard({ post, onKudos }: { post: SummitPost; onKudos: (id: number) => void }) {
  return <View className="overflow-hidden rounded-3xl border border-line bg-card"><Image source={{ uri: post.image }} className="h-52 w-full" contentFit="cover" /><View className="p-5"><View className="flex-row items-center justify-between"><View className="flex-row items-center gap-3"><View className="h-10 w-10 items-center justify-center rounded-full bg-forest"><Text className="text-xs font-bold text-gold">{post.initials}</Text></View><View><Text className="font-bold text-ink">{post.user}</Text><Text className="text-xs text-moss">{post.time} · {post.route}</Text></View></View><View className="flex-row items-center gap-1 rounded-full bg-forest/10 px-2 py-1"><Feather name="check-circle" size={12} color="#1E382B" /><Text className="text-[10px] font-bold text-forest">{post.verified}</Text></View></View><Text className="mt-5 font-display text-xl font-bold text-ink">{post.summit}</Text><Text className="mt-2 leading-5 text-moss">{post.text}</Text><View className="my-5 flex-row gap-6 border-y border-line py-3"><Text className="text-xs font-bold text-ink">↗ {post.elevation} hm</Text><Text className="text-xs font-bold text-ink">◷ {post.duration}</Text><Text className="text-xs font-bold text-ink">⌁ {post.vam} VAM</Text></View><View className="flex-row items-center justify-between"><Pressable onPress={() => onKudos(post.id)} className="flex-row items-center gap-2 rounded-full bg-sand px-4 py-2"><Text className="text-lg">✦</Text><Text className="text-sm font-bold text-forest">Bergheil! {post.kudos}</Text></Pressable><Text className="text-xs font-semibold text-moss">{post.comments} Kommentare</Text></View></View></View>;
}

export default function Gipfelbuch() {
  const { posts, giveKudos, addPost } = useDemo();
  const [showForm, setShowForm] = useState(false);
  const [note, setNote] = useState('');
  const [filter, setFilter] = useState('Alle');
  const filteredPosts = filter === 'Alle' ? posts : posts.filter(post => post.route.includes(filter));
  const submit = () => { if (!note.trim()) return; addPost(note.trim()); Alert.alert('Gipfelmoment veröffentlicht', 'Dein Eintrag ist jetzt im Community-Feed sichtbar.'); setNote(''); setShowForm(false); };

  return <AppShell><View className="mb-8 flex-row items-end justify-between"><View><Text className="mb-2 text-[11px] font-bold uppercase tracking-[2px] text-gold">Digitales Gipfelbuch</Text><Text className="font-display text-4xl font-bold text-ink">Oben ist, was zählt.</Text><Text className="mt-3 text-base text-moss">{posts.reduce((total, post) => total + post.kudos, 0).toLocaleString('de-DE')} Bergheil! aus der Community</Text></View><Pressable onPress={() => setShowForm(!showForm)} className="hidden flex-row items-center gap-2 rounded-full bg-forest px-5 py-3 md:flex"><Feather name="plus" size={16} color="#FAF6EE" /><Text className="font-bold text-sand">Eintrag erstellen</Text></Pressable></View>
    <View className="mb-6 rounded-2xl border border-line bg-card p-4"><View className="mb-3 flex-row items-center gap-2"><Feather name="filter" size={15} color="#1E382B" /><Text className="text-xs font-bold uppercase tracking-wider text-moss">Route filtern</Text></View><View className="flex-row flex-wrap gap-2">{filters.map(item => <Pressable key={item} onPress={() => setFilter(item)} className={`rounded-full px-4 py-2 ${filter === item ? 'bg-forest' : 'bg-sand'}`}><Text className={`text-xs font-bold ${filter === item ? 'text-sand' : 'text-forest'}`}>{item}</Text></Pressable>)}</View></View>
    {showForm && <View className="mb-6 rounded-3xl border border-line bg-card p-5"><Text className="font-display text-xl font-bold text-ink">Dein Gipfelmoment</Text><TextInput value={note} onChangeText={setNote} placeholder="Was bleibt von heute?" placeholderTextColor="#99A095" multiline className="my-4 min-h-[90px] rounded-2xl bg-sand p-4 text-ink" /><View className="flex-row justify-end gap-3"><Pressable onPress={() => setShowForm(false)} className="rounded-full px-4 py-3"><Text className="font-bold text-moss">Abbrechen</Text></Pressable><Pressable onPress={submit} className="rounded-full bg-forest px-5 py-3"><Text className="font-bold text-sand">Veröffentlichen</Text></Pressable></View></View>}
    <View className="gap-5">{filteredPosts.map(post => <PostCard key={post.id} post={post} onKudos={giveKudos} />)}</View>{filteredPosts.length === 0 && <View className="rounded-2xl border border-line bg-card p-6"><Text className="font-bold text-ink">Noch kein Eintrag auf dieser Route.</Text><Text className="mt-1 text-sm text-moss">Sei der erste Gipfelmoment aus Grödig.</Text></View>}<Pressable onPress={() => setShowForm(true)} className="absolute bottom-20 right-5 h-14 w-14 items-center justify-center rounded-full bg-gold shadow-lg md:hidden"><Feather name="plus" size={24} color="#1C201D" /></Pressable>
  </AppShell>;
}
