import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Slot } from 'expo-router'
import { useAuth } from '../../providers/AuthProvider';

const AuthLayout = () => {
    const { isAthenticated } = useAuth();
    if (isAthenticated) {
        return <Redirect href={"/profile"} />
    }
    return (
        <Slot />
    )
}

export default AuthLayout