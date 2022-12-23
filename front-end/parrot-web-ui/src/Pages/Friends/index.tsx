import Menu from '../../components/Menu'
import Profiles from '../../components/Profiles'
import Avatar from "../../components/Avatar"
import Text from '../../components/Text';

function Friends() {
    return (
        <div className="w-screen h-screen flex">
            <Menu />
            <div className="flex-rol mt-4 w-full overflow-y-auto scroll-smooth">
                <Text size='lg' className="font-extrabold ml-5">Amigos</Text>
                <Avatar />
                <Profiles />
            </div>
        </div>
    )
}

export default Friends