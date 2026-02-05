import { useAuthContext } from '@/contexts/auth'
import Header from '@/components/header'

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
            <Header />
            <div className="flex justify-center items-center h-screen w-full">  
                <h2> dashboard</h2>
                <div>

                </div>
            </div>
        </div>
    )
}

export default HomePage