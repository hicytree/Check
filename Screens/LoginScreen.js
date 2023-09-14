import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from '../firebase'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore all log notifications

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate("Home")
            }
        });

        return unsubscribe;
    }, [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log("Registered as: " + user.email);
        })
        .catch((error) => alert(error.message))
    }
    
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log("Logged in as: " + user.email);
            setEmail('');
            setPassword('');
        })
        .catch((error) => alert(error.message))
    }

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior="padding"
        >
            <View style={styles.checkView}>
                <Image source={require('../assets/check.png')} style={styles.checkLogo} />  
                <Text style={styles.checkText}>Check</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, styles.buttonOutline]}
                    onPress={handleSignUp}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        fontFamily: "Avenir-Book",
        fontSize: 15
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 30,
    },
    button: {
        backgroundColor: "#424342ff",
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 700,
        fontSize: 17,
        fontFamily: "Avenir-Book"
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#424342ff",
        borderWidth: 2
    },
    buttonOutlineText: {
        color: '#424342ff',
        fontWeight: 700,
        fontSize: 17,
        fontFamily: "Avenir-Book"
    },
    checkLogo: {
        width: 175,
        height: 175,
        justifyContent: "center",
        borderRadius: 55,
        marginBottom: 5
    },
    checkView: {
        marginBottom: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    checkText: {
        fontSize: 30,
        fontFamily: "Avenir-Book"
    }  
})