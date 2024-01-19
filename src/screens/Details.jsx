import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { LineChart } from 'react-native-wagmi-charts';
import tasks from '../data/Data';
import OverView from '../components/OverView';
const Details = () => {
    const data = [
        { day: 'Mo', value: 10 },
        { day: 'Tu', value: 20 },
        { day: 'We', value: 30 },
        { day: 'Th', value: 0 },
        { day: 'Fr', value: 50 },
        { day: 'Sa', value: 60 },
        { day: 'Su', value: 70 },
    ];

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
                    data={tasks}
                    renderItem={({ item }) => <OverView task={item} />}
                    keyExtractor={item => item.id}
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
