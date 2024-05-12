import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Redirect, Stack, router } from 'expo-router'
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../providers/AuthProvider';
import { supabase } from '../../lib/supabase';

const CreatePoll = () => {

    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(["", ""]);
    const [error, setError] = useState("")
    const { session, user } = useAuth();

    const createpoll = async () => {
        setError("")
        if (!question) {
            setError("Please enter a question")
            return;
        }
        const validOptions = options.filter(o => !!o);
        if (validOptions.length < 2) {
            setError("Please provide at least 2 valid options")
            return;
        }


        const { data, error } = await supabase
            .from('polls')
            .insert([
                { question, options },
            ])
            .select()
        if (error) {
            Alert.alert("Failed to create the poll")
            console.log(error)
        }
        router.back();

        console.warn("Create");

    }
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
            <Text style={{ color: "red", fontSize: 18 }}>{error}</Text>
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