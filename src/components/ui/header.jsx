import { Card, CardContent } from '@/components/ui/card'
import { Image } from '@/components/ui/image'
import { DropdownMenu, DropdownMenuLabel, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { useAuthContext } from '@/contexts/auth'
import { useAvatarContext } from '@/contexts/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { LogOutIcon, ChevronDownIcon, UserIcon } from 'lucide-react'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

const Header = () => {
    const { user, logout } = useAuthContext()
    const { selectedAvatar, avatarOptions, selectAvatar, getAvatarUrl } = useAvatarContext()
    const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false)
    
    const handleAvatarSelect = (avatar) => {
        selectAvatar(avatar)
        setIsAvatarDialogOpen(false)
    }
    
    return (
        <>
            <Card>
                <CardContent className="px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Image src="/logo.svg" alt="logo" width={100} height={100} />
                    </div> 
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild> 
                                <Button variant="outline" size="icon" className="flex items-center gap-2">
                                    <Avatar>
                                        <AvatarImage src={getAvatarUrl()} className="h-10 w-10 rounded-full" />
                                        <AvatarFallback>
                                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    {user.firstName} {user.lastName}
                                    <ChevronDownIcon className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    Meu perfil
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Button 
                                        variant="ghost" 
                                        size="small" 
                                        className="w-full justify-start" 
                                        onClick={() => setIsAvatarDialogOpen(true)}
                                    >
                                        <UserIcon className="w-4 h-4 mr-2" />
                                        Escolher Avatar
                                    </Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button variant="ghost" size="small" className="w-full justify-start" onClick={logout}>
                                        <LogOutIcon className="w-4 h-4 mr-2" />
                                        Sair
                                    </Button>
                                </DropdownMenuItem>
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