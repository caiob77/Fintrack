import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

const AVATAR_OPTIONS = [
    {
        id: 1,
        name: 'Avatar 1',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        emoji: '👨'
    },
    {
        id: 2,
        name: 'Avatar 2',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
        emoji: '👩'
    },
    {
        id: 3,
        name: 'Avatar 3',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
        emoji: '🧑'
    },
    {
        id: 4,
        name: 'Avatar 4',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
        emoji: '👴'
    },
    {
        id: 5,
        name: 'Avatar 5',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
        emoji: '👵'
    },
    {
        id: 6,
        name: 'Avatar 6',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
        emoji: '🧔'
    },
    {
        id: 7,
        name: 'Avatar 7',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bella',
        emoji: '👱‍♀️'
    },
    {
        id: 8,
        name: 'Avatar 8',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver',
        emoji: '👨‍🦰'
    },
]

const STORAGE_KEY = 'fintrack_user_avatar'

export const AvatarContext = createContext({
    selectedAvatar: null,
    avatarOptions: AVATAR_OPTIONS,
    selectAvatar: () => {},
    getAvatarUrl: () => null,
})

export const useAvatarContext = () => {
    const context = useContext(AvatarContext)
    if (!context) {
        throw new Error('useAvatarContext deve ser usado dentro de AvatarContextProvider')
    }
    return context
}

export const AvatarContextProvider = ({ children }) => {
    const [selectedAvatar, setSelectedAvatar] = useState(null)

    // Carregar avatar salvo do localStorage ao inicializar
    useEffect(() => {
        const savedAvatar = localStorage.getItem(STORAGE_KEY)
        if (savedAvatar) {
            try {
                const parsedAvatar = JSON.parse(savedAvatar)
                setSelectedAvatar(parsedAvatar)
            } catch (error) {
                console.error('Erro ao carregar avatar salvo:', error)
            }
        } else {
            // Se não houver avatar salvo, usar o primeiro como padrão
            setSelectedAvatar(AVATAR_OPTIONS[0])
        }
    }, [])

    const selectAvatar = (avatar) => {
        setSelectedAvatar(avatar)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(avatar))
        toast.success('Avatar atualizado com sucesso!')
    }

    const getAvatarUrl = () => {
        return selectedAvatar?.url || AVATAR_OPTIONS[0].url
    }

    return (
        <AvatarContext.Provider
            value={{
                selectedAvatar,
                avatarOptions: AVATAR_OPTIONS,
                selectAvatar,
                getAvatarUrl,
            }}
        >
            {children}
        </AvatarContext.Provider>
    )
}
