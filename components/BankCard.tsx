import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatAmount } from "@/lib/utils";

const BankCard = ({
  account,
  userName,
  showBalance = true,
}: CreditCardProps) => {
  return (
    <div className="flex flex-col items-center">
      {/* Main Card */}
      <Link
        href="/"
        className="rounded-lg w-[300px] h-[180px] p-6 shadow-2xl hover:scale-105 transform transition duration-300 relative border border-gray-600"
        style={{
          background: 'linear-gradient(135deg, #1f1f1f, #2e2e2e, #4d4d4d)',
        }}
      >
        {/* Top Section */}
        <div className="flex justify-between">
          {/* Balance (Move it left slightly) */}
          <div>
            <p className="text-sm font-medium text-white">Current Balance</p>
              <p className="font-bold text-white">
                {formatAmount(account.currentBalance)}
              </p>
          </div>
          
          {/* PayPass Icon */}
          <div>
            <Image
              src="/icons/Paypass.svg"
              width={20}
              height={24}
              alt="PayPass"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-4 left-6">
          {/* User Name and Expiration Date */}
          <div className="flex items-center">
            <p className="text-sm font-medium text-white">{userName}</p>
            <p className="text-sm font-medium text-white ml-auto">12 / 27</p>
          </div>
          {/* Card Number */}
          <p className="text-[14px] font-mono tracking-[2px] text-white mt-2">
            5196 7728 2871 1234
          </p>
        </div>

        {/* Card Logos */}
        <div className="absolute bottom-4 right-3 flex gap-4">
          <Image
            src="/icons/visa.svg"
            width={40}
            height={30}
            alt="Visa"
          />
        </div>
      </Link>
    </div>
  );
};

export default BankCard;
