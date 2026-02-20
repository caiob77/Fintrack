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
        <div className="flex flex-col justify-center items-center min-h-screen w-full px-2 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8">
            <Form {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full max-w-[340px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[560px]">
                    <Card className="w-full p-2 sm:p-3 md:p-4">
                        <CardHeader className="text-center space-y-1 pb-2 sm:pb-3 md:pb-4">
                            <CardTitle className="text-lg font-bold sm:text-xl md:text-2xl">Entre na sua conta</CardTitle>
                            <CardDescription className="text-xs text-muted-foreground opacity-70 sm:text-sm">Insira seus dados para entrar na sua conta</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2 border-b border-border pb-2 sm:space-y-3 sm:pb-3 md:space-y-4 md:pb-4"> 
                            <FormField control={methods.control} name="email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="digite seu email"
                                            autoComplete="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={methods.control} name="password" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="digite sua senha"
                                            autoComplete="current-password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                        </CardContent>
                        <CardFooter className="flex justify-center pt-2 sm:pt-3 md:pt-4">
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