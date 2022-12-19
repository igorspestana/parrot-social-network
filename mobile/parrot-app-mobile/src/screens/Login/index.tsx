import React from 'react';
import { View, Image } from 'react-native';
import { Heading } from '../../components/Heading';
import { Input } from '../../components/Input';
import { User } from 'phosphor-react-native';

import logo from '../../../assets/images/logo.png'

import { styles } from './styles'
import { THEME } from '../../theme';

export function Login() {
    return (
        <View style={styles.container}>
            <Image source={logo} style={logo} resizeMethod="scale" />
            <Heading title='Sysmap Parrot' subtitle='Faça login e comece a usar' />
            <Input.Root>
                <Input.Icon>
                    <User color={THEME.COLORS.INPUT} />
                </Input.Icon>
                <Input.Input></Input.Input>
            </ Input.Root>
        </View>
    )
}