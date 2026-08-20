import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { AppShell, SectionTitle } from '@/components/AppShell';
import { getSeasonStatus, routes } from '@/data/mockData';
import { useDemo } from '@/state/DemoContext';

export default function Checkin() {
  const [selected, setSelected] = useState(0);
  const [checked, setChecked] = useState(false);
  const { completeCheckin } = useDemo();
  const route = routes[selected];
  const seasonStatus = getSeasonStatus();

  const verify = () => {
    if (!seasonStatus.active || !seasonStatus.daylightWindow) {
      Alert.alert('Check-In gesperrt', 'Zum Schutz von Gams- und Rauhfußwild sind Check-Ins nur in der Sommersaison und zwischen 06:00 und 20:00 Uhr möglich.');
      return;
    }
    completeCheckin(route.name, route.elevation - 435);
    setChecked(true);
    Alert.alert('Check-In bestätigt', `${route.name}: ${route.elevation - 435} hm zählen für deinen Saisonfortschritt.`);
  };

  return <AppShell>
    <View className="mb-8">
      <Text className="mb-2 text-[11px] font-bold uppercase tracking-[2px] text-gold">Live Check-In · ab Grödig</Text>
      <Text className="font-display text-4xl font-bold text-ink">Zeig, wo du bist.</Text>
      <Text className="mt-3 max-w-xl text-base leading-6 text-moss">Ein fairer Check-In verbindet GPS, Höhenprofil und deine Aufstiegszeit. Kein Tracking, nur ein verifizierter Moment am Berg.</Text>
    </View>
    <View className="mb-5 flex-row items-start gap-3 rounded-2xl border border-gold/40 bg-gold/10 p-4">
      <Feather name="shield" size={18} color="#B46A34" />
      <View className="flex-1"><Text className="font-bold text-ink">{seasonStatus.active ? 'Sommersaison aktiv' : 'Saison pausiert'}</Text><Text className="mt-1 text-sm leading-5 text-moss">1. Juni bis 31. August · Zeitfenster 06:00-20:00 Uhr · keine Nachtpunkte.</Text></View>
    </View>
    <View className="mb-8 flex-row flex-wrap gap-3">
      {routes.map((item, index) => <Pressable key={item.name} onPress={() => { setSelected(index); setChecked(false); }} className={`min-w-[45%] flex-1 rounded-2xl border p-4 ${selected === index ? 'border-forest bg-forest' : 'border-line bg-card'}`}><View className="flex-row items-center justify-between"><Feather name="compass" size={18} color={selected === index ? '#D9A036' : item.color} />{selected === index && <Feather name="check" size={16} color="#D9A036" />}</View><Text className={`mt-5 font-display text-lg font-bold ${selected === index ? 'text-sand' : 'text-ink'}`}>{item.name}</Text><Text className={`mt-1 text-xs ${selected === index ? 'text-sand/70' : 'text-moss'}`}>{item.origin} · {item.elevation} m</Text></Pressable>)}
    </View>
    <View className="mb-8 rounded-3xl bg-forest p-6"><View className="items-center rounded-2xl border border-sand/20 bg-sand/5 p-8"><View className={`mb-4 h-20 w-20 items-center justify-center rounded-full ${checked ? 'bg-gold' : 'border-2 border-gold'}`}><Feather name={checked ? 'check' : 'map-pin'} size={32} color={checked ? '#1C201D' : '#D9A036'} /></View><Text className="font-display text-2xl font-bold text-sand">{checked ? 'Check-In bestätigt' : route.name}</Text><Text className="mt-2 text-center text-sm text-sand/60">{checked ? 'Dein Aufstieg zählt für den Klimawald.' : 'Simulierter Standort: 47.72° N · 13.00° E'}</Text><Pressable onPress={verify} disabled={checked} className={`mt-6 rounded-full px-6 py-4 ${checked ? 'bg-sand/20' : 'bg-gold'}`}><Text className={`font-bold ${checked ? 'text-sand/60' : 'text-ink'}`}>{checked ? 'Erfolgreich verifiziert' : 'GPS-Check-In starten'}</Text></Pressable></View><View className="mt-6 flex-row justify-between"><View><Text className="text-[10px] uppercase tracking-widest text-sand/50">Steigrate VAM</Text><Text className="mt-1 text-xl font-bold text-sand">342 hm/h</Text></View><View><Text className="text-[10px] uppercase tracking-widest text-sand/50">Seilbahn-Check</Text><Text className="mt-1 text-xl font-bold text-gold">✓ bestanden</Text></View></View></View>
    <SectionTitle eyebrow="So funktioniert's" title="Drei Signale. Ein echter Gipfel." /><View className="gap-3">{['GPS-Standort am Wegpunkt', 'Plausibles Höhenprofil', 'Aufstiegszeit ohne Seilbahn-Sprung'].map((label, index) => <View key={label} className="flex-row items-center gap-4 rounded-2xl border border-line bg-card p-4"><Text className="font-display text-2xl font-bold text-gold">0{index + 1}</Text><Text className="font-semibold text-ink">{label}</Text><Feather name="check-circle" size={17} color="#718B73" /></View>)}</View>
  </AppShell>;
}
