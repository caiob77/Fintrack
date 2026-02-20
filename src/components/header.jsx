import { Card, CardContent } from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthContext } from '@/contexts/auth'
import { useAvatarContext } from '@/contexts/avatar'
import { Button } from '@/components/ui/button'
import { LogOutIcon, ChevronDownIcon, UserIcon } from 'lucide-react'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import logoUrl from '@/assets/images/logo.svg'

const Header = () => {
    const { user, logout } = useAuthContext()
    const { selectedAvatar, avatarOptions, selectAvatar, getAvatarUrl } = useAvatarContext()
    const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false)
    const firstName = user?.firstName ?? ''
    const lastName = user?.lastName ?? ''
    const firstInitial = firstName.charAt(0)
    const lastInitial = lastName.charAt(0)
    
    const handleAvatarSelect = (avatar) => {
        selectAvatar(avatar)
        setIsAvatarDialogOpen(false)
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'q') {
                e.preventDefault()
                logout()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [logout])

    return (
        <>
            <Card>
                <CardContent className="px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src={logoUrl} alt="Logo Fintrack" width={127} height={30} className="h-8 w-auto" />
                    </div> 
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="default"
                                    className="flex items-center gap-2 min-w-0"
                                >
                                    <Avatar className="h-8 w-8 shrink-0">
                                        <AvatarImage src={getAvatarUrl()} className="h-8 w-8 rounded-full" />
                                        <AvatarFallback className="text-xs">
                                            {firstInitial}{lastInitial}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="truncate max-w-[140px]">
                                        {firstName} {lastName}
                                    </span>
                                    <ChevronDownIcon className="w-4 h-4 shrink-0" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="bottom" align="end" avoidCollisions={false} className="w-56">
                                <DropdownMenuLabel>Meu perfil</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem
                                        onSelect={() => setIsAvatarDialogOpen(true)}
                                        className="cursor-pointer"
                                    >
                                        <UserIcon className="w-4 h-4" />
                                        Escolher Avatar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onSelect={logout}
                                        className="cursor-pointer"
                                    >
                                        <LogOutIcon className="w-4 h-4" />
                                        Sair
                                        <DropdownMenuShortcut>⌘+Q</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
            </Card>

            {/* Dialog para seleção de avatar */}
            <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Escolha seu Avatar</DialogTitle>
                        <DialogDescription>
                            Selecione um avatar para personalizar seu perfil
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-4 gap-4 py-4">
                        {avatarOptions.map((avatar) => (
                            <button
                                key={avatar.id}
                                onClick={() => handleAvatarSelect(avatar)}
                                className={`
                                    relative p-4 rounded-lg border-2 transition-all hover:scale-105
                                    ${selectedAvatar?.id === avatar.id 
                                        ? 'border-primary bg-primary/10' 
                                        : 'border-gray-200 hover:border-primary/50'
                                    }
                                `}
                            >
                                <img 
                                    src={avatar.url} 
                                    alt={avatar.name}
                                    className="w-full h-full rounded-full"
                                />
                                {selectedAvatar?.id === avatar.id && (
                                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">
                                        ✓
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Header