import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/quran?page=1" />;
}