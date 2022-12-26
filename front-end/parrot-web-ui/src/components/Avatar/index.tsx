import Heading from '../Heading'
import Text from '../Text';
import { UserCircle } from 'phosphor-react';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { UserModel } from "../../Model/User"

function Avatar() {

    const token = localStorage.getItem("accessToken")

    const userCurrent = {
        _id: "",
        user: "",
        password: "",
        profile: {
            name: "",
            image: true,
            imageUrl: "",
        },
    }
    const user = localStorage.getItem("user")

    const [userState, setUser] = useState<UserModel>(userCurrent)
    const [formData, setFormData] = useState({
        user: "",
    })

    useEffect(() => {
        const getUser = async () => {
            try {
                const requestUser = await api.get(`/users/me`, {
                    headers: { authorization: `Bearer ${token}` }
                });
                setUser(requestUser.data)
                setFormData({
                    user: requestUser.data.user,
                })
            } catch (err) {
                console.error(err)
                alert('Erro ao buscar o usuário')
            }
        }
        getUser()
    }, [token, user])

    return (
        <div className='basis-5/6 '>
            <Heading className="border-b border-slate-400 mt-4">
                <div className="flex flex-row items-center ml-5 my-4">
                    <UserCircle size={48} weight='light' className="text-slate-50" />
                    <Text className="font-extrabold ml-2">{userState.profile.name}</Text>
                </div>
            </Heading>
        </div >
    );
}

export default Avatar;