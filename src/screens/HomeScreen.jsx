import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import Days from '../components/Days'
import Tasks from '../components/Tasks'

const HomeScreen = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('default', { month: 'short' });
    const days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
    const formattedDate = `${day}${getOrdinalSuffix(day)} ${month}`;
    const task = ['Coffee', 'Read', 'Workout', 'Study', 'Sleep', 'Run', 'Code', 'swim', 'eat', 'drink'];


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header headerTxt="Today" dateTxt={formattedDate} icon="calendar" />
            </View>
            <View style={styles.days}>
                <FlatList
                    data={days}
                    renderItem={({ item }) => <Days day={item} />}
                    keyExtractor={item => item}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={styles.tasks}>
                <View style={{ height: "5%" }}>
                    <Text style={styles.txt}>In progress</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={task}
                        renderItem={({ item }) => <Tasks task={item} />}
                        keyExtractor={item => item}
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}

                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
        return "th";
    }
    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: "#e0e2f8",
        padding: 5,
    },
    header: {
        width: "100%",
        height: "10%",
        // backgroundColor: "#fff",
        padding: 5,
        marginTop: 10,
    },
    days: {
        width: "100%",
        height: "9%",

        padding: 5,
        marginTop: 10,
        justifyContent: "center",
    },
    tasks: {
        flex: 1,
        width: "100%",
        height: "82%",

        padding: 5,
        marginTop: 10,

    },
    txt: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#444d95"
    },
    task: {
        flex: 1,
    }
})