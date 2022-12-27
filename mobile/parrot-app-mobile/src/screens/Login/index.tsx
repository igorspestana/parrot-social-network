import React, { useState } from 'react';
import { KeyboardAvoidingView, Image, Platform, Text } from 'react-native';
import { User, Lock } from 'phosphor-react-native';

import { Heading } from '../../components/Heading';
import { Input } from '../../components/Input';
import { Spacer } from '../../components/Spacer';
import { Button } from '../../components/Button';
import { Auth, AuthForm } from '../../components/AuthForm';

import logo from '../../../assets/images/logo.png'

import { styles } from './styles'
import { THEME } from '../../theme';

import api from '../../services/api'

export function Login() {
    async function handleLogin(auth: Auth) {
        try {
            const response = await api.post('/security/login', auth)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <AuthForm
            formTitle='Faça login e comece a usar'
            submitFormButtonText='Entrar'
            submitFormButtonAction={handleLogin}
            linkDescription='Não possui conta? Cria uma agora!'
            routeName=""
        />
    )
}