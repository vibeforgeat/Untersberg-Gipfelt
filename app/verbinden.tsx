import { Feather } from '@expo/vector-icons';
import { Alert, Pressable, Text, View } from 'react-native';
import { AppShell, SectionTitle } from '@/components/AppShell';
import { fitnessProviders, providerActivities } from '@/data/mockData';
import { useDemo } from '@/state/DemoContext';

export default function Verbinden() {
  const { connections, importedActivityIds, toggleConnection, importActivity } = useDemo();
  const connectedProviders = fitnessProviders.filter(provider => connections[provider.id]);

  const handleToggle = (provider: (typeof fitnessProviders)[number]) => {
    const nowConnected = toggleConnection(provider.id);
    Alert.alert(nowConnected ? `${provider.name} verbunden` : `${provider.name} getrennt`, nowConnected ? 'Deine letzten Touren stehen jetzt zum Import bereit.' : 'Es werden keine weiteren Touren von diesem Dienst geladen.');
  };

  const handleImport = (activity: (typeof providerActivities)[number]) => { importActivity(activity); Alert.alert('Tour importiert', `${activity.title}: ${activity.elevation} hm zählen jetzt für deinen Saisonfortschritt.`); };

  return <AppShell>
    <View className="mb-8">
      <Text className="mb-2 text-[11px] font-bold uppercase tracking-[2px] text-gold">Geräte & Apps</Text>
      <Text className="font-display text-4xl font-bold text-ink">Verbinde deine Touren.</Text>
      <Text className="mt-3 max-w-xl text-base leading-6 text-moss">Verknüpfe Strava, Garmin Connect, Apple Health, Google Health Connect oder deine Suunto App und lade deine Aufstiege mit einem Tipp in dein Saisonkonto.</Text>
    </View>
    <View className="mb-8 gap-3">
      {fitnessProviders.map(provider => { const connected = !!connections[provider.id]; return <View key={provider.id} className="flex-row items-center gap-4 rounded-2xl border border-line bg-card p-4">
        <View className="h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: `${provider.color}22` }}><Text className="text-xs font-bold" style={{ color: provider.color }}>{provider.short}</Text></View>
        <View className="flex-1"><Text className="font-bold text-ink">{provider.name}</Text><Text className="mt-1 text-xs leading-4 text-moss">{provider.description}</Text></View>
        <Pressable onPress={() => handleToggle(provider)} className={`items-center rounded-full px-4 py-3 ${connected ? 'bg-sand border border-line' : 'bg-forest'}`}>
          <Text className={`text-xs font-bold ${connected ? 'text-forest' : 'text-sand'}`}>{connected ? 'Verbunden' : 'Verbinden'}</Text>
        </Pressable>
      </View>; })}
    </View>
    {connectedProviders.length === 0
      ? <View className="mb-8 flex-row items-start gap-3 rounded-2xl border border-gold/40 bg-gold/10 p-4"><Feather name="info" size={18} color="#B46A34" /><Text className="flex-1 text-sm leading-5 text-moss">Verbinde oben mindestens einen Dienst, um deine letzten Touren zum Import zu sehen.</Text></View>
      : <View className="mb-8"><SectionTitle eyebrow="Bereit zum Import" title="Deine letzten Touren" /><View className="gap-3">
        {connectedProviders.flatMap(provider => providerActivities.filter(activity => activity.provider === provider.id)).map(activity => { const imported = importedActivityIds.includes(activity.id); const provider = fitnessProviders.find(candidate => candidate.id === activity.provider)!; return <View key={activity.id} className="flex-row items-center gap-4 rounded-2xl border border-line bg-card p-4">
          <View className="h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: `${provider.color}22` }}><Text className="text-[10px] font-bold" style={{ color: provider.color }}>{provider.short}</Text></View>
          <View className="flex-1"><Text className="font-bold text-ink">{activity.title}</Text><Text className="mt-1 text-xs text-moss">{activity.date} · {activity.elevation} hm · {activity.distance} · {activity.duration}</Text></View>
          <Pressable onPress={() => handleImport(activity)} disabled={imported} className={`items-center rounded-full px-4 py-3 ${imported ? 'bg-sand' : 'bg-gold'}`}>
            <Text className={`text-xs font-bold ${imported ? 'text-moss' : 'text-ink'}`}>{imported ? 'Importiert' : 'Importieren'}</Text>
          </Pressable>
        </View>; })}
      </View></View>}
    <SectionTitle eyebrow="So funktioniert's" title="Ein Import, ein Beleg." />
    <View className="gap-3">{['Dienst verbinden (Demo-Login, keine echten Zugangsdaten nötig)', 'Passende Touren am Untersberg werden vorgeschlagen', 'Import zählt sofort für Saison, Klimawald und Badges'].map((label, index) => <View key={label} className="flex-row items-center gap-4 rounded-2xl border border-line bg-card p-4"><Text className="font-display text-2xl font-bold text-gold">0{index + 1}</Text><Text className="flex-1 font-semibold text-ink">{label}</Text><Feather name="check-circle" size={17} color="#718B73" /></View>)}</View>
  </AppShell>;
}
