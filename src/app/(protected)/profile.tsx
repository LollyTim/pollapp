import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { Redirect } from 'expo-router'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../providers/AuthProvider'

const ProfileScreen = () => {
    const { session, user } = useAuth();


    return (
        <View>
            <Text>User id: {user?.id} </Text>

            <Button title='Sign Out' onPress={() => supabase.auth.signOut()} />
        </View>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({});