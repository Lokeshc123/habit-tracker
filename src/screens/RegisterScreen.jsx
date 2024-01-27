import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

const RegisterScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUserName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigation = useNavigation();
    const handleRegister = (values) => {
        const user = {
            name: values.username,
            email: values.email,
            password: values.password,
        };
        axios.post('http://10.35.138.26:5000/register', user).then((res) => {
            console.log(res.data);
            Alert.alert('Success', 'Register Success')
            setUserName('')
            setEmail('')
            setPassword('')
        }).catch((err) => {
            console.log(err);
            Alert.alert('Error', 'Register Failed')
        })
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/, 'Password must be a combination of alphabets, numbers, and special characters').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center", top: -20 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Sign Up</Text>
                <Text style={{ fontSize: 18, color: "gray" }}>Create your account</Text>
            </View>

            <Formik
                initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={handleRegister}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={{ width: '80%', marginTop: 20 }}>
                        <View style={styles.inputContainer}>
                            <AntDesign name="user" size={24} color="black" />
                            <TextInput
                                placeholder="Name"
                                value={values.username}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                style={styles.input}
                            />
                        </View>
                        {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
                        <View style={styles.inputContainer}>
                            <AntDesign name="user" size={24} color="black" />
                            <TextInput
                                placeholder="Email"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                style={styles.input}
                            />
                        </View>
                        {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                        <View style={styles.inputContainer}>
                            <AntDesign name="lock" size={24} color="black" />
                            <TextInput
                                placeholder="Password"
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                secureTextEntry
                                style={styles.input}
                            />
                        </View>
                        {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                        <View style={styles.inputContainer}>
                            <AntDesign name="lock" size={24} color="black" />
                            <TextInput
                                placeholder="Confirm Password"
                                value={values.confirmPassword}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                secureTextEntry
                                style={styles.input}
                            />
                        </View>
                        {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>

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
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});
