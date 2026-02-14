import {useEffect, useState} from 'react';
import {onAuthStateChanged, SupabaseUser} from '../services/supabase';

export function useAuth() {
  const [user, setUser] = useState<SupabaseUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(u => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return {user, loading};
}
