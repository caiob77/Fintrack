import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PasswordInput from '@/components/password-input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Navigate } from 'react-router-dom' 
import { useAuthContext } from '@/contexts/auth'
import { useSignupForm } from '@/forms/hooks/user'

const SignupPage = () => {
    const { user, signup, isInitializing } = useAuthContext()

    const { form: methods } = useSignupForm() 
    
    const onSubmit = (data) => {
        signup(data)
    }
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
                <CardHeader className="pb-2 sm:pb-3 md:pb-4">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl">Crie sua conta</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Insira seus dados para criar sua conta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3 md:space-y-4">
                <FormField control={methods.control} name="firstName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="digite seu nome"
                                autoComplete="given-name"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={methods.control} name="lastName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Sobrenome</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="digite seu sobrenome"
                                autoComplete="family-name"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
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
                                autoComplete="new-password"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={methods.control} name="passwordConfirmation" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirmação de Senha</FormLabel>
                        <FormControl>
                            <PasswordInput
                                placeholder="digite a senha novamente"
                                autoComplete="new-password"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={methods.control} name="terms" render={({ field }) => (
                    <FormItem>
                        <div className="items-top flex space-x-2 space-y-2"> 
                            <Checkbox
                                className="mt-1"
                                id="terms"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                            <Label htmlFor="terms">Li e aceito os <Link to="/terms" className="text-primary hover:text-primary/70">termos de uso</Link></Label>
                        </div>
                        <FormMessage />
                    </FormItem>
                )} />
                </CardContent>
                <CardFooter className="pt-2 sm:pt-3 md:pt-4">
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