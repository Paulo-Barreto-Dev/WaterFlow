import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type PropsWithChildren } from 'react';
import { AppState } from 'react-native';

import { getAuthorizedProfile } from '@/services/auth';
import { getSupabaseClient } from '@/services/supabase';
import type { Profile } from '@/types/profile';

type AuthState =
  | { status: 'loading' }
  | { status: 'signedOut'; message?: string }
  | { status: 'signedIn'; profile: Profile }
  | { status: 'error'; message: string };

type AuthContextValue = {
  state: AuthState;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<AuthState>({ status: 'loading' });
  const operation = useRef(0);

  const refresh = useCallback(async () => {
    const currentOperation = ++operation.current;
    setState({ status: 'loading' });

    try {
      const supabase = getSupabaseClient();
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      if (!sessionData.session) {
        if (operation.current === currentOperation) setState({ status: 'signedOut' });
        return;
      }

      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!userData.user) {
        await supabase.auth.signOut({ scope: 'local' });
        if (operation.current === currentOperation) setState({ status: 'signedOut' });
        return;
      }

      const profile = await getAuthorizedProfile(userData.user.id);
      if (!profile) {
        await supabase.auth.signOut({ scope: 'local' });
        if (operation.current === currentOperation) setState({ status: 'signedOut', message: 'Esta conta não está autorizada no WaterFlow.' });
        return;
      }

      if (operation.current === currentOperation) setState({ status: 'signedIn', profile });
    } catch (error) {
      if (operation.current === currentOperation) {
        setState({ status: 'error', message: error instanceof Error ? error.message : 'Não foi possível verificar a sessão.' });
      }
    }
  }, []);

  useEffect(() => {
    let authSubscription: { unsubscribe: () => void } | undefined;
    try {
      const supabase = getSupabaseClient();
      authSubscription = supabase.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_OUT') setState({ status: 'signedOut' });
      }).data.subscription;
    } catch {
      // refresh shows the configuration error without crashing the navigator.
    }

    void refresh();
    return () => authSubscription?.unsubscribe();
  }, [refresh]);

  useEffect(() => {
    if (state.status !== 'signedIn' && state.status !== 'error') return;
    const appSubscription = AppState.addEventListener('change', (status) => {
      if (status === 'active') void refresh();
    });
    return () => appSubscription.remove();
  }, [refresh, state.status]);

  const signIn = useCallback(async (email: string, password: string) => {
    const currentOperation = ++operation.current;
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    try {
      const profile = await getAuthorizedProfile(data.user.id);
      if (!profile) throw new Error('Esta conta não está autorizada no WaterFlow.');
      if (operation.current === currentOperation) setState({ status: 'signedIn', profile });
    } catch (profileError) {
      await supabase.auth.signOut({ scope: 'local' });
      throw profileError;
    }
  }, []);

  const signOut = useCallback(async () => {
    const currentOperation = ++operation.current;
    const { error } = await getSupabaseClient().auth.signOut({ scope: 'local' });
    if (error) throw error;
    if (operation.current === currentOperation) setState({ status: 'signedOut' });
  }, []);

  const value = useMemo(() => ({ state, signIn, signOut, refresh }), [state, signIn, signOut, refresh]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth precisa de AuthProvider.');
  return context;
}
