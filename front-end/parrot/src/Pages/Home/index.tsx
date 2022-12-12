import * as Dialog from '@radix-ui/react-dialog'
import logo_menu from '../../assets/logo_menu.svg'
import CreatePostButtom from '../../components/CreatePostButtom'
import CreatePostDialog from '../../components/CreatePostDialog'
import Menu from '../../components/Menu'
import Text from '../../components/Text'

function Home() {
    return (
        <div className="w-screen h-screen flex">
            <div className="basis-1/6 border-r border-slate-400 ml-4 pt-4">
                <div className='flex items-center ml-4'>
                    <img src={logo_menu} alt="Logo" />
                    <Text className="font-extrabold ml-4">Parrot</Text>
                </div>
                <Menu />
                <Dialog.Root>
                    <CreatePostButtom />
                    <CreatePostDialog />
                </Dialog.Root>
            </div>
            <div className="basis-5/6"></div>
        </div>)
}

export default Home