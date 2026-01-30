import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

const SignupPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    return (
        <div className="flex flex-col justify-center items-center h-screen w-full">
            <Card className="w-[500px]">
                <CardHeader>
                    <CardTitle>Crie sua conta</CardTitle>
                    <CardDescription>Insira seus dados para criar sua conta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input type="text" placeholder="Nome" />
                    <Input type="text" placeholder="Sobrenome" />
                    <Input type="email" placeholder="Email" />
                    <div className="relative">
                    <Input type={passwordVisible ? "text" : "password"} placeholder="Senha" />
                    <Button variant="ghost" size="icon" 
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                        {passwordVisible ? <EyeIcon className="text-muted-foreground" /> : <EyeOffIcon className="text-muted-foreground" />}
                    </Button>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Criar conta</Button>
                </CardFooter>
            </Card> 
            <div className="flex items-center justify-center">
                <p className="text-center opacity-50"> Já tem uma conta? </p>
                <Button variant="link" asChild className="text-primary hover:text-primary/70">
                <Link to="/login">Faça login</Link>
                </Button>
            </div>
        </div> 
    )
}

export default SignupPage