import * as Dialog from '@radix-ui/react-dialog'
import api from '../../services/api'
import { FormEvent } from "react"
import Button from '../Button'
import { TextInput } from '../TextInput'

interface CreatePostDialogProps {
    closeDialog: () => void
}

interface PostFormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement;
    description: HTMLInputElement;
}

interface PostFormElement extends HTMLFormElement {
    readonly elements: PostFormElements
}


function CreatePostDialog({ closeDialog }: CreatePostDialogProps) {
    const token = localStorage.getItem('accessToken')

    async function handleSubmit(event: FormEvent<PostFormElement>) {
        event.preventDefault()
        const form = event.currentTarget

        const newPost = {
            title: form.elements.title.value,
            description: form.elements.description.value
        }
        try {
            await api.post('/posts', newPost, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            closeDialog()
        } catch (err) {
            console.error(err)
            alert('Erro ao criar o Post')
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25'>
                <Dialog.Title className='text-3xl font-black'>Novo Post</Dialog.Title>
                <form className='mt-8 flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="title" className='font-semibold'>
                            Título do Post
                        </label>
                        <TextInput.Input
                            id='title'
                            placeholder='Qual o título do Post?'
                        />
                        <label htmlFor="description" className='font-semibold'>
                            O que você está pensando?
                        </label>
                        <TextInput.Input
                            id='description'
                            placeholder='Diga o que está pensando...'
                        />
                    </div>
                    <footer className='mt-6 flex justify-end gap-4'>
                        <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                            Fechar
                        </Dialog.Close>
                        <Button type='submit' className='flex-none w-48'>Postar</Button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}

export default CreatePostDialog