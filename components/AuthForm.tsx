"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { z } from "zod"; /*For form validation we used zod for more info visit https://ui.shadcn.com/docs/components/form*/
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { getLoggedInUser, signIn } from "@/lib/actions/user.actions";
import { signUp } from "@/lib/actions/user.actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Divide, Loader2 } from "lucide-react";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { useRouter } from "next/navigation";
import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        try {

            if (type === "sign-up") {
                const userData = {
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    address1: data.address1!,
                    city: data.city!,
                    state: data.state!,
                    postalCode: data.postalCode!,
                    dateOfBirth: data.dateOfBirth!,
                    ssn: data.ssn!,
                    email: data.email,
                    password: data.password,
                };

                const newUser = await signUp(userData);
                
                setUser(newUser);
            }

            if (type === "sign-in") {
                const response = await signIn({
                    email: data.email,
                    password: data.password,
                });
                if (response) router.push("/")
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
            }
        }

return (
    <section className="auth-form">
        <header className="flex flex-col gap-4 md:gap-3">
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
                <h1 className="text-24 lg:text-30 font-semibold text-gray-900">
                    {user
                    ? "Get Started"
                    : type === "sign-in"
                        ? "Sign In"
                        : "Sign Up"
                    }
                    <p className="text-16 font-normal text-gray-600">
                        {user
                            ? "By linking your bank account securely."
                            : "Please provide your login details"
                        }
                    </p>
                </h1>
            </div>
        </header>
        {user ? (
            <div className="flex flex-col gap-4">
                <PlaidLink user={user} variant="primary" />
            </div>
        ) : (
            <>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {type === 'sign-up' && (
                    <>
                        <div className = "flex gap-4">
                            <CustomInput 
                            control={form.control} 
                            name="firstName" 
                            label="First Name" 
                            placeholder="Name"
                            />

                            <CustomInput 
                            control={form.control} 
                            name="lastName" 
                            label="Last Name" 
                            placeholder="Last name"
                            />
                        </div>                     
                        <CustomInput 
                        control={form.control} 
                        name="address1" 
                        label="Street Address" 
                        placeholder="Street Address"
                        />
                        <div className="flex gap-4">
                            <CustomInput 
                            control={form.control} 
                            name="city" 
                            label="City" 
                            placeholder="City"
                            />

                            <CustomInput 
                            control={form.control} 
                            name="state" 
                            label="State" 
                            placeholder="State"
                            />

                            <CustomInput 
                            control={form.control} 
                            name="postalCode" 
                            label="Postal Code" 
                            placeholder="Postal Code"
                            />
                        </div>

                        <div className = "flex gap-4">
                            <CustomInput 
                            control={form.control} 
                            name="dateOfBirth" 
                            label="Date of Birth" 
                            placeholder="YYYY-MM-DD"
                            />                        

                            <CustomInput 
                            control={form.control} 
                            name="ssn" 
                            label="SSN" 
                            placeholder="Last 4 digits"
                            />
                        </div>
                    </>
                )}

                <CustomInput 
                control={form.control} 
                name="email" 
                label="Email" 
                placeholder="Email"
                />

                <CustomInput 
                control={form.control} 
                name="password" 
                label="Password" 
                placeholder="Password"
                />

                <div className="flex flex-col gap-4">
                    <Button type="submit" disabled={isLoading} className="form-btn"> {isLoading ? (
                    <>
                        <Loader2 size={20}
                        className="animate-spin" /> &nbsp;
                        Just a moment...
                    </>    
                    ) : type === "sign-in" ? (
                        "Sign In"
                    ) : (
                        "Sign Up"
                    )}                   
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
                <Link
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                className="form-link"
                >
                    {type === "sign-in" ? "Sign Up" : "Sign In"}
                </Link>
            </footer>
            </>
        )}
    </section>
    );
};

export default AuthForm;
