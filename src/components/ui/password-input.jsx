import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'


const PasswordInput = ({ placeholder }) => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    return (
        <div className="relative">
            <Input type={passwordVisible ? "text" : "password"} placeholder={placeholder} />
            <Button variant="ghost" size="icon" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <EyeIcon className="text-muted-foreground" /> : <EyeOffIcon className="text-muted-foreground" />}
            </Button>
        </div>
    )
}

export default PasswordInput