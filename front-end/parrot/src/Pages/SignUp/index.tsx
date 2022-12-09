import AuthForm from "../../components/AuthForm";
import api from '../../services/api';

function SignUp() {
    async function handleRegister(user: string, password: string) {
        const data = await api.post('/api/security/login', {
            user,
            password
        });
        console.log(data);
    }

    return (
        <AuthForm
            formTitle='Faça o cadastro e comece a usar!'
            submitFormButtonText='Cadastrar'
            submitFormButtonAction={handleRegister}
            linkDescription='Já possui conta? Crie uma agora!'
            routeName='/'
        />
    );
}

export default SignUp;