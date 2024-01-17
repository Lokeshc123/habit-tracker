import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Days = ({ day }) => {
    return (
        <View style={styles.container}>
            <Text style={{ color: "#444d95", fontWeight: "bold", fontSize: 15 }}>{day}</Text>
        </View>
    )
}

export default Days

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        borderWidth: 5,
        borderColor: "grey",
        borderRadius: 25,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center"

    }
})