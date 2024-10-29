"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react' 

const AuthForm = ({ type }: {type: string }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

        const form = useForm<z.infer<typeof authFormSchema>>({
            resolver: zodResolver(authFormSchema),
            defaultValues: {
                email: "",
                password: "",
        },
    })

    function onSubmit(values: z.infer<typeof authFormSchema>) {
        setIsLoading(true)
        console.log(values)
        setIsLoading(false)
        }

return (
    <section className="auth-form">
        <header className="flex flex-col gap-5 md:gap-3"> {/* updated md:gap-8 to 3 */}
            <Link href="/" className="mb-12 cursor-pointer flex items-center gap-1">
                <Image 
                    src="/icons/logo.svg"
                    width={34}
                    height={34}
                    alt="MyFinance logo"
                />
                <h1 className="text-26 font-ibm-plex-serif font-bold
                text-black-2">MyFinance</h1>
            </Link>

            <div className="flex flex-col gap-1 md:gap-3">
                <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                    {user
                    ? "Link Account"
                    : type === "sign-in"
                        ? "Sign In"
                        : "Sign Up"
                    }
                    <p className="text-16 font-normal text-gray-600">
                        {user
                            ? "Connect your account to begin"
                            : "Please provide your login details"
                        }
                    </p>
                </h1>
            </div>
        </header>
        {user ? (
            <div className="flex flex-col gap-4">
                {/* PlaidLink */}
            </div>
        ): (
            <>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">

                <CustomInput 
                control={form.control} 
                name="email" 
                label="Email" 
                placeholder="Enter your email"
                />

                <CustomInput 
                control={form.control} 
                name="password" 
                label="Password" 
                placeholder="Enter your password"
                />

                <Button type="submit" disabled={isLoading}
                className="form-btn">{isLoading ? (
                <>
                    <Loader2 size={20}
                    className="animate-spin"/> &nbsp;
                    Just a moment...
                </>    
                ) : type === "sign-in" ? "Sign In" : "Sign Up"}                   
                </Button>
            </form>
            </Form>
            </>
        )}
    </section>
    )
}

export default AuthForm
