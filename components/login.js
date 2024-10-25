import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [focusIndex, setFocusIndex] = useState(null);

    const handleLogin = (navigation) => {
        // Ở đây bạn sẽ thêm logic xác thực đăng nhập thực tế
        if (username === "user" && password === "password") {
            navigation.replace("Home");
        } else if (username === "" || password === "") {
            alert("Chưa nhập đủ thông tin!");
        } else {
            alert("Sai tên đăng nhập hoặc mật khẩu!");
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Image source={require("../assets/logo.png")} style={styles.logo} />
            </View>
            <Text style={styles.title}>Đăng nhập với tài khoản QLDT</Text>

            <StyledView className="relative my-4 w-[85%]">
                <StyledTextInput
                    className="bg-transparent text-white 
                    rounded-full py-3 px-12 text-base font-medium"
                    placeholder="Email hoặc mã số SV/CB"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="#e6e8e6"
                    onFocus={() => setFocusIndex(0)}
                    style={[focusIndex == 0 ? styles.inputFocused : styles.input]}
                />
                <View
                    className="flex-1 justify-center items-center absolute 
                left-5 top-1/2 -translate-y-3"
                >
                    <Ionicons name="person" size={22} color="white" />
                </View>
            </StyledView>
            <StyledView className="relative my-3 w-[85%]">
                <StyledTextInput
                    className="bg-transparents text-white 
                    rounded-full py-3 px-12 text-base font-medium"
                    placeholder="Mật khẩu"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#e6e8e6"
                    onFocus={() => setFocusIndex(1)}
                    style={[focusIndex == 1 ? styles.inputFocused : styles.input]}
                />
                <View className="absolute top-1/2 -translate-y-[10px] left-5">
                    <Fontisto name="locked" size={20} color="white" />
                </View>
                <View className="absolute top-1/2 right-4 -translate-y-[10px]">
                    <Ionicons name="eye-off-outline" size={20} color="white" />
                </View>
            </StyledView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.loginButton} className="my-5" onPress={() => handleLogin(navigation)}>
                    <Text style={styles.loginButtonText}>ĐĂNG NHẬP</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.fingerprintButton}>
                    <Ionicons name="finger-print" size={40} color="white" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity>
                <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('RegisterScreen')}
                style={{ marginTop: 10 }}
            >
                <Text style={styles.forgotPassword}>
                    Chưa có tài khoản? Đăng ký
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#b91c1c",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    logo: {
        width: 150,
        height: 30,
        marginBottom: 90,
    },

    title: {
        color: "white",
        fontSize: 18,
        marginBottom: 30,
        textAlign: "center",
    },

    input: {
        width: "100%",
        backgroundColor: "#b91c1c",
        borderRadius: 25,
        padding: 10,
        // marginBottom: 15,
        color: "white",
        borderWidth: 1,
        borderColor: "#dbd9d9",
    },

    inputFocused: {
        width: "100%",
        backgroundColor: "#b91c1c",
        borderRadius: 25,
        padding: 10,
        // marginBottom: 15,
        color: "white",
        borderWidth: 2,
        borderColor: "white",
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
    },

    loginButton: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
        width: "80%",
        alignItems: "center",
    },

    loginButtonText: {
        color: "#b91c1c",
        fontSize: 16,
        fontWeight: "bold",
    },

    fingerprintButton: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },

    forgotPassword: {
        color: "white",
    },
});