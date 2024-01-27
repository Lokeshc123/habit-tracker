import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation();
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (token) {
                    navigation.replace("Root")
                }
                else {

                }
            } catch (err) {
                console.log(err);
            }
        }
        checkLogin();
    }
        , []);
    const handleLogin = () => {
        const user = {
            email: email,
            password: password,
        }

        axios.post('http://10.35.138.26:5000/login', user).then((res) => {
            console.log(res.data);
            const token = res.data.token;
            AsyncStorage.setItem('authToken', token);

            setEmail('')
            setPassword('')
            navigation.replace("Root")

        }).catch((err) => {
            console.log(err);
            Alert.alert('Error', 'Login Failed')
        })


    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center", top: -20 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Sign In</Text>
                <Text style={{ fontSize: 18, color: "gray" }}>Sign in with your email and password</Text>
            </View>

            <View style={{ width: '80%', marginTop: 20 }}>
                <View style={styles.inputContainer}>
                    <AntDesign name="user" size={24} color="black" />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <AntDesign name="lock" size={24} color="black" />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                        style={styles.input}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 15, color: 'gray', marginTop: 10 }}>Don't have an account? <Text style={{ color: "darkblue" }} onPress={() => navigation.navigate("RegisterScreen")}>Sign Up</Text></Text>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        marginLeft: 10,
    },
    button: {
        backgroundColor: "lightblue",
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        marginTop: 30,
    },
});
