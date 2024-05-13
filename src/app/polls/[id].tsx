import {
    ActivityIndicator,
    Alert,
    Button,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useEffect } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Poll, Vote } from "../../types/db";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../providers/AuthProvider";

const PollDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [poll, setPoll] = useState<Poll>(null);
    const [userVote, setUserVote] = useState<Vote>(null);

    const [selected, setSelected] = useState("");

    const { user } = useAuth();

    useEffect(() => {
        const fetchPolls = async () => {
            let { data, error } = await supabase
                .from("polls")
                .select("*")
                .eq("id", Number.parseInt(id))
                .single();
            if (error) {
                Alert.alert("Error Fetching Data");
            }
            setPoll(data);
        };

        const fetchUserVote = async () => {
            if (!user) {
                return;
            }
            let { data, error } = await supabase
                .from("votes")
                .select("*")
                .eq("poll_id", Number.parseInt(id))
                .eq("user_id", user.id)
                .limit(1)
                .single();

            setUserVote(data);
            if (data) {
                setSelected(data.option);
            }
        };
        fetchPolls();
        fetchUserVote();
    }, []);

    const vote = async () => {
        console.warn("Vote: ", selected);
        const newVote = {
            option: selected,
            poll_id: poll.id,
            user_id: user?.id,
        };
        if (userVote) {
            newVote.id = userVote.id;
        }

        const { data, error } = await supabase
            .from("votes")
            .upsert([
                {
                    id: userVote?.id || undefined,
                    option: selected,
                    poll_id: poll.id,
                    user_id: user.id,
                },
            ])
            .select()
            .single();
        if (error) {
            Alert.alert("Failed to vote");
        } else {
            setUserVote(data);
            Alert.alert("Thank you for your vote ");
        }
    };
    if (!poll) {
        return <ActivityIndicator />;
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Poll voting" }} />
            <Text style={styles.question}>{poll.question}</Text>

            <View style={{ gap: 5 }}>
                {poll.options.map((option) => (
                    <Pressable
                        onPress={() => setSelected(option)}
                        key={option}
                        style={styles.optionsContainer}
                    >
                        <Feather
                            name={option === selected ? "check-circle" : "circle"}
                            size={24}
                            color={option === selected ? "green" : "gray"}
                        />
                        <Text>{option}</Text>
                    </Pressable>
                ))}
            </View>
            <Button onPress={vote} title="Vote" />
        </View>
    );
};

export default PollDetails;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 10,
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
        gap: 10,
    },
});
