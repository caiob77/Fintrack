import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PasswordInput from '@/components/ui/password-input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import api from '@/lib/axios'
import { toast } from 'sonner'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'


const LoginPage = () => {
    const [user, setUser] = useState(null)

    const loginSchema = z.object({
        email: z.string().trim({ message: 'Email é obrigatório' }).email({ message: 'Email inválido' }),
        password: z.string().trim().min(8, { message: 'Senha deve ter pelo menos 8 caracteres' }),
    })

    const loginMutation = useMutation({
        mutationKey: ['login'],
        mutationFn: async (variables) => {
            const response = await api.post('/users/login', {
                email: variables.email,
                password: variables.password,
            })
            return response.data
        },
    })
    useEffect(() => {
        const init = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken')
                const refreshToken = localStorage.getItem('refreshToken')
                if (!accessToken && !refreshToken) {
                    const response = await api.get('/users/me', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })
                }
                if (response.status === 200) {
                    setUser(response.data)
                }
            } catch (error) {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                console.error(error)
            }
        }
        init()
    }, [user])
    const methods = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })
    const onSubmit = (data) => {
        loginMutation.mutate(data, {
            onSuccess: (loggedUser) => {
                const accessToken = loggedUser.accessToken
                const refreshToken = loggedUser.refreshToken
                setUser(loggedUser)
                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken)
                toast.success('Login realizado com sucesso')
            },
            onError: () => {
                toast.error('Erro ao fazer login')
            },
        })
    } 
    if (user) {
        return <Navigate to="/home" />
    }
    return (
        <div className="flex flex-col justify-center items-center h-screen w-full">
            <Form {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
                    <Card className="w-[600px] p-4">
                        <CardHeader className="text-center space-y-2 text-2xl font-bold border-border">
                            <CardTitle className="text-2xl font-bold">Entre na sua conta</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground opacity-70">Insira seus dados para entrar na sua conta</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5 border-b border-border pb-5"> 
                            <FormField control={methods.control} name="email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="digite seu email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={methods.control} name="password" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder="digite sua senha" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <Button type="submit" className="w-full">fazer login</Button>
                        </CardFooter>
                        <div className="flex items-center justify-center">
                            <p className="text-center opacity-50"> Não tem uma conta? </p>
                            <Button variant="link" asChild className="text-primary hover:text-primary/70">
                                <Link to="/signup">Criar conta</Link>
                            </Button>
                        </div>
                    </Card>
                </form>
            </Form>
        </div>
    )
}

export default LoginPage