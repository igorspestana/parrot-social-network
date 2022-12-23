import { Link, useNavigate } from "react-router-dom"
import Button from "../Button"
function Profile() {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.clear()
        navigate("/")
    }

    return (
        <div className="basis-5/6">
            <div className="mt-4 w-full flex flex-col items-stretch">
                <Link to={`/profileeditpage`}>
                    <Button className="ml-4 mb-4 max-w-sm" >
                        Editar Perfil
                    </Button>
                </Link>
                <Button className="ml-4 max-w-sm" onClick={handleLogout}>Sair</Button>
            </div>
        </div >
    )

}

export default Profile