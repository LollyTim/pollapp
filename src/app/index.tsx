import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';


const polls = [{ id: 1 }, { id: 2 }, { id: 3 }]
export default function HomeScreen() {
    return (
        <>
            <Stack.Screen options={{ title: "Polls" }} />
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
