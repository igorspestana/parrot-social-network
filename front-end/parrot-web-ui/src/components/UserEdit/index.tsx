import Text from '../Text';
import { TextInput } from '../TextInput';
import { User } from 'phosphor-react';
import { Lock } from 'phosphor-react';
import Button from '../Button';
import { FormEvent, useEffect, useState } from 'react';
import api from '../../services/api';
import { UserModel } from "../../Model/User"


interface UserEditFormElements extends HTMLFormControlsCollection {
  user: HTMLInputElement;
  password: HTMLInputElement;
  profile: {
    name: HTMLInputElement
  };
  imageUrl?: HTMLInputElement;
}

interface UserEditFormElement extends HTMLFormElement {
  readonly elements: UserEditFormElements
}


function UserEdit() {

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
    password: ""
  })

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get(`/users/me`, {
          headers: { authorization: `Bearer ${token}` }
        });

        setUser(response.data)
        setFormData({
          user: response.data.user,
          password: response.data.password
        })
      } catch (err) {
        console.error(err)
        alert('Erro ao buscar o usuário')
      }
    }
    getUser()
  }, [token, user])

  async function handleSubmit(event: FormEvent<UserEditFormElement>) {
    event.preventDefault();

    const form = event.currentTarget
    const userUpdate = {
      _id: "",
      user: form.elements.user.value,
      password: form.elements.password.value,
    }

    const data = new FormData();
    data.append("user", form.elements.user.value);
    data.append("password", form.elements.password.value);

    try {
      const response = await api.put("/users/me", data, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      alert("Usuário atualizado");
    } catch (err) {
      console.error(err)
      alert('Erro ao atualizar o usuário')
    }
  };

  return (
    <div className='basis-5/6'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 items-stretch w-full max-w-sm mt-10 ml-4'>

        <label htmlFor="user" className='flex flex-col gap-2'>
          <Text>Endereço de e-mail</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <User />
            </TextInput.Icon>
            <TextInput.Input
              id='user'
              type='text'
              placeholder={userState.user}
            />
          </TextInput.Root>
        </label>

        <label htmlFor="password" className='flex flex-col gap-2'>
          <Text>Sua senha</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <Lock />
            </TextInput.Icon>
            <TextInput.Input
              id='password'
              type='password'
              placeholder='*******'
            />
          </TextInput.Root>
        </label>

        <div className="flex flex-1 gap-2">
          <Button onClick={() => window.location.reload()}>Cancelar</Button>
          <Button type="submit">Salvar</Button>
        </div>
      </form>

    </div >
  );
}

export default UserEdit;