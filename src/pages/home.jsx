import { useAuthContext } from '@/contexts/auth'

const HomePage = () => {
    const { isInitializing, user } = useAuthContext()
    
    if (isInitializing) {
        return <div>Carregando...</div>
    }
    if (!user) {
        return <Navigate to="/login" />
    }
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    )
}

export default HomePage