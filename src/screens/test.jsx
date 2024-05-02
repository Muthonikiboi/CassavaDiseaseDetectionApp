import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from expo/vector-icons

const ExampleComponent = ({ email, onChangeEmail }) => {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={24} color="black" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                    placeholder="Email"
                    placeholderTextColor="#A9A9A9"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#A9A9A9',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
});

export default ExampleComponent;
