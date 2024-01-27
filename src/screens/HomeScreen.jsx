import { FlatList, StyleSheet, Text, Touchable, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import Days from '../components/Days'
import Tasks from '../components/Tasks'
import { UserType } from '../context/UserContext'
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from "jwt-decode"
import axios from 'axios'
import { AntDesign } from '@expo/vector-icons';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
const HomeScreen = () => {
    const { userId, setUserId, completedTasks } = useContext(UserType);
    const handleClicked = () => {
        setClicked(!clicked);
    }
    const [clicked, setClicked] = useState(false);
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('default', { month: 'short' });
    const days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
    const formattedDate = `${day}${getOrdinalSuffix(day)} ${month}`;
    const task = ['Coffee', 'Read', 'Workout', 'Study', 'Sleep', 'Run', 'Code', 'swim', 'eat', 'drink'];
    const [habit, setHabit] = useState([]);
    const [taskName, setTaskName] = useState("");
    useEffect(() => {
        const fetchHabit = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                const decodedToken = jwt_decode(token);
                const user = decodedToken.userId;
                setUserId(user);
                axios.get(`http://10.35.138.26:5000/user/${user}/habits`)
                    .then((res) => {

                        setHabit(res.data.habits);
                    })
                    .catch((err) => {
                        console.log(err);
                    });



            } catch (err) {
                console.log(err.response.data);
            }
        };
        fetchHabit();
    }, [completedTasks, habit]);

    const addTask = () => {
        const task = {
            title: taskName,
            change: 0,
            completedDays: 0,
            WeeklyAvg: 0,
            CurrentStreak: 0,
            LongestStreak: 0,
        }
        axios.post(`http://10.35.138.26:5000/user/${userId}/habit`, task).then((res) => {
            console.log(res.data);
            setHabit([...habit, res.data.habit]);
            setTaskName("");
            setClicked(!clicked);
        }).catch((err) => {
            console.log(err.response.data);
        }
        )
    }
    // const efficinecy = completedTasks.length / habit.length * 100;
    // console.log(efficinecy);

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
                <View style={{ height: "5%", flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.txt}>In progress</Text>
                    <View style={{ justifyContent: "center" }}>
                        <LinearGradient
                            colors={['#F8BBD0', '#FF4081', '#FFEB3B']}
                            style={styles.icon}
                            // start={{ x: 0, y: 1 }}
                            // end={{ x: 1, y: 0 }}
                            useAngle={true}
                            angleCenter={{ x: 0, y: 1 }}
                            angle={45}
                        >
                            <AntDesign name="plus" size={24} color="white" onPress={handleClicked} />
                        </LinearGradient>
                    </View>
                </View>
                {clicked ? (
                    <View style={styles.addTaskcontainer}>
                        <View style={styles.addTask}>
                            <TextInput placeholder="Add Task" value={taskName} style={styles.input}
                                onChangeText={(text) => setTaskName(text)}
                            />
                            <TouchableOpacity style={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: 80,
                                backgroundColor: "#ff6896",
                                height: 50,
                                borderRadius: 10,
                            }}
                                onPress={addTask}>
                                <Text>Add Task</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                ) : (<View style={{ flex: 1 }}>
                    <FlatList
                        data={habit}
                        renderItem={({ item }) => (
                            <View key={item._id}>
                                <Tasks task={item} />
                            </View>
                        )}
                        keyExtractor={(item) => item._id}
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>)}

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
    },
    icon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#ff6896",
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
        top: 5

    },
    addTaskcontainer: {
        flex: 1,
        width: "100%",

        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",

        paddingHorizontal: 20, // Added padding for better spacing
    },
    addTask: {
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
    input: {
        height: 50,
        width: "75%",
        backgroundColor: "#fff",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "gray",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        paddingHorizontal: 20,
        marginRight: 5// Added padding for better spacing
    },
})
