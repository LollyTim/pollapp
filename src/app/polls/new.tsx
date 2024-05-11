import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Redirect, Stack } from 'expo-router'
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../providers/AuthProvider';

const CreatePoll = () => {

    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState(["", ""])
    const { session, user } = useAuth();

    const createpoll = () => { console.warn("Create") }
    if (!user) {
        return <Redirect href={"/login"} />
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Create Poll" }} />
            <Text style={styles.label}>Title</Text>
            <TextInput placeholder='Type your question here' value={question} onChangeText={setQuestion} style={styles.input} />

            <Text style={styles.label}>Options</Text>

            {options.map((option, index) => (
                <View key={index} style={{ justifyContent: "center" }}>
                    <TextInput value={option} onChangeText={(text) => {
                        const update = [...options];
                        update[index] = text;
                        setOptions(update)
                    }} placeholder={`option ${index + 1}`} style={styles.input} />
                    <Feather name="x" size={18} color="gray" style={{ position: "absolute", right: 10 }} onPress={() => {
                        //delete option based on index 
                        const update = [...options];
                        update.splice(index, 1)
                        setOptions(update)
                    }} />
                </View>
            ))}
            <Button title='Add options' onPress={() => setOptions([...options, ""])} />
            <Button onPress={createpoll} title='Create Poll' />
        </View>
    )
}

export default CreatePoll

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 5
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 10,

    },
    input: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5
    }
})