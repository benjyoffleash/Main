import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';

// Replace these with your Supabase project credentials
const SUPABASE_URL = 'https://loghineloulytoizlksb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvZ2hpbmVsb3VseXRvaXpsa3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMDUxNzgsImV4cCI6MjA4NjU4MTE3OH0.upu73h35enUTCpS6hA4cGjXXoj33AxsLIuKvO0ShEtU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
