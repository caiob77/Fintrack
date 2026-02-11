import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PasswordInput from '@/components/password-input'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '@/contexts/auth'
import { useLoginForm } from '@/forms/hooks/user'
const LoginPage = () => {
    const { user, login, isInitializing } = useAuthContext()
    const { form: methods } = useLoginForm() 
    const onSubmit = (data) => { login(data) }
    
    if (isInitializing) {
        return <div>Carregando...</div>
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