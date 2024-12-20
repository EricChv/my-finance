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
        href={`/transaction-history/?id=${account.appwriteItemId}`}
        className="rounded-lg w-[300px] h-[180px] p-6 shadow-2xl hover:scale-105 transform transition duration-300 relative group"
        style={{
          background: "linear-gradient(135deg, #435154, #54666a)",
          boxShadow: "0 6px 10px rgba(0, 0, 0, 0.8)",
          borderRadius: "15px",
          border: "2px solid #52514D",
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
            <p className="text-sm font-medium text-white ml-auto">●● / ●●</p>
          </div>
          <p className="text-[14px] font-mono tracking-[2px] text-white mt-2">
            ●●●● ●●●● ●●●● <span className="font-bold">{account?.mask}</span>
          </p>
        </div>

        <div className="absolute bottom-4 right-3 flex gap-4">
          <Image src="/icons/mastercard.svg" width={40} height={30} alt="Mastercard" />
        </div>
      </Link>

      {showBalance && (
        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-gray-700">Shareable ID</p>
          <p className="text-lg font-semibold">{account?.shareableId}</p>
        </div>
      )}
    </div>
  );
};

export default BankCard;