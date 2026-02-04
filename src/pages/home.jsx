import { useAuthContext } from '@/contexts/auth'

const HomePage = () => {
    const { isInitializing, user, logout } = useAuthContext()
    
    if (isInitializing) {
        return <div>Carregando...</div>
    }
    if (!user) {
        return <Navigate to="/login" />
    }
    return (
        <div>
            <h1>Home Page</h1>
            <Button onClick={() => logout()}>Sair</Button>
        </div>
    )
}

export default HomePage