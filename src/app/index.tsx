import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function HomeScreen() {
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        const fetchPolls = async () => {
            // console.warn("Fetching....")


            let { data, error } = await supabase
                .from('polls')
                .select('*')
            if (error) {
                Alert.alert("Error Fetching Data")
            }
            setPolls(data)
        }
        fetchPolls()
    }, [setPolls]);
    return (
        <>
            <Stack.Screen options={{
                title: "Polls",
                headerRight: () => (<Link href="/polls/new"><AntDesign name="plus" size={24} color="gray" /></Link>),
                headerLeft: () => (<Link href="/profile"><AntDesign name="user" size={24} color="gray" /></Link>)
            }} />
            <FlatList
                contentContainerStyle={styles.container}
                data={polls}

                renderItem={({ item }) => (
                    <Link href={`/polls/${item.id}`} style={styles.pollontainer} >
                        <Text style={styles.pollTitlt}>
                            {item.id}: Example poll question
                        </Text>
                    </Link>

                )} />

        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        gap: 6

    },
    pollontainer: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 5,
    },
    pollTitlt: {
        fontSize: 16,
        fontWeight: "bold"

    }
});
