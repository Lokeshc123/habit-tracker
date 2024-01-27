import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import CheckBox from 'expo-checkbox'
import { Entypo, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { UserType } from '../context/UserContext';
import { update_task } from '../api/functions';

const Tasks = ({ task }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [edit, setEdit] = useState(false);
    const { userId, setUserId, completedTasks, setCompletedTasks } = useContext(UserType);
    useEffect(() => {
        if (completedTasks.includes(task.title)) {
            setToggleCheckBox(true);
        }
    }, [completedTasks, task.title]);

    const handleDel = () => {

        try {
            axios.delete(`http://10.35.138.26:5000/user/${userId}/habit/${task._id}`).then((res) => {
                console.log(res.data);
            }
            ).catch((err) => {
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
    const task_Id = task._id;
    const handleEdit = () => {
        const update = {
            title: "Water",
            change: 0,
            completedDays: 0,
            WeeklyAvg: 0,
            CurrentStreak: 0,
            LongestStreak: 0,
        }
        try {
            update_task(update, userId, task_Id);
        } catch (err) {
            if (err.response && err.response.data) {
                console.log(err.response.data);
            } else {
                console.log(err.message); // Or handle the error in another way
            }
        }
    };

    const handleToggleCheckBox = () => {
        setToggleCheckBox(!toggleCheckBox);

        if (!toggleCheckBox) {
            // If checking the checkbox
            const updatedTask = {
                completedDays: task.completedDays + 1,
                WeeklyAvg: ((task.completedDays + 1) / 7).toFixed(2),
                CurrentStreak: task.CurrentStreak + 1,
                LongestStreak: Math.max(task.CurrentStreak + 1, task.LongestStreak),
            };

            setCompletedTasks([...completedTasks, task.title]);
            try {
                update_task(updatedTask, userId, task_Id);
            } catch (err) {
                console.error(err.message);
            }
        } else {
            // If unchecking the checkbox
            const updatedTask = {
                ...task,
                completedDays: Math.max(task.completedDays - 1, 0),
                WeeklyAvg: Math.max((Math.max(task.completedDays - 1, 0)) / 7, 0).toFixed(2),
                CurrentStreak: Math.max(task.CurrentStreak - 1, 0),
            };

            setCompletedTasks(completedTasks.filter((title) => title !== task.title));
            try {
                update_task(updatedTask, userId, task_Id);
            } catch (err) {
                console.error(err.message);
            }
        }
    };


    return (
        <View style={[styles.container, toggleCheckBox && styles.containerSelected]}>
            <View style={{ flexDirection: "row" }}>
                {toggleCheckBox ? (
                    <LinearGradient
                        colors={['#F8BBD0', '#FF4081', '#FFEB3B']}
                        style={styles.gradient}
                    >
                        <CheckBox
                            disabled={false}
                            value={toggleCheckBox}

                            color={"transparent"}
                        />
                    </LinearGradient>
                ) : (
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={handleToggleCheckBox}
                    />
                )}
                <Text style={styles.txt}>{task.title}</Text>
            </View>
            {!edit ? (
                <Entypo name="dots-three-horizontal" size={24} color="grey" onPress={() => setEdit(true)} />
            ) : (
                <View style={{ flexDirection: "row" }}>
                    <Entypo name="edit" size={24} color="grey" onPress={() => handleEdit()} />
                    <AntDesign name="delete" size={24} color="grey" style={{ marginLeft: 5, marginRight: 5 }} onPress={handleDel} />
                    <Entypo name="cross" size={24} color="grey" onPress={() => setEdit(false)} />
                </View>
            )}
        </View>
    )
}
export default React.memo(Tasks); // to prevent unnecessary re-renders

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
    containerSelected: {
        backgroundColor: "#cfd1e6", // Change the background color when selected
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