import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const OverView = ({ task }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.left}>
                    <Text style={styles.headertxt}>{task.title}</Text>

                    <FontAwesome name={task.change > 0 ? 'arrow-up' : 'arrow-down'} size={20} color={task.change > 0 ? "#4CAF50" : "#FF9800"} style={{ margin: 5 }} />
                    <Text style={{ color: task.change > 0 ? "#4CAF50" : "#FF9800", fontSize: 15, fontWeight: "bold" }}>{task.change > 0 ? "+" : ""}{task.change} %</Text>
                </View>
                <View style={styles.right}>

                    <Entypo name={toggleCheckBox ? "triangle-down" : "triangle-right"} size={24} color="black" onPress={() => setToggleCheckBox(!toggleCheckBox)} />
                </View>
            </View>
            {toggleCheckBox ? (
                <View style={styles.content}>
                    <View style={styles.row1}>
                        <View style={styles.comp}>
                            <Text style={styles.txt}>{task.completedDays}</Text>
                            <Text style={{ color: "grey", alignSelf: "center", fontWeight: "bold" }}>Completed Days</Text>
                        </View>
                        <View style={styles.comp}>
                            <Text style={styles.txt}>{task.WeeklyAvg}</Text>
                            <Text style={{ color: "grey", alignSelf: "center", fontWeight: "bold" }}>Weekly Average</Text>
                        </View>
                    </View>
                    <View style={styles.row2}>
                        <View style={styles.comp}>
                            <Text style={styles.txt}>{task.CurrentStreak}</Text>
                            <Text style={{ color: "grey", alignSelf: "center", fontWeight: "bold" }}>Current Streak</Text>
                        </View>
                        <View style={styles.comp}>
                            <Text style={styles.txt}>{task.LongestStreak}</Text>
                            <Text style={{ color: "grey", alignSelf: "center", fontWeight: "bold" }}>Longest Streak</Text>
                        </View>
                    </View>
                </View>) : null}
        </View>
    )
}

export default OverView

const styles = StyleSheet.create({
    container: {
        width: "95%",
        backgroundColor: "#fff",
        marginTop: 15,
        alignSelf: "center",
        padding: 20,
        borderRadius: 16,

    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    headertxt: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#444d95"
    },
    left: {
        flexDirection: "row",
        alignItems: "center"
    },
    content: {
        height: 150,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    comp: {
        margin: 10,
        justifyContent: "center",
        alignItems: "center",

    },
    row1: {
        flexDirection: "row",
        marginTop: 10,
    },
    row2: {
        flexDirection: "row",
        marginTop: 10,
    },
    txt: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#444d95",
        alignSelf: "center"
    }

})