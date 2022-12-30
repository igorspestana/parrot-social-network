import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserCircle } from 'phosphor-react-native'

import { styles } from './styles'
import { THEME } from '../../theme'

import { Context as AuthContext } from '../../context/AuthContext'
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar'
import { Button } from '../../components/Button'



export function Profile() {
    const { user, logout } = useContext(AuthContext)

    return (

        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar
                barStyle='light-content'
                backgroundColor={THEME.COLORS.BACKGROUND_800}
            />
            <View style={styles.container}>
                <View style={styles.heading}>
                    <UserCircle color='white' size={48} weight='thin' />
                    <Text style={styles.userNameText}>{user}</Text>
                </View>
                <Button
                    onPress={logout}
                    title={'Sair'}
                />
            </View>
        </SafeAreaView>
    )
}