import { Link, usePathname } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { PropsWithChildren } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useDemo } from '@/state/DemoContext';

const nav = [
  { href: '/', label: 'Übersicht', icon: 'compass' },
  { href: '/gipfelbuch', label: 'Gipfelbuch', icon: 'book-open' },
  { href: '/checkin', label: 'Check-In', icon: 'map-pin' },
  { href: '/ranking', label: 'Rangliste', icon: 'award' },
  { href: '/sponsoren', label: 'Impact', icon: 'sun' }
] as const;

export function AppShell({ children, scroll = true }: PropsWithChildren<{ scroll?: boolean }>) {
  const pathname = usePathname();
  const { checkins, importedTracks, resetDemo } = useDemo();
  const content = <View className="mx-auto w-full max-w-6xl px-5 pb-28 pt-5 md:px-10 md:pb-12 md:pt-8">{children}</View>;
  return <SafeAreaView className="flex-1 bg-sand">
    <View className="border-b border-line bg-sand/95 px-5 py-4 md:px-10">
      <View className="mx-auto flex w-full max-w-6xl flex-row items-center justify-between">
        <Link href="/" asChild><Pressable accessibilityLabel="Untersberg Gipfelt Startseite"><Image source={require('../assets/logo-primary.svg')} resizeMode="contain" style={{ width: 220, height: 50 }} /></Pressable></Link>
        <View className="hidden flex-row gap-2 md:flex">{nav.map(item => <Link key={item.href} href={item.href} asChild><Pressable className={`flex-row items-center gap-2 rounded-full px-4 py-2 ${pathname === item.href ? 'bg-forest' : 'bg-transparent'}`}><Feather name={item.icon as any} size={15} color={pathname === item.href ? '#FAF6EE' : '#1E382B'} /><Text className={`text-sm font-semibold ${pathname === item.href ? 'text-sand' : 'text-forest'}`}>{item.label}</Text></Pressable></Link>)}</View>
        <View className="flex-row items-center gap-3"><View className="hidden rounded-full bg-gold/15 px-3 py-2 md:flex"><Text className="text-[10px] font-bold uppercase tracking-wider text-forest">Demo · {checkins} Check-Ins · {importedTracks} GPX</Text></View><Pressable onPress={resetDemo} className="h-10 w-10 items-center justify-center rounded-full border border-line bg-card"><Text className="font-bold text-forest">LS</Text></Pressable></View>
      </View>
    </View>
    {scroll ? <ScrollView showsVerticalScrollIndicator={false}>{content}</ScrollView> : content}
    <View className="absolute bottom-0 left-0 right-0 flex-row justify-around border-t border-line bg-sand px-2 pb-3 pt-2 md:hidden">{nav.map(item => <Link key={item.href} href={item.href} asChild><Pressable className="items-center gap-1 px-2 py-1"><Feather name={item.icon as any} size={19} color={pathname === item.href ? '#1E382B' : '#99A095'} /><Text className={`text-[10px] font-semibold ${pathname === item.href ? 'text-forest' : 'text-moss'}`}>{item.label}</Text></Pressable></Link>)}</View>
  </SafeAreaView>;
}

export function SectionTitle({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: string }) { return <View className="mb-4 flex-row items-end justify-between"><View>{eyebrow && <Text className="mb-1 text-[11px] font-bold uppercase tracking-[2px] text-gold">{eyebrow}</Text>}<Text className="font-display text-2xl font-bold text-ink md:text-3xl">{title}</Text></View>{action && <Text className="text-sm font-bold text-forest">{action}</Text>}</View>; }
