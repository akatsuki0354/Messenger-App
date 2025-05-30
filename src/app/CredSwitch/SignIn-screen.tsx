"use client"
import { LoginForm } from "@/components/layouts/login-form"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { useEffect, useState } from "react"
import Home from "../HomePage/home-screen"

export default function LoginScreen() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div>
            {user ?
                <Home />
                :
                <div className="grid min-h-svh lg:grid-cols-2">
                    <div className="flex flex-col gap-4 p-6 md:p-10">
                        <div className="flex justify-center gap-2 md:justify-start">
                            <a href="#" className="flex items-center gap-2 font-medium">
                                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground"></div>
                                Messenger App
                            </a>
                        </div>
                        <div className="flex flex-1 items-center justify-center">
                            <div className="w-full max-w-md">
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                    <div className="relative hidden bg-muted lg:block">
                        <img
                            src="/placeholder.svg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </div>}
        </div>
    )
}
