import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Slot } from 'expo-router'
import { useAuth } from '../../providers/AuthProvider';

const ProtectedLayout = () => {
    const { isAthenticated } = useAuth();
    if (!isAthenticated) {
        return <Redirect href={"/login"} />
    }
    return (
        <Slot />
    )
}

export default ProtectedLayout