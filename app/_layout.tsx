import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';
import { DemoProvider } from '@/state/DemoContext';
export default function RootLayout() { return <DemoProvider><StatusBar style="dark" /><Stack screenOptions={{ headerShown: false }} /></DemoProvider>; }
