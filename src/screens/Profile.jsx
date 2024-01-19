import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Info from '../components/Info'

const Profile = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profile}>
                <View style={styles.intro}>
                    <Image source={require('../../assets/Img/pic.jpeg')} style={{ width: 150, height: 150, borderRadius: 50 }} />
                    <Text style={{ fontSize: 30, fontWeight: "bold", color: "#444d95", marginTop: 10 }}>Lokesh Chauhan</Text>
                </View>
                <View style={styles.details}>
                    <View style={styles.info}>
                        <Info main_txt="Login Details" sub_txt="User name,Password" icon="user" />
                        <Info main_txt="Help" sub_txt="FAQ's, Questions asked" icon="help" />
                        <Info main_txt="Information" sub_txt="Terms and conditions" icon="paper-plane" />
                        <Info main_txt="About me" sub_txt="Reach us,Share App" icon="share" />
                    </View>
                </View>
                <TouchableOpacity style={styles.btn}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e0e2f8",

    },
    profile: {
        width: "100%",
        height: "95%",
        top: 70,
        backgroundColor: "#fff",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        alignItems: "center",
        padding: 50,

    },
    intro: {
        width: "100%",
        height: "20%",
        justifyContent: "center",
        alignItems: "center",
        top: 70,
    },
    details: {
        width: "100%",
        height: "70%",
        top: 70,

        justifyContent: "center",
        alignItems: "center",
    },
    btn: {
        width: "100%",
        height: "10%",
        backgroundColor: "#ff6896",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",

    },
    info: {
        height: "60%",
        width: "90%",
        backgroundColor: "#e0e2f8",
        top: -20,
        borderRadius: 20,
    }
})
