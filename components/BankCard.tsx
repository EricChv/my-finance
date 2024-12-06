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
  className="rounded-lg w-[300px] h-[180px] p-6 shadow-2xl hover:scale-105 transform transition duration-300 relative group"
  style={{
    background: 'linear-gradient(135deg, #52514D, #837A79)', // High contrast gradient for more depth
    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.8)', // Stronger shadow for greater depth
    borderRadius: '15px', // Rounded corners for a modern feel
    border: '2px solid #52514D', // Darker border to match the gradient and add sharpness
    position: 'relative', // Proper element positioning
    transition: 'all 0.3s ease-in-out', // Smooth transition for hover effects
}}
>
      
        {/* Main Card Content */}
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-white">Current Balance</p>
            <p className="font-bold text-white">
              {formatAmount(account.currentBalance)}
            </p>
          </div>
          <div>
            <Image
              src="/icons/Paypass.svg"
              width={20}
              height={24}
              alt="PayPass"
            />
          </div>
        </div>

        <div className="absolute bottom-4 left-6">
          <div className="flex items-center">
            <p className="text-sm font-medium text-white">{userName}</p>
            <p className="text-sm font-medium text-white ml-auto">12 / 27</p>
          </div>
          <p className="text-[14px] font-mono tracking-[2px] text-white mt-2">
            5196 7728 2871 1234
          </p>
        </div>

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