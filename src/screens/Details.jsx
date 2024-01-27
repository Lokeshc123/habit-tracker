import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { LineChart } from 'react-native-wagmi-charts';
import tasks from '../data/Data';
import OverView from '../components/OverView';
import { UserType } from '../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode"
import axios from 'axios';
const Details = () => {
    const [habit, setHabit] = useState([]);
    const { userId, setUserId, completedTasks } = useContext(UserType);
    const data = [
        { day: 'Mo', value: 10 },
        { day: 'Tu', value: 20 },
        { day: 'We', value: 30 },
        { day: 'Th', value: 0 },
        { day: 'Fr', value: 50 },
        { day: 'Sa', value: 60 },
        { day: 'Su', value: 70 },
    ];
    useEffect(() => {
        const fetchHabit = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                const decodedToken = jwt_decode(token);
                const user = decodedToken.userId;
                setUserId(user);
                axios.get(`http://10.35.138.26:5000/user/${user}/habits`)
                    .then((res) => {
                        console.log(res.data.habits);
                        setHabit(res.data.habits);
                    })
                    .catch((err) => {
                        console.log(err);
                    });



            } catch (err) {
                if (err.response && err.response.data) {
                    console.log(err.response.data);
                } else {
                    console.log(err.message); // Or handle the error in another way
                }
            }
        };
        fetchHabit();
    }, [completedTasks, habit]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header headerTxt="Progress" dateTxt="Since 20 Dec 2003" icon="cloud" />
            </View>
            <View style={styles.charts}>
                <LineChart.Provider data={data}>
                    <LineChart height={250}>

                        <LineChart.Path width={4} color='red' />
                        <LineChart.CursorCrosshair>
                            <LineChart.Tooltip />
                        </LineChart.CursorCrosshair>
                    </LineChart>
                </LineChart.Provider>
                <View style={styles.labelsContainer}>
                    {data.map((point, index) => (
                        <Text key={index} style={styles.label}>
                            {point.day}
                        </Text>
                    ))}
                </View>
            </View>
            <View style={styles.overview}>
                <FlatList
                    data={habit}
                    renderItem={({ item }) => <OverView task={item} />}
                    keyExtractor={item => item._id}
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>
        </SafeAreaView>
    );
};

export default Details;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#e0e2f8',
    },
    header: {
        width: '100%',
        height: '10%',
        padding: 5,
        marginTop: 10,
    },
    charts: {
        width: '100%',
        height: '45%',

    },
    labelsContainer: {
        left: -5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    label: {
        fontSize: 12,
        color: '#333',
        fontWeight: 'bold',
    },
    overview: {
        width: '100%',
        height: '45%',

    }
});
