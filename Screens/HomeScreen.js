import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { Camera } from 'expo-camera';

const HomeScreen = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => { 
        (async () => {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
    })();
    }, []);

    const takePicture = async () => {
        if(camera){
            const data = await camera.takePictureAsync(null)
            setImage(data.uri);
        }
    }
    if (hasCameraPermission === false) {
        return (
            <View style={styles.permContainer}>
                <Text>Check doesn't have permission to access Camera. Please go to your Settings to give the çapp access to the camera.</Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1}}>
           <View style={styles.container}>
                 <Camera 
                 ref={ref => setCamera(ref)}
                 style={styles.fixedRatio} 
                 type={Camera.Constants.Type.back}
                 ratio={'1:1'} />
           </View>
           <View
                style={{
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                flex: 1,
                width: '100%',
                padding: 30,
                justifyContent: 'space-between'
                }}
            >
                <View
                    style={{
                    alignSelf: 'center',
                    flex: 1,
                    alignItems: 'center'
                    }}
                >
                    <TouchableOpacity style={{alignItems: "center" }} activeOpacity = { .5 } onPress={ takePicture }> 
                        <Image source={require('../assets/check.png')} style = {styles.checkButton} />          
                    </TouchableOpacity>
                </View>
            </View>
            {/* {image && <Image source={{uri: image}} style={{flex:1}}/>} */}
        </View>
    );
}

export default HomeScreen;
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", 
        alignItems: "center"
    },
    permContainer: {
        flex: 1,
        justifyContent: "center", 
        alignItems: "center",
        margin: 10
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    },
    checkButton: {
        width: 60,
        height: 60,
        justifyContent: "center",
        borderRadius: 20
    }
});