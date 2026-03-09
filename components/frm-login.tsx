import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';

export default function TelaLogin() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

    const validarCredenciais = () => usuario === "admin" && senha === "admin";

    const handleLogin = () => {
        const credenciaisValidas = validarCredenciais();

        if (credenciaisValidas) {
            Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: 'Login realizado com sucesso.',
            });
            return;
        }

        Toast.show({
            type: 'error',
            text1: 'Erro no login',
            text2: 'Usuario ou senha invalidos.',
        });
    };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
            style={styles.input}
            placeholder="Username"
            value={usuario}
            onChangeText={setUsuario}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Toast />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: "black",
    },
    input: {
        width: "80%",
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
    },
});