import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
const Header = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.headerTxt}>{props.headerTxt}</Text>
                <Text style={styles.dateTxt}>{props.dateTxt}</Text>

            </View>
            <View style={styles.right}>
                <LinearGradient
                    colors={['#F8BBD0', '#FF4081', '#FFEB3B']}
                    style={styles.icon}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    useAngle={true}
                    angleCenter={{ x: 0, y: 1 }}
                    angle={45}
                >
                    <Entypo name="calendar" size={24} color="white" />
                </LinearGradient>


            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    left: {

        height: "100%",


    },
    right: {
        right: 0,
        justifyContent: "center",
        height: "100%",
    },
    headerTxt: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#444d95"
    },
    dateTxt: {
        fontSize: 15,
        color: "grey",
        marginLeft: 5
    },
    icon: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#ff6896",
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
        top: 5

    }
})