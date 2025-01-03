import { formatAmount } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Copy from "./copy";

interface BankCardProps {
  account: any;
  userName: string;
  showBalance?: boolean;
  cardStyle?: "style1" | "style2" | "style3"; // Add cardStyle prop
}

const BankCard = ({ account, userName, showBalance = true, cardStyle = "style1" }: BankCardProps) => {
  // Define styles for each variant
  const styles = {
    style1: {
      background: "linear-gradient(135deg, #383D52, #3F586B)", // Deep muted blue and vibrant blue gradient
      boxShadow: "0 6px 10px rgba(0, 0, 0, 0.6)",
      borderRadius: "15px",
      border: "1px solid #383D52", // Light teal border for contrast
    },
    style2: {
      background: "linear-gradient(135deg, #3F586B, #9FBABA)", // Blue to light teal gradient
      boxShadow: "0 6px 10px rgba(0, 0, 0, 0.5)",
      borderRadius: "12px",
      border: "1px solid #9FBABA", // Deep muted blue border for grounding
    },
    style3: {
      background: "linear-gradient(135deg, #9FBABA, #383D52)", // Light teal to deep blue gradient
      boxShadow: "0 6px 10px rgba(0, 0, 0, 0.4)",
      borderRadius: "12px",
      border: "1px solid #3F586B", // Medium blue border to create balance
    },
  };


  return (
    <div className="flex flex-col items-center">
      <Link
        href={`/transaction-history/?id=${account.appwriteItemId}`}
        className="rounded-lg w-[300px] h-[180px] p-6 shadow-2xl hover:scale-105 transform transition duration-300 relative group
        min-w-[300px]"
        style={styles[cardStyle]} // Apply selected style
      >
        {/* Main Card Content */}
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-white">Current Balance</p>
            <p className="font-bold text-white">{formatAmount(account.currentBalance)}</p>
          </div>
          <div>
            <Image src="/icons/Paypass.svg" width={20} height={24} alt="PayPass" />
          </div>
        </div>

        <div className="absolute bottom-4 left-6">
          <div className="flex items-center">
            <p className="text-sm font-medium text-white">{account.name} Account</p>
          </div>
          <p className="text-[14px] font-mono tracking-[2px] text-white mt-2">
            ●●●● ●●●● ●●●● <span className="font-bold">{account?.mask}</span>
          </p>
        </div>

        <div className="absolute bottom-4 right-3 flex gap-4">
          <Image src="/icons/visa.svg" width={40} height={30} alt="Mastercard" />
        </div>
      </Link>
      
      <Copy
    title="Copy account ID" // Leave blank or provide alternative placeholder text
    value={account?.shareableId} // The ID to be copied
/>
       
      {/* Spending Bar */}
      <div className="mt-4 w-full flex flex-col items-center">
          <p className="text-sm font-medium text-gray-700">
            Balance: {formatAmount(account.currentBalance)}
          </p>
          <div className="relative w-full max-w-[300px] h-3 bg-gray-300 rounded-full mt-2">
            <div
              className="absolute top-0 left-0 h-3 bg-gray-500 rounded-full"
              style={{ width: `${(account.currentBalance / 500) * 100}%` }}
            ></div>
          </div>
      </div>
    </div>
  );
};

export default BankCard;
