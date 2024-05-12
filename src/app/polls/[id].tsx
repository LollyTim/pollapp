import { ActivityIndicator, Alert, Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Poll } from '../../types/db';
import { supabase } from '../../lib/supabase';


const PollDetails = () => {

    const [poll, setPoll] = useState<Poll>(null)
    const { id } = useLocalSearchParams<{ id: string }>()

    const [selected, setSelected] = useState("React Native FTM")

    useEffect(() => {
        const fetchPolls = async () => {
            console.log("Fetching....")

            let { data, error } = await supabase.from("polls").select("*").eq('id', Number.parseInt(id)).single();
            if (error) {
                Alert.alert("Error Fetching Data");
            }
            setPoll(data);
        };
        fetchPolls();
    }, []);

    const vote = () => {
        console.warn("Vote: ", selected)
    }
    if (!poll) {
        return <ActivityIndicator />
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Poll voting" }} />
            <Text style={styles.question}>{poll.question}</Text>

            <View style={{ gap: 5 }}>
                {poll.options.map((option) => (
                    <Pressable onPress={() => setSelected(option)} key={option} style={styles.optionsContainer}>
                        <Feather name={option === selected ? "check-circle" : "circle"} size={24} color={option === selected ? "green" : "gray"} />
                        <Text>{option}</Text>
                    </Pressable>
                ))}
            </View>
            <Button onPress={vote} title='Vote' />
        </View>
    )
}

export default PollDetails

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 10

    },
    question: {
        fontSize: 20,
        fontWeight: "semibold",

    },
    optionsContainer: {
        backgroundColor: "white",
        padding: 5,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    }


})