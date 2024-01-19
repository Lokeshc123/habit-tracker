import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CheckBox from 'expo-checkbox'
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
const Tasks = ({ task }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>

                {toggleCheckBox ? (
                    <LinearGradient
                        colors={['#F8BBD0', '#FF4081', '#FFEB3B']}
                        style={styles.gradient}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        useAngle={true}
                        angleCenter={{ x: 0, y: 1 }}
                        angle={45}
                    >
                        <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                            color={"transparent"}
                        />
                    </LinearGradient>
                ) : <CheckBox
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />}

                <Text style={styles.txt}>{task}</Text>
            </View>
            <Entypo name="dots-three-horizontal" size={24} color="grey" />
        </View>
    )
}

export default Tasks

const styles = StyleSheet.create({
    container: {
        height: 80,

        width: "95%",
        backgroundColor: "#fff",
        borderRadius: 16,
        marginTop: 15,
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        paddingHorizontal: 20, // Added padding for better spacing
    },
    txt: {
        fontSize: 18,
        color: "#444d95",
        fontWeight: "bold",
        marginLeft: 20,
    },
    gradient: {
        width: 24, // Adjusted to match the width of the checkbox
        height: 24, // Adjusted to match the height of the checkbox
        borderRadius: 6, // Adjusted to match the borderRadius of the checkbox
        marginRight: 10, // Adjusted to provide spacing between checkbox and text
        justifyContent: 'center',
        alignItems: 'center',
    },

})