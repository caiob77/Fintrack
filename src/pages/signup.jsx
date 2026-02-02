import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PasswordInput from '@/components/ui/password-input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import api from '@/lib/axios'
import { toast } from 'sonner'

const signupSchema = z.object({
    firstName: z.string().trim().min(1, { message: 'Nome é obrigatório' }),
    lastName: z.string().trim().min(1, { message: 'Sobrenome é obrigatório' }),
    email: z.string().trim({ message: 'Email é obrigatório' }).email({ message: 'Email inválido' }),
    password: z.string().trim().min(8, { message: 'Senha deve ter pelo menos 8 caracteres' }),
    confirmPassword: z.string().trim().min(8, { message: 'confirmação de senha é obrigatória' }),
    terms: z.boolean().refine((data) => data.terms, { message: 'Você deve aceitar os termos de uso' })
    .refine((data) => data.password === data.confirmPassword, { message: 'As senhas não correspondem', path: ['confirmPassword'] })
})


const SignupPage = () => {
    const [user, setUser] = useState(null)
    const signupMutation = useMutation({
        mutationKey: ['signup'],
        mutationFn: async (variables) => {
            const response = await api.post('/users', {
            firstName: variables.firstName,
            lastName: variables.lastName,
            email: variables.email,
            password: variables.password,
        })
        return response.data
        },
    })
    const methods = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false,
        },
    }) 
    const onSubmit = (data) => {
        signupMutation.mutate(data, {
            onSuccess: (createdUser) => {
                const accessToken = createdUser.accessToken
                const refreshToken = createdUser.refreshToken
                setUser(createdUser)
                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken) 
                toast.success('Conta criada com sucesso')
            },
            onError: () => {
                toast.error('Erro ao criar conta')
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
                <CardHeader>
                    <CardTitle>Crie sua conta</CardTitle>
                    <CardDescription>Insira seus dados para criar sua conta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                <FormField control={methods.control} name="firstName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="digite seu nome" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={methods.control} name="lastName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Sobrenome</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="digite seu sobrenome" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
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
                <FormField control={methods.control} name="confirmPassword" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirmação de Senha</FormLabel>
                        <FormControl>
                            <PasswordInput placeholder="digite a senha novamente" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={methods.control} name="terms" render={({ field }) => (
                    <FormItem>
                        <div className="items-top flex space-x-2 space-y-2"> 
                            <FormControl>
                                <Checkbox className="mt-1" id="terms" checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <Label htmlFor="terms">Li e aceito os <Link to="/terms" className="text-primary hover:text-primary/70">termos de uso</Link></Label>
                        </div>
                        <FormMessage />
                    </FormItem>
                )} />
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Criar conta</Button>
                </CardFooter>
                <div className="flex items-center justify-center">
                <p className="text-center opacity-50"> Já tem uma conta? </p>
                <Button variant="link" asChild className="text-primary hover:text-primary/70">
                <Link to="/login">Faça login</Link>
                </Button>
            </div>
            </Card> 
            </form>
            </Form>
        </div> 
    )
}

export default SignupPage 