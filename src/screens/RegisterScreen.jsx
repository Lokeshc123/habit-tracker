import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const RegisterScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUserName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigation = useNavigation();
    const handleRegister = () => {

        if (password !== confirmPassword) {
            alert("Password do not match")
        } else {
            const user = {
                name: username,
                email: email,
                password: password,
            };
            axios.post('http://localhost:5000/register', user).then((res) => {
                console.log(res.data);
                Alert.alert('Success', 'Register Success')
                setName('')
                setEmail('')
                setPassword('')


            }).catch((err) => {
                console.log(err);
                Alert.alert('Error', 'Register Failed')
            })
        };
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center", top: -20 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Sign Up</Text>
                <Text style={{ fontSize: 18, color: "gray" }}>Create your account</Text>
            </View>

            <View style={{ width: '80%', marginTop: 20 }}>
                <View style={styles.inputContainer}>
                    <AntDesign name="user" size={24} color="black" />

                    <TextInput
                        placeholder="Name"
                        value={username}
                        onChangeText={(text) => setUserName(text)}
                        style={styles.input}
                    />
                </View>
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
                <View style={styles.inputContainer}>
                    <AntDesign name="lock" size={24} color="black" />
                    <TextInput
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        secureTextEntry
                        style={styles.input}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text>Sign Up</Text>
                </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 15, color: 'gray', marginTop: 10 }}>Already have an account? <Text style={{ color: "darkblue" }} onPress={() => navigation.navigate("LoginScreen")}>Sign In</Text></Text>
        </SafeAreaView>
    )
}

export default RegisterScreen

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
