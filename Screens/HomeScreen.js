import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

const HomeScreen = ({longitude}) => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        })();
    }, []);

    if (location) {
        return (
            <View style={styles.container}>
                <MapView 
                    initialRegion={{
                        latitude: location["coords"]["latitude"],
                        longitude: location["coords"]["longitude"],
                        latitudeDelta: 0.004,
                        longitudeDelta: 0.003
                    }}
                    mapType="hybrid"
                    style={styles.map} 
                />
            </View>
        );
    }
}

export default HomeScreen;
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});