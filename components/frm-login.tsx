import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { signIn, signUp } from '@/lib/auth';

export default function TelaLogin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [carregando, setCarregando] = useState(false);

    const handleLogin = async () => {
        try {
            setCarregando(true);
            await signIn(email, senha);
            Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: 'Login realizado com sucesso.',
            });
            router.replace('/(tabs)');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Falha ao fazer login.';
            Toast.show({
                type: 'error',
                text1: 'Erro no login',
                text2: message,
            });
        } finally {
            setCarregando(false);
        }
    };

    const handleCadastro = async () => {
        try {
            setCarregando(true);
            await signUp(email, senha);
            Toast.show({
                type: 'success',
                text1: 'Cadastro enviado',
                text2: 'Confira seu e-mail para confirmar a conta.',
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Falha ao cadastrar.';
            Toast.show({
                type: 'error',
                text1: 'Erro no cadastro',
                text2: message,
            });
        } finally {
            setCarregando(false);
        }
    };

  return (
    <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={carregando}>
                <Text style={styles.buttonText}>{carregando ? 'Carregando...' : 'Entrar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSecondary} onPress={handleCadastro} disabled={carregando}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <Toast />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: 'black',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    button: {
        width: '80%',
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonSecondary: {
        width: '80%',
        backgroundColor: '#4a4a4a',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
    },
});