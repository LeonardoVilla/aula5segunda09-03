import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { signOut } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export default function HomeScreen() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setEmail(session?.user.email ?? null);
    };

    loadSession();
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Area autenticada</Text>
      <Text style={styles.subtitle}>{email ? `Usuario: ${email}` : 'Sessao ativa'}</Text>

      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    width: '80%',
    backgroundColor: '#d22',
    borderRadius: 6,
    padding: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
