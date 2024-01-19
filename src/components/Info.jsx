import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';

const Info = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Entypo name={props.icon} size={20} color="white" />
            </View>
            <View style={styles.txt}>
                <Text>{props.main_txt}</Text>
                <Text>{props.sub_txt}</Text>
            </View>
            <Entypo name="triangle-right" size={24} color="black" style={styles.rightIcon} />
        </View>
    )
}

export default Info

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "25%",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: "gray",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flexDirection: "row",
        paddingHorizontal: 10,
    },
    txt: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ff6896",
    },
    rightIcon: {
        position: 'absolute',
        right: 10,
    },
});
