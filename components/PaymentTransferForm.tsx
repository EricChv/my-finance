"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createTransfer } from "@/lib/actions/dwolla.actions";
import { createTransaction } from "@/lib/actions/transaction.actions";
import { getBank, getBankByAccountId } from "@/lib/actions/user.actions";
import { decryptId } from "@/lib/utils";

import { BankDropdown } from "./BankDropdown";
import { Button } from "./ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(4, "Note is too short"),
    amount: z.string().min(4, "Amount is too short"),
    senderBank: z.string().min(4, "Please select a valid bank account"),
    sharableId: z.string().min(8, "Please select a valid sharable ID"),
});

const PaymentTransferForm = ({ accounts }: PaymentTransferFormProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            amount: "",
            senderBank: "",
            sharableId: "",
        },
    });

    const submit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        try {
            const receiverAccountId = decryptId(data.sharableId);
            const receiverBank = await getBankByAccountId({
                accountId: receiverAccountId,
            });
            const senderBank = await getBank({ documentId: data.senderBank });

            const transferParams = {
                sourceFundingSourceUrl: senderBank.fundingSourceUrl,
                destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
                amount: data.amount,
            };

            const transfer = await createTransfer(transferParams);

            if (transfer) {
                const transaction = {
                    name: data.name,
                    amount: data.amount,
                    senderId: senderBank.userId.$id,
                    senderBankId: senderBank.$id,
                    receiverId: receiverBank.userId.$id,
                    receiverBankId: receiverBank.$id,
                    email: data.email,
                };

                const newTransaction = await createTransaction(transaction);

                if (newTransaction) {
                    form.reset();
                    router.push("/");
                }
            }
        } catch (error) {
            console.error("Submitting create transfer request failed: ", error);
        }

        setIsLoading(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="flex flex-col">
                {/* Sender Bank Field */}
                <FormField
                    control={form.control}
                    name="senderBank"
                    render={() => (
                        <FormItem className="border-t border-gray-200">
                            <div className="payment-transfer_form-item pb-6 pt-5">
                                <div className="payment-transfer_form-content">
                                    <FormLabel className="text-14 font-medium text-gray-700">
                                        From*
                                    </FormLabel>
                                    <FormDescription className="text-12 font-normal text-gray-600">
                                        Select the bank account from which you want to transfer funds.
                                    </FormDescription>
                                </div>
                                <div className="flex w-full flex-col">
                                    <FormControl>
                                        <BankDropdown
                                            accounts={accounts}
                                            setValue={form.setValue}
                                            otherStyles="!w-full"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-12 text-red-500" />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />

                {/* Sharable ID Field */}
                <FormField
                    control={form.control}
                    name="sharableId"
                    render={({ field }) => (
                        <FormItem className="border-t border-gray-200">
                        <div className="payment-transfer_form-item pb-5 pt-5">
                            <div className="payment-transfer_form-content">
                            <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                                To*
                            </FormLabel>
                            <FormDescription className="text-12 font-normal text-gray-600">
                                Enter the account number to which you want to transfer funds.
                            </FormDescription>
                            </div>
                            <div className="flex w-full flex-col">
                            <FormControl>
                                <Input
                                placeholder="Account Number"
                                className="input-class"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-12 text-red-500" />
                            </div>
                        </div>
                        </FormItem>
                    )}
                />

                {/* Transfer Note Field */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="border-t border-gray-200">
                            <div className="payment-transfer_form-item pb-5 pt-5">
                                <div className="payment-transfer_form-content">
                                    <FormLabel className="text-14 font-medium text-gray-700">
                                        Add a message (Optional)
                                    </FormLabel>
                                    <FormDescription className="text-12 font-normal text-gray-600">
                                        Provide any additional details for the recipient of the transfer.
                                    </FormDescription>
                                </div>
                                <div className="flex w-full flex-col">
                                    <FormControl>
                                        <Textarea
                                            placeholder="Message"
                                            className="input-class"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-12 text-red-500" />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />

                {/* Email Field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="border-t border-gray-200">
                            <div className="payment-transfer_form-item py-5">
                                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                                    Recipient&apos;s Email Address
                                </FormLabel>
                                <div className="flex w-full flex-col">
                                    <FormControl>
                                        <Input
                                            placeholder="Email"
                                            className="input-class"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-12 text-red-500" />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />

                

                {/* Amount Field */}
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem className="border-y border-gray-200">
                            <div className="payment-transfer_form-item py-5">
                                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                                    Amount*
                                </FormLabel>
                                <div className="flex w-full flex-col">
                                    <FormControl>
                                        <Input
                                            placeholder="Amount"
                                            className="input-class"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-12 text-red-500" />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <div className="payment-transfer_btn-box">
                    <Button type="submit" className="payment-transfer_btn">
                        {isLoading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" /> &nbsp; Sending...
                            </>
                        ) : (
                            "Transfer Funds"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default PaymentTransferForm;