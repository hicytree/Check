import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { auth, signOut } from '../firebase';

const ProfileScreen = () => {
    const navigation = useNavigation();

    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            navigation.navigate("Login")
        })
        .catch((error) => alert(error.message));
    }
    return (
        <View style={styles.container}>
            <Text>Email: { auth.currentUser?.email }</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={handleSignOut}
            >
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ProfileScreen

const styles = StyleSheet.create({
     container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
     },
     button: {
        backgroundColor: "#0782F9",
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40
    },
    buttonText: {
        color: 'white',
        fontWeight: 700,
        fontSize: 16,
    },
})