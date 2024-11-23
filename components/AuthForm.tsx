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

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        console.log(values)
        setIsLoading(false)
        }

return (
    <section className="auth-form">
        <header className="flex flex-col gap-4 md:gap-3"> {/* updated md:gap-8 to 3 */}
            <Link href="/" className="mb-12 cursor-pointer flex items-center gap-1">
                <Image 
                    src="/icons/logo.svg"
                    width={34}
                    height={34}
                    alt="MyFinance logo"
                />
                <h1 className="text-26 font-roboto font-bold
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {type === 'sign-up' && (
                    <>
                        <div className = "flex gap-4">
                            <CustomInput 
                            control={form.control} 
                            name="FirstName" 
                            label="First Name" 
                            placeholder="Name"
                            />

                            <CustomInput 
                            control={form.control} 
                            name="LastName" 
                            label="Last Name" 
                            placeholder="Last name"
                            />
                        </div>
                                                    
                        <CustomInput 
                        control={form.control} 
                        name="Address1" 
                        label="Street Address" 
                        placeholder="Street Address"
                        />

                        <div className="flex gap-4">
                            <CustomInput 
                            control={form.control} 
                            name="City" 
                            label="City" 
                            placeholder="City"
                            />

                            <CustomInput 
                            control={form.control} 
                            name="State" 
                            label="State" 
                            placeholder="State"
                            />

                            <CustomInput 
                            control={form.control} 
                            name="ZipCode" 
                            label="Zip Code" 
                            placeholder="Zip Code"
                            />
                        </div>

                        <CustomInput 
                        control={form.control} 
                        name="DateOfBirth" 
                        label="Date of Birth" 
                        placeholder="MM-DD-YYYY"
                        />                        

                        <CustomInput 
                        control={form.control} 
                        name="SSN" 
                        label="Social Security Number" 
                        placeholder="Social Security Number"
                        />

                    </>
                )}

                <CustomInput 
                control={form.control} 
                name="Email" 
                label="Email" 
                placeholder="Email"
                />

                <CustomInput 
                control={form.control} 
                name="Password" 
                label="Password" 
                placeholder="Password"
                />

                <div className="flex flex-col gap-4">
                    <Button type="submit" disabled={isLoading} className="form-btn">{isLoading ? (
                    <>
                        <Loader2 size={20}
                        className="animate-spin"/> &nbsp;
                        Just a moment...
                    </>    
                    ) : type === "sign-in" ? "Sign In" : "Sign Up"}                   
                    </Button>
                </div>
            </form>
        </Form>
            <footer className="flex justify-center gap-1">
                <p className="text-14 font-normal text-gray-600">
                    {type === "sign-in"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </p>
                <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className="form-link">
                    {type === "sign-in" ? "Sign up" : "Sign in"}
                </Link>
            </footer>
            </>
        )}
    </section>
    )
}

export default AuthForm
