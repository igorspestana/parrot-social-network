import { Link } from 'react-router-dom';
import Heading from '../../components/Heading'
import Text from '../../components/Text';
import { TextInput } from '../../components/TextInput';
import { User, UserCircle } from 'phosphor-react';
import { Lock } from 'phosphor-react';
import Button from '../../components/Button';
import { FormEvent, useState } from 'react';
import api from '../../services/api';

//Interface para encher os parâmetros
interface AuthFormProps {
  formTitle: string;
  submitFormButtonText: string;
  submitFormButtonAction: (auth: Auth) => void;
  linkDescription: string;
  routeName: string;
  showNameInput?: boolean;
}

interface AuthFormElements extends HTMLFormControlsCollection {
  user: HTMLInputElement;
  password: HTMLInputElement;
  name?: HTMLInputElement;
  //email?: HTMLInputElement;
  imageUrl?: HTMLInputElement;
}

interface AuthFormElement extends HTMLFormElement {
  readonly elements: AuthFormElements
}

export interface Auth {
  user: string;
  name?: string;
  //email?: string;
  password: string;
  image?: boolean;
  imageUrl?: string;
}

function ProfileEdit({
  formTitle,
  submitFormButtonText,
  submitFormButtonAction,
  linkDescription,
  routeName,
  showNameInput,
}: AuthFormProps) {

  const [selectedFile, setSelectedFile] = useState<File>()
  const token = localStorage.getItem("accessToken")
  const user = localStorage.getItem("user")

  async function handleSubmit(event: FormEvent<AuthFormElement>) {
    event.preventDefault()
    const form = event.currentTarget

    if (selectedFile) {
      const data = new FormData()
      data.append("user", form.elements.user.value)
      data.append("password", form.elements.password.value)
      data.append("name", form.elements.name.value)
      data.append("imageUrl", form.elements.imageUrl.value)
      data.append("file", selectedFile)
      /*         if(selectedFile){
                  data.append("file", selectedFile)
               } */

      try {
        const response = await api.put("/user/me", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

      } catch (err) {
        console.log(err)
        alert("Erro ao criar post")
      }

    }

    const auth = {
      user: form.elements.user.value,
      password: form.elements.password.value,
      name: form.elements.name?.value,
      //email: form.elements.email?.value,
      imageUrl: form.elements.imageUrl?.value

    }

    submitFormButtonAction(auth)
  }

  return (
    <div className='basis-5/6 '>
      <Heading className="border-b border-slate-400 mt-4">
        <Text size='lg' className="font-extrabold ml-5">Editar Perfil</Text>
        <div className="flex flex-row items-center ml-5 my-4">
          <UserCircle size={48} weight='light' className="text-slate-50" />
          <Text className="font-extrabold ml-2">{user}</Text>
        </div>
      </Heading>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 items-stretch w-full max-w-sm mt-10 ml-4'>
        {showNameInput && (
          <label htmlFor="name" className='flex flex-col gap-2'>
            <Text>Nome</Text>
            <TextInput.Root>
              <TextInput.Icon>
                <User />
              </TextInput.Icon>
              <TextInput.Input
                id='name'
                type='text'
                placeholder='Digite o nome do usuário'
              />
            </TextInput.Root>
          </label>
        )}

        <label htmlFor="user" className='flex flex-col gap-2'>
          <Text>Endereço de e-mail</Text>
          <TextInput.Root>
            <TextInput.Icon>
              <User />
            </TextInput.Icon>
            <TextInput.Input
              id='user'
              type='text'
              placeholder='Digite seu login'
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

        <Button type='submit' className='mt-4'>{submitFormButtonText}</Button>
      </form>


      <footer className='flex-col items-center gap-4 mt-8'>
        < Text asChild size='sm'>
          < Link to={routeName} className='text-gray-400 underline hover:text-gray-200'
          >
            {linkDescription}
          </ Link>
        </Text>
      </footer>
    </div >
  );
}

export default ProfileEdit;