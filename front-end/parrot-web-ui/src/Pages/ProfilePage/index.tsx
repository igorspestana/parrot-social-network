import Profile from "../../components/Profile"
import Menu from "../../components/Menu"
import Avatar from "../../components/Avatar"
import Text from '../../components/Text';

function ProfilePage() {

    return (
        <div className="w-screen h-screen flex">
            <Menu />
            <div className="flex-rol mt-4 w-full overflow-y-auto scroll-smooth">
                <Text size='lg' className="font-extrabold ml-5">Perfil</Text>
                <Avatar />
                <Profile />
            </div>
        </div>)

}

export default ProfilePage